import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Pipeline from './Pipeline.jsx'

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
    <div className="rounded-xl border border-border/80 bg-surface/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      {/* Switch Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div
          role="tablist"
          aria-label="Choose a model version"
          onKeyDown={onKeyDown}
          className="inline-flex rounded-lg border border-border/70 bg-elevated/80 p-1"
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
                className={`rounded-md px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-cyan/15 text-cyan border border-cyan/40 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                    : 'text-secondary hover:text-text'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <span className="font-mono text-xs text-muted">
          Model Version: {active.id.toUpperCase()}
        </span>
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
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6"
        >
          {/* Heading for the selected version */}
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-3xl font-normal text-text">{active.name}</h3>
            <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-3 py-0.5 font-mono text-xs text-cyan">
              {active.status}
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">
            {active.headline}
          </p>

          <p className="mt-2 font-mono text-xs text-cyan/90">{active.directory}</p>

          {/* Architecture for the selected version */}
          <div className="mt-6">
            <Pipeline stages={active.pipeline} label={`${active.label} — Inference Flow`} />
          </div>

          {/* Implementation detail */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {active.detail.map((item) => (
              <div key={item.title} className="rounded-xl border border-border/70 bg-elevated/60 p-5">
                <h4 className="font-mono text-xs uppercase tracking-wider text-cyan font-medium">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Training facts */}
          {active.trainingFacts.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {active.trainingFacts.map((fact, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan/70 mt-2 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Evaluation */}
          <div className="mt-8 border-t border-border/60 pt-6">
            <p className="text-xs font-mono uppercase tracking-wider text-muted">Evaluation &amp; Benchmarks</p>

            {active.metrics.length > 0 ? (
              <>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {active.metrics.map((result) => (
                    <div key={result.metric} className="rounded-xl border border-border/70 bg-elevated/60 p-4 text-center">
                      <dt className="text-xs font-mono uppercase tracking-wider text-secondary">{result.metric}</dt>
                      <dd className="mt-2 font-display text-3xl font-normal text-cyan">{result.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-muted">{active.metricsNote}</p>
              </>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-border/70 bg-elevated/30 p-5 font-mono text-xs leading-relaxed text-secondary">
                {active.metricsNote}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

