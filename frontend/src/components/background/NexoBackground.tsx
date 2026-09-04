import { NetworkCanvas } from "@/components/background/NetworkCanvas"
import { DigitalWave } from "@/components/background/DigitalWave"

// Fondo animado del login: gradiente institucional + red de nodos (NetworkCanvas)
// + ola de datos inferior (DigitalWave). No es un Client Component: delega toda
// interactividad/canvas a sus hijos, que sí llevan "use client".
export function NexoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_80%_15%,#0B4F6C,#08344A_65%)]">
      <DigitalWave />
      <NetworkCanvas />
    </div>
  )
}
