import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";

interface CardOpProps {
  marca: string;
  desenho_tecnico: string;
  nr_op: number;
  ds_colecao: string;
  qt_op: number;
  inicio_op: string;
}

export function CardOP({
    marca,
    desenho_tecnico,
    nr_op, ds_colecao,
    qt_op,
    inicio_op
  }: CardOpProps) {
  return (
    <div className="w-full p-2 rounded bg-[#ccc] mb-4">
      <div className="font-bold text-center">
        <p>O.P: {nr_op}</p>
        <p>Ref: 605 119072</p>
        <p className="text-sm">Marca: <span>{marca}</span></p>
        <p>Coleção: {ds_colecao}</p>
        <p>Qt: {qt_op}</p>
      </div>
      <div className="w-full h-64 relative">
        <Image src={desenho_tecnico} alt="alt" fill />
      </div>
      <div className="w-full font-bold">
        <p>Entrada: {formatDate(inicio_op)}</p>
        <div className="flex items-center gap-1">
          <div className="bg-red-600 w-[24px] h-[24px] block rounded-full"></div>
          <p>Atrasada</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-green-500 w-[24px] h-[24px] block rounded-full"></div>
          <p>Dentro do prazo</p>
        </div>
      </div>
    </div>
  );
}