import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="hero-wash flex min-h-[70vh] items-center">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">
          This page does not exist.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          The link may be out of date, or the address has a typo in it. The projects and contact
          details are all on the home page.
        </p>
        <Link to="/" className="btn-primary mt-9">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </section>
  )
}
