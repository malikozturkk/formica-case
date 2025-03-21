import { TravelData } from "../TicketCard/TicketCard.types";

export type TicketStatus = "ACQUIRED" | "CHECKEDIN" | "USED" | "EXPIRED";
  
export interface TicketData {
    id: number;
    ticketNumber: number;
    status: TicketStatus
    createdAt: string; 
    updatedAt: string;
    userId: number;
    travelId: number;
    travel: TravelData;
}