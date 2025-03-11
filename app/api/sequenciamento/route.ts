import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const aggregatedData = await prisma.tbSequenciamentoTeste.groupBy({
      by: ["cd_local", "ds_local"],
      _count: {
        _all: true,
      },
      _sum: {
        qt_op: true,
      },
      orderBy: {
        cd_local: "asc",
      },
    });

    const aggregatedDataProdutive = await prisma.tbSequenciamentoTeste.groupBy({
      by: ["ds_divisao_produtiva"],
    });

    const detailedData = await prisma.tbSequenciamentoTeste.findMany({
      orderBy: {
        cd_local: "asc",
      },
    });

    const processedAggregatedData = aggregatedData.map((item) => ({
      cd_local: item.cd_local,
      ds_local: item.ds_local,
      ordens_local: item._count._all,
      pecas_local: item._sum.qt_op,
    }));

    return NextResponse.json({ aggregatedData: processedAggregatedData, detailedData, aggregatedDataProdutive });
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return NextResponse.json({ error: "Erro ao buscar os dados" }, { status: 500 });
  }
}
