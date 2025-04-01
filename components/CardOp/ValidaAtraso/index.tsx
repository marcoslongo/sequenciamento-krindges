import { Clock } from 'lucide-react';
interface ValidaAtrasoProps {
  valida_atraso: string;
}

export function ValidaAtraso({ valida_atraso }: ValidaAtrasoProps) {
  const validaAtraso = valida_atraso;

  return (
    <div className="flex items-center gap-1">
      <div className={`${validaAtraso === 'ATRASADA' ? 'text-red-600' : 'text-green-500'}`}>
        <Clock />
      </div>
      <p>{validaAtraso === 'ATRASADA' ? 'Atrasada' : 'Dentro do prazo'}</p>
    </div>
  );
}