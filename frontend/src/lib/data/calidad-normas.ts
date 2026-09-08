export type PrioridadNorma = "Muy alta" | "Alta" | "Media/Alta" | "Media" | "Condicional"

export interface NormaCalidad {
  numero: number
  norma: string
  tipo: string
  ambito: string
  dimension: string
  prioridad: PrioridadNorma
}

// Fuente: Matriz_Normatividad_Calidad_Sistemas_y_Computadores.pdf
export const normasCalidad: NormaCalidad[] = [
  { numero: 1, norma: "ISO 9001:2015 / ISO 9001:2026", tipo: "Norma internacional", ambito: "Gestión de calidad", dimension: "Gestión de calidad general", prioridad: "Alta" },
  { numero: 2, norma: "ISO/IEC 25010:2023", tipo: "Norma internacional", ambito: "Calidad de productos software/TIC", dimension: "Calidad del software", prioridad: "Muy alta" },
  { numero: 3, norma: "ISO/IEC 20000-1:2018", tipo: "Norma internacional", ambito: "Gestión de servicios TI", dimension: "Calidad del servicio tecnológico", prioridad: "Alta" },
  { numero: 4, norma: "ISO/IEC 27001:2022", tipo: "Norma internacional", ambito: "Seguridad de información", dimension: "Seguridad y gestión de riesgos", prioridad: "Muy alta" },
  { numero: 5, norma: "Ley 1581 de 2012", tipo: "Ley colombiana", ambito: "Protección de datos personales", dimension: "Privacidad y protección de datos", prioridad: "Muy alta" },
  { numero: 6, norma: "Decreto 1074 de 2015", tipo: "Decreto", ambito: "Protección de datos", dimension: "Tratamiento de datos personales", prioridad: "Alta" },
  { numero: 7, norma: "Ley 1273 de 2009", tipo: "Ley colombiana", ambito: "Delitos informáticos", dimension: "Seguridad informática", prioridad: "Alta" },
  { numero: 8, norma: "Ley 23 de 1982", tipo: "Ley colombiana", ambito: "Derechos de autor", dimension: "Propiedad intelectual y contenidos", prioridad: "Muy alta" },
  { numero: 9, norma: "Ley 44 de 1993", tipo: "Ley colombiana", ambito: "Derechos de autor", dimension: "Gestión de derechos de autor", prioridad: "Alta" },
  { numero: 10, norma: "Ley 1915 de 2018", tipo: "Ley colombiana", ambito: "Derechos de autor", dimension: "Gestión y explotación digital de obras", prioridad: "Alta" },
  { numero: 11, norma: "Ley 1618 de 2013", tipo: "Ley colombiana", ambito: "Accesibilidad", dimension: "Accesibilidad de servicios y TIC", prioridad: "Alta" },
  { numero: 12, norma: "Resolución MinTIC 1519 de 2020", tipo: "Resolución", ambito: "Accesibilidad / seguridad / contenidos web", dimension: "Accesibilidad y calidad web", prioridad: "Media/Alta" },
  { numero: 13, norma: "WCAG 2.1 – nivel AA", tipo: "Estándar técnico", ambito: "Accesibilidad web", dimension: "UX y accesibilidad web", prioridad: "Alta" },
  { numero: 14, norma: "ISO/IEC 27002:2022", tipo: "Norma técnica", ambito: "Controles de seguridad", dimension: "Controles técnicos de seguridad", prioridad: "Alta" },
  { numero: 15, norma: "ISO/IEC 29119", tipo: "Norma internacional", ambito: "Pruebas de software", dimension: "Testing y aseguramiento de calidad", prioridad: "Alta" },
  { numero: 16, norma: "ISO/IEC 12207", tipo: "Norma internacional", ambito: "Ciclo de vida del software", dimension: "Procesos de desarrollo y mantenimiento", prioridad: "Alta" },
  { numero: 17, norma: "ISO/IEC 15288", tipo: "Norma internacional", ambito: "Ciclo de vida de sistemas", dimension: "Gestión del ciclo de vida de sistemas", prioridad: "Media" },
  { numero: 18, norma: "ISO/IEC 25012", tipo: "Norma internacional", ambito: "Calidad de datos", dimension: "Calidad de datos", prioridad: "Alta" },
  { numero: 19, norma: "ISO 19011", tipo: "Norma internacional", ambito: "Auditoría", dimension: "Auditoría de sistemas de gestión", prioridad: "Alta" },
  { numero: 20, norma: "Ley 527 de 1999", tipo: "Ley colombiana", ambito: "Comercio electrónico / mensajes de datos", dimension: "Gestión de información y evidencias digitales", prioridad: "Media" },
  { numero: 21, norma: "Ley 594 de 2000", tipo: "Ley colombiana", ambito: "Gestión documental", dimension: "Gestión y conservación documental", prioridad: "Media/Alta" },
  { numero: 22, norma: "Ley 1712 de 2014", tipo: "Ley colombiana", ambito: "Transparencia / información pública", dimension: "Transparencia y acceso a información", prioridad: "Condicional" },
  { numero: 23, norma: "Resolución MinTIC 2277 de 2025", tipo: "Resolución", ambito: "Seguridad y privacidad", dimension: "Seguridad y privacidad en proyectos públicos", prioridad: "Condicional" },
  { numero: 24, norma: "MSPI – MinTIC", tipo: "Modelo gubernamental", ambito: "Seguridad y privacidad", dimension: "Gestión de seguridad y privacidad", prioridad: "Condicional" },
]

export const PRIORIDAD_ORDER: PrioridadNorma[] = [
  "Muy alta",
  "Alta",
  "Media/Alta",
  "Media",
  "Condicional",
]

export const PRIORIDAD_STYLES: Record<PrioridadNorma, { badge: string; border: string }> = {
  "Muy alta": { badge: "bg-[#FDECEC] text-[#B71C1C]", border: "border-l-[#D32F2F]" },
  Alta: { badge: "bg-[#E7ECFB] text-[#2436A6]", border: "border-l-[#2436A6]" },
  "Media/Alta": { badge: "bg-[#FFF6E0] text-[#8A5A00]", border: "border-l-[#F9A825]" },
  Media: { badge: "bg-[#EEF1F5] text-[#4B5563]", border: "border-l-[#9CA5B0]" },
  Condicional: { badge: "bg-transparent text-[#6B7280] ring-1 ring-inset ring-[#C7CDD6]", border: "border-l-[#C7CDD6]" },
}

export function sortByPrioridad(normas: NormaCalidad[]): NormaCalidad[] {
  return [...normas].sort(
    (a, b) => PRIORIDAD_ORDER.indexOf(a.prioridad) - PRIORIDAD_ORDER.indexOf(b.prioridad)
  )
}
