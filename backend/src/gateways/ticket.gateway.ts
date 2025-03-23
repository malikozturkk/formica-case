import {
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*', 
    },
  })
  export class TicketGateway {
    @WebSocketServer()
    server: Server;
  
    sendTicketUpdate(ticketNumber: number, status: string) {
      this.server.emit('ticketUpdated', { ticketNumber, status });
    }
  }
  