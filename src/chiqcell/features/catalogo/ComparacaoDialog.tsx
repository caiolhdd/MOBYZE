import { useMemo, useState } from "react";
import type { Produto } from "../../data/schema";
import { Dialog } from "../../components/ui/dialog";
import { cn } from "../../lib/utils";
import { ProdutoArte } from "./ProdutoArte";
import { tabelaComparacao } from "./regras";

type Props = {
  open: boolean;
  produtos: Produto[];
  onClose: () => void;
  onPedirOrcamento: (p: Produto) => void;
};

export function ComparacaoDialog({ open, produtos, onClose, onPedirOrcamento }: Props) {
  const [soDiferencas, setSoDiferencas] = useState(false);
  const linhas = useMemo(() => tabelaComparacao(produtos), [produtos]);
  const visiveis = soDiferencas ? linhas.filter((l) => !l.iguais) : linhas;

  return (
    <Dialog open={open} onClose={onClose} title="Comparar modelos" size="xl">
      <label className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={soDiferencas} onChange={(e) => setSoDiferencas(e.target.checked)} className="h-4 w-4 accent-cyan-300" />
        Mostrar só as diferenças
      </label>

      {/* Rolagem horizontal só dentro da tabela; a 1ª coluna fica fixa para o rótulo não sumir no celular. */}
      <div className="-mx-6 mt-3 overflow-x-auto sm:-mx-7">
        <table className="w-full table-fixed border-separate border-spacing-0 text-sm" style={{ minWidth: `calc(6.5rem + ${produtos.length} * 10rem)` }}>
          <colgroup>
            <col className="w-[6.5rem] sm:w-40" />
            {produtos.map((p) => (
              <col key={p.id} />
            ))}
          </colgroup>
          <caption className="sr-only">Comparação entre {produtos.map((p) => p.nome).join(", ")}</caption>
          <thead>
            <tr>
              <td className="sticky left-0 z-[1] bg-[#07111f]" />
              {produtos.map((p) => (
                <th key={p.id} scope="col" className="px-3 pb-4 text-left align-top font-normal">
                  <ProdutoArte produto={p} className="aspect-[4/3]" />
                  <span className="mt-2 block text-sm font-extrabold sm:text-base">{p.nome}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visiveis.map((l) => (
              <tr key={l.rotulo}>
                <th scope="row" className="sticky left-0 z-[1] border-t border-white/10 bg-[#07111f] py-3 pl-6 pr-2 text-left align-top font-normal text-slate-400 hyphens-auto sm:pl-7">
                  {l.rotulo}
                </th>
                {l.valores.map((v, i) => (
                  <td key={produtos[i].id} className={cn("border-t border-white/10 px-3 py-3 align-top", l.iguais ? "text-slate-400" : "font-semibold text-white")}>
                    {v ?? <span className="text-slate-600">—</span>}
                  </td>
                ))}
              </tr>
            ))}
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={produtos.length + 1} className="px-6 py-8 text-center text-slate-400">
                  Os modelos escolhidos têm as mesmas informações cadastradas.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td className="sticky left-0 z-[1] bg-[#07111f]" />
              {produtos.map((p) => (
                <td key={p.id} className="px-3 pt-4">
                  <button
                    type="button"
                    onClick={() => onPedirOrcamento(p)}
                    className="min-h-11 w-full rounded-full bg-cyan-300 px-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07111f]"
                    aria-label={`Pedir orçamento do ${p.nome}`}
                  >
                    Pedir orçamento
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </Dialog>
  );
}
