import { User } from "@/context/context.types";
import { TravelData } from "../TicketCard/TicketCard.types";

export type TicketStatus = "ACQUIRED" | "CHECKEDIN" | "USED" | "EXPIRED";

export const statusText: Record<TicketStatus, string> = {
    ACQUIRED: "Satın Alındı",
    CHECKEDIN: "Trene Biniş Yapıldı",
    USED: "Yolculuk Tamamlandı",
    EXPIRED: "Süresi Doldu"
};

export interface TicketData {
    id: number;
    ticketNumber: number;
    status: TicketStatus
    createdAt: string; 
    updatedAt: string;
    userId: number;
    travelId: number;
    travel: TravelData;
    user: User
}