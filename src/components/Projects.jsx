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

  const featuredMatchesFilter =
    featured && activeCategory !== 'All' && featured.category === activeCategory

  // Count items per category
  const getCategoryCount = (category) => {
    if (category === 'All') return projects.length
    return projects.filter((p) => p.category === category).length
  }

  return (
    <Section
      id="projects"
      eyebrow="Architectural Showcase"
      title="Engineered Systems & Research"
      intro={`${projects.length} documented pieces of engineering, each developed to the point of reproducible execution. Model architectures and evaluation metrics are benchmarked directly in the respective repositories.`}
    >
      {/* Featured Architecture: RGB-Thermal Dual-Stream ResNet18 */}
      {featured && (
        <Reveal>
          <article className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-6 sm:p-9 shadow-xl backdrop-blur-sm hover:border-cyan/30 transition-all duration-300">
            {/* Subtle ambient glow behind card */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/5 blur-3xl" />

            {/* Top Command Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-xs font-medium text-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
                  Featured Research
                </span>
                <span className="text-border">|</span>
                <span className="text-secondary text-xs font-mono uppercase tracking-wider hidden sm:inline">
                  {featured.category}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
                <span className="rounded-md border border-border/70 bg-elevated/40 px-2.5 py-1">
                  Verified Evaluation
                </span>
              </div>
            </div>

            {/* Main Featured Grid */}
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-text">
                  <Link to={`/projects/${featured.slug}`} className="hover:text-cyan transition-colors">
                    {featured.title}
                  </Link>
                </h3>

                {featured.kicker && (
                  <p className="mt-3 font-mono text-xs sm:text-sm text-cyan/90 font-medium">
                    {featured.kicker}
                  </p>
                )}

                <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-secondary">
                  {featured.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-elevated/60 px-3 py-1 font-mono text-xs text-secondary"
                    >
                      <span className="h-1 w-1 rounded-full bg-cyan/60" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={`/projects/${featured.slug}`} className="btn-primary">
                    <span>Read case study</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>

                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost"
                    >
                      <Github size={15} aria-hidden="true" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {featured.demo && (
                    <a href={featured.demo} target="_blank" rel="noreferrer" className="btn-ghost">
                      <ExternalLink size={15} aria-hidden="true" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right: Technical Pipeline Visualizer */}
              <div>
                <Pipeline
                  stages={featured.pipeline || featured.versions?.v2?.pipeline || []}
                  label={featured.pipelineLabel || 'Multi-spectral feature pyramid & fusion'}
                />

                {/* Micro specs grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="rounded-xl border border-border/70 bg-elevated/60 p-3">
                    <span className="block text-[11px] uppercase tracking-wider text-muted">Parameters</span>
                    <span className="mt-1 block text-sm font-semibold text-cyan">29.06M</span>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-elevated/60 p-3">
                    <span className="block text-[11px] uppercase tracking-wider text-muted">Input Modality</span>
                    <span className="mt-1 block text-sm font-semibold text-text">4-Ch (RGB+Thermal)</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      )}

      {/* Category Filter Matrix */}
      <Reveal>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {projectCategories.map((category) => {
              const isActive = category === activeCategory
              const count = getCategoryCount(category)

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'border border-cyan/40 bg-cyan/15 text-cyan shadow-[0_0_15px_rgba(34,211,238,0.15)] font-medium'
                      : 'border border-border/70 bg-surface/60 text-secondary hover:border-border hover:text-text'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`rounded px-1.5 py-0.2 text-[10px] ${isActive ? 'bg-cyan/20 text-cyan font-bold' : 'bg-elevated/60 text-muted'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <span className="font-mono text-xs text-muted hidden md:inline">
            Showing {visible.length} projects
          </span>
        </div>
      </Reveal>

      {/* Project Cards Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project, idx) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <div className="mt-8 rounded-xl border border-border/70 bg-surface/60 text-center p-8">
          <p className="font-mono text-xs text-secondary">
            {featuredMatchesFilter
              ? `The only ${activeCategory} project is the featured system above.`
              : 'No project records in this domain filter. Select another category.'}
          </p>
        </div>
      )}
    </Section>
  )
}

