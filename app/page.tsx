'use client'
import { useAuth } from "@/hooks/useAuth";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import Content from "@/components/layout/home/Content";
import Link from "next/link";
import Image from "next/image";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return (
    <div className="w-full h-[100vh] bg-[#0d0131] flex items-center justify-center">
      <div className="flex justify-center items-center gap-4 flex-col">
        <Image
          src={'/assets/images/header_logo_2024.png'}
          alt="alt"
          width={200}
          height={50}
          className="invert filter"
        />
        <p className="text-white text-2xl">Você precisa estar logado! <Link className="hover:underline" href="/login">Fazer login</Link></p>
      </div>
    </div>
  );

  return (
    <Content />
  );
}

