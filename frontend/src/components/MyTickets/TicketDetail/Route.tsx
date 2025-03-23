import { formatTime } from "@/utils/formaters";

interface TicketRouteProps {
  departure: string;
  arrival: string;
  departureTime: string | Date;
  arrivalTime: string | Date;
}

const TicketRoute = ({ departure, arrival, departureTime, arrivalTime }: TicketRouteProps) => (
    <div className="flex justify-between items-center gap-2 border-t border-blue-400 pt-3">
      <span className="flex flex-col relative font-semibold text-xs md:text-lg items-start">
        <span className="text-sm opacity-80">{departure}</span>
        <time className="font-semibold w-max" dateTime={formatTime(departureTime).date}>
          {formatTime(departureTime).date} {formatTime(departureTime).hour}
        </time>
      </span>
      <span className="hidden md:block w-full relative mt-0.5 mx-1 md:mx-6 before:content-[''] before:inline-flex before:w-6 before:h-6 before:border-[7px] before:border-white before:bg-blue-200 before:absolute before:-top-3 before:z-10 before:shadow before:shadow-[#bac7d5] before:rounded-full after:content-[''] after:inline-flex after:w-6 after:h-6 after:border-[7px] after:border-white after:bg-blue-600 after:absolute after:-top-3 after:shadow after:shadow-[#bac7d5] after:rounded-full after:right-0">
        <div className="absolute inset-0 h-[2px] bg-gradient-to-r from-blue-100 to-blue-600 mask mask-dots"></div>
      </span>
      <span className="flex flex-col relative font-semibold text-xs md:text-lg items-end">
        <span className="text-sm opacity-80">{arrival}</span>
        <time className="font-semibold w-max" dateTime={formatTime(arrivalTime).date}>
          {formatTime(arrivalTime).date} {formatTime(arrivalTime).hour}
        </time>
      </span>
    </div>
  );

export default TicketRoute