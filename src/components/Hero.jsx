import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github, FileText, Layers, Cpu, Eye, Sparkles } from 'lucide-react'
import { profile, links, education } from '../data/profile.js'
import { projects } from '../data/projects.js'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const school = education[0]

  const metrics = [
    { label: 'Parameters', value: '29.06M', detail: 'ResNet-18 Dual-Stream' },
    { label: 'Agentic Graph', value: '16 Nodes', detail: 'LangGraph Self-RAG' },
    { label: 'Geospatial Model', value: '7.77M', detail: 'LoveDA U-Net' },
    { label: 'Academic Standing', value: school.grade.split(' ')[1] || '8.16', detail: school.shortName },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 ambient-hero">
      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Column: Core Introduction & CTAs */}
          <div>
            {/* Status Pill */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1 text-xs font-medium text-cyan mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
              <span>Available for Software &amp; AI/ML Internships</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-text"
            >
              {profile.name}
            </motion.h1>

            {/* Role / Discipline */}
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-3 text-lg sm:text-xl font-medium text-cyan"
            >
              {profile.role}
            </motion.p>

            {/* Authoritative Tagline */}
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-secondary"
            >
              {profile.tagline}
            </motion.p>

            {/* Academic Credential Note */}
            <motion.p
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-xs sm:text-sm text-muted font-sans"
            >
              {school.degree} in {school.branch} at <span className="text-text font-medium">{school.shortName}</span> · {school.grade}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" className="btn-primary">
                <span>Explore Projects</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>

              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Github size={15} aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Resume (PDF)</span>
              </a>
            </motion.div>

            {/* Core Stack Pills */}
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="mt-10 pt-6 border-t border-border/80 flex flex-wrap items-center gap-2"
            >
              <span className="text-xs font-medium text-muted mr-2">Core Stack:</span>
              {profile.heroStack.map((tech) => (
                <span key={tech} className="tag text-xs">
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Multimodal Feature-Fusion Architectural Diagram */}
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="panel p-6 sm:p-7 relative shadow-2xl overflow-hidden"
          >
            {/* Subtle header bar */}
            <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-cyan" />
                <span className="font-mono text-xs text-text font-semibold tracking-wider">
                  MULTIMODAL FUSION ARCHITECTURE
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
                ACTIVE RESEARCH
              </span>
            </div>

            {/* Abstract Visual Schematic: Dual-Stream RGB + Thermal Attention */}
            <div className="relative rounded-lg border border-border/60 bg-midnight/80 p-5 font-mono text-xs">
              <div className="grid grid-cols-2 gap-4">
                {/* RGB Stream */}
                <div className="rounded border border-border/80 bg-surface/70 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-cyan font-semibold text-[11px]">RGB STREAM</span>
                    <span className="text-[10px] text-muted">3-Ch (480x640)</span>
                  </div>
                  <p className="text-[11px] text-secondary font-sans leading-tight mt-1">
                    Texture &amp; visible geometry extraction
                  </p>
                  <div className="mt-2 h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue to-cyan w-4/5 rounded-full" />
                  </div>
                </div>

                {/* Thermal Stream */}
                <div className="rounded border border-border/80 bg-surface/70 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-blue font-semibold text-[11px]">THERMAL STREAM</span>
                    <span className="text-[10px] text-muted">1-Ch (LWIR)</span>
                  </div>
                  <p className="text-[11px] text-secondary font-sans leading-tight mt-1">
                    Heat signatures &amp; zero-lux boundaries
                  </p>
                  <div className="mt-2 h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan to-blue w-3/4 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Fusion Layer Core */}
              <div className="mt-4 rounded border border-cyan/40 bg-elevated/90 p-3.5 relative shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-cyan animate-pulse" />
                    <span className="text-xs font-semibold text-text">
                      5-Scale Cross-Modal Attention (CMAF)
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan font-mono">SE-Gate + 7x7 Spatial</span>
                </div>
                <p className="text-[11px] text-secondary font-sans mt-1">
                  Dynamically balances modality weights under daylight glare and night darkness
                </p>
              </div>

              {/* Decoder Representation */}
              <div className="mt-4 flex items-center justify-between rounded border border-border/70 bg-surface/60 px-3.5 py-2.5">
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-secondary" />
                  <span className="text-[11px] text-secondary font-sans">
                    U-Net Decoder &amp; Soft Dice Head
                  </span>
                </div>
                <span className="text-[11px] text-text font-semibold">
                  9-Class Semantic Mask
                </span>
              </div>
            </div>

            {/* Verified Quick Highlights Grid */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border/70 pt-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="text-left">
                  <span className="block font-mono text-[10px] uppercase text-muted tracking-wider">
                    {metric.label}
                  </span>
                  <span className="block text-base font-semibold text-text font-sans mt-0.5">
                    {metric.value}
                  </span>
                  <span className="block text-[11px] text-secondary truncate mt-0.5">
                    {metric.detail}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
