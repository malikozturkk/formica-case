import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', 
    },
  })
  export class TicketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(TicketGateway.name);
    @WebSocketServer()
    server: Server;
    sendTicketUpdate(userId: number, ticketNumber: number, status: string) {
      this.logger.log(`Sending update to user_${userId}: Ticket ${ticketNumber} -> ${status}`);
      this.server.to(`user_${userId}`).emit('ticketUpdated', { ticketNumber, status });
    }

    handleConnection(client: Socket) {
      const userId = client.handshake.query.userId as string;
      if (userId) {
        client.join(`user_${userId}`); 
        this.logger.log(`User ${userId} connected and joined room: user_${userId}`);
      } else {
        this.logger.warn(`Client connected without userId: ${client.id}`);
      }
    }

    handleDisconnect(client: Socket) {
      const userId = client.handshake.query.userId as string;
      if (userId) {
        client.leave(`user_${userId}`);
        this.logger.log(`User ${userId} disconnected and left room: user_${userId}`);
      }
    }
  }
  