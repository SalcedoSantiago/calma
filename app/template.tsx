// Se vuelve a montar en cada navegación: transición suave entre pantallas.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}
