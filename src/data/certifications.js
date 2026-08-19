// Certificate URLs come from the resume. The second one was written as a bare
// http:// link in the source file; the scheme is normalised here so browsers
// do not flag it as insecure. The path is unchanged.

export const certifications = [
  {
    name: 'Machine Learning A–Z: AI, Python and R',
    provider: 'Udemy',
    year: '',
    url: 'https://www.udemy.com/certificate/UC-ae4ce2a3-70a6-49eb-a31d-a120d71d2b6b/',
  },
  {
    name: 'Data Structures and Algorithms in Python',
    provider: 'Udemy',
    year: '',
    url: 'https://www.udemy.com/certificate/UC-006abcdf-75f3-4151-980b-3c0d927c757e/',
  },
]

// The V1 site listed Smart India Hackathon and "3 hackathons" here. Both were
// flagged as unconfirmed in the resume source and nothing on the GitHub
// account corroborates them, so they were removed in the V2 factual audit.
// If you have proof (certificate, team page, submission link), add entries in
// this shape and the Education section will render them again.
export const activities = []
