import type { Metadata } from "next"

import { Topbar } from "@/components/organizaciones/Topbar"
import { Hero, type HeroKpi } from "@/components/organizaciones/Hero"
import { SycCardAmbiental } from "@/components/sostenibilidad/SycCardAmbiental"
import { NormasAmbientalesTable } from "@/components/sostenibilidad/NormasAmbientalesTable"
import { normasAmbientales, countGrupo } from "@/lib/data/sostenibilidad-normas"
import { LeafIcon, Alert01Icon, GlobeIcon, RecycleIcon } from "@hugeicons/core-free-icons"

export const metadata: Metadata = {
  title: "SYC · Sostenibilidad | Nexo",
}

const kpis: HeroKpi[] = [
  { icon: LeafIcon, value: normasAmbientales.length, label: "Normas identificadas" },
  { icon: Alert01Icon, value: countGrupo("Obligatoria"), label: "Obligatorias", danger: true },
  { icon: GlobeIcon, value: countGrupo("Condicionada"), label: "Condicionadas" },
  { icon: RecycleIcon, value: countGrupo("Voluntaria"), label: "Voluntarias" },
]

export default function SostenibilidadSycPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Topbar logoutHref="/loginsostenibilidad" />
      <Hero
        title={
          <>
            ¡Bienvenido a <span className="text-[#2CA6A4]">Nexo</span>, Miguel
            Angel!
          </>
        }
        subtitle="Desde aquí puedes revisar el marco normativo ambiental aplicable y el avance del Sistema de Gestión Ambiental de Sistemas y Computadores."
        kpiTitle="Resumen ambiental"
        kpis={kpis}
      />

      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-10 pb-[50px] lg:flex-row lg:items-start">
        <SycCardAmbiental />
        <div className="flex-1">
          <NormasAmbientalesTable />
        </div>
      </div>

      <footer className="p-[26px] text-center text-[11px] text-[#6B7280]">
        © {new Date().getFullYear()} Nexo Sostenibilidad. Todos los derechos
        reservados.
      </footer>
    </div>
  )
}
