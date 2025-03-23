"use client"
import Button from "@/elements/button"
import Input from "@/elements/input"
import { useForm } from "react-hook-form"
import { login } from "@/api/auth"
import { useAuth } from "@/context/authContext"

const LoginForm = ({ setLoginDialog }: { setLoginDialog: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>();

  const { login: saveToken } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const { access_token, refresh_token } = await login(data.email, data.password);
      saveToken(access_token, refresh_token);
      setLoginDialog(false);
    } catch (error: unknown) {
      console.error(error, "error")
      setError("root.response", { message: "E-mail veya şifre yanlış" });
    }
  };

  return (
    <>
      {errors.root?.response && (
        <div className="bg-red-500 text-white text-base mb-4 rounded-xl text-center p-4">
          {errors.root.response.message}
        </div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="E-Posta"
          type="email"
          {...register("email", {
            required: "E-posta alanı zorunludur.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Geçerli bir e-posta adresi giriniz."
            }
          })}
          error={errors.email?.message}
        />
        <Input
          label="Şifre"
          type="password"
          {...register("password", { required: "Şifre alanı zorunludur." })}
          error={errors.password?.message}
        />
        <Button type="submit" className="rounded-2xl w-full" disabled={isSubmitting}>Giriş Yap</Button>
      </form>
    </>
  )
}

export default LoginForm