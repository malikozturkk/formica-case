"use client"
import Image from "next/image"
import { ITicketCard } from "./TicketCard.types"
import TicketPrice from "./TicketPrice"
import TicketRouteDetails from "./TicketRouteDetails"

const TicketCard: React.FC<ITicketCard> = ({ travel, loading, onSelect }) => {
    return (
        <div className={`rounded-3xl bg-white overflow-hidden relative flex flex-col bg-clip-border break-words ${loading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`} style={{ boxShadow: "0 10px 24px 0 rgba(68,60,98,.22)" }}>
            <div className="border-b-0 bg-white rounded-3xl cursor-pointer p-3 md:py-4 md:px-8">
            <button 
                onClick={() => onSelect(travel.id)} 
                disabled={loading}
                type="button"
                className="text-2xl font-semibold text-[#444763] p-0 relative cursor-pointer text-left align-middle select-none bg-transparent border border-transparent leading-6 rounded-sm w-full"
            >
                <div className="flex flex-nowrap w-full items-center justify-center">
                    <Image src="/icons/train.svg" width={50} height={50} alt="Train Icon" className="w-full max-w-8 md:max-w-16 h-16 object-contain" />
                    <TicketRouteDetails travel={travel} />
                    <TicketPrice amount={travel?.amount} />
                </div>
            </button>
            </div>
        </div>
    )
}

export default TicketCard