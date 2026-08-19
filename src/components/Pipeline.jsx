/**
 * The hairline schematic used to show a flow of stages.
 * Stacks vertically on mobile, runs left to right from `sm` upwards.
 * Pass any array of strings: <Pipeline stages={['Image', 'Features', 'Caption']} />
 *
 * Keyed by index rather than by label, so a flow may repeat a stage name.
 */
export default function Pipeline({ stages = [], label }) {
  if (stages.length === 0) return null

  return (
    <figure className="panel p-6 sm:p-8">
      {label && <figcaption className="eyebrow mb-6">{label}</figcaption>}

      <ol className="flex flex-col gap-0 sm:flex-row sm:items-stretch">
        {stages.map((stage, index) => (
          <li key={`${stage}-${index}`} className="flex flex-1 items-center gap-4 sm:flex-col sm:gap-0">
            {/* Connector + node */}
            <div className="flex flex-col items-center self-stretch sm:w-full sm:flex-row">
              <span
                className={`w-px flex-1 bg-line sm:h-px sm:w-full ${index === 0 ? 'opacity-0' : ''}`}
                aria-hidden="true"
              />
              <span className="node-dot" aria-hidden="true" />
              <span
                className={`w-px flex-1 bg-line sm:h-px sm:w-full ${
                  index === stages.length - 1 ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
            </div>

            <p className="py-3 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted sm:mt-4 sm:px-2 sm:text-center">
              {stage}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  )
}
