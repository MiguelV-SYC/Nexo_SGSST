import type { Metadata } from "next"

import { Topbar } from "@/components/organizaciones/Topbar"
import { Hero, type HeroKpi } from "@/components/organizaciones/Hero"
import { SycBanner } from "@/components/calidad/SycBanner"
import { NormasTable } from "@/components/calidad/NormasTable"
import {
  normasCalidad,
  type PrioridadNorma,
} from "@/lib/data/calidad-normas"
import { Task01Icon, Alert01Icon, ScaleIcon, InformationCircleIcon } from "@hugeicons/core-free-icons"

export const metadata: Metadata = {
  title: "SYC · Calidad | Nexo",
}

function countPrioridad(prioridad: PrioridadNorma) {
  return normasCalidad.filter((n) => n.prioridad === prioridad).length
}

const kpis: HeroKpi[] = [
  { icon: Task01Icon, value: normasCalidad.length, label: "Normas aplicables" },
  { icon: Alert01Icon, value: countPrioridad("Muy alta"), label: "Prioridad muy alta", danger: true },
  { icon: ScaleIcon, value: countPrioridad("Alta"), label: "Prioridad alta" },
  { icon: InformationCircleIcon, value: countPrioridad("Condicional"), label: "Condicionales" },
]

export default function CalidadSycPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Topbar logoutHref="/loginquality" />
      <Hero
        title={
          <>
            ¡Bienvenido a <span className="text-[#2CA6A4]">Nexo</span>, Miguel
            Angel!
          </>
        }
        subtitle="Desde aquí puedes revisar el marco normativo de calidad aplicable, su prioridad de implementación y el avance del Sistema de Gestión de Calidad de Sistemas y Computadores."
        kpiTitle="Cumplimiento normativo"
        kpis={kpis}
      />

      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-10 pb-[50px]">
        <SycBanner />
        <NormasTable />
      </div>

      <footer className="p-[26px] text-center text-[11px] text-[#6B7280]">
        © {new Date().getFullYear()} Nexo Calidad. Todos los derechos
        reservados.
      </footer>
    </div>
  )
}
