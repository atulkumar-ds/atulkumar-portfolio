import { Link } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink } from 'lucide-react'
import Reveal from './Reveal.jsx'

/**
 * The frame every project page shares: back link, title block, links, then
 * whatever blocks that page passes as children.
 */
export default function CaseStudyLayout({ project, children }) {
  const { title, kicker, category, summary, technologies = [], github, demo } = project

  return (
    <article className="pb-24 pt-28">
      <header className="hero-wash border-b border-line pb-14 pt-6">
        <div className="shell">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-brass"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            All projects
          </Link>

          <Reveal>
            <p className="eyebrow mt-10">{category}</p>

            <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.05] sm:text-6xl">
              {title}
            </h1>

            {kicker && (
              <p className="mt-4 font-mono text-sm text-brass">{kicker}</p>
            )}

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{summary}</p>

            {technologies.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="btn-primary">
                  <Github size={16} aria-hidden="true" />
                  View on GitHub
                </a>
              )}
              {demo && (
                <a href={demo} target="_blank" rel="noreferrer" className="btn-ghost">
                  <ExternalLink size={16} aria-hidden="true" />
                  Open live demo
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      <div className="shell mt-16 space-y-16">{children}</div>
    </article>
  )
}

/** A titled block inside a case study. */
export function CaseStudyBlock({ title, children, wide = false }) {
  return (
    <Reveal>
      <section>
        <h2 className="font-display text-3xl">{title}</h2>
        <div className={`mt-5 ${wide ? '' : 'max-w-3xl'}`}>{children}</div>
      </section>
    </Reveal>
  )
}

/** A bulleted list using the site's node-dot motif. */
export function NodeList({ items = [] }) {
  if (items.length === 0) return null

  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4 text-[15px] leading-relaxed text-muted">
          <span className="node-dot mt-2" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** A grid of titled cards, used for highlights, views and engineering notes. */
export function CardGrid({ items = [], columns = 2 }) {
  if (items.length === 0) return null

  const gridClass = columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {items.map((item) => (
        <div key={item.title ?? item.name} className="panel p-5">
          <h3 className="text-[15px] text-text">{item.title ?? item.name}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

/**
 * A short caveat about the limits of a result. Used deliberately — being clear
 * about what a number does not prove reads better than overstating it.
 */
export function Caveat({ children }) {
  return (
    <p className="rounded-md border-l-2 border-brass/50 bg-surface/60 p-5 text-sm leading-relaxed text-muted">
      {children}
    </p>
  )
}
