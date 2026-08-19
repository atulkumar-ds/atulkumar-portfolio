import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { skillGroups } from '../data/skills.js'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="The tools I reach for."
      intro="Grouped by what they are for, not ranked by a made-up percentage."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={(index % 3) * 0.06}>
            <div className="panel panel-hover h-full p-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-brass">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
