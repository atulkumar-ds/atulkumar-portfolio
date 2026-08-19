// ---------------------------------------------------------------------------
// CODING PROFILES — live data layer.
//
// This file knows how to talk to each platform. It knows nothing about React.
// The UI imports one function, fetchProfileStats(), and receives a normalised
// shape back regardless of which platform it asked for.
//
// Design rules this file follows:
//   1. No API keys. Every endpoint below is public and unauthenticated, so
//      nothing secret ends up in the bundle.
//   2. Never return a stale or invented number. A failed request returns
//      status 'unavailable' and the card shows a message, not a zero.
//   3. Cache in sessionStorage so navigating around the site does not
//      re-hit five APIs on every render.
//   4. Every request has a timeout, because a hanging third-party endpoint
//      should not leave a card spinning forever.
//
// ENDPOINT RELIABILITY — read this before trusting a number on the page.
//
//   GitHub and Codeforces are official, documented, CORS-enabled public APIs.
//   They are as reliable as the platforms themselves.
//
//   LeetCode, CodeChef and GeeksforGeeks publish no official public API for
//   profile statistics. The endpoints configured below are community-run
//   services that read the public profile pages. They are the standard
//   choice for this job, but they are third-party infrastructure: they can
//   be rate-limited, cold-start slow, or go offline without notice. That is
//   exactly why the failure state is a first-class part of this module.
//
//   If one of them stops working, set `enabled: false` on that provider. The
//   card keeps its handle and its working profile link and simply stops
//   claiming a number.
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'coding-profile:'
const CACHE_TTL_MS = 30 * 60 * 1000 // 30 minutes
const REQUEST_TIMEOUT_MS = 9000

// Handles live in one place so they cannot drift from src/data/profile.js.
export const handles = {
  github: 'atulkumar-ds',
  leetcode: 'atulkumar_ds',
  codechef: 'atul_35076',
  codeforces: 'atulkumar-ds',
  geeksforgeeks: 'iatulkummwmo',
}

// --------------------------------------------------------------------------
// Small helpers
// --------------------------------------------------------------------------

function readCache(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null

    const entry = JSON.parse(raw)
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) return null

    return entry.value
  } catch {
    // Private browsing, disabled storage, corrupted entry — all fine, just skip.
    return null
  }
}

function writeCache(key, value) {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ savedAt: Date.now(), value }),
    )
  } catch {
    // Storage full or unavailable. Caching is an optimisation, not a requirement.
  }
}

async function getJson(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`${url} responded ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

// Turns 1234 into "1,234" and leaves anything unusable as null so the caller
// can drop the row rather than print "undefined".
function count(value) {
  const number = Number(value)
  if (!Number.isFinite(number)) return null
  return number.toLocaleString('en-IN')
}

// --------------------------------------------------------------------------
// Providers
//
// Each provider returns an array of { label, value } rows. Returning an empty
// array is treated as a failure, because a card with no numbers on it is not
// meaningfully different from one that could not load.
// --------------------------------------------------------------------------

const providers = {
  // Official REST API. https://docs.github.com/en/rest
  github: {
    enabled: true,
    source: 'GitHub REST API (official)',
    async fetchStats(handle) {
      const data = await getJson(`https://api.github.com/users/${handle}`)

      return [
        { label: 'Public repos', value: count(data.public_repos) },
        { label: 'Followers', value: count(data.followers) },
      ].filter((row) => row.value !== null)
    },
  },

  // Official API. https://codeforces.com/apiHelp
  codeforces: {
    enabled: true,
    source: 'Codeforces API (official)',
    async fetchStats(handle) {
      const data = await getJson(
        `https://codeforces.com/api/user.info?handles=${handle}`,
      )

      if (data.status !== 'OK' || !data.result?.length) {
        throw new Error('Codeforces returned no user')
      }

      const user = data.result[0]

      return [
        { label: 'Rating', value: count(user.rating) },
        { label: 'Max rating', value: count(user.maxRating) },
        { label: 'Rank', value: user.rank || null },
      ].filter((row) => row.value !== null)
    },
  },

  // Community endpoint. No official LeetCode public REST API exists.
  leetcode: {
    enabled: true,
    source: 'alfa-leetcode-api (community, unofficial)',
    async fetchStats(handle) {
      const data = await getJson(
        `https://alfa-leetcode-api.onrender.com/userProfile/${handle}`,
      )

      return [
        { label: 'Problems solved', value: count(data.totalSolved) },
        { label: 'Global rank', value: count(data.ranking) },
      ].filter((row) => row.value !== null)
    },
  },

  // Community endpoint. CodeChef publishes no public profile API.
  codechef: {
    enabled: true,
    source: 'codechef-api.vercel.app (community, unofficial)',
    async fetchStats(handle) {
      const data = await getJson(`https://codechef-api.vercel.app/handle/${handle}`)

      // The stars field arrives as a string like "2★" on this endpoint.
      const stars = typeof data.stars === 'string' ? data.stars.trim() : null

      return [
        { label: 'Rating', value: count(data.currentRating) },
        { label: 'Highest', value: count(data.highestRating) },
        { label: 'Stars', value: stars || null },
      ].filter((row) => row.value !== null)
    },
  },

  // Community endpoint. GeeksforGeeks publishes no public profile API.
  geeksforgeeks: {
    enabled: true,
    source: 'geeks-for-geeks-api.vercel.app (community, unofficial)',
    async fetchStats(handle) {
      const data = await getJson(`https://geeks-for-geeks-api.vercel.app/${handle}`)
      const info = data.info || {}

      return [
        { label: 'Problems solved', value: count(info.totalProblemsSolved) },
        { label: 'Coding score', value: count(info.codingScore) },
      ].filter((row) => row.value !== null)
    },
  },
}

// --------------------------------------------------------------------------
// Public interface
// --------------------------------------------------------------------------

/**
 * Fetch normalised statistics for one platform.
 *
 * Always resolves — it never throws at the caller — with one of:
 *   { status: 'ok',          stats: [{ label, value }], cached, source }
 *   { status: 'unavailable', stats: [],                 source }
 *   { status: 'disabled',    stats: [] }
 */
export async function fetchProfileStats(providerKey) {
  const provider = providers[providerKey]

  if (!provider) {
    return { status: 'unavailable', stats: [], source: 'No provider configured' }
  }

  if (!provider.enabled) {
    return { status: 'disabled', stats: [], source: provider.source }
  }

  const cached = readCache(providerKey)
  if (cached) {
    return { ...cached, cached: true }
  }

  try {
    const stats = await provider.fetchStats(handles[providerKey])

    if (!stats.length) {
      throw new Error('Provider returned no usable statistics')
    }

    const result = { status: 'ok', stats, source: provider.source }
    writeCache(providerKey, result)

    return { ...result, cached: false }
  } catch (error) {
    // Logged, not surfaced. The card shows a plain message to the visitor.
    console.warn(`[codingProfiles] ${providerKey} unavailable:`, error.message)
    return { status: 'unavailable', stats: [], source: provider.source }
  }
}

export function getProviderSource(providerKey) {
  return providers[providerKey]?.source ?? 'Unknown'
}
