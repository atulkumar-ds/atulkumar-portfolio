import { Code2, BrainCircuit, Rocket } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { engineeringIdentity } from '../data/skills.js'

const icons = [Code2, BrainCircuit, Rocket]

export default function EngineeringIdentity() {
  return (
    <section className="border-t border-border/80 bg-surface/40 py-14 relative">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-3">
          {engineeringIdentity.map((track, index) => {
            const Icon = icons[index % icons.length]

            return (
              <Reveal key={track.title} delay={index * 0.08}>
                <div className="panel panel-hover p-6 sm:p-7 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-elevated text-cyan group-hover:border-cyan/40 transition-colors">
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-xs text-muted">
                        Pillar 0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl text-text leading-snug">
                      {track.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-secondary font-sans">
                      {track.blurb}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/60 pt-4">
                    <p className="font-mono text-xs text-cyan tracking-wide">
                      {track.stack.join(' · ')}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
