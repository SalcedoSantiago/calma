export type PathId = "fuego" | "objetos";

export type Path = {
  name: string; // nombre clínico, para la muestra
  button: string;
  urge: string; // cómo se nombra el impulso en las frases
  recognize: string;
  cycle: string[]; // el primer elemento es donde actúa la pausa
  safetyQuestion: string;
  safetySteps: string[];
  breathHint: string;
  observe: string[];
  closing: string;
};

// Contenido basado en las características descritas en el DSM-5: tensión o excitación creciente
// antes del acto y placer, gratificación o alivio al realizarlo. No es material diagnóstico.
export const PATHS: Record<PathId, Path> = {
  fuego: {
    name: "Piromanía",
    button: "Siento el impulso de encender fuego",
    urge: "el impulso de encender fuego",
    recognize:
      "En la piromanía, el impulso suele empezar como una tensión o una excitación que crece, junto con una atracción intensa por el fuego. Darte cuenta de esa tensión es el primer paso.",
    cycle: ["Tensión o excitación que crece", "Atracción por el fuego", "Encender fuego", "Alivio breve", "Culpa, miedo o daño"],
    safetyQuestion: "¿Tenés cerca fósforos, encendedores, velas, combustibles u otra fuente de fuego?",
    safetySteps: [
      "No enciendas nada.",
      "No toques los fósforos ni los encendedores: dejalos donde están y alejate.",
      "Andá a otro ambiente o a un lugar abierto donde no haya nada para encender.",
      "Si ves fuego o humo, salí del lugar y llamá a emergencias.",
      "Avisale a una persona de confianza que necesitás compañía.",
    ],
    breathHint: "Sentí el aire fresco que entra. Dejá que te enfríe por dentro.",
    observe: [
      "Notá la atracción por el fuego. Está acá, y podés mirarla sin seguirla.",
      "Si te resulta cómodo, notá dónde sentís la tensión o la excitación: el pecho, las manos, el estómago.",
      "Observá cómo cambian esas sensaciones, momento a momento, sin hacer nada con ellas.",
      "El alivio que promete el fuego dura poco. El riesgo para vos y para otras personas es real.",
      "La tensión puede bajar, quedarse o subir. Podés sentirla sin encender nada, y pedir ayuda también es válido.",
    ],
    closing: "Sentiste la tensión y elegiste no encender nada. Eso es cuidarte a vos y a los demás.",
  },
  objetos: {
    name: "Cleptomanía",
    button: "Siento el impulso de tomar objetos",
    urge: "el impulso de tomar algo",
    recognize:
      "En la cleptomanía, el impulso suele aparecer como una tensión que crece justo antes de tomar algo que no necesitás ni por su uso ni por su valor. Darte cuenta de esa tensión es el primer paso.",
    cycle: ["Tensión que crece", "Impulso de tomar algo", "Tomar el objeto", "Alivio breve", "Culpa o vergüenza"],
    safetyQuestion: "¿Estás ahora en un comercio, o cerca del objeto que querés tomar?",
    safetySteps: [
      "Si tenés algo en las manos, dejalo en su lugar.",
      "No guardes nada en bolsillos, bolsos ni mochilas.",
      "Salí del local o alejate de ese lugar. Andá a un espacio abierto.",
      "Si estás con alguien, decile que necesitás salir un momento.",
      "Avisale a una persona de confianza cómo te sentís.",
    ],
    breathHint: "Dejá las manos abiertas y quietas mientras respirás.",
    observe: [
      "Notá el impulso de tomar algo. Está acá, y no hace falta obedecerlo.",
      "Si te resulta cómodo, notá dónde sentís la tensión: las manos, el pecho, el estómago.",
      "Observá cómo cambian esas sensaciones, momento a momento, sin hacer nada con ellas.",
      "El alivio que promete el impulso dura poco. Después, muchas veces, llegan la culpa y la vergüenza.",
      "La tensión puede bajar, quedarse o subir. Podés sentirla sin tomar nada, y pedir ayuda también es válido.",
    ],
    closing: "Sentiste la tensión y elegiste no tomar nada. Tus manos pueden descansar vacías.",
  },
};

export type Country = {
  name: string;
  emergency: string;
  lines: { label: string; number: string; note?: string }[];
};

// Verificar periódicamente en fuentes oficiales: los números pueden cambiar.
export const COUNTRIES: Record<string, Country> = {
  AR: {
    name: "Argentina",
    emergency: "911",
    lines: [
      { label: "Emergencias médicas (SAME)", number: "107" },
      { label: "Bomberos", number: "100" },
      { label: "Centro de Asistencia al Suicida", number: "135", note: "Desde CABA y GBA. Resto del país: 0800 345 1435" },
    ],
  },
  UY: { name: "Uruguay", emergency: "911", lines: [{ label: "Línea Vida", number: "0800 0767", note: "También *0767 desde celulares" }] },
  CL: {
    name: "Chile",
    emergency: "131",
    lines: [
      { label: "Bomberos", number: "132" },
      { label: "Carabineros", number: "133" },
      { label: "Salud mental y prevención del suicidio", number: "*4141" },
    ],
  },
  MX: { name: "México", emergency: "911", lines: [{ label: "Línea de la Vida", number: "800 911 2000" }] },
  CO: { name: "Colombia", emergency: "123", lines: [] },
  ES: { name: "España", emergency: "112", lines: [{ label: "Línea de atención a la conducta suicida", number: "024" }] },
  OTRO: { name: "Otro país", emergency: "112", lines: [] },
};

export const guessCountry = () => {
  if (typeof navigator === "undefined") return "AR";
  const region = navigator.language.split("-")[1]?.toUpperCase();
  return region && COUNTRIES[region] ? region : "AR";
};

export const tel = (n: string) => `tel:${n.replace(/[^\d*+]/g, "")}`;
