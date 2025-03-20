"use client"
import Image from "next/image"
import { ITicketCard } from "./TicketCard.types"
import { formatTime } from "@/utils/formaters"

const TicketCard: React.FC<ITicketCard> = ({ travel, loading, onSelect }) => {
    const citiesCol = "text-xs md:text-sm text-[#8392a7] font-semibold block truncate whitespace-nowrap"
    const dateCol = "text-[10px] md:text-sm text-[#8392a7] font-semibold block truncate"
    const hourCol = "flex flex-col items-center relative text-xs md:text-2xl font-semibold text-[#444763]"
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
                    <div className="w-full px-2 md:px-4 relative max-w-8/12">
                        <div className="relative border-r-2 border-l-2 border-dotted border-[#8392a7] px-3 md:px-8 h-full before:content-[''] before:absolute before:rounded-full before:w-6 before:h-6 before:-right-3 before:bottom-[-29px] before:bg-gradient-to-t before:from-transparent before:to-[#dedde4] after:content-[''] after:absolute after:rounded-full after:w-6 after:h-6 after:-right-3 after:top-[-29px] after:bg-[#f7f7f8]">
                        <div className="flex justify-between items-center">
                            <p className="text-xs md:text-lg font-semibold text-[#444763] relative truncate"><strong>NO:</strong> {travel.id} {travel.departure}-{travel.arrival}</p>
                        </div>

                        <div>
                            <div className="flex flex-wrap justify-between mt-4">
                                <span className={`${citiesCol} w-1/2 max-w-1/3 order-1`}>{travel.departure}</span> 
                                <span className={`${citiesCol} order-2 text-center w-full max-w-full md:w-1/2 md:max-w-1/3`}>{travel.duration.hours}sa {travel.duration.minutes}dk</span>
                                <span className={`${citiesCol} w-1/2 max-w-1/3 order-1 md:order-3 text-right`}>{travel.arrival}</span>
                            </div>

                            <div className="flex justify-between items-center mb-1">
                            <span className={hourCol}>
                                <time dateTime={formatTime(new Date(travel.departureTime)).hour} title={`Gidiş ${formatTime(new Date(travel.departureTime)).hour}`}>
                                {formatTime(new Date(travel.departureTime)).hour}
                                </time>
                            </span> 
                            <span className="border-b-2 border-dotted border-[#8392a7] w-full relative mt-0.5 mx-1 md:mx-6 before:content-[''] before:inline-flex before:w-6 before:h-6 before:border-[7px] before:border-white before:bg-[#444763] before:absolute before:-top-3 before:shadow before:shadow-[#bac7d5] before:rounded-full after:content-[''] after:inline-flex after:w-6 after:h-6 after:border-[7px] after:border-white after:bg-[#444763] after:absolute after:-top-3 after:shadow after:shadow-[#bac7d5] after:rounded-full after:right-0"></span>
                            <span className={hourCol}>
                                <time dateTime={formatTime(new Date(travel.arrivalTime)).hour} title={`Varış ${formatTime(new Date(travel.arrivalTime)).hour}`}>
                                {formatTime(new Date(travel.arrivalTime)).hour}
                                </time>
                            </span>
                            </div>

                            <div className="flex flex-wrap">
                            <div className="relative text-left order-2 md:order-1 w-1/2 max-w-1/2 md:max-w-1/3">
                                <span className={`${dateCol} text-left`}>{formatTime(new Date(travel.departureTime)).date}</span>
                            </div>
                            <div className="order-1 w-full max-w-full md:order-2 md:w-1/2 md:max-w-1/3 text-center relative">
                                <span className={`${dateCol} text-center`}>Direkt</span>
                            </div>
                            <div className="text-right order-3 relative w-1/2 max-w-1/2 md:max-w-1/3">
                                <span className={`${dateCol} text-right`}>{formatTime(new Date(travel.arrivalTime)).date}</span>
                            </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    <div className="max-w-fit md:max-w-1/4 w-full md:px-4">
                        <div className="md:pr-5">
                        <span className="text-[10px] md:text-sm font-bold text-[#8392a7]">Bilet Ücreti</span>
                        <p className="text-base md:text-3xl font-bold text-[#444763] my-3 leading-normal">₺{travel.amount}</p>
                        </div>
                    </div>
                    {loading && (
                        <div className="min-w-5 min-h-5 w-5 h-5 border-2 border-[#444763] border-t-transparent rounded-full animate-spin"></div>
                    )}
                </div>
            </button>
            </div>
        </div>
    )
}

export default TicketCard