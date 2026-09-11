import {
  normasCalidad,
  PRIORIDAD_STYLES,
  sortByPrioridad,
} from "@/lib/data/calidad-normas"

export function NormasTable() {
  const sorted = sortByPrioridad(normasCalidad)

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E9EE] bg-white shadow-[0_8px_24px_rgba(11,79,108,0.06)]">
      <div className="border-b border-[#E5E9EE] px-6 py-4">
        <div className="font-heading text-base font-bold text-[#08344A]">
          Marco normativo aplicable
        </div>
        <p className="mt-0.5 text-[12.5px] text-[#6B7280]">
          {normasCalidad.length} normas y estándares identificados para SYC,
          ordenados por prioridad de implementación.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-[#E5E9EE] text-left text-[11.5px] tracking-wide text-[#9CA5B0] uppercase">
              <th className="w-12 px-6 py-2.5 font-semibold">#</th>
              <th className="px-3 py-2.5 font-semibold">Norma / estándar</th>
              <th className="hidden px-3 py-2.5 font-semibold md:table-cell">
                Tipo
              </th>
              <th className="hidden px-3 py-2.5 font-semibold lg:table-cell">
                Ámbito
              </th>
              <th className="px-6 py-2.5 text-right font-semibold">
                Prioridad
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((norma) => {
              const styles = PRIORIDAD_STYLES[norma.prioridad]
              return (
                <tr
                  key={norma.numero}
                  className={`border-l-4 border-b border-b-[#EEF1F5] last:border-b-0 hover:bg-[#F7F9FF] ${styles.border}`}
                >
                  <td className="px-6 py-3 font-mono text-[12px] text-[#9CA5B0] tabular-nums">
                    {String(norma.numero).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-semibold text-[#08344A]">
                      {norma.norma}
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#6B7280] md:hidden">
                      {norma.tipo} · {norma.ambito}
                    </div>
                  </td>
                  <td className="hidden px-3 py-3 text-[#6B7280] md:table-cell">
                    {norma.tipo}
                  </td>
                  <td className="hidden px-3 py-3 text-[#6B7280] lg:table-cell">
                    {norma.ambito}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={`inline-block rounded-md px-2.5 py-0.5 text-[11.5px] font-bold whitespace-nowrap ${styles.badge}`}
                    >
                      {norma.prioridad}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
