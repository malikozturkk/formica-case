import { statusText, TicketStatus } from "../MyTickets.types";

const TicketHeader = ({ status }: { status: TicketStatus }) => (
    <div className="flex justify-between items-center mb-4 border-b border-blue-400 pb-2 gap-2 flex-col sm:flex-row">
      <h2 className="text-2xl font-bold tracking-wide">Tren Bileti</h2>
      <span className="w-full text-center text-sm font-semibold bg-white text-blue-900 p-2 md:py-1 rounded shadow sm:w-auto">
        {statusText[status]}
      </span>
    </div>
  );

export default TicketHeader