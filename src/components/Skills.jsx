import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { skillGroups } from '../data/skills.js'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical Capabilities"
      title="The tools I reach for."
      intro="Structured capability map across verified engineering implementations, not ranked by arbitrary percentages."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={(index % 3) * 0.05}>
            <div className="panel panel-hover p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-4">
                  <h3 className="font-display text-2xl text-text leading-snug">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {group.items.length} tools
                  </span>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center rounded-lg border border-border/80 bg-surface px-3 py-1.5 text-xs text-secondary font-medium hover:border-cyan/40 hover:text-cyan transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
