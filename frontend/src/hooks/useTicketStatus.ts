"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "@/lib/auth";
import { TicketStatus } from "@/components/MyTickets/MyTickets.types";
import { useAuth } from "@/context/authContext";

let socket: Socket | null = null; 

const useTicketStatus = (ticketNumber: number, initialStatus: TicketStatus) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<TicketStatus>(initialStatus);

  useEffect(() => {
    if (!user?.id) return;

    if (!socket) {
      socket = io(API_URL, {
        query: { userId: user.id },
      });
    }

    const handleStatusUpdate = (data: { ticketNumber: number; status: TicketStatus }) => {
      if (data.ticketNumber === ticketNumber) {
        setStatus(data.status);
      }
    };

    socket.on("ticketUpdated", handleStatusUpdate);

    return () => {
      socket?.off("ticketUpdated", handleStatusUpdate);
    };
  }, [ticketNumber, user?.id]);

  return status;
};

export default useTicketStatus;
