"use client"
import { useAuth } from "@/context/authContext";
import React from "react";

const MyTickets = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Hoş geldin, {JSON.stringify(user)}!</h1>
        </div>
    )
}

export default MyTickets