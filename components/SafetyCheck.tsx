"use client";
import Link from "next/link";
import { useState } from "react";
import { EmergencyButton } from "./SupportResources";
import { Title, btn } from "./ui";

export default function SafetyCheck({ question, steps, onContinue }: { question: string; steps: string[]; onContinue: () => void }) {
  const [danger, setDanger] = useState(false);

  if (!danger)
    return (
      <div className="space-y-8">
        <Title sub="Respondé con honestidad, sin juicio.">{question}</Title>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className={btn.soft} onClick={() => setDanger(true)}>Sí</button>
          <button type="button" className={btn.soft} onClick={onContinue}>No</button>
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <Title sub="Antes de seguir, lo primero es que vos y los demás estén a salvo.">Primero, tomá distancia</Title>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 rounded-2xl bg-white/60 px-4 py-3">
            <span className="text-lg font-semibold text-[#3f62c4]">{i + 1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <EmergencyButton />
      <div className="flex flex-col items-center gap-2 pt-2">
        <button type="button" className={btn.soft} onClick={onContinue}>Ya me alejé, seguir</button>
        <Link href="/apoyo" className={btn.ghost}>Ver líneas de ayuda</Link>
      </div>
    </div>
  );
}
