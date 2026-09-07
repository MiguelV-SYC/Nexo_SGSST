import { HugeiconsIcon } from "@hugeicons/react"
import {
  GridViewIcon,
  File02Icon,
  Clock01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons"

import { NetworkCanvas } from "@/components/background/NetworkCanvas"
import { DigitalWave } from "@/components/background/DigitalWave"

const kpis = [
  { icon: GridViewIcon, value: 4, label: "Organizaciones" },
  { icon: File02Icon, value: 248, label: "Documentos" },
  { icon: Clock01Icon, value: 12, label: "Pendientes" },
  {
    icon: AlertCircleIcon,
    value: 4,
    label: "Alertas activas",
    danger: true,
  },
]

export function Hero({ userName }: { userName: string }) {
  return (
    <div className="relative grid grid-cols-1 items-center gap-6 overflow-hidden px-10 pt-12 pb-10 lg:grid-cols-[1.4fr_1fr]">
      {/* capa inferior: ola de partículas / flow field, en el verde de marca */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.45]">
        <DigitalWave coreColor={[44, 166, 164]} edgeColor={[14, 92, 79]} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[62%] opacity-[0.55]">
        <NetworkCanvas />
      </div>

      <div className="relative z-10">
        <h1 className="font-heading text-[30px] font-bold text-[#08344A]">
          ¡Bienvenido a <span className="text-[#2CA6A4]">Nexo</span>, {userName}!
        </h1>
        <p className="mt-2.5 max-w-[46ch] text-sm leading-relaxed text-[#6B7280]">
          Desde aquí puedes acceder y gestionar los Sistemas de Gestión de
          Seguridad y Salud en el Trabajo de cada una de tus organizaciones.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-[280px] justify-self-end rounded-2xl border border-[#E5E9EE] bg-white px-5 py-[22px] shadow-[0_8px_24px_rgba(11,79,108,0.06)]">
        <div className="mb-3.5 font-heading text-sm font-bold text-[#08344A]">
          Resumen general
        </div>
        {kpis.map((kpi, i) => (
          <div
            key={kpi.label}
            className={
              "flex items-center gap-2.5 py-2" +
              (i > 0 ? " border-t border-[#E5E9EE]" : "")
            }
          >
            <div
              className={
                "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#F5F7FA] " +
                (kpi.danger ? "text-[#D32F2F]" : "text-[#0B4F6C]")
              }
            >
              <HugeiconsIcon icon={kpi.icon} size={14} />
            </div>
            <span className="min-w-7 font-heading text-[15px] font-bold text-[#08344A]">
              {kpi.value}
            </span>
            <span className="text-[12.5px] text-[#6B7280]">{kpi.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
