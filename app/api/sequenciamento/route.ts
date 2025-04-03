import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const locais = searchParams.get("locais")?.split(",") || [];
    const divisoes = searchParams.get("divisoes")?.split(",") || [];
    const tipos = searchParams.get("tipos")?.split(",") || [];

    const where = {
      AND: [
        locais.length > 0 ? { cd_local: { in: locais.map(Number) } } : {},
        divisoes.length > 0 ? { ds_divisao_produtiva: { in: divisoes } } : {},
        tipos.length > 0 ? { ds_tipo: { in: tipos } } : {},
      ],
    };

    const aggregatedData = await prisma.tbSequenciamentoTeste.groupBy({
      by: ["cd_local", "ds_local"],
      _count: {
        _all: true,
      },
      _sum: {
        qt_op: true,
      },
      where,
      orderBy: {
        cd_local: "asc",
      },
    });

    const aggregatedDataProdutive = await prisma.tbSequenciamentoTeste.groupBy({
      by: ["ds_divisao_produtiva"],
      where,
    });

    const detailedData = await prisma.tbSequenciamentoTeste.findMany({
      where,
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

    return NextResponse.json({
      aggregatedData: processedAggregatedData,
      detailedData,
      aggregatedDataProdutive,
    });
  } catch (error) {
    console.error("Erro ao buscar os dados:", error);
    return NextResponse.json({ error: "Erro ao buscar os dados" }, { status: 500 });
  }
}