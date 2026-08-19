import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { education } from '../data/profile.js'

const focusAreas = [
  'Data structures and algorithms in C++, practised daily and committed to a repository',
  'Machine learning written from its mathematics first, then rebuilt with the standard libraries',
  'Deep learning for vision and language — CNNs, transfer learning, LSTM decoders, attention',
  'Turning a trained model into something a person can open and use',
]

export default function About() {
  const school = education[0]

  return (
    <Section id="about" eyebrow="About" title="Engineering first, AI as the specialisation.">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="space-y-5 text-[15px] leading-relaxed text-muted">
            <p>
              I am a B.Tech Artificial Intelligence and Data Science student at{' '}
              <span className="text-text">{school.shortName}</span>, entering my third year in
              August 2026 on a 2024–2028 programme.
            </p>
            <p>
              Most of my time goes into two things. The first is the software engineering
              foundation: algorithms, data structures and code that is correct before it is
              clever. The second is machine learning, which I approach the same way — implement
              the algorithm by hand first, then reach for the library once I know what it is
              doing underneath.
            </p>
            <p>
              What I care about is the last mile, and the loop before it. My captioning project
              exists in two versions because the first one was measured, found wanting for a
              specific reason, and rebuilt around a different image representation. That cycle —
              build, measure, diagnose, redesign — is the part I want to keep getting better at.
            </p>
            <p className="text-text">
              I am currently preparing for software engineering and AI/ML internships.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel p-6 sm:p-7">
            <p className="eyebrow">What I work on</p>
            <ul className="mt-6 space-y-4">
              {focusAreas.map((area) => (
                <li key={area} className="flex gap-4 text-sm leading-relaxed text-muted">
                  <span className="node-dot mt-1.5" aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
