import Reveal from './Reveal.jsx'
import { engineeringIdentity } from '../data/skills.js'

// A short strip that states the three tracks a recruiter should take away.
export default function EngineeringIdentity() {
  return (
    <section className="border-t border-line bg-surface/40 py-14">
      <div className="shell grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        {engineeringIdentity.map((track, index) => (
          <Reveal key={track.title} delay={index * 0.08} className="bg-ink">
            <div className="h-full p-6 sm:p-7">
              <h3 className="font-display text-2xl">{track.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{track.blurb}</p>
              <p className="mt-5 font-mono text-[11px] leading-relaxed text-brass/80">
                {track.stack.join(' · ')}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
