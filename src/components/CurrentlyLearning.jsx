import Reveal from './Reveal.jsx'
import { currentlyLearning } from '../data/profile.js'

export default function CurrentlyLearning() {
  if (currentlyLearning.length === 0) return null

  return (
    <section className="border-t border-border/60 bg-surface/30 py-16">
      <div className="shell">
        <Reveal>
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-8">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-pulse" />
              <p className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">Active Research &amp; Exploration Vectors</p>
            </div>
            <span className="font-mono text-xs text-muted">2026 Focus</span>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentlyLearning.map((item, index) => (
            <Reveal key={item.topic} delay={(index % 4) * 0.06}>
              <div className="group h-full rounded-xl border border-border/70 bg-surface/80 p-5 backdrop-blur-sm flex flex-col justify-between hover:border-cyan/40 hover:shadow-[0_8px_25px_rgba(34,211,238,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cyan font-medium">
                      Vector 0{index + 1}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-cyan transition-colors" />
                  </div>
                  <h3 className="mt-3 font-display text-xl font-normal text-text leading-snug">
                    {item.topic}
                  </h3>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-secondary border-t border-border/50 pt-3">
                  {item.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

