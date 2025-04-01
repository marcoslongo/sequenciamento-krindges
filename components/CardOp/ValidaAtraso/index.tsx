interface ValidaAtrasoProps {
  valida_atraso: string;
}

export function ValidaAtraso({ valida_atraso }: ValidaAtrasoProps) {
  const validaAtraso = valida_atraso;
  
  return (
    <div className="flex items-center gap-1">
      <div
        className={`w-6 h-6 block rounded-full ${validaAtraso === 'ATRASADA' ? 'bg-red-600' : 'bg-green-500'
          }`}
      ></div>
      <p>{validaAtraso === 'ATRASADA' ? 'Atrasada' : 'Dentro do prazo'}</p>
    </div>
  );
}