import { TicketData } from "../MyTickets.types";
import TicketCircles from "../TicketCircles";
import TicketHeader from "./Header";
import TicketInfo from "./Info";
import TravelTime from "./TravelTime";
import TicketRoute from "./Route";

const TicketDetail = (ticketData: TicketData) => {
  const { status, ticketNumber, user, travel, createdAt, updatedAt } = ticketData;
  const { email, firstName, lastName } = user;
  const { amount, departure, arrival, departureTime, arrivalTime, duration } = travel;
  
  return (
    <div className="w-full bg-blue-900 text-white p-9 md:p-12 rounded-lg shadow-xl relative overflow-hidden">
      <TicketHeader status={status} />
      <div className="space-y-3 text-lg">
        <TicketInfo label="Bilet No" value={ticketNumber} />
        <TicketInfo label="Ad Soyad" value={`${firstName} ${lastName}`} />
        <TicketInfo label="E-posta" value={email} />
        <TravelTime label="Satın Alma Tarihi" time={createdAt} />
        <TravelTime label="Güncelleme Tarihi" time={updatedAt} />
        <TicketRoute departure={departure} arrival={arrival} departureTime={departureTime} arrivalTime={arrivalTime} />
        <TicketInfo label="Seyahat Süresi" value={`${duration.hours} saat ${duration.minutes} dakika`} />
        <TicketInfo label="Ödenen Ücret" value={`${amount} TL`} />
      </div>
      <TicketCircles side="left" />
      <TicketCircles side="right" />
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-100 to-blue-600" />
      <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-t from-blue-600 to-blue-100" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-100" />
      <div className="absolute bottom-0 left-0 w-2 h-full bg-gradient-to-t from-blue-100 to-blue-600" />
    </div>
  );
};

export default TicketDetail