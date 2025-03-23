"use client"
import { useState, useEffect } from "react";
import TicketCard from "./TicketCard"
import { ITicketCardsContainer, TravelData } from "./TicketCard.types"
import api from "@/lib/axios";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useAuth } from "@/context/authContext";

const TicketCardsContainer: React.FC<ITicketCardsContainer> = ({ travelsData }) => {
  const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | null }>({ message: "", type: null });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (alert.type) {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 3000);
        }
    }, [alert]);

    const handleSelect = async (id: number) => {
        setLoading(true);
        setAlert({ message: "", type: null }); 
        
        try {
          const res = await api.post("travels/buy", { id });
          setAlert({ message: "Satın alma başarılı", type: "success" });
          if (user) {
            setUser({ ...user, balance: res.data.newBalance });
          }
        } catch (error: unknown) {
          if (error instanceof Error && "status" in error) {
            const { status } = error as { status?: number };
            if (status === 400) {
              setAlert({ message: "Yetersiz bakiye", type: "error" });
            } else if (status === 401) {
              setAlert({ message: "Bilet satın almak için giriş yapmalısınız", type: "error" });
            } else if (status === 404) {
              setAlert({ message: "Böyle bir seyahat bulunamadı", type: "error" });
            } 
          }
          else setAlert({ message: "Bir hata oluştu, lütfen tekrar deneyin!", type: "error" });
        }
        
        setLoading(false);
    };

    return (
        <section className="flex flex-col gap-8 pt-4">
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
              {alert.type ? <Alert severity={alert.type} onClose={handleClose}>{alert.message}</Alert> : <div />}
          </Snackbar>
            {travelsData.map((travel: TravelData) => (
                <TicketCard travel={travel} key={travel.departure + travel.departureTime} loading={loading} onSelect={handleSelect} />
            ))}
        </section>
    )
}

export default TicketCardsContainer