import { Link } from 'react-router-dom'
import { profile, links } from '../data/profile.js'

const socials = [
  { label: 'GitHub', url: links.github },
  { label: 'LinkedIn', url: links.linkedin },
  { label: 'LeetCode', url: links.leetcode },
  { label: 'CodeChef', url: links.codechef },
  { label: 'Codeforces', url: links.codeforces },
  { label: 'GeeksforGeeks', url: links.geeksforgeeks },
]

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/50 py-12">
      <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <Link
            to="/"
            className="font-display text-2xl font-normal text-text transition-colors hover:text-cyan"
          >
            {profile.name}
          </Link>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-secondary">
            {profile.role}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {socials
            .filter((social) => social.url)
            .map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-secondary transition-colors hover:text-cyan"
                >
                  {social.label}
                </a>
              </li>
            ))}
        </ul>
      </div>

      <div className="shell mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Engineered with React, Vite &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <span>IIITDM Kurnool</span>
        </div>
      </div>
    </footer>
  )
}

