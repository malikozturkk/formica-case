import { TicketData } from "./MyTickets.types"

const TicketDetail = (ticketData: TicketData) => {
    return (
        <div>ticket detail {ticketData.ticketNumber}</div>
    )
}

export default TicketDetail