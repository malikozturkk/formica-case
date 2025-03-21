import MyTickets from "@/components/MyTickets";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default async function Tickets() {
  //TODO: bana ait ticketları al
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value;
  console.log(accessToken, "accessToken")
  if (!accessToken) {
    redirect('/')
  }
  return (
    <MyTickets />
  );
}
