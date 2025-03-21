import { statusText, TicketStatus } from "../MyTickets.types";

const TicketHeader = ({ status }: { status: TicketStatus }) => (
    <div className="flex justify-between items-center mb-4 border-b border-blue-400 pb-2">
      <h2 className="text-2xl font-bold tracking-wide">Tren Bileti</h2>
      <span className="text-sm font-semibold bg-white text-blue-900 px-2 py-1 rounded shadow">
        {statusText[status]}
      </span>
    </div>
  );

export default TicketHeader