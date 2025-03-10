'use client'
import { useAuth } from "@/hooks/useAuth";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import Content from "@/components/layout/home/Content";
import { useRouter } from "next/router";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Carregando...</p>;
  if (!user) return router.push('/login');

  return (
    <Content />
  );
}

