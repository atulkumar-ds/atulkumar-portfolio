import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import CodingProfileCard from './CodingProfileCard.jsx'
import { codingProfiles } from '../data/profile.js'

export default function CodingProfiles() {
  return (
    <Section
      id="coding"
      eyebrow="Algorithmic Foundations"
      title="Algorithms, Contests & Systematic Practice"
      intro="Practised primarily in C++. These profile cards query public endpoints to present real-time contest ratings and solved problem counts directly from each platform."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {codingProfiles.map((entry, index) => (
          <Reveal key={entry.platform} delay={(index % 3) * 0.06}>
            <CodingProfileCard {...entry} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border/70 bg-surface/60 p-4.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-secondary">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
          Cached for 30 minutes. Live API endpoints for GitHub and Codeforces, with graceful fallbacks for competitive profiles.
        </span>
        <span className="text-muted text-[11px]">Runtime synced</span>
      </div>
    </Section>
  )
}

