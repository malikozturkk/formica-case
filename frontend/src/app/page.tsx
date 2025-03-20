import TicketCard from "@/components/TicketCard";
import { TravelData } from "@/components/TicketCard/TicketCard.types";

export default async function Home() {
  const travelsData: TravelData[] = [
    {
      "id": 3,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T09:00:00.000Z",
      "arrivalTime": "2025-03-28T13:00:00.000Z",
      "amount": 589.99,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 4,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T10:00:00.000Z",
      "arrivalTime": "2025-03-28T14:00:00.000Z",
      "amount": 785.99,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 5,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T11:00:00.000Z",
      "arrivalTime": "2025-03-28T15:00:00.000Z",
      "amount": 859.99,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 6,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T12:00:00.000Z",
      "arrivalTime": "2025-03-28T16:00:00.000Z",
      "amount": 750,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 7,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T13:00:00.000Z",
      "arrivalTime": "2025-03-28T17:00:00.000Z",
      "amount": 400,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 8,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T14:00:00.000Z",
      "arrivalTime": "2025-03-28T18:00:00.000Z",
      "amount": 550,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 9,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T15:00:00.000Z",
      "arrivalTime": "2025-03-28T19:00:00.000Z",
      "amount": 650,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 10,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T16:00:00.000Z",
      "arrivalTime": "2025-03-28T20:00:00.000Z",
      "amount": 700,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 11,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T17:00:00.000Z",
      "arrivalTime": "2025-03-28T21:00:00.000Z",
      "amount": 800,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 12,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T18:00:00.000Z",
      "arrivalTime": "2025-03-28T22:00:00.000Z",
      "amount": 900,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 13,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T19:00:00.000Z",
      "arrivalTime": "2025-03-28T23:00:00.000Z",
      "amount": 1099.99,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 14,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T20:00:00.000Z",
      "arrivalTime": "2025-03-29T00:00:00.000Z",
      "amount": 1200,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    },
    {
      "id": 15,
      "departure": "İstanbul",
      "arrival": "Ankara",
      "departureTime": "2025-03-28T21:00:00.000Z",
      "arrivalTime": "2025-03-29T01:00:00.000Z",
      "amount": 1250,
      "createdAt": "2025-03-19T19:31:47.345Z",
      "updatedAt": "2025-03-19T19:31:47.345Z",
      "duration": {
        "hours": 4,
        "minutes": 0
      }
    }
  ]

  return (
    <section className="flex flex-col gap-8 pt-4">
      {travelsData.map((travel: TravelData) => (
        <TicketCard travel={travel} key={travel.departure + travel.departureTime} />
      ))}
    </section>
  );
}
