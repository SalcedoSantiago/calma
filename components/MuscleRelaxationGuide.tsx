"use client";
import { useState } from "react";
import { Controls, Progress } from "./ui";
import { fmt, useOnDone, useTimer } from "@/lib/useTimer";

type Zone = "hombros" | "manos" | "brazos" | "mandibula" | "rostro" | "piernas";
const PER = 30; // 6 zonas × 30 s ≈ 3 minutos
const ZONES: { id: Zone; name: string; tense: string }[] = [
  { id: "hombros", name: "los hombros", tense: "Subí los hombros hacia las orejas, con suavidad." },
  { id: "manos", name: "las manos", tense: "Cerrá las manos en un puño, sin apretar fuerte." },
  { id: "brazos", name: "los brazos", tense: "Doblá los brazos y tensá un poco los músculos." },
  { id: "mandibula", name: "la mandíbula", tense: "Juntá los dientes apenas, sin forzar." },
  { id: "rostro", name: "el rostro", tense: "Fruncí suavemente la frente y los ojos." },
  { id: "piernas", name: "las piernas", tense: "Estirá las piernas y llevá las puntas de los pies hacia vos." },
];

function Body({ active }: { active: Zone }) {
  const f = (z: Zone) => (z === active ? "rgba(142,187,255,.95)" : "rgba(255,255,255,.55)");
  const s = (z: Zone) => (z === active ? "#6f97ec" : "rgba(255,255,255,.9)");
  return (
    <svg viewBox="0 0 120 220" className="mx-auto h-64 drop-shadow-[0_10px_30px_rgba(120,140,220,.35)]" aria-hidden>
      <circle cx="60" cy="28" r="18" fill="rgba(255,255,255,.5)" stroke="white" />
      <ellipse cx="60" cy="23" rx="12" ry="8" fill={f("rostro")} stroke={s("rostro")} className="transition-all duration-700" />
      <path d="M47 35 Q60 50 73 35" fill="none" stroke={s("mandibula")} strokeWidth={active === "mandibula" ? 5 : 2} strokeLinecap="round" className="transition-all duration-700" />
      <rect x="40" y="56" width="40" height="72" rx="18" fill="rgba(255,255,255,.45)" stroke="white" />
      <path d="M30 64 Q60 48 90 64" fill="none" stroke={f("hombros")} strokeWidth="10" strokeLinecap="round" className="transition-all duration-700" />
      <rect x="20" y="66" width="12" height="58" rx="6" fill={f("brazos")} stroke={s("brazos")} className="transition-all duration-700" />
      <rect x="88" y="66" width="12" height="58" rx="6" fill={f("brazos")} stroke={s("brazos")} className="transition-all duration-700" />
      <circle cx="26" cy="133" r="7" fill={f("manos")} stroke={s("manos")} className="transition-all duration-700" />
      <circle cx="94" cy="133" r="7" fill={f("manos")} stroke={s("manos")} className="transition-all duration-700" />
      <rect x="43" y="130" width="15" height="82" rx="7" fill={f("piernas")} stroke={s("piernas")} className="transition-all duration-700" />
      <rect x="62" y="130" width="15" height="82" rx="7" fill={f("piernas")} stroke={s("piernas")} className="transition-all duration-700" />
    </svg>
  );
}

function Running({ tension, onFinish, onExit }: { tension: boolean; onFinish: () => void; onExit: () => void }) {
  const total = ZONES.length * PER;
  const t = useTimer(total);
  const [skip, setSkip] = useState(0); // segundos saltados por zonas incómodas
  const elapsed = Math.min(total, t.elapsed + skip);
  useOnDone(elapsed >= total, onFinish);

  const i = Math.min(ZONES.length - 1, Math.floor(elapsed / PER));
  const z = ZONES[i];
  const inZone = elapsed - i * PER;
  const cue = !tension
    ? `Llevá la atención a ${z.name}. Con cada exhalación, dejá que esa zona se afloje un poco más.`
    : inZone < 6
      ? z.tense
      : inZone < 22
        ? `Soltá. Dejá que esa zona se afloje y notá la diferencia.`
        : "Respirá con calma antes de seguir.";

  return (
    <div className="flex flex-col items-center gap-6">
      <Body active={z.id} />
      <p className="text-sm font-semibold tracking-wide text-muted uppercase">
        {i + 1} de {ZONES.length} · {z.name}
      </p>
      <p aria-live="polite" className="min-h-[5rem] max-w-md text-center text-2xl font-medium text-balance">{cue}</p>
      <div className="w-full max-w-xs space-y-2 text-center">
        <Progress value={elapsed / total} />
        <p className="text-sm text-muted tabular-nums">{t.running ? `Quedan ${fmt(total - elapsed)}` : "En pausa"}</p>
      </div>
      <Controls running={t.running} setRunning={t.setRunning} onFinish={onFinish} onExit={onExit} />
      <p className="text-center text-sm text-muted">
        Siempre sin dolor. Si algún movimiento te incomoda,{" "}
        <button type="button" className="underline underline-offset-4 hover:text-ink" onClick={() => setSkip(skip + (PER - inZone))}>
          saltá esta zona
        </button>
        .
      </p>
    </div>
  );
}

export default function MuscleRelaxationGuide(p: { onFinish: () => void; onExit: () => void }) {
  return <Running tension {...p} />;
}
