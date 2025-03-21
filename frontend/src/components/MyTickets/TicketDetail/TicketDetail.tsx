import { TicketData } from "../MyTickets.types";
import TicketHeader from "./Header";
import TicketInfo from "./Info";
import TravelTime from "./TravelTime";
import TicketRoute from "./Route";
import TicketDetailContainer from "./Container";

const TicketDetail = (ticketData: TicketData) => {

  if (!ticketData.ticketNumber) {
    return (
      <TicketDetailContainer>
        <div className="min-h-72 flex items-center justify-center text-sm text-blue-100 font-medium">Bu bilet bulunamadı.</div>
      </TicketDetailContainer>
    )
  }

  const { status, ticketNumber, user, travel, createdAt, updatedAt } = ticketData;
  const { email, firstName, lastName } = user;
  const { amount, departure, arrival, departureTime, arrivalTime, duration } = travel;
  
  return (
    <TicketDetailContainer>
      <TicketHeader status={status} />
      <div className="space-y-3 text-sm md:text-lg">
        <TicketInfo label="Bilet No" value={ticketNumber} />
        <TicketInfo label="Ad Soyad" value={`${firstName} ${lastName}`} />
        <TicketInfo label="E-posta" value={email} />
        <TravelTime label="Satın Alma Tarihi" time={createdAt} />
        <TravelTime label="Güncelleme Tarihi" time={updatedAt} />
        <TicketRoute departure={departure} arrival={arrival} departureTime={departureTime} arrivalTime={arrivalTime} />
        <TicketInfo label="Seyahat Süresi" value={`${duration.hours} saat ${duration.minutes} dakika`} />
        <TicketInfo label="Ödenen Ücret" value={`${amount} TL`} />
      </div>
    </TicketDetailContainer>
  );
};

export default TicketDetail