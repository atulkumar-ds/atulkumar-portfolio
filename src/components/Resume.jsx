import { useEffect, useState } from 'react'
import { FileText, Download, ExternalLink } from 'lucide-react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { profile, education } from '../data/profile.js'
import { skillGroups } from '../data/skills.js'
import { projects } from '../data/projects.js'

/**
 * The resume section.
 *
 * Every resume link on the site — here, the navbar, the hero and the contact
 * panel — resolves to profile.resumePath, which is the single static file in
 * public/resume/. These are plain anchors, not React Router links, so the
 * browser fetches the PDF instead of the router trying to match it as a route.
 *
 * The preview is the real document rendered by the browser's own PDF viewer
 * via <object>. No pdf.js, no react-pdf, no worker bundle. If the browser
 * cannot display a PDF inline (most mobile browsers, some locked-down desktop
 * configs) the <object> fallback children render instead: a plain button that
 * opens the same file.
 */
export default function Resume() {
  const school = education[0]

  // Chrome/Edge honour these viewer parameters; other browsers ignore them
  // harmlessly. FitH makes the page width fill the panel.
  const previewSrc = `${profile.resumePath}#view=FitH&toolbar=0&navpanes=0`

  // `available` is null while we check, true if the file really is a PDF,
  // false if it is missing. The check matters because the SPA rewrite means a
  // missing file returns index.html with a 200 — <object> would then try to
  // render the HTML page rather than falling back.
  const [available, setAvailable] = useState(null)

  useEffect(() => {
    let cancelled = false

    fetch(profile.resumePath, { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || ''
        if (!cancelled) setAvailable(res.ok && type.includes('pdf'))
      })
      // If HEAD is blocked or the network hiccups, stay optimistic and let the
      // browser try; <object> still has its own fallback.
      .catch(() => {
        if (!cancelled) setAvailable(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const summary = [
    { label: 'Education', value: `${school.degree}, ${school.branch}` },
    { label: 'Institute', value: `${school.shortName} · ${school.grade}` },
    { label: 'Projects', value: `${projects.length} documented case studies` },
    { label: 'Core stack', value: skillGroups[0].items.join(' · ') },
  ]

  const openButton = (
    <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn-primary">
      <ExternalLink size={16} aria-hidden="true" />
      Open Resume PDF
    </a>
  )

  return (
    <Section
      id="resume"
      eyebrow="Resume"
      title="The one-page version."
      intro="A concise overview of my education, technical skills, projects and qualifications."
    >
      <Reveal>
        <div className="panel grid gap-10 p-6 sm:p-9 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <dl className="space-y-5">
              {summary.map((row) => (
                <div key={row.label} className="flex gap-4">
                  <span className="node-dot mt-1.5" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-text">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <FileText size={16} aria-hidden="true" />
                View resume
              </a>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="btn-ghost"
              >
                <Download size={16} aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>

          {/* The actual document. Hidden below lg because inline PDF rendering
              is unreliable on phones — the buttons above cover that case. */}
          <div className="hidden overflow-hidden rounded-md border border-line bg-ink/60 lg:flex lg:flex-col">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {profile.resumeFileName}
              </span>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-brass"
                aria-label="Open the resume PDF in a new tab"
              >
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="relative h-[560px]">
              {available === false ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="text-sm leading-relaxed text-muted">
                    The PDF could not be loaded in this view.
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
                    {/* Rendered only when the browser has no inline PDF viewer. */}
                    <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                      <p className="text-sm leading-relaxed text-muted">
                        Your browser cannot display PDFs inline.
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
