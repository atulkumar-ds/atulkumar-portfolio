import Reveal from './Reveal.jsx'

/**
 * One page section: anchor id, mono eyebrow label, serif title, optional intro.
 * Using this everywhere keeps vertical rhythm identical across the page.
 */
export default function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-line py-20 sm:py-28 ${className}`}>
      <div className="shell">
        <Reveal>
          <div className="max-w-2xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
            {intro && <p className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</p>}
          </div>
        </Reveal>

        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
