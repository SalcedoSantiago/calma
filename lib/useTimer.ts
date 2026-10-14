"use client";
import { useEffect, useRef, useState } from "react";

/** Temporizador real basado en el reloj (no se desfasa si el navegador frena los intervalos). */
export function useTimer(total: number) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    let last = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const dt = (now - last) / 1000; // calcular antes: el updater de React puede correr después
      last = now;
      setElapsed((e) => Math.min(total, e + dt));
    }, 200);
    return () => clearInterval(id);
  }, [running, total]);

  return { elapsed, running, setRunning, done: elapsed >= total, remaining: Math.max(0, total - elapsed) };
}

export const fmt = (s: number) => {
  const t = Math.ceil(s);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};

/** Llama a `cb` una sola vez cuando `done` pasa a true. */
export function useOnDone(done: boolean, cb: () => void) {
  const fired = useRef(false);
  const latest = useRef(cb);
  latest.current = cb;
  useEffect(() => {
    if (done && !fired.current) {
      fired.current = true;
      latest.current();
    }
  }, [done]);
}
