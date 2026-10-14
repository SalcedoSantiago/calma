import Link from "next/link";
import SupportResources from "@/components/SupportResources";
import { Title, btn } from "@/components/ui";

export default function Page() {
  return (
    <div className="space-y-8">
      <Title sub="Pedir ayuda es una forma de cuidarte, no un fracaso.">Buscar apoyo</Title>
      <SupportResources />
      <div className="text-center">
        <Link href="/" className={btn.soft}>Volver al inicio</Link>
      </div>
    </div>
  );
}
