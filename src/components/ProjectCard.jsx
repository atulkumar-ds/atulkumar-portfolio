import { Link } from 'react-router-dom'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'

/**
 * One project card. Buttons only render when the matching URL exists in the
 * project data, so a project with no demo simply shows fewer buttons.
 */
export default function ProjectCard({ project }) {
  const { slug, title, kicker, category, summary, technologies = [], github, demo } = project

  return (
    <article className="panel panel-hover group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{category}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight">
            <Link to={`/projects/${slug}`} className="transition-colors hover:text-brass">
              {title}
            </Link>
          </h3>
          {kicker && <p className="mt-1.5 font-mono text-[11px] text-brass/80">{kicker}</p>}
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-line transition-colors duration-300 group-hover:text-brass"
          aria-hidden="true"
        />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{summary}</p>

      {technologies.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {technologies.slice(0, 5).map((tech) => (
            <li key={tech} className="tag">
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-xs">
        <Link
          to={`/projects/${slug}`}
          className="font-medium text-brass transition-opacity hover:opacity-75"
        >
          Read the case study
        </Link>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <Github size={13} aria-hidden="true" />
            Code
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <ExternalLink size={13} aria-hidden="true" />
            Live demo
          </a>
        )}
      </div>
    </article>
  )
}
