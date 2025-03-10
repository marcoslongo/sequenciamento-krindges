import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sign } from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return NextResponse.json({ error: "Senha inválida" }, { status: 401 });

    const token = sign({ id: user.id }, process.env.NEXTAUTH_SECRET!, { expiresIn: "1h" });

    return NextResponse.json({ token, user });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}
