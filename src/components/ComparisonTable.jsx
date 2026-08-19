/**
 * Side-by-side comparison of two model versions.
 * Becomes stacked cards below `sm`, because an 11-row three-column table is
 * unreadable on a phone.
 */
export default function ComparisonTable({ rows, leftLabel, rightLabel }) {
  if (!rows?.length) return null

  return (
    <div className="overflow-hidden rounded-lg border border-line">
      {/* Header — desktop only, the stacked view labels each cell itself */}
      <div className="hidden bg-surface sm:grid sm:grid-cols-[1fr_1fr_1fr]">
        <span className="eyebrow px-5 py-4">Aspect</span>
        <span className="eyebrow border-l border-line px-5 py-4">{leftLabel}</span>
        <span className="eyebrow border-l border-line px-5 py-4 text-brass">{rightLabel}</span>
      </div>

      <div className="divide-y divide-line">
        {rows.map((row) => (
          <div key={row.aspect} className="sm:grid sm:grid-cols-[1fr_1fr_1fr]">
            <div className="bg-ink px-5 pb-2 pt-4 sm:py-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-text sm:normal-case sm:tracking-normal sm:font-sans sm:text-sm">
                {row.aspect}
              </span>
            </div>

            <div className="bg-ink px-5 pb-2 sm:border-l sm:border-line sm:py-4">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-muted sm:hidden">
                {leftLabel}
              </span>
              <span className="text-sm leading-relaxed text-muted">{row.v1}</span>
            </div>

            <div className="bg-ink px-5 pb-4 sm:border-l sm:border-line sm:py-4">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-brass/70 sm:hidden">
                {rightLabel}
              </span>
              <span className="text-sm leading-relaxed text-text">{row.v2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
