import { useState } from "react";
import { Smartphone } from "lucide-react";
import type { Produto } from "../../data/schema";
import { cn } from "../../lib/utils";

const GRADIENTES: Record<NonNullable<Produto["cor"]> | "padrao", string> = {
  blue: "from-sky-400/70 to-blue-800",
  pink: "from-pink-300/70 to-rose-800",
  purple: "from-violet-300/70 to-purple-900",
  padrao: "from-slate-500/60 to-slate-900",
};

type Props = { produto: Produto; className?: string; eager?: boolean };

/** Foto do aparelho com fallback para arte neutra quando não há foto ou ela falha ao carregar. */
export function ProdutoArte({ produto, className, eager }: Props) {
  const [falhou, setFalhou] = useState(false);
  const temFoto = !!produto.foto && !falhou;

  return (
    <div
      className={cn(
        "relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-gradient-to-br",
        GRADIENTES[produto.cor ?? "padrao"],
        className,
      )}
    >
      {temFoto ? (
        <img
          src={produto.foto}
          alt={produto.nome}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFalhou(true)}
          className="h-full w-full object-cover object-[50%_32%]"
        />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,.35),transparent_45%)]" />
          <Smartphone aria-hidden strokeWidth={1.25} className="relative h-1/2 w-1/2 -rotate-6 text-white/80 drop-shadow-xl" />
          <span className="sr-only">Foto de {produto.nome} indisponível</span>
        </>
      )}
    </div>
  );
}
