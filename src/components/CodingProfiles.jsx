import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import CodingProfileCard from './CodingProfileCard.jsx'
import { codingProfiles } from '../data/profile.js'

export default function CodingProfiles() {
  return (
    <Section
      id="coding"
      eyebrow="Problem solving"
      title="Algorithms, contests and the daily grind."
      intro="Practised mostly in C++. These cards read from each platform's public data rather than repeating a number from my resume, so what you see is the latest they will give us."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {codingProfiles.map((entry, index) => (
          <Reveal key={entry.platform} delay={(index % 3) * 0.06}>
            <CodingProfileCard {...entry} />
          </Reveal>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted">
        Fetched on load and cached for 30 minutes. GitHub and Codeforces come from their
        official public APIs; the others read public profile data through community
        endpoints, so they occasionally go quiet.
      </p>
    </Section>
  )
}
