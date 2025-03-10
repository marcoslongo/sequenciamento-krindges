'use client'
import { useAuth } from "@/hooks/useAuth";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import Content from "@/components/layout/home/Content";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Você precisa estar logado.</p>;

  return (
    <Content />
  );
}

