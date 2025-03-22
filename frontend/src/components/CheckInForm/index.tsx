"use client"
import { useEffect, useState } from "react"
import Button from "@/elements/button"
import Input from "@/elements/input"
import { useForm } from "react-hook-form"
import { checkIn } from "@/api/check-in"
import Image from "next/image"
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const CheckInForm = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" | "warning" | null }>({ message: "", type: null });
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ surname: string; pnr: number }>();


  const onSubmit = async (data: { surname: string; pnr: number }) => {
    setLoading(true);
    setAlert({ message: "", type: null }); 
    try {
      const res = await checkIn(data.surname, data.pnr);
      setAlert({ message: `${res.ticketNumber} Numaralı bilet için check-in işlemi başarıyla yapıldı`, type: "success" });
    } catch (error: any) {
      const { status } = error
      if (status === 400) {
        setAlert({ message: "Bilet sahibinin soyadı yanlış", type: "warning" });
      } else if (status === 401) {
        setAlert({ message: "Bileti check-in yapmak için giriş yapmalısınız", type: "error" });
      } else if (status === 404) {
        setAlert({ message: "Böyle bir bilet bulunamadı", type: "error" });
      } else {
        setAlert({ message: "Bilinmeyen bir hata oluştu", type: "error" });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {alert.type ? <Alert severity={alert.type} onClose={handleClose}>{alert.message}</Alert> : <div />}
      </Snackbar>
      <div className="bg-[#de2619] w-full md:w-fit px-4 py-3 rounded-lg rounded-b-none text-white flex items-center gap-2 border border-gray-200 justify-center md:justify-start">
        <Image src="/icons/train-mini.svg" alt="Mini Train Icon" width={18} height={24} />
        Tren Bileti
      </div>
      <div className="flex flex-col gap-4 rounded-tr-none md:rounded-tr-lg rounded-lg rounded-tl-none p-4 md:p-8 border border-gray-200" style={{ boxShadow: "0 10px 24px 0 rgba(68,60,98,.22)" }}>
        <h1 className="text-base md:text-2xl">Check-in</h1>
        <form className="flex gap-4 items-start flex-col md:flex-row" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="w-full md:w-3/4 flex items-center justify-between gap-2 flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                  <Input
                      required
                      type="text"
                      placeholder="Soyadınızı Girin"
                      {...register("surname", { required: "Soyadı alanı zorunludur." })}
                      error={errors.surname?.message}
                  />
              </div>
              <div className="w-full md:w-1/2">
                <Input
                    required
                    type="pnr"
                    placeholder="PNR Numaranızı Girin"
                    {...register("pnr", { required: "PNR alanı zorunludur." })}
                    error={errors.pnr?.message}
                />
              </div>
          </div>
          <Button type="submit" className="rounded-2xl w-full md:w-1/4 hover:bg-blue-950" loading={loading} disabled={isSubmitting}>Check-in yap</Button>
        </form>
      </div>
    </>
  )
}

export default CheckInForm