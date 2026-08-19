import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { profile } from '../data/profile.js'

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Coding', target: 'coding' },
  { label: 'Education', target: 'education' },
  { label: 'Resume', target: 'resume' },
  { label: 'Contact', target: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { pathname, hash } = useLocation()

  const onHome = pathname === '/'

  // Background + border on the bar once the page has moved.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight whichever section is currently in view. Only runs on the home
  // page, since the project pages have no anchors to track.
  useEffect(() => {
    if (!onHome) {
      setActiveSection('')
      return
    }

    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      // The top band is ignored so a section counts as current once it has
      // cleared the fixed navbar, rather than the moment it appears.
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  // Section links only exist on the home page, so route back to it elsewhere.
  const sectionHref = (target) => (onHome ? `#${target}` : `/#${target}`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between" aria-label="Main">
        <Link
          to="/"
          className="font-display text-xl tracking-wide text-text transition-colors hover:text-brass"
        >
          {profile.name}
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = onHome && activeSection === item.target
            return (
              <li key={item.target}>
                {onHome ? (
                  <a
                    href={sectionHref(item.target)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-sm transition-colors ${
                      isActive ? 'text-brass' : 'text-muted hover:text-text'
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={sectionHref(item.target)}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
          <li>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost px-4 py-2 text-xs"
            >
              <FileText size={14} aria-hidden="true" />
              Resume PDF
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded p-2 text-text md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-ink/98 backdrop-blur-md md:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navItems.map((item) =>
                onHome ? (
                  <li key={item.target}>
                    <a
                      href={sectionHref(item.target)}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-line/60 py-3.5 text-base text-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.target}>
                    <Link
                      to={sectionHref(item.target)}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-line/60 py-3.5 text-base text-text"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li className="pt-4">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full"
                >
                  <FileText size={15} aria-hidden="true" />
                  Open resume PDF
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
