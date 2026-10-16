import { ArrowUpRight, Award } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { certifications } from '../data/certifications.js'

export default function Certifications() {
  if (certifications.length === 0) return null

  return (
    <Section
      id="certifications"
      eyebrow="Credentials & Specializations"
      title="Certifications & Validations"
      intro="Structured algorithmic, machine learning, and deep learning coursework completed with verified credentials."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((certificate, index) => (
          <Reveal key={certificate.name} delay={index * 0.06}>
            <a
              href={certificate.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-start justify-between gap-4 rounded-xl border border-border/80 bg-surface/80 p-6 backdrop-blur-sm hover:border-cyan/40 hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-2 text-cyan text-xs font-mono font-medium">
                  <Award size={14} />
                  <span>Credential 0{index + 1}</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-normal text-text leading-snug group-hover:text-cyan transition-colors">
                  {certificate.name}
                </h3>

                <p className="mt-2 font-mono text-xs text-secondary">
                  Provider: <span className="text-text font-medium">{certificate.provider}</span>
                  {certificate.year && ` · Issued ${certificate.year}`}
                </p>

                <p className="mt-4 font-mono text-xs text-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Verify online</span>
                  <span>&rarr;</span>
                </p>
              </div>

              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-muted transition-all group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

