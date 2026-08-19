import { Mail, Linkedin, Github, FileText } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { profile, links } from '../data/profile.js'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="panel hero-wash overflow-hidden p-8 sm:p-12">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              Open to software and AI/ML internships.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              If you are hiring, or you want to talk about a project, email is the fastest way to
              reach me.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <Mail size={16} aria-hidden="true" />
                Email me
              </a>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <FileText size={16} aria-hidden="true" />
                Resume
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
            </div>

            <p className="mt-8 font-mono text-xs text-muted">{profile.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
