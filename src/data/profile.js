// ---------------------------------------------------------------------------
// PROFILE — single source of truth for personal details.
//
// Rule for this file: every value here must be verifiable from the resume,
// the GitHub account, or something Atul has confirmed. No estimated numbers,
// no rounded-up counts. Anything that changes over time (ratings, solved
// counts, repo counts) is NOT stored here — it is fetched at runtime by
// src/services/codingProfiles.js.
// ---------------------------------------------------------------------------

// Vite rewrites import.meta.env.BASE_URL at build time ('/' unless a custom
// `base` is set in vite.config.js). Building the path from it means the resume
// URL is correct in dev, in `npm run build` output, and on Vercel — including
// the case where the site is ever served from a sub-path.
const RESUME_FILE_NAME = 'Atul_Kumar_Resume.pdf'
const RESUME_PATH = `${import.meta.env.BASE_URL}resume/${RESUME_FILE_NAME}`

export const profile = {
  name: 'Atul Kumar',
  role: 'Software Engineer | AI & Data Science',
  tagline:
    'I build software and apply machine learning to real problems — from C++ data structures to an attention-based captioning model running behind a web app.',
  location: 'Kurnool, Andhra Pradesh, India',
  email: 'atul.ramanand.kumar@gmail.com',
  heroStack: ['C++', 'Python', 'DSA', 'TensorFlow', 'Streamlit'],
  resumePath: RESUME_PATH,
  resumeFileName: RESUME_FILE_NAME,
}

// Verified URLs. Do not change these without checking the live page first.
export const links = {
  github: 'https://github.com/atulkumar-ds',
  linkedin: 'https://www.linkedin.com/in/atul-kumar-iiitdm/',
  leetcode: 'https://leetcode.com/u/atulkumar_ds/',
  codechef: 'https://www.codechef.com/users/atul_35076',
  codeforces: 'https://codeforces.com/profile/atulkumar-ds',
  geeksforgeeks: 'https://www.geeksforgeeks.org/profile/iatulkummwmo?tab=activity',
}

export const education = [
  {
    institution:
      'Indian Institute of Information Technology Design and Manufacturing (IIITDM) Kurnool',
    shortName: 'IIITDM Kurnool',
    degree: 'Bachelor of Technology',
    branch: 'Artificial Intelligence and Data Science',
    grade: 'CGPA 8.16 / 10',
    period: 'Aug 2024 — May 2028 (Expected)',
    year: 'Third year, 2026–27',
    location: 'Kurnool, India',
    coursework: [
      'Data Structures and Algorithms',
      'Machine Learning',
      'Linear Algebra',
      'Probability and Statistics',
      'Object-Oriented Programming',
      'DBMS',
    ],
  },
]

// Coding platform identities. Statistics are deliberately absent — the cards
// read them from the live services layer at runtime.
//
// `provider` maps to a fetcher key in src/services/codingProfiles.js.
export const codingProfiles = [
  { platform: 'LeetCode', handle: 'atulkumar_ds', provider: 'leetcode', url: links.leetcode },
  { platform: 'CodeChef', handle: 'atul_35076', provider: 'codechef', url: links.codechef },
  { platform: 'Codeforces', handle: 'atulkumar-ds', provider: 'codeforces', url: links.codeforces },
  {
    platform: 'GeeksforGeeks',
    handle: 'iatulkummwmo',
    provider: 'geeksforgeeks',
    url: links.geeksforgeeks,
  },
  { platform: 'GitHub', handle: 'atulkumar-ds', provider: 'github', url: links.github },
]

// Public repositories worth linking from the Education / activity panel.
// Every entry below exists on the GitHub account.
export const repositories = [
  {
    name: 'DSA-Practice',
    description: 'Structured DSA practice in C++, organised by topic, with LeetCode daily solutions.',
    url: 'https://github.com/atulkumar-ds/DSA-Practice',
  },
  {
    name: 'Image-Captioning',
    description: 'Two-version captioning project: CNN + LSTM baseline, then Bahdanau attention.',
    url: 'https://github.com/atulkumar-ds/Image-Captioning',
  },
  {
    name: 'ML-Algorithm-From-Scratch',
    description: 'Logistic regression, gradient descent, KNN and Gaussian Naive Bayes in NumPy.',
    url: 'https://github.com/atulkumar-ds/ML-Algorithm-From-Scratch',
  },
]

export const currentlyLearning = [
  { topic: 'Sequence models', note: 'Attention, teacher forcing and decoding strategies' },
  { topic: 'Computer vision', note: 'CNN architectures and transfer learning' },
  { topic: 'Data structures', note: 'Graphs, dynamic programming and recursion in C++' },
  { topic: 'Shipping models', note: 'Packaging a trained model behind a usable interface' },
]
