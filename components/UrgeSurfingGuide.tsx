"use client";
import AnimatedCalmSphere from "./AnimatedCalmSphere";
import { Controls, Progress } from "./ui";
import { fmt, useOnDone, useTimer } from "@/lib/useTimer";

const TOTAL = 90;

export default function UrgeSurfingGuide({ steps: STEPS, onFinish, onExit }: { steps: string[]; onFinish: () => void; onExit: () => void }) {
  const t = useTimer(TOTAL);
  useOnDone(t.done, onFinish);

  const step = Math.min(STEPS.length - 1, Math.floor((t.elapsed / TOTAL) * STEPS.length));
  // Ondulación lenta: tamaño y brillo cambian, sin sugerir que el impulso "tiene que" desaparecer.
  const wave = Math.sin((t.elapsed / 12) * Math.PI * 2);

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatedCalmSphere scale={t.running ? 1 + wave * 0.07 : undefined} glow={1 + wave * 0.08} transitionMs={400} />
      <p key={step} aria-live="polite" className="animate-fade-up min-h-[6rem] max-w-md text-center text-2xl font-medium text-balance">
        {STEPS[step]}
      </p>
      <div className="w-full max-w-xs space-y-2 text-center">
        <Progress value={t.elapsed / TOTAL} />
        <p className="text-sm text-muted tabular-nums">{t.running ? `Quedan ${fmt(t.remaining)}` : "En pausa"}</p>
      </div>
      <Controls running={t.running} setRunning={t.setRunning} onFinish={onFinish} onExit={onExit} />
    </div>
  );
}
