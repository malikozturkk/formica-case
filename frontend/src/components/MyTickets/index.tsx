"use client"
import React from "react";
import { TicketData } from "./MyTickets.types";
import MyTicketCard from "./MyTicketCard";

const MyTickets = ({ ticketsData }: { ticketsData: TicketData[] }) => {
    return (
        <div className="w-full rounded-3xl flex flex-col gap-8 p-3 md:px-5 md:py-6" style={{ boxShadow: "0 10px 24px 0 rgba(68,60,98,.22)" }}>
            <div className="px-4 md:p-8 text-blue-900 font-bold text-2xl">
                <div className="border-b border-gray-300">
                    <h1 className="border-b-2 border-blue-900 text-center w-full md:w-1/4">Biletlerim</h1>
                </div>
            </div>

            {!ticketsData[0]?.ticketNumber || ticketsData.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-[#444763] text-sm font-medium">Biletiniz bulunmamaktadır.</div>
            ) : (
                ticketsData.map((ticket) => (
                    <MyTicketCard key={ticket.ticketNumber} ticket={ticket} />
                ))
            )}
        </div>
    );
};

export default MyTickets;

