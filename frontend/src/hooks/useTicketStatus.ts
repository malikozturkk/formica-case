"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/lib/auth";
import { TicketStatus } from "@/components/MyTickets/MyTickets.types";

const socket = io(API_URL);

const useTicketStatus = (ticketNumber: number, initialStatus: TicketStatus) => {
  const [status, setStatus] = useState<TicketStatus>(initialStatus);

  useEffect(() => {
    const handleStatusUpdate = (data: { ticketNumber: number; status: TicketStatus }) => {
      if (data.ticketNumber === ticketNumber) {
        setStatus(data.status);
      }
    };

    socket.on("ticketUpdated", handleStatusUpdate);

    return () => {
      socket.off("ticketUpdated", handleStatusUpdate);
    };
  }, [ticketNumber]);

  return status;
};

export default useTicketStatus;
