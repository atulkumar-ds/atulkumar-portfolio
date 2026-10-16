import { CheckCircle2 } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { education } from '../data/profile.js'

const focusAreas = [
  'Data structures and algorithms in C++, practised daily and committed to a repository',
  'Machine learning written from its mathematics first, then rebuilt with standard libraries',
  'Deep learning for vision and language — CNNs, transfer learning, multi-spectral attention, agentic RAG',
  'Turning a trained model into something a person can open and use through clean APIs and interfaces',
]

export default function About() {
  const school = education[0]

  return (
    <Section
      id="about"
      eyebrow="Background & Philosophy"
      title="Engineering first, AI as the specialisation."
      intro="Bridging foundational computer science, algorithmic rigor, and modern deep learning architectures."
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
        {/* Narrative */}
        <Reveal>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-secondary font-sans">
            <p>
              I am a B.Tech Artificial Intelligence and Data Science student at{' '}
              <span className="text-text font-medium">{school.shortName}</span>, entering my third year in
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
            <div className="rounded-xl border border-cyan/30 bg-surface/70 p-4 flex items-center gap-3.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan shrink-0 animate-pulse" aria-hidden="true" />
              <p className="text-sm text-text font-medium">
                Currently preparing and interviewing for software engineering and AI/ML internships.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Focus Areas Card */}
        <Reveal delay={0.1}>
          <div className="panel p-6 sm:p-7">
            <h3 className="font-display text-2xl text-text border-b border-border/70 pb-3 mb-5">
              Core Engineering Focus
            </h3>

            <ul className="space-y-4 font-sans text-sm sm:text-base text-secondary">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-cyan shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
