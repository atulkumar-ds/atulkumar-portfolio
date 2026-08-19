import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Pipeline from './Pipeline.jsx'

/**
 * The V1 / V2 switch on the Image Captioning page.
 *
 * Plain useState — two versions, one selected at a time. No routing, no
 * context, no extra dependency. Implemented as a real tablist so arrow keys
 * and screen readers behave the way people expect.
 */
export default function VersionExplorer({ versions }) {
  const options = [versions.v1, versions.v2]
  const [activeId, setActiveId] = useState(versions.v1.id)
  const reduceMotion = useReducedMotion()

  const active = options.find((option) => option.id === activeId) ?? options[0]

  const onKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()

    const currentIndex = options.findIndex((option) => option.id === activeId)
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % options.length
        : (currentIndex - 1 + options.length) % options.length

    setActiveId(options[nextIndex].id)
  }

  return (
    <div>
      {/* Switch */}
      <div
        role="tablist"
        aria-label="Choose a model version"
        onKeyDown={onKeyDown}
        className="inline-flex rounded-md border border-line bg-surface p-1"
      >
        {options.map((option) => {
          const isActive = option.id === activeId
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              id={`tab-${option.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${option.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(option.id)}
              className={`rounded px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                isActive ? 'bg-brass text-ink' : 'text-muted hover:text-text'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          {/* Heading for the selected version */}
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-3xl">{active.name}</h3>
            <span className="tag">{active.status}</span>
          </div>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            {active.headline}
          </p>

          <p className="mt-2 font-mono text-[11px] text-muted">{active.directory}</p>

          {/* Architecture for the selected version */}
          <div className="mt-8">
            <Pipeline stages={active.pipeline} label={`${active.label} — inference path`} />
          </div>

          {/* Implementation detail */}
          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {active.detail.map((item) => (
              <div key={item.title} className="bg-ink p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-brass">
                  {item.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Training facts */}
          {active.trainingFacts.length > 0 && (
            <ul className="mt-8 space-y-3">
              {active.trainingFacts.map((fact, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-[15px] leading-relaxed text-muted"
                >
                  <span className="node-dot mt-2" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Evaluation — real numbers, or an honest absence of them */}
          <div className="mt-10">
            <p className="eyebrow">Evaluation</p>

            {active.metrics.length > 0 ? (
              <>
                <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {active.metrics.map((result) => (
                    <div key={result.metric} className="panel p-5">
                      <dt className="eyebrow">{result.metric}</dt>
                      <dd className="mt-2 font-display text-4xl text-brass">{result.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm leading-relaxed text-muted">{active.metricsNote}</p>
              </>
            ) : (
              <p className="mt-5 rounded-md border border-dashed border-line p-6 text-sm leading-relaxed text-muted">
                {active.metricsNote}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
