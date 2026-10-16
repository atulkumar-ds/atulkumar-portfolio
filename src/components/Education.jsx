import { ArrowUpRight, GitFork } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { education, repositories } from '../data/profile.js'
import { activities } from '../data/certifications.js'

export default function Education() {
  return (
    <Section
      id="education"
      eyebrow="Academic Dossier & Repositories"
      title="Education & Open Work"
      intro="Degree curriculum at IIITDM Kurnool, verified academic coursework, open-source repositories, and hackathon prototypes."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Academic Credentials */}
        {education.map((school) => (
          <Reveal key={school.institution}>
            <div className="rounded-xl border border-border/80 bg-surface/80 p-6 sm:p-7 backdrop-blur-sm h-full flex flex-col justify-between hover:border-cyan/30 transition-all duration-300">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border/60 pb-3.5">
                  <span className="font-mono text-xs text-cyan uppercase font-semibold">
                    {school.shortName}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                    {school.period}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-3xl font-normal leading-snug text-text">
                  {school.shortName}
                </h3>
                <p className="mt-1 font-mono text-xs text-secondary">{school.institution}</p>

                <div className="mt-6 rounded-xl border border-border/70 bg-elevated/60 p-4">
                  <p className="font-display text-xl font-normal text-text">
                    {school.degree}
                  </p>
                  <p className="mt-1 font-mono text-xs text-cyan">
                    {school.branch}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs">
                    <span className="text-text font-bold">{school.grade}</span>
                    <span className="text-border">·</span>
                    <span className="text-secondary">{school.year}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted">Relevant Curricular Coursework</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {school.coursework.map((course) => (
                      <li
                        key={course}
                        className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-elevated/60 px-2.5 py-1 font-mono text-xs text-secondary"
                      >
                        <span className="h-1 w-1 rounded-full bg-cyan/70" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-3.5 flex items-center justify-between font-mono text-xs text-secondary">
                <span>Location: {school.location}</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] animate-pulse" />
                  Enrolled
                </span>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Right Column: Open Repositories & Hackathon Activities */}
        <Reveal delay={0.1}>
          <div className="rounded-xl border border-border/80 bg-surface/80 p-6 sm:p-7 backdrop-blur-sm h-full flex flex-col justify-between hover:border-cyan/30 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">Open Source Repositories</span>
                <span className="font-mono text-xs text-muted">{repositories.length} tracked</span>
              </div>

              <ul className="mt-5 space-y-4">
                {repositories.map((repo) => (
                  <li key={repo.name} className="border-b border-border/40 pb-3.5 last:border-b-0 last:pb-0">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 font-mono text-xs text-text group-hover:text-cyan transition-colors font-medium">
                          <GitFork size={13} className="text-cyan shrink-0" />
                          <span>{repo.name}</span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-muted group-hover:text-cyan transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="mt-1 text-xs leading-relaxed text-secondary pl-5">
                        {repo.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Hackathon activities */}
              {activities.length > 0 && (
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted">Collegiate Hackathons &amp; Sprints</p>
                  <ul className="mt-4 space-y-3">
                    {activities.map((activity) => (
                      <li key={activity.name} className="rounded-lg border border-border/60 bg-elevated/50 p-3.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="font-mono text-xs text-text font-medium">{activity.name}</p>
                          <span className="font-mono text-[11px] text-cyan uppercase shrink-0">
                            {activity.role} · {activity.year}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-secondary">
                          {activity.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

