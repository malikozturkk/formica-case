import { TicketData } from "@/components/MyTickets/MyTickets.types";
import TicketDetail from "@/components/MyTickets/TicketDetail/TicketDetail";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

type Params = Promise<{ slug: string }>;

export default async function Detail({ params }: { params: Params }) {
    const { slug } = await params
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) redirect('/');

    try {
        const res = await fetch(`${process.env.API_URL}/tickets/${slug}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        
        const ticketData: TicketData = await res.json();

        return <TicketDetail {...ticketData} />

    } catch { 
        return <div>Bu ticket bulunamadı</div> 
    }
}