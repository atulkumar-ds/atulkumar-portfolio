import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center pt-24 pb-20">
      <div className="shell">
        <div className="rounded-2xl border border-border/80 bg-surface/80 max-w-xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 text-cyan font-mono text-xs mb-4">
            <AlertCircle size={15} />
            <span className="uppercase tracking-wider font-semibold">404 · Page Not Found</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-normal text-text leading-tight">
            Target route does not exist.
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-secondary">
            The requested resource cannot be located. All architectural case studies, active repositories, and contact endpoints are available on the home page.
          </p>

          <div className="mt-8">
            <Link to="/" className="btn-primary">
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

