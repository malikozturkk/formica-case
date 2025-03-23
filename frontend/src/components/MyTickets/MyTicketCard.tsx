"use client"
import React from "react";
import { statusText, TicketData } from "./MyTickets.types";
import TicketRouteDetails from "../TicketCard/TicketRouteDetails";
import Image from "next/image";
import Link from "next/link";
import Button from "@/elements/button";
import useTicketStatus from "@/hooks/useTicketStatus";

const MyTicketCard = ({ ticket }: { ticket: TicketData }) => {
    const status = useTicketStatus(ticket.ticketNumber, ticket.status);
    return (
        <div
            className={`rounded-3xl bg-white overflow-hidden relative flex flex-col bg-clip-border break-words ${
                status === "USED" || status === "EXPIRED" ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
            }`}
            style={{ boxShadow: "0 10px 24px 0 rgba(68,60,98,.22)" }}
        >
            <div className="border-b-0 bg-white rounded-3xl cursor-pointer p-3 md:py-4 md:px-8">
                <Link href={`/tickets/${ticket.ticketNumber}`} className="text-2xl font-semibold text-[#444763] p-0 cursor-pointer text-left leading-6">
                    <div className="flex flex-nowrap w-full items-center justify-center">
                        <div className="flex flex-col gap-1 max-w-fit md:max-w-1/4 w-full items-center md:items-start">
                            <Image src="/icons/train.svg" width={50} height={50} alt="Train Icon" className="w-full max-w-8 max-h-8 md:max-w-16 md:max-h-16 h-16 object-contain" />
                            <div className="text-xs md:text-sm font-bold px-1 py-0.5 w-fit rounded-md border border-gray-300">
                                {statusText[status]}
                            </div>
                            <div className="text-xs md:text-sm font-normal px-1 py-0.5 w-fit rounded-md bg-gray-300">
                                PNR: <strong>{ticket.ticketNumber}</strong>
                            </div>
                        </div>
                        <TicketRouteDetails travel={ticket.travel} />
                        <div className="flex flex-col gap-1 max-w-fit md:max-w-1/8 w-full items-center md:items-end">
                            <Button type="button" color="blue-900" className="bg-white border-2 border-blue-900 rounded-md text-sm truncate hover:text-white hover:bg-blue-900" padding="p-1 md:px-4 md:py-3">
                                Detaylar
                            </Button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MyTicketCard