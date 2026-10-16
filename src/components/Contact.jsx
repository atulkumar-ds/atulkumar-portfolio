import { Mail, Linkedin, Github, FileText } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { profile, links } from '../data/profile.js'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border/60 py-20 sm:py-28 relative">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface/80 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
            {/* Ambient cyan glow */}
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan/5 blur-3xl" />

            {/* Top Transmission Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-8">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.7)] animate-pulse" />
                <span className="font-medium text-cyan">Direct Contact</span>
              </div>
              <span className="font-mono text-xs text-muted">
                Open to Opportunities
              </span>
            </div>

            <div className="max-w-2xl">
              <h2 className="font-display text-4xl sm:text-5xl font-normal leading-tight text-text">
                Open to software and AI/ML internships.
              </h2>
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-secondary">
                If you are hiring, or you want to talk about a deep learning project or software architecture, email is the fastest way to reach me.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <Mail size={15} aria-hidden="true" />
                <span>Email me</span>
              </a>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <FileText size={15} aria-hidden="true" />
                <span>Resume PDF</span>
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={15} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={15} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="mt-10 border-t border-border/60 pt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-secondary">
              <span>Location: {profile.location}</span>
              <span className="text-cyan font-medium">Available for on-site &amp; remote roles</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

