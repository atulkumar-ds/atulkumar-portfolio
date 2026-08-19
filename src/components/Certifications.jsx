import { ArrowUpRight } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { certifications } from '../data/certifications.js'

export default function Certifications() {
  if (certifications.length === 0) return null

  return (
    <Section id="certifications" eyebrow="Certifications" title="Courses I have completed.">
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((certificate, index) => (
          <Reveal key={certificate.name} delay={index * 0.06}>
            <a
              href={certificate.url}
              target="_blank"
              rel="noreferrer"
              className="panel panel-hover group flex h-full items-start justify-between gap-4 p-6"
            >
              <div>
                <h3 className="text-[15px] leading-snug text-text">{certificate.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {certificate.provider}
                  {certificate.year && ` · ${certificate.year}`}
                </p>
                <p className="mt-4 text-xs text-brass">View certificate</p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-line transition-colors group-hover:text-brass"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
