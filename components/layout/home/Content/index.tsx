'use client';
import { Checkbox } from '@/components/ui/checkbox';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { useState, useEffect } from 'react';
import { CardOP } from '@/components/CardOp';
import { Header } from '../../Header';
import { Eraser, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Sequenciamento {
  cd_empresa: number;
  nr_ciclo: number;
  nr_op: number;
  nr_prioridade: number;
  inicio_op: string;
  dt_entrada_local: string;
  valida_atraso: string;
  cd_nivel: string;
  cd_local: number;
  ds_local: string;
  ds_marca: string;
  ds_divisao_produtiva: string;
  ds_colecao: string;
  ds_tipo: string;
  desenho_tecnico: string;
  ordem: number;
  qt_op: number;
}

interface AggregatedData {
  cd_local: number;
  ds_local: string;
  ordens_local: number;
  pecas_local: number;
}

interface AggregatedDataProdutive {
  ds_divisao_produtiva: string;
}

export default function Content() {
  const [, setDados] = useState<Sequenciamento[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<Sequenciamento[]>([]);
  const [aggregatedData, setAggregatedData] = useState<AggregatedData[]>([]);
  const [aggregatedDataProdutive, setAggregatedDataProdutive] = useState<AggregatedDataProdutive[]>([]);
  const [aggregatedDataTipos, setAggregatedDataTipos] = useState<{ ds_tipo: string }[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const [selectedLocais, setSelectedLocais] = useState<number[]>([]);
  const [selectedDivisoes, setSelectedDivisoes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async (comFiltros: boolean = false) => {
    setLoading(true);
    try {
      const url = new URL('/api/sequenciamento', window.location.origin);
      if (comFiltros) {
        if (selectedLocais.length > 0) {
          url.searchParams.set('locais', selectedLocais.join(','));
        }
        if (selectedDivisoes.length > 0) {
          url.searchParams.set('divisoes', selectedDivisoes.join(','));
        }
        if (selectedTipos.length > 0) {
          url.searchParams.set('tipos', selectedTipos.join(','));
        }
      }
      const response = await fetch(url.toString());
      const resultado = await response.json();
      console.log(resultado);

      if (comFiltros) {
        setDadosFiltrados(resultado.detailedData);
      } else {
        setDados(resultado.detailedData);
        setDadosFiltrados(resultado.detailedData);
        setAggregatedData(resultado.aggregatedData);
        setAggregatedDataProdutive(resultado.aggregatedDataProdutive);
        setAggregatedDataTipos(resultado.aggregatedDataTipos);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalChange = (cd_local: number) => {
    setSelectedLocais((prev) =>
      prev.includes(cd_local)
        ? prev.filter((id) => id !== cd_local)
        : [...prev, cd_local]
    );
  };

  const handleDivisaoChange = (ds_divisao_produtiva: string) => {
    setSelectedDivisoes((prev) =>
      prev.includes(ds_divisao_produtiva)
        ? prev.filter((divisao) => divisao !== ds_divisao_produtiva)
        : [...prev, ds_divisao_produtiva]
    );
  };

  const limparFiltros = () => {
    setSelectedLocais([]);
    setSelectedDivisoes([]);
    setSelectedTipos([]);
    fetchData(false);
  };

  return (
    <main className="h-screen bg-gray-300">
      <Header />
      <div className="bg-[#0d0131] p-3 md:p-6 flex justify-center items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1" variant="outline">
              <Filter /><h2>Filtros</h2>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Busque por setor</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {aggregatedData.map((item, index) => {
                  const checkboxId = `checkbox-${item.cd_local}`;
                  return (
                    <li key={index} className="flex items-center gap-1">
                      <Checkbox
                        value={item.cd_local}
                        id={checkboxId}
                        checked={selectedLocais.includes(item.cd_local)}
                        onCheckedChange={() => handleLocalChange(item.cd_local)}
                      />
                      <label htmlFor={checkboxId} className="cursor-pointer">
                        {item.cd_local} - {item.ds_local}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <DialogHeader>
                <DialogTitle>Busque por Divisão Produtiva</DialogTitle>
              </DialogHeader>
              <ul className="flex flex-col gap-2">
                {aggregatedDataProdutive.map((item, index) => {
                  const checkboxId = `checkbox-${item.ds_divisao_produtiva}`;
                  return (
                    <li key={index} className="flex items-center gap-1">
                      <Checkbox
                        value={item.ds_divisao_produtiva}
                        id={checkboxId}
                        checked={selectedDivisoes.includes(
                          item.ds_divisao_produtiva
                        )}
                        onCheckedChange={() =>
                          handleDivisaoChange(item.ds_divisao_produtiva)
                        }
                      />
                      <label htmlFor={checkboxId} className="cursor-pointer">
                        {item.ds_divisao_produtiva}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <DialogHeader>
                <DialogTitle>Filtrar por Tipo</DialogTitle>
              </DialogHeader>
              <ul className="flex flex-col gap-2">
                {aggregatedDataTipos.map((item, index) => {
                  const checkboxId = `checkbox-${item.ds_tipo}`;
                  return (
                    <li key={index} className="flex items-center gap-1">
                      <Checkbox
                        value={item.ds_tipo}
                        id={checkboxId}
                        checked={selectedTipos.includes(item.ds_tipo)}
                        onCheckedChange={() =>
                          setSelectedTipos((prev) =>
                            prev.includes(item.ds_tipo) ? prev.filter((t) => t !== item.ds_tipo) : [...prev, item.ds_tipo]
                          )
                        }
                      />
                      <label htmlFor={checkboxId} className="cursor-pointer">
                        {item.ds_tipo === 'COSTURA_EXTERNA' ? 'COSTURA EXTERNA' : 'COSTURA INTERNA'}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="flex justify-center gap-3">
                <DialogClose asChild>
                  <Button
                    className="flex gap-1 bg-[#0d0131]"
                    onClick={() => fetchData(true)}
                  >
                    Buscar <Search color="#fff" />
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="flex gap-1 bg-[#0d0131]"
                    onClick={limparFiltros}
                  >
                    Limpar Filtros <Eraser color="#fff" />
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? (
        <div className="flex justify-center h-[30vh] items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className='w-full overflow-x-scroll flex gap-4 md:gap-6 p-2 md:p-6'>
          {aggregatedData
            .filter((item) => {
              return dadosFiltrados.some((data) => data.cd_local === item.cd_local);
            })
            .map((item, index) => (
              <div className='min-w-[290px] md:min-w-[350px] bg-white rounded-md' key={index}>
                <div className="text-center py-4">
                  <h2 className="text-lg font-bold">
                    {item.cd_local} - {item.ds_local}
                  </h2>
                  <p className="text-md font-bold">
                    Peças no Local: {item.pecas_local}
                  </p>
                  <p className="text-md font-bold">
                    Ordens no Local: {item.ordens_local}
                  </p>
                </div>
                <div className="bg-white p-3 shadow rounded-b-md !h-[55vh] overflow-y-scroll overflow-x-hidden">
                  {dadosFiltrados.filter((data) => data.cd_local === item.cd_local)
                    .length === 0 ? (
                    <p className="text-center text-gray-500">Nenhum resultado encontrado para este local.</p>
                  ) : (
                    dadosFiltrados
                      .filter((data) => data.cd_local === item.cd_local)
                      .map((item, index) => (
                        <CardOP
                          key={index}
                          marca={item.ds_marca}
                          desenho_tecnico={item.desenho_tecnico}
                          nr_op={item.nr_op}
                          ds_colecao={item.ds_colecao}
                          qt_op={item.qt_op}
                          inicio_op={item.inicio_op}
                          cd_nivel={item.cd_nivel}
                          valida_atraso={item.valida_atraso}
                          ds_tipo={item.ds_tipo}
                          nr_cliclo={item.nr_ciclo}
                        />
                      ))
                  )}
                </div>
              </div>
            ))}
          {aggregatedData
            .filter((item) => {
              return dadosFiltrados.some((data) => data.cd_local === item.cd_local);
            })
            .length === 0 && (
              <div className="w-full mt-6 text-center bg-white rounded-t-md py-4">
                <p className="text-lg font-bold">Nenhum local disponível para exibir.</p>
              </div>
            )}
        </div>
      )}
    </main>
  );
}