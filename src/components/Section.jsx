import Reveal from './Reveal.jsx'

/**
 * Editorial section wrapper providing unified typographic hierarchy,
 * clean margins, and consistent spacing across all portfolio sections.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = '',
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-border/80 py-20 sm:py-24 relative ${className}`}
    >
      <div className="shell">
        <Reveal>
          <div className="max-w-3xl mb-12">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h2 className="font-display text-4xl sm:text-5xl text-text tracking-tight leading-[1.08]">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-secondary">
                {intro}
              </p>
            )}
          </div>
        </Reveal>

        <div>{children}</div>
      </div>
    </section>
  )
}
