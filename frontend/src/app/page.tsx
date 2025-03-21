import TicketCardsContainer from "@/components/TicketCard";
import { TravelData } from "@/components/TicketCard/TicketCard.types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/travels`)
  const travelsData: TravelData[] = await res.json()
  return (
    <TicketCardsContainer travelsData={travelsData} />
  );
}
