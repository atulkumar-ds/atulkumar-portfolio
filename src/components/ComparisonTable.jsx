/**
 * Technical comparison table between model iterations.
 * Stacks into responsive technical cards on small displays.
 */
export default function ComparisonTable({ rows, leftLabel, rightLabel }) {
  if (!rows?.length) return null

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-surface/80 backdrop-blur-sm shadow-md">
      {/* Header — desktop only */}
      <div className="hidden bg-elevated/80 sm:grid sm:grid-cols-[1.2fr_1fr_1fr] border-b border-border/60">
        <span className="text-xs font-mono uppercase tracking-wider text-muted px-5 py-3.5">Architectural Aspect</span>
        <span className="text-xs font-mono uppercase tracking-wider text-secondary border-l border-border/60 px-5 py-3.5">{leftLabel}</span>
        <span className="text-xs font-mono uppercase tracking-wider text-cyan font-semibold border-l border-border/60 px-5 py-3.5">{rightLabel}</span>
      </div>

      <div className="divide-y divide-border/50">
        {rows.map((row) => (
          <div key={row.aspect} className="sm:grid sm:grid-cols-[1.2fr_1fr_1fr] hover:bg-elevated/40 transition-colors">
            <div className="bg-elevated/40 px-5 pb-2 pt-4 sm:py-3.5 flex items-center">
              <span className="font-mono text-xs uppercase tracking-wider text-secondary sm:text-text sm:normal-case sm:tracking-normal sm:font-sans sm:text-sm font-medium">
                {row.aspect}
              </span>
            </div>

            <div className="bg-elevated/20 px-5 pb-2 sm:border-l sm:border-border/60 sm:py-3.5">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-muted sm:hidden">
                {leftLabel}:
              </span>
              <span className="text-sm leading-relaxed text-secondary">{row.v1}</span>
            </div>

            <div className="bg-elevated/10 px-5 pb-4 sm:border-l sm:border-border/60 sm:py-3.5">
              <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-cyan sm:hidden">
                {rightLabel}:
              </span>
              <span className="text-sm leading-relaxed text-text font-medium">{row.v2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

