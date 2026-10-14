"use client";
import { useState } from "react";
import AnimatedCalmSphere from "./AnimatedCalmSphere";
import { Controls, Progress, btn } from "./ui";
import { fmt, useOnDone, useTimer } from "@/lib/useTimer";

// Sin retención: inhalar 4 s, exhalar 6 s (exhalación más larga, sin forzar).
const IN = 4;
const OUT = 6;

export default function BreathingExercise({
  seconds = 60,
  hint: pathHint,
  onFinish,
  onExit,
}: {
  seconds?: number;
  hint: string;
  onFinish: () => void;
  onExit: () => void;
}) {
  const t = useTimer(seconds);
  const [natural, setNatural] = useState(false);
  useOnDone(t.done, onFinish);

  const inhale = t.elapsed % (IN + OUT) < IN;
  const cue = natural ? "Respirá a tu ritmo." : inhale ? "Inhalá suavemente." : "Exhalá sin forzar.";
  const hint = natural
    ? "Sin contar, sin forzar. Solo notá el aire entrar y salir."
    : t.elapsed < 20
      ? "No hace falta respirar profundo."
      : t.elapsed < 40
        ? pathHint
        : "Permití que el aire encuentre su propio ritmo.";

  return (
    <div className="flex flex-col items-center gap-8">
      <AnimatedCalmSphere
        scale={natural || !t.running ? undefined : inhale ? 1.12 : 0.84}
        transitionMs={(inhale ? IN : OUT) * 1000}
      />
      <div className="space-y-2 text-center" aria-live="polite">
        <p className="text-3xl font-medium">{cue}</p>
        <p className="text-muted">{hint}</p>
      </div>
      <div className="w-full max-w-xs space-y-2 text-center">
        <Progress value={t.elapsed / seconds} />
        <p className="text-sm text-muted tabular-nums">{t.running ? `Quedan ${fmt(t.remaining)}` : "En pausa"}</p>
      </div>
      <Controls running={t.running} setRunning={t.setRunning} onFinish={onFinish} onExit={onExit} />
      <button type="button" className={btn.ghost} onClick={() => setNatural(!natural)}>
        {natural ? "Volver a la guía" : "¿Te incomoda? Volver a mi respiración natural"}
      </button>
    </div>
  );
}
