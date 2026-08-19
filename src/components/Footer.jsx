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
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <Link to="/" className="font-display text-lg transition-colors hover:text-brass">
            {profile.name}
          </Link>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            Software Engineer · AI &amp; Data Science
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
                  className="text-xs text-muted transition-colors hover:text-brass"
                >
                  {social.label}
                </a>
              </li>
            ))}
        </ul>
      </div>

      <p className="shell mt-8 text-[11px] text-muted/70">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite and Tailwind CSS.
      </p>
    </footer>
  )
}
