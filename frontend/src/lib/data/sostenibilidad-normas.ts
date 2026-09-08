export type NaturalezaNorma =
  | "Legal obligatorio"
  | "Reglamentario obligatorio"
  | "Obligación condicionada"
  | "Norma técnica voluntaria"
  | "Estándar de referencia"
  | "Marco de sostenibilidad"

export type GrupoNorma = "Obligatoria" | "Condicionada" | "Voluntaria"

export interface NormaAmbiental {
  naturaleza: NaturalezaNorma
  ejemplo: string
  grupo: GrupoNorma
}

// Fuente: matriz legal ambiental compartida por el usuario para maquetar
// esta vista (referencia simplificada, no el marco normativo completo).
export const normasAmbientales: NormaAmbiental[] = [
  { naturaleza: "Legal obligatorio", ejemplo: "Ley 1672 de 2013", grupo: "Obligatoria" },
  { naturaleza: "Reglamentario obligatorio", ejemplo: "Decreto 1076 de 2015", grupo: "Obligatoria" },
  { naturaleza: "Obligación condicionada", ejemplo: "Resolución 631 de 2015", grupo: "Condicionada" },
  { naturaleza: "Norma técnica voluntaria", ejemplo: "ISO 14001", grupo: "Voluntaria" },
  { naturaleza: "Estándar de referencia", ejemplo: "ISO 14031", grupo: "Voluntaria" },
  { naturaleza: "Marco de sostenibilidad", ejemplo: "ISO 59004", grupo: "Voluntaria" },
]

export function countGrupo(grupo: GrupoNorma): number {
  return normasAmbientales.filter((n) => n.grupo === grupo).length
}
