import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router does not restore scroll position or honour #hash targets on its
 * own. This handles both:
 *   - a plain route change goes to the top of the page
 *   - a route with a hash scrolls to that element once it has rendered
 *
 * The rAF is what makes "/#projects" work from a project page: the home page
 * has to paint before the target element exists to scroll to.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo(0, 0)
      }
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
