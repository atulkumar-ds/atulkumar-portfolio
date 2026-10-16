import { Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'

/**
 * Technical blueprint card for secondary and catalog projects.
 */
export default function ProjectCard({ project, index }) {
  const { slug, title, kicker, category, summary, technologies = [], github, demo } = project

  return (
    <article className="group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-surface/80 p-6 sm:p-7 backdrop-blur-sm hover:border-cyan/40 hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)] hover:-translate-y-0.5 transition-all duration-300">
      <div>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">
            {category}
          </span>
          <ArrowUpRight
            size={16}
            className="text-muted transition-all duration-300 group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        {/* Title & Kicker */}
        <div className="mt-4">
          <h3 className="font-display text-2xl text-text font-normal leading-snug group-hover:text-cyan transition-colors">
            <Link to={`/projects/${slug}`}>
              {title}
            </Link>
          </h3>
          {kicker && (
            <p className="mt-1.5 font-mono text-xs text-secondary/90">
              {kicker}
            </p>
          )}
        </div>

        {/* Summary Description */}
        <p className="mt-3.5 text-sm leading-relaxed text-secondary">
          {summary}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-elevated/60 px-2.5 py-1 font-mono text-[11px] text-secondary"
              >
                <span className="h-1 w-1 rounded-full bg-cyan/60" />
                <span>{tech}</span>
              </li>
            ))}
            {technologies.length > 5 && (
              <li className="inline-flex items-center rounded-md border border-border/50 bg-elevated/40 px-2 py-1 font-mono text-[10px] text-muted">
                +{technologies.length - 5}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-y-2 border-t border-border/60 pt-4 text-xs font-mono">
        <Link
          to={`/projects/${slug}`}
          className="inline-flex items-center gap-1.5 text-cyan font-medium hover:text-cyan-light transition-colors"
        >
          <span>Read case study</span>
          <span>&rarr;</span>
        </Link>

        <div className="flex items-center gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-secondary hover:text-text transition-colors"
            >
              <Github size={13} aria-hidden="true" />
              <span>Code</span>
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-cyan hover:text-cyan-light transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

