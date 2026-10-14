"use client";
import { ArrowRight, Pause, Play, X } from "lucide-react";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky to-[#b9c4ff] px-6 py-3 font-semibold text-ink shadow-[0_10px_30px_-12px_rgba(90,120,220,.6)] transition hover:brightness-105 active:scale-[.98] disabled:opacity-50",
  soft: "glass inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium text-ink transition hover:bg-white/70 active:scale-[.98]",
  ghost: "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted underline-offset-4 hover:text-ink hover:underline",
};

export function Title({ children, sub }: { children: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <header className="space-y-3 text-center">
      <h1 className="text-[1.75rem] leading-snug font-semibold tracking-tight text-balance sm:text-[2.1rem]">{children}</h1>
      {sub && <p className="text-pretty text-muted">{sub}</p>}
    </header>
  );
}

/** Controles comunes de los ejercicios: nunca bloquean la salida. */
export function Controls({
  running,
  setRunning,
  onFinish,
  onExit,
}: {
  running: boolean;
  setRunning: (r: boolean) => void;
  onFinish: () => void;
  onExit: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button type="button" className={btn.soft} onClick={() => setRunning(!running)}>
        {running ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
        {running ? "Pausar" : "Seguir"}
      </button>
      <button type="button" className={btn.soft} onClick={onFinish}>
        Siguiente <ArrowRight size={16} aria-hidden />
      </button>
      <button type="button" className={btn.ghost} onClick={onExit}>
        <X size={16} aria-hidden /> Salir
      </button>
    </div>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div aria-hidden className="h-1 w-full overflow-hidden rounded-full bg-white/60">
      <div className="h-full rounded-full bg-sky transition-[width] duration-200" style={{ width: `${Math.min(100, value * 100)}%` }} />
    </div>
  );
}
