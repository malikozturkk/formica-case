"use client"
import { useState } from "react";
import TicketCard from "./TicketCard"
import { ITicketCardsContainer, TravelData } from "./TicketCard.types"

const TicketCardsContainer: React.FC<ITicketCardsContainer> = ({ travelsData }) => {
    const [loading, setLoading] = useState(false);

    const handleSelect = async () => {
        setLoading(true);
        //TODO: api call
        setTimeout(() => {
          setLoading(false);
        }, 3000); 
      };

    return (
        <section className="flex flex-col gap-8 pt-4">
            {travelsData.map((travel: TravelData) => (
            <TicketCard travel={travel} key={travel.departure + travel.departureTime} loading={loading} onSelect={handleSelect} />
          ))}
        </section>
    )
}

export default TicketCardsContainer