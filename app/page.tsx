"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import AnimatedCalmSphere from "@/components/AnimatedCalmSphere";
import BreathingExercise from "@/components/BreathingExercise";
import MuscleRelaxationGuide from "@/components/MuscleRelaxationGuide";
import SafetyCheck from "@/components/SafetyCheck";
import UrgeSurfingGuide from "@/components/UrgeSurfingGuide";
import { Title, btn } from "@/components/ui";
import { PATHS, type PathId } from "@/lib/content";

// Un único camino por impulso: cada paso lleva al siguiente y termina en la relajación.
const STEPS = [
  { id: "reconocer", label: "Reconocer" },
  { id: "seguridad", label: "Tomar distancia" },
  { id: "respirar", label: "Respirar · 1 min" },
  { id: "observar", label: "Observar el impulso · 90 s" },
  { id: "relajar", label: "Relajar el cuerpo · 3 min" },
] as const;

/** El ciclo del impulso, con la pausa en el primer eslabón. */
function Cycle({ items }: { items: string[] }) {
  return (
    <ol className="mx-auto w-full max-w-sm space-y-1">
      {items.map((item, n) => (
        <li key={item} className="flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-2xl px-4 py-3 text-center ${
              n === 0 ? "bg-sky/60 font-semibold shadow-[0_8px_24px_-12px_rgba(90,120,220,.8)]" : "bg-white/55 text-muted"
            }`}
          >
            {item}
            {n === 0 && <span className="block text-sm font-medium text-ink">Acá podés hacer una pausa</span>}
          </div>
          {n < items.length - 1 && <ArrowDown size={16} className="text-muted" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

export default function Home() {
  const [pathId, setPathId] = useState<PathId | null>(null);
  const [i, setI] = useState(0); // 0..4 pasos · 5 cierre
  const go = (n: number) => {
    setI(n);
    window.scrollTo({ top: 0 });
  };
  const next = () => go(i + 1);
  const restart = () => {
    setPathId(null);
    go(0);
  };

  if (!pathId)
    return (
      <div className="flex flex-col items-center gap-10 text-center">
        <Title sub="Un recorrido guiado de unos 6 minutos para atravesar el impulso sin actuar sobre él.">
          Podés hacer una pausa antes de actuar.
        </Title>
        <AnimatedCalmSphere />
        <div className="grid w-full max-w-md gap-3">
          {(Object.keys(PATHS) as PathId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPathId(id)}
              className="glass group flex items-center justify-between gap-4 rounded-3xl px-6 py-4 text-left transition hover:-translate-y-0.5 hover:bg-white/75"
            >
              <span>
                <span className="block text-sm font-semibold tracking-wide text-muted uppercase">{PATHS[id].name}</span>
                <span className="block font-semibold">{PATHS[id].button}</span>
              </span>
              <ArrowRight size={18} className="shrink-0 transition group-hover:translate-x-1" aria-hidden />
            </button>
          ))}
        </div>
        <p className="max-w-sm text-sm text-muted">
          CALMA es una herramienta de apoyo. No es un tratamiento ni reemplaza la atención de profesionales de salud mental.
        </p>
      </div>
    );

  const path = PATHS[pathId];
  const step = STEPS[i]?.id;

  if (!step)
    return (
      <div className="flex flex-col items-center gap-10 text-center">
        <Title sub="No hace falta que todo esté resuelto. Quedate respirando con la esfera el tiempo que quieras.">
          Terminaste esta pausa.
        </Title>
        <AnimatedCalmSphere />
        <p className="max-w-sm text-xl font-medium text-balance">{path.closing}</p>
        <p className="max-w-sm text-muted">
          Si {path.urge} se repite, hablarlo con un profesional de salud mental puede ayudarte. Tiene tratamiento.
        </p>
        <div className="flex flex-col items-center gap-2">
          <button type="button" className={btn.soft} onClick={restart}>Volver al inicio</button>
          <Link href="/apoyo" className={btn.ghost}>Buscar apoyo</Link>
        </div>
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <ol className="flex justify-center gap-1.5" aria-hidden>
          {STEPS.map((s, n) => (
            <li key={s.id} className={`h-1.5 rounded-full transition-all ${n <= i ? "w-8 bg-sky" : "w-4 bg-white/70"}`} />
          ))}
        </ol>
        <p className="text-sm font-semibold tracking-wide text-muted uppercase">
          {path.name} · Paso {i + 1} de {STEPS.length} · {STEPS[i].label}
        </p>
      </div>

      {step === "reconocer" && (
        <div className="flex flex-col items-center gap-8 text-center">
          <Title sub={path.recognize}>Notá la tensión que está creciendo.</Title>
          <Cycle items={path.cycle} />
          <p className="max-w-sm text-xl font-medium text-balance">Un impulso es una experiencia, no una obligación.</p>
          <button type="button" className={btn.primary} onClick={next}>
            Continuar <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      )}
      {step === "seguridad" && <SafetyCheck question={path.safetyQuestion} steps={path.safetySteps} onContinue={next} />}
      {step === "respirar" && <BreathingExercise hint={path.breathHint} onFinish={next} onExit={restart} />}
      {step === "observar" && <UrgeSurfingGuide steps={path.observe} onFinish={next} onExit={restart} />}
      {step === "relajar" && <MuscleRelaxationGuide onFinish={next} onExit={restart} />}
    </div>
  );
}
