"use client"
import Button from "@/elements/button"
import Input from "@/elements/input"
import { useState } from "react"
import { login } from "@/api/auth"
import { useAuth } from "@/context/authContext"

interface ILoginForm {
  setLoginDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm: React.FC<ILoginForm> = ({ setLoginDialog }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string; response?: string }>({});
  const { login: saveToken } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "E-posta alanı zorunludur.";
    if (!password) newErrors.password = "Şifre alanı zorunludur.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { access_token, refresh_token } = await login(email, password);
        saveToken(access_token, refresh_token);
        setErrors({ response: '', email: '', password: '' })
        setLoginDialog(false)
      } catch (error: any) {
        return setErrors({ response: 'E-mail veya şifre yanlış' });
      }
    }
  };


  return (
    <>
      {errors.response && <div className="bg-red-500 text-white text-base mb-4 rounded-xl text-center p-4">{errors.response}</div>}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="E-Posta"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <Input
          label="Şifre"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
      <Button type="submit" className="rounded-2xl w-full">Giriş Yap</Button>
      </form>
    </>
  )
}

export default LoginForm