import { normasAmbientales, type GrupoNorma } from "@/lib/data/sostenibilidad-normas"

const GRUPO_STYLES: Record<GrupoNorma, string> = {
  Obligatoria: "bg-[#FDECEC] text-[#B71C1C]",
  Condicionada: "bg-[#FFF6E0] text-[#8A5A00]",
  Voluntaria: "bg-[#EAF5E4] text-[#2F6B1F]",
}

// Referencia compacta (6 categorías), no la matriz legal completa: alcanza
// para dar contexto sin sobrecargar la vista.
export function NormasAmbientalesTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E1EEDB] bg-white shadow-[0_8px_24px_rgba(11,46,19,0.06)]">
      <div className="border-b border-[#E1EEDB] px-6 py-4">
        <div className="font-heading text-base font-bold text-[#0B2E13]">
          Marco normativo de referencia
        </div>
        <p className="mt-0.5 text-[12.5px] text-[#6B7280]">
          Naturaleza de las normas ambientales aplicables, con un ejemplo por
          categoría.
        </p>
      </div>

      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#E1EEDB] text-left text-[11.5px] tracking-wide text-[#9CA5B0] uppercase">
            <th className="px-6 py-2.5 font-semibold">Naturaleza</th>
            <th className="px-3 py-2.5 font-semibold">Ejemplo</th>
            <th className="px-6 py-2.5 text-right font-semibold">Grupo</th>
          </tr>
        </thead>
        <tbody>
          {normasAmbientales.map((norma) => (
            <tr
              key={norma.naturaleza}
              className="border-b border-b-[#EEF1F5] last:border-b-0 hover:bg-[#F7FBF4]"
            >
              <td className="px-6 py-3 font-semibold text-[#0B2E13]">
                {norma.naturaleza}
              </td>
              <td className="px-3 py-3 text-[#6B7280]">{norma.ejemplo}</td>
              <td className="px-6 py-3 text-right">
                <span
                  className={`inline-block rounded-md px-2.5 py-0.5 text-[11.5px] font-bold whitespace-nowrap ${GRUPO_STYLES[norma.grupo]}`}
                >
                  {norma.grupo}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
