import Image from "next/image";
import { formatDate } from "@/app/utils/formatDate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

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
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-full h-64 relative cursor-pointer">
            <Image src={desenho_tecnico} alt="alt" fill />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-screen-md">
          <DialogHeader>
            <DialogTitle>O.P: {nr_op} - Referência: {nr_op}</DialogTitle>
          </DialogHeader>
          <Image
            src={desenho_tecnico}
            alt=""
            width={768}
            height={768}
          />
        </DialogContent>
      </Dialog>
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
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex w-full justify-center mt-3">
            <Button variant="outline">Ver mais informações</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>O.P: {nr_op} - Referência: {nr_op}</DialogTitle>
          </DialogHeader>
          <div className="font-bold">
            <p>O.P: {nr_op}</p>
            <p>Ref: 605 119072</p>
            <p className="text-sm">Marca: <span>{marca}</span></p>
            <p>Coleção: {ds_colecao}</p>
            <p>Qt: {qt_op}</p>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}