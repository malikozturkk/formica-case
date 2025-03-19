import Button from "@/elements/button"
import Input from "@/elements/input"
import { useState } from "react"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: { email?: string; password?: string } = {};

        if (!email) newErrors.email = "E-posta alanı zorunludur.";
        if (!password) newErrors.password = "Şifre alanı zorunludur.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            //TODO: login api call
            console.log("Form başarıyla gönderildi", { email, password });
        }
    };


    return (
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
    )
}

export default LoginForm