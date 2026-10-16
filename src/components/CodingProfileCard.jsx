import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fetchProfileStats } from '../services/codingProfiles.js'

export default function CodingProfileCard({ platform, handle, provider, url }) {
  const [state, setState] = useState({ status: 'loading', stats: [] })

  useEffect(() => {
    let active = true

    fetchProfileStats(provider).then((result) => {
      if (active) setState(result)
    })

    return () => {
      active = false
    }
  }, [provider])

  const isLoading = state.status === 'loading'
  const hasStats = state.status === 'ok' && state.stats.length > 0

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-surface/80 p-6 backdrop-blur-sm hover:border-cyan/40 hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div>
        <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
              <h3 className="font-display text-2xl font-normal text-text leading-none group-hover:text-cyan transition-colors">
                {platform}
              </h3>
            </div>
            <p className="mt-2 font-mono text-xs text-secondary/80">@{handle}</p>
          </div>

          <ArrowUpRight
            size={16}
            className="text-muted transition-all group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>

        <div className="mt-5">
          {isLoading && <StatSkeleton />}

          {hasStats && (
            <dl className="space-y-2.5">
              {state.stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-1.5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-secondary">
                    {stat.label}
                  </dt>
                  <dd className="font-mono text-sm text-cyan font-semibold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {!isLoading && !hasStats && (
            <p className="font-mono text-xs leading-relaxed text-muted">
              Live stats temporarily unavailable.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-3.5">
        <span className="flex items-center gap-2 font-mono text-[11px] text-secondary">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              hasStats ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]' : 'bg-muted'
            }`}
            aria-hidden="true"
          />
          {isLoading ? 'Fetching...' : hasStats ? 'Verified Live' : 'Profile'}
        </span>
        <span className="font-mono text-xs text-cyan transition-all group-hover:translate-x-0.5">
          View profile &rarr;
        </span>
      </div>
    </a>
  )
}

function StatSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {[0, 1].map((row) => (
        <div key={row} className="flex items-center justify-between gap-4">
          <span className="h-2.5 w-24 animate-pulse rounded bg-elevated" />
          <span className="h-2.5 w-12 animate-pulse rounded bg-elevated" />
        </div>
      ))}
      <span className="sr-only">Loading profile statistics</span>
    </div>
  )
}

