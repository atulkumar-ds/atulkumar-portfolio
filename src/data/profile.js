// ---------------------------------------------------------------------------
// PROFILE — single source of truth for personal details.
//
// Every value here is verifiable from the resume, public GitHub account, or
// confirmed academic records. No estimated numbers or rounded-up counts.
// Dynamic statistics (ratings, solved counts, repository activity) are fetched
// at runtime by src/services/codingProfiles.js.
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
    'I build robust software and deep learning systems — from C++ algorithms to multi-spectral semantic segmentation networks and self-correcting agentic RAG state machines.',
  location: 'Kurnool, Andhra Pradesh, India',
  email: 'atul.ramanand.kumar@gmail.com',
  heroStack: ['Python', 'PyTorch', 'LangGraph', 'C++', 'FastAPI', 'DSA'],
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
      'Deep Learning',
      'Linear Algebra',
      'Probability and Statistics',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Computer Networks',
    ],
  },
]

// Coding platform identities. Statistics are fetched dynamically at runtime.
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

// Verified open repositories linked from the Education / activity panel.
export const repositories = [
  {
    name: 'RGB-Thermal-Semantic-Segmentation',
    description:
      'Multi-spectral segmentation fusing RGB and thermal LWIR with dual ResNet-18 encoders and 5-scale CMAF.',
    url: 'https://github.com/atulkumar-ds/RGB-Thermal-Semantic-Segmentation',
  },
  {
    name: 'Self-RAG-On-Indian-Constitution',
    description:
      '16-node LangGraph self-correcting RAG pipeline with DeepSeek R1/V3, ChromaDB, and Ragas evaluation.',
    url: 'https://github.com/atulkumar-ds/Self-RAG-On-Indian-Constitution',
  },
  {
    name: 'LoveDA-UNet',
    description:
      '7.77M parameter PyTorch U-Net for domain-adaptive geospatial land-cover semantic segmentation.',
    url: 'https://github.com/atulkumar-ds/LoveDA-UNet',
  },
  {
    name: 'Image-Captioning',
    description:
      'Two-version captioning system comparing CNN + LSTM baseline against Bahdanau spatial attention.',
    url: 'https://github.com/atulkumar-ds/Image-Captioning',
  },
  {
    name: 'ML-Algorithm-From-Scratch',
    description:
      'Logistic regression, gradient descent, KNN, and Gaussian Naive Bayes implemented from scratch in NumPy.',
    url: 'https://github.com/atulkumar-ds/ML-Algorithm-From-Scratch',
  },
  {
    name: 'DSA-Practice',
    description:
      'Structured DSA solutions in C++, organized by algorithmic topic and LeetCode daily problems.',
    url: 'https://github.com/atulkumar-ds/DSA-Practice',
  },
]

export const currentlyLearning = [
  { topic: 'Multi-modal Vision Transformers', note: 'Cross-attention fusion with SegFormer and Swin backbones' },
  { topic: 'Agentic Workflows & Graph RAG', note: 'Hierarchical multi-agent state machines and vector search' },
  { topic: 'High-Performance C++ & DSA', note: 'Advanced graphs, dynamic programming, and low-latency systems' },
  { topic: 'Efficient Model Serving', note: 'TensorRT FP16 quantization and FastAPI streaming pipelines' },
]
