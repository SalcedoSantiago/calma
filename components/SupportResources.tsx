"use client";
import { useEffect, useState } from "react";
import { Phone, ShieldCheck } from "lucide-react";
import { COUNTRIES, guessCountry, tel } from "@/lib/content";
import { btn } from "./ui";

/** País según el idioma del navegador (se resuelve después de montar para evitar desajustes de hidratación). */
function useCountry() {
  const [code, setCode] = useState("AR");
  useEffect(() => setCode(guessCountry()), []);
  return [code, setCode] as const;
}

export function EmergencyButton() {
  const c = COUNTRIES[useCountry()[0]];
  return (
    <a href={tel(c.emergency)} className={`${btn.primary} w-full`}>
      <Phone size={18} aria-hidden /> Llamar a emergencias ({c.emergency})
    </a>
  );
}

export default function SupportResources() {
  const [code, setCode] = useCountry();
  const c = COUNTRIES[code];
  return (
    <div className="space-y-5">
      <section className="glass space-y-3 rounded-3xl p-5">
        <h2 className="flex items-center gap-2 font-semibold"><ShieldCheck size={18} aria-hidden /> Si hay peligro inmediato</h2>
        <p className="text-muted">
          Alejate de lo que pueda causar daño y llamá a los servicios de emergencia. Esta aplicación no está atendida por personas
          y no puede responder a una crisis.
        </p>
        <a href={tel(c.emergency)} className={`${btn.primary} w-full`}>
          <Phone size={18} aria-hidden /> Llamar a emergencias ({c.emergency})
        </a>
      </section>

      <section className="glass space-y-3 rounded-3xl p-5">
        <h2 className="font-semibold">Líneas de ayuda · {c.name}</h2>
        {c.lines.length ? (
          <ul className="space-y-2">
            {c.lines.map((l) => (
              <li key={l.label}>
                <a href={tel(l.number)} className="flex items-baseline justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3 hover:bg-white/80">
                  <span>
                    {l.label}
                    {l.note && <span className="block text-sm text-muted">{l.note}</span>}
                  </span>
                  <span className="font-semibold tabular-nums">{l.number}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            Podés buscar líneas de ayuda de tu país en{" "}
            <a className="underline" href="https://findahelpline.com" target="_blank" rel="noreferrer">findahelpline.com</a>.
          </p>
        )}
        <label className="flex items-center justify-between gap-3 text-sm text-muted">
          País
          <select value={code} onChange={(e) => setCode(e.target.value)} className="glass rounded-full px-4 py-2 text-ink">
            {Object.entries(COUNTRIES).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </label>
        <p className="text-xs text-muted">Los números pueden cambiar: confirmalos en fuentes oficiales de tu país.</p>
      </section>

      <section className="glass space-y-2 rounded-3xl p-5">
        <h2 className="font-semibold">Acompañamiento profesional</h2>
        <p className="text-muted">
          Estas herramientas pueden complementar, pero no reemplazan, la atención psicológica o psiquiátrica. Si los impulsos se
          repiten o te preocupan, hablarlo con un profesional de salud mental puede ayudarte a encontrar un tratamiento a tu medida.
          También podés apoyarte en una persona de confianza.
        </p>
      </section>
    </div>
  );
}
