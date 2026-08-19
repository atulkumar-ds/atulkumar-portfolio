import Reveal from './Reveal.jsx'
import { currentlyLearning } from '../data/profile.js'

// Deliberately quiet: a list, not a progress dashboard.
export default function CurrentlyLearning() {
  if (currentlyLearning.length === 0) return null

  return (
    <section className="border-t border-line bg-surface/40 py-16">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Currently learning</p>
        </Reveal>

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {currentlyLearning.map((item, index) => (
            <Reveal key={item.topic} delay={(index % 4) * 0.06} className="bg-ink">
              <div className="h-full p-5">
                <div className="flex items-center gap-3">
                  <span className="node-dot" aria-hidden="true" />
                  <h3 className="text-[15px] text-text">{item.topic}</h3>
                </div>
                <p className="mt-3 pl-5 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
