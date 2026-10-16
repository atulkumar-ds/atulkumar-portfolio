import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, FileText, Github } from 'lucide-react'
import { profile, links } from '../data/profile.js'

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

  // Track scroll position for backdrop blur and subtle border
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight active section on home page
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
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname, hash])

  const sectionHref = (target) => (onHome ? `#${target}` : `/#${target}`)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/80 bg-midnight/90 backdrop-blur-md shadow-lg shadow-black/20'
          : 'border-b border-transparent bg-midnight/40 backdrop-blur-sm'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between">
        {/* Left: Brand Identity */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-colors"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-cyan font-mono text-sm font-semibold transition-colors group-hover:border-cyan/50">
            AK
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-sm text-text group-hover:text-cyan transition-colors">
              {profile.name}
            </span>
            <span className="text-[11px] text-muted">
              AI/ML &amp; Software Engineering
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 bg-surface/60 border border-border/60 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = onHome && activeSection === item.target
            return (
              <a
                key={item.target}
                href={sectionHref(item.target)}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-cyan bg-cyan/10 font-semibold shadow-sm'
                    : 'text-secondary hover:text-text hover:bg-elevated/40'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right: Quick Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-secondary hover:border-border-active hover:text-text transition-colors"
            title="GitHub Profile"
          >
            <Github size={14} aria-hidden="true" />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <a
            href={profile.resumePath}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-cyan/40 bg-cyan/10 px-3.5 py-1.5 text-xs font-medium text-cyan hover:bg-cyan hover:text-midnight transition-all duration-200"
          >
            <FileText size={14} aria-hidden="true" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex items-center justify-center p-2 rounded-lg border border-border bg-surface text-secondary hover:text-text md:hidden transition-colors"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-b border-border bg-midnight/98 backdrop-blur-xl md:hidden shadow-2xl"
          >
            <div className="shell py-5 space-y-4">
              <ul className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <li key={item.target}>
                    <a
                      href={sectionHref(item.target)}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/60 px-3.5 py-2.5 text-xs font-medium text-text hover:border-cyan/40 hover:text-cyan transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="text-muted text-[10px]">&rarr;</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex gap-3">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary flex-1 text-xs text-center"
                >
                  <FileText size={14} aria-hidden="true" />
                  Resume PDF
                </a>
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary flex-1 text-xs text-center"
                >
                  <Github size={14} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
