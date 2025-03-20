"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) router.push("/login");
    else toast({
      title: "Erro ao cadastrar",
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
          <h1 className="text-center text-white font-bold text-2xl mb-5">Cadastro</h1>
          <form className="flex flex-col gap-3 w-full" onSubmit={handleRegister}>
            <Input className="w-full" type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <Input className="w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input className="w-full" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="text-center">
              <p className="text-white">Já possuo cadastro <Link className="hover:underline" href="/login">fazer Login</Link></p>
            </div>
            <div className="flex justify-center">
              <Button className="bg-[#C9AC44] transition hover:bg-black" type="submit">Cadastrar</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
