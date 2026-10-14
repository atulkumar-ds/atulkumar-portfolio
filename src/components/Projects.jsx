import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import ProjectCard from './ProjectCard.jsx'
import Pipeline from './Pipeline.jsx'
import { projects, projectCategories } from '../data/projects.js'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)

  const visible =
    activeCategory === 'All'
      ? rest
      : rest.filter((project) => project.category === activeCategory)

  // The featured card is shown above the filter, so a filter that would only
  // match the featured project needs to say so rather than look empty.
  const featuredMatchesFilter =
    featured && activeCategory !== 'All' && featured.category === activeCategory

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects."
      intro={`${projects.length} pieces of work, each taken to the point where somebody else can run it. Everything described below is in the repository — no results I have not measured.`}
    >
      {/* Featured project — deliberately larger than the others */}
      {featured && (
        <Reveal>
          <article className="panel relative overflow-hidden p-6 sm:p-9">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass to-transparent opacity-60"
              aria-hidden="true"
            />

            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="eyebrow text-brass">Featured · {featured.category}</p>
                <h3 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                  <Link to={`/projects/${featured.slug}`} className="hover:text-brass">
                    {featured.title}
                  </Link>
                </h3>
                {featured.kicker && (
                  <p className="mt-3 font-mono text-sm text-brass/90">{featured.kicker}</p>
                )}
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {featured.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/projects/${featured.slug}`} className="btn-primary">
                    Read the case study
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost"
                    >
                      <Github size={16} aria-hidden="true" />
                      Code
                    </a>
                  )}
                  {featured.demo && (
                    <a href={featured.demo} target="_blank" rel="noreferrer" className="btn-ghost">
                      <ExternalLink size={16} aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                </div>
              </div>

              <Pipeline
                stages={featured.pipeline || featured.versions?.v2?.pipeline || []}
                label={featured.pipelineLabel || (featured.versions?.v2 ? 'V2 — how it works' : 'Pipeline')}
              />
            </div>
          </article>
        </Reveal>
      )}

      {/* Filter */}
      <Reveal>
        <div
          className="mt-14 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => {
            const isActive = category === activeCategory
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border-brass bg-brass/10 text-brass'
                    : 'border-line text-muted hover:border-brass/40 hover:text-text'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Remaining projects */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <p className="mt-6 rounded-lg border border-dashed border-line p-8 text-center text-sm text-muted">
          {featuredMatchesFilter
            ? `The only ${activeCategory} project is the featured one above.`
            : 'Nothing in this category yet. Pick another filter.'}
        </p>
      )}
    </Section>
  )
}
