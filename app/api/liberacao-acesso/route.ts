import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos na API:", body);

    const { userId, field, value } = body;

    if (!userId || !["canGrantAccess", "isMaster"].includes(field)) {
      console.error("Erro: Dados inválidos:", body);
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const testUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!testUser) {
      console.error("Erro: Usuário não encontrado:", userId);
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    console.log("Atualizando usuário...");
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { [field]: Boolean(value) },
    });

    console.log("Usuário atualizado:", updatedUser);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

