/**
 * Technical schematic pipeline representing data and model flow stages.
 * Clean responsive layout with active node indicators.
 */
export default function Pipeline({ stages = [], label }) {
  if (stages.length === 0) return null

  return (
    <figure className="rounded-xl border border-border/70 bg-elevated/60 backdrop-blur-sm p-5 sm:p-6 shadow-lg">
      {label && (
        <figcaption className="flex items-center justify-between border-b border-border/60 pb-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">{label}</span>
          <span className="font-mono text-[11px] text-muted">{stages.length} STAGES</span>
        </figcaption>
      )}

      <ol className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
        {stages.map((stage, index) => (
          <li
            key={`${stage}-${index}`}
            className="group flex flex-1 items-center gap-4 sm:flex-col sm:gap-0"
          >
            {/* Connector line + glowing node */}
            <div className="flex flex-col items-center self-stretch sm:w-full sm:flex-row">
              <span
                className={`w-px flex-1 bg-border/80 group-hover:bg-cyan/40 transition-colors sm:h-px sm:w-full ${
                  index === 0 ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span className="h-2 w-2 rounded-full border border-cyan/60 bg-midnight group-hover:bg-cyan group-hover:scale-125 transition-all shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
              </span>
              <span
                className={`w-px flex-1 bg-border/80 group-hover:bg-cyan/40 transition-colors sm:h-px sm:w-full ${
                  index === stages.length - 1 ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
            </div>

            <div className="py-2.5 sm:mt-3 sm:px-1.5 sm:text-center w-full">
              <span className="hidden sm:block font-mono text-[10px] text-muted mb-1">
                0{index + 1}
              </span>
              <p className="font-mono text-[11px] uppercase leading-snug tracking-wider text-secondary group-hover:text-text transition-colors">
                {stage}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}

