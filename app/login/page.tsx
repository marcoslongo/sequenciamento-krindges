"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", { redirect: false, email, password });

    if (result?.ok) router.push("/");
    else toast({
      title: "Erro ao logar",
      description: "Verifique os dados informados",
    });
  };

  return (
    <main className="bg-[#0d0131] h-[100vh] flex justify-center items-center">
      <div className="container w-full flex justify-center">
        <div className="w-[480px] flex flex-col">
          <div className="flex justify-center mb-6">
            <Image
              src={'/assets/images/header_logo_2024.png'}
              alt="alt"
              width={200}
              height={50}
              className="invert filter"
            />
          </div>
          <h1 className="text-center text-white font-bold text-2xl mb-5">Login</h1>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleLogin}>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="text-center">
              <p className="text-white">Não possui cadastro? <Link className="hover:underline" href="/cadastro">Fazer cadastro</Link></p>
            </div>
            <div className="flex justify-center">
              <Button className="bg-[#C9AC44] transition hover:bg-black" type="submit">Entrar</Button>
            </div>
          </form>
        </div>
      </div>
    </main >
  );
}
