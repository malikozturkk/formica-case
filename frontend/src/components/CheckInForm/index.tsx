"use client"
import Button from "@/elements/button"
import Input from "@/elements/input"
import { useForm } from "react-hook-form"
import { checkIn } from "@/api/check-in"
import Image from "next/image"

const CheckInForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ surname: string; pnr: number }>();


  const onSubmit = async (data: { surname: string; pnr: number }) => {
    try {
      const res = await checkIn(data.surname, data.pnr);
      console.log(res, "check-in response'u")
    } catch (error: any) {
      setError("root.response", { message: "Soyadı veya PNR yanlış" });
    }
  };

  return (
    <>
      {errors.root?.response && (
        <div className="bg-red-500 text-white text-base mb-4 rounded-xl text-center p-4">
          {errors.root.response.message}
        </div>
      )}
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
          <Button type="submit" className="rounded-2xl w-full md:w-1/4 hover:bg-blue-950" disabled={isSubmitting}>Check-in yap</Button>
        </form>
      </div>
    </>
  )
}

export default CheckInForm