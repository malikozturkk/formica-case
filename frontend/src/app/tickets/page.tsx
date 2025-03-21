import MyTickets from "@/components/MyTickets";
import { TicketData } from "@/components/MyTickets/MyTickets.types";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default async function Tickets() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    redirect('/')
  }

  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/tickets`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const ticketsData: TicketData[] = await res.json();
  return <MyTickets ticketsData={ticketsData} />;
}
