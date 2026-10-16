import { Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import Reveal from './Reveal.jsx'

/**
 * Editorial-technical case study layout frame.
 */
export default function CaseStudyLayout({ project, children }) {
  const { title, kicker, category, summary, technologies = [], github, demo } = project

  return (
    <article className="pb-24 pt-24 sm:pt-28 relative">
      <header className="border-b border-border/60 pb-16 pt-8 bg-surface/40 relative overflow-hidden">
        <div className="shell relative z-10">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-secondary transition-colors hover:text-cyan"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>&larr; Back to Projects</span>
          </Link>

          <Reveal>
            <div className="mt-8 flex items-center gap-2 font-mono text-xs text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-pulse" />
              <span className="uppercase tracking-wider font-medium">{category} · Case Study</span>
            </div>

            <h1 className="mt-3 max-w-4xl font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] text-text">
              {title}
            </h1>

            {kicker && (
              <p className="mt-3 font-mono text-xs sm:text-sm text-cyan/90 font-medium">
                {kicker}
              </p>
            )}

            <p className="mt-5 max-w-3xl text-[15px] sm:text-base leading-relaxed text-secondary">
              {summary}
            </p>

            {technologies.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-elevated/60 px-3 py-1 font-mono text-xs text-secondary"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyan/60" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="btn-primary">
                  <Github size={15} aria-hidden="true" />
                  <span>View Repository</span>
                </a>
              )}
              {demo && (
                <a href={demo} target="_blank" rel="noreferrer" className="btn-ghost">
                  <ExternalLink size={15} aria-hidden="true" />
                  <span>Open Live Demo</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="shell mt-16 space-y-16 relative z-10">{children}</div>
    </article>
  )
}

/** Titled block inside a case study with technical section line. */
export function CaseStudyBlock({ title, children, wide = false }) {
  return (
    <Reveal>
      <section className="rounded-xl border border-border/80 bg-surface/80 p-6 sm:p-8 backdrop-blur-sm shadow-lg">
        <h2 className="font-display text-2xl sm:text-3xl font-normal text-text border-b border-border/60 pb-3.5">
          {title}
        </h2>
        <div className={`mt-5 ${wide ? '' : 'max-w-3xl'}`}>{children}</div>
      </section>
    </Reveal>
  )
}

/** Bulleted list using the site's node-dot motif. */
export function NodeList({ items = [] }) {
  if (items.length === 0) return null

  return (
    <ul className="space-y-3.5">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-sm leading-relaxed text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan/70 mt-2 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.5)]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Grid of titled technical cards. */
export function CardGrid({ items = [], columns = 2 }) {
  if (items.length === 0) return null

  const gridClass = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className={`grid gap-4 ${gridClass}`}>
      {items.map((item) => (
        <div key={item.title ?? item.name} className="rounded-xl border border-border/70 bg-elevated/60 p-5 hover:border-cyan/30 transition-all duration-200">
          <h3 className="font-display text-xl font-normal text-text leading-snug">{item.title ?? item.name}</h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-secondary">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

/** Technical caveat callout with gold border and status badge. */
export function Caveat({ children }) {
  return (
    <div className="rounded-xl border border-border/70 border-l-4 border-l-cyan bg-elevated/60 p-5 text-sm leading-relaxed text-secondary">
      <div className="flex items-center gap-2 mb-2 font-mono text-xs text-cyan font-medium uppercase tracking-wider">
        <span>Engineering Note &amp; Considerations</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

