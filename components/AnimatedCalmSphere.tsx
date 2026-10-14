// Núcleo de calma: esfera luminosa con anillos translúcidos que orbitan lentamente.
// Sin `scale` respira sola (ciclo de 10 s); con `scale` la controla un ejercicio.
const OUTER = [
  { inset: -6, x: -7, y: 2, d: 140 },
  { inset: 0, x: 6, y: -3, d: 170 },
  { inset: 6, x: -3, y: 5, d: 120 },
  { inset: 12, x: 5, y: 3, d: 200 },
];
const INNER = [
  { inset: 26, x: 3, y: -2, d: 60 },
  { inset: 30, x: -4, y: 2, d: 80 },
  { inset: 34, x: 2, y: 4, d: 70 },
  { inset: 40, x: 0, y: 0, d: 90 },
];

function Rings({ rings }: { rings: typeof OUTER }) {
  return rings.map((r, i) => (
    <div key={i} className="absolute inset-0" style={{ animation: `orbit ${r.d}s linear infinite ${i % 2 ? "reverse" : ""}` }}>
      <div
        className="absolute rounded-full border border-white/70"
        style={{ inset: `${r.inset}%`, transform: `translate(${r.x}%, ${r.y}%)` }}
      />
    </div>
  ));
}

export default function AnimatedCalmSphere({
  scale,
  transitionMs = 1500,
  glow = 1,
  className = "w-[min(70vw,320px)]",
}: {
  scale?: number;
  transitionMs?: number;
  glow?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={`relative mx-auto aspect-square ${className}`}>
      <div
        className={`absolute -inset-[18%] rounded-full blur-3xl ${scale === undefined ? "animate-breathe-glow" : ""}`}
        style={{ background: "radial-gradient(circle, rgba(142,187,255,.55), rgba(216,197,240,.45) 45%, transparent 70%)" }}
      />
      <div
        className="absolute inset-[2%] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, transparent 38%, rgba(196,160,238,.75) 55%, rgba(240,216,235,.35) 68%, transparent 75%)" }}
      />
      <Rings rings={OUTER} />
      <div className={scale === undefined ? "animate-breathe absolute inset-0" : "absolute inset-0"}>
        <div
          className="calm-core absolute inset-0"
          style={{
            transform: `scale(${scale ?? 1})`,
            filter: `brightness(${glow})`,
            transition: `transform ${transitionMs}ms ease-in-out, filter ${transitionMs}ms ease-in-out`,
          }}
        >
          <div
            className="absolute inset-[18%] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #8fc0f5 0, #79aaf0 45%, #6693ea 75%, #7d88e6 100%)",
              boxShadow: "0 0 90px 10px rgba(142,187,255,.55), inset 0 0 50px rgba(255,255,255,.35)",
            }}
          />
          <div
            className="absolute inset-[27%] translate-x-[7%] translate-y-[3%] rounded-full"
            style={{ background: "radial-gradient(circle at 40% 45%, rgba(170,214,252,.95), rgba(130,190,245,.9) 60%, rgba(150,200,250,.4) 100%)" }}
          />
          <Rings rings={INNER} />
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_8px_rgba(255,255,255,.95),0_0_60px_24px_rgba(240,216,235,.7)]" />
        </div>
      </div>
    </div>
  );
}
