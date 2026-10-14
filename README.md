# Pausa

Aplicación web de autorregulación ante impulsos. **No es un tratamiento** ni reemplaza la atención profesional.

```bash
npm install
npm run dev   # http://localhost:3000
```

En línea: https://salcedosantiago.github.io/calma/

Para publicar cambios (arma el sitio y lo sube a la rama `gh-pages`):

```bash
npm run deploy
```

## Recorrido (en `/`)

Al empezar se elige una vez: **Piromanía** (impulso de encender fuego) o **Cleptomanía** (impulso de tomar objetos).
Después, un solo camino con textos propios de cada uno:

1. Reconocer: la tensión que crece y el ciclo del impulso (tensión → impulso → acto → alivio breve → culpa).
2. Tomar distancia: pregunta concreta (fuego cerca / estar en un comercio) y, si es "Sí", qué hacer primero.
3. Respirar (1 min) · 4. Observar el impulso (90 s) · 5. Relajación muscular (3 min) · Cierre.

El contenido de cada camino está en `lib/content.ts` (`PATHS`).

## Datos

Versión para muestra: no guarda nada, no tiene cuentas ni analítica. Lo que se completa se pierde al salir de la pantalla.
Los números de ayuda están en `lib/content.ts`: verificarlos en fuentes oficiales antes de la muestra.
