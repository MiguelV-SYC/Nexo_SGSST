import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

// Panel de identidad de la empresa. A diferencia de la grilla de tarjetas de
// SST (varias organizaciones), acá solo hay una: SYC. En vez de forzar una
// tarjeta cuadrada sola en una grilla, se usa un formato horizontal ancho,
// pensado para un único registro.
export function SycBanner() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-[#E5E9EE] bg-white px-7 py-6 shadow-[0_8px_24px_rgba(11,79,108,0.06)] sm:flex-row sm:items-center">
      <div className="relative h-14 w-32 shrink-0">
        <Image
          src="/org-syc.jpg"
          alt="SYC"
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>

      <div className="h-px w-full bg-[#E5E9EE] sm:h-10 sm:w-px" />

      <div className="flex-1 text-center sm:text-left">
        <div className="font-heading text-base font-bold text-[#08344A]">
          Sistemas y Computadores (SYC)
        </div>
        <p className="mt-0.5 text-[12.5px] text-[#6B7280]">
          Sistema de Gestión de Calidad activo · última actualización de la
          matriz normativa: 2026.
        </p>
      </div>

      <span className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#0B4F6C]">
        Ingresar al sistema
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
      </span>
    </div>
  )
}
