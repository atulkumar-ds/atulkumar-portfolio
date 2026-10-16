import { useEffect, useState } from 'react'
import { FileText, Download, ExternalLink } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { profile, education } from '../data/profile.js'
import { skillGroups } from '../data/skills.js'
import { projects } from '../data/projects.js'

export default function Resume() {
  const school = education[0]
  const previewSrc = `${profile.resumePath}#view=FitH&toolbar=0&navpanes=0`

  const [available, setAvailable] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(profile.resumePath, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || ''
        if (!cancelled) setAvailable(res.ok && type.includes('pdf'))
      })
      .catch(() => {
        if (!cancelled) setAvailable(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const summary = [
    { label: 'Degree & Discipline', value: `${school.degree}, ${school.branch}` },
    { label: 'Institute & Standing', value: `${school.shortName} · ${school.grade}` },
    { label: 'Documented Case Studies', value: `${projects.length} verified repositories` },
    { label: 'Core Technical Stack', value: skillGroups[0].items.join(' · ') },
    { label: 'Direct Email', value: profile.email },
  ]

  const openButton = (
    <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn-primary">
      <ExternalLink size={15} aria-hidden="true" />
      Open Resume PDF
    </a>
  )

  return (
    <Section
      id="resume"
      eyebrow="Specification Sheet"
      title="The One-Page Overview"
      intro="A concise summary of my academic background, technical competencies, documented research projects, and contact qualifications."
    >
      <Reveal>
        <div className="rounded-2xl border border-border/80 bg-surface/80 grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_0.9fr] items-start backdrop-blur-sm shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">Candidate Specifications</span>
              <span className="font-mono text-xs text-muted">Format: PDF</span>
            </div>

            <dl className="space-y-4 font-mono">
              {summary.map((row) => (
                <div key={row.label} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/40 pb-3">
                  <dt className="text-xs uppercase tracking-wider text-secondary shrink-0">
                    {row.label}
                  </dt>
                  <dd className="text-xs sm:text-sm text-text font-medium text-left sm:text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <FileText size={15} aria-hidden="true" />
                View resume
              </a>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="btn-ghost"
              >
                <Download size={15} aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>

          {/* PDF Viewport Window */}
          <div className="hidden overflow-hidden rounded-xl border border-border/80 bg-midnight lg:flex lg:flex-col shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5 bg-elevated font-mono">
              <div className="flex items-center gap-2 text-secondary text-xs">
                <span className="h-2 w-2 rounded-full bg-cyan/60" />
                <span>{profile.resumeFileName}</span>
              </div>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="text-secondary hover:text-cyan transition-colors"
                aria-label="Open the resume PDF in a new tab"
              >
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>

            <div className="relative h-[560px]">
              {available === false ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="font-mono text-xs text-secondary">
                    The PDF preview is not accessible in this frame.
                  </p>
                  {openButton}
                </div>
              ) : (
                available !== null && (
                  <object
                    data={previewSrc}
                    type="application/pdf"
                    title={`${profile.name} resume`}
                    className="h-full w-full"
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                      <p className="font-mono text-xs text-secondary">
                        Click below to open the resume document directly.
                      </p>
                      {openButton}
                    </div>
                  </object>
                )
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

