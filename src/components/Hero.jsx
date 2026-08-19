import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github, FileText } from 'lucide-react'
import { profile, links, education } from '../data/profile.js'
import { projects } from '../data/projects.js'

// Small helper so each hero element can fade in one after another.
function useEntrance() {
  const reduceMotion = useReducedMotion()
  return (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        }
}

export default function Hero() {
  const entrance = useEntrance()
  const school = education[0]

  // Nothing here is a number I cannot point at. Problem-solving counts moved
  // to the Coding section, where they are fetched live instead of hardcoded.
  const facts = [
    { label: 'Studying', value: `B.Tech AI & Data Science, ${school.shortName}` },
    { label: 'Year', value: school.year },
    { label: 'Grade', value: school.grade },
    { label: 'Shipped', value: `${projects.length} documented projects, one deployed live` },
    { label: 'Looking for', value: 'Software and AI/ML internships' },
  ]

  return (
    <section className="hero-wash relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: the introduction */}
          <div>
            <motion.p {...entrance(0)} className="eyebrow">
              {profile.location}
            </motion.p>

            <motion.h1
              {...entrance(0.08)}
              className="mt-5 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]"
            >
              {profile.name}
            </motion.h1>

            <motion.p {...entrance(0.16)} className="mt-5 font-mono text-sm text-brass sm:text-base">
              Software Engineer <span className="text-line">/</span> AI &amp; Data Science
            </motion.p>

            <motion.p
              {...entrance(0.24)}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {profile.tagline}
            </motion.p>

            <motion.div {...entrance(0.32)} className="mt-9 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary">
                View projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
              <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn-ghost">
                <FileText size={16} aria-hidden="true" />
                Resume
              </a>
            </motion.div>

            <motion.ul
              {...entrance(0.4)}
              className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted"
            >
              {profile.heroStack.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 && (
                    <span className="text-line" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: a compact factual panel, no invented numbers */}
          <motion.div {...entrance(0.35)} className="panel p-6 sm:p-7">
            <p className="eyebrow">At a glance</p>
            <dl className="mt-6 space-y-5">
              {facts.map((fact) => (
                <div key={fact.label} className="flex gap-4">
                  <span className="node-dot mt-1.5" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-text">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
