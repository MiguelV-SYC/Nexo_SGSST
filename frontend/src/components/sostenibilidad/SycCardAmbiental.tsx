import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  TaskDone01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { SOST_COLOR } from "@/lib/sostenibilidad-theme"

// Tarjeta única de SYC (todavía no hay más empresas en Sostenibilidad).
// Mantiene el formato vertical con logo centrado del diseño original de SST,
// pero simplificado a solo dos indicadores para no sobrecargar la vista.
export function SycCardAmbiental() {
  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-[#E1EEDB] bg-white px-[22px] pt-[26px] pb-5 shadow-[0_8px_24px_rgba(11,46,19,0.06)]">
      <div className="mb-3.5 flex h-14 items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src="/org-syc.jpg"
            alt="SYC"
            fill
            sizes="220px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="mb-4 text-center font-heading text-base font-bold text-[#0B2E13]">
        SYC
      </div>

      <div className="flex items-center justify-between gap-3 py-[7px] text-[13px]">
        <span className="flex min-w-0 flex-1 items-center gap-2 text-[#6B7280]">
          <HugeiconsIcon
            icon={TaskDone01Icon}
            size={15}
            className="shrink-0"
            style={{ color: SOST_COLOR.heroAccent }}
          />
          <span className="min-w-0">Aplicación del sistema de gestión</span>
        </span>
        <span className="shrink-0 font-semibold text-[#0B2E13]">71%</span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[#EEF1F5] py-[7px] text-[13px]">
        <span className="flex min-w-0 flex-1 items-center gap-2 text-[#6B7280]">
          <HugeiconsIcon
            icon={CheckmarkCircle01Icon}
            size={15}
            className="shrink-0"
            style={{ color: SOST_COLOR.heroAccent }}
          />
          <span className="min-w-0">Nivel de cumplimiento</span>
        </span>
        <span className="shrink-0 font-semibold text-[#0B2E13]">68%</span>
      </div>

      <hr className="mt-3 mb-3.5 border-[#EEF1F5]" />

      <div className="flex items-center justify-between">
        <span
          className="flex items-center gap-1.5 text-sm font-bold"
          style={{ color: SOST_COLOR.forest }}
        >
          Ingresar
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
        </span>
      </div>
    </div>
  )
}
