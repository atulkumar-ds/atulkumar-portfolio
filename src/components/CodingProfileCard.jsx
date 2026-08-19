import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { fetchProfileStats } from '../services/codingProfiles.js'

/**
 * One coding platform card.
 *
 * Fetching lives in src/services/codingProfiles.js — this component only
 * decides what to show for each of the three states it can be in:
 *
 *   loading      two skeleton rows
 *   ok           the live rows the service returned
 *   unavailable  a short message, and the profile link still works
 *
 * It never renders 0, null, undefined, NaN or a hardcoded number.
 */
export default function CodingProfileCard({ platform, handle, provider, url }) {
  const [state, setState] = useState({ status: 'loading', stats: [] })

  useEffect(() => {
    let active = true

    fetchProfileStats(provider).then((result) => {
      if (active) setState(result)
    })

    // Stops a state update if the visitor navigates away mid-request.
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
      className="panel panel-hover group flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl leading-none">{platform}</h3>
          <p className="mt-2 font-mono text-xs text-muted">@{handle}</p>
        </div>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-line transition-colors group-hover:text-brass"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6 flex-1">
        {isLoading && <StatSkeleton />}

        {hasStats && (
          <dl className="space-y-2">
            {state.stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {stat.label}
                </dt>
                <dd className="font-mono text-sm text-brass">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {!isLoading && !hasStats && (
          <p className="text-sm leading-relaxed text-muted">
            Live stats temporarily unavailable.
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              hasStats ? 'bg-brass' : 'bg-line'
            }`}
            aria-hidden="true"
          />
          {isLoading ? 'Loading' : hasStats ? 'Latest available data' : 'Profile only'}
        </span>
        <span className="text-xs text-brass transition-opacity group-hover:opacity-75">
          View profile
        </span>
      </div>
    </a>
  )
}

/** Two hairline bars standing in for the rows that are about to arrive. */
function StatSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {[0, 1].map((row) => (
        <div key={row} className="flex items-center justify-between gap-4">
          <span className="h-2.5 w-20 animate-pulse rounded bg-line" />
          <span className="h-2.5 w-10 animate-pulse rounded bg-line" />
        </div>
      ))}
      <span className="sr-only">Loading profile statistics</span>
    </div>
  )
}
