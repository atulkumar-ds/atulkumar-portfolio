import { ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { education, repositories } from '../data/profile.js'
import { activities } from '../data/certifications.js'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I am studying.">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        {education.map((school) => (
          <Reveal key={school.institution}>
            <div className="panel h-full p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl leading-snug">{school.shortName}</h3>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {school.period}
                </p>
              </div>

              <p className="mt-3 text-sm text-muted">{school.institution}</p>

              <p className="mt-5 text-[15px] text-text">
                {school.degree} — {school.branch}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="font-mono text-sm text-brass">{school.grade}</p>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {school.year}
                </p>
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <p className="eyebrow">Relevant coursework</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {school.coursework.map((course) => (
                    <li key={course} className="tag">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.1}>
          <div className="panel h-full p-6 sm:p-7">
            {/* Hackathon claims were removed in the V2 audit — nothing verifiable
                backed them. This panel points at repositories instead, which
                anyone can open and check. */}
            <p className="eyebrow">Open repositories</p>
            <ul className="mt-6 space-y-5">
              {repositories.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-4"
                  >
                    <span className="node-dot mt-1.5" aria-hidden="true" />
                    <span>
                      <span className="flex items-center gap-1.5 font-mono text-sm text-text transition-colors group-hover:text-brass">
                        {repo.name}
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                        {repo.description}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {activities.length > 0 && (
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow">Activities</p>
                <ul className="mt-5 space-y-5">
                  {activities.map((activity) => (
                    <li key={activity.name} className="flex gap-4">
                      <span className="node-dot mt-1.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm text-text">{activity.name}</p>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                          {activity.role} · {activity.year}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {activity.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
