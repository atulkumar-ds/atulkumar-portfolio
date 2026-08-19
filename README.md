# Atul Kumar — Portfolio (V2)

React + Vite + Tailwind + Framer Motion + React Router. No TypeScript, no state
management library, no UI kit.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Before you deploy

1. **Add your resume.** Save the PDF as `public/resume/Atul_Kumar_Resume.pdf`.
   Four buttons already point at that path. See `public/resume/README.txt`.
2. **Check the coding profile cards** in a browser. GitHub and Codeforces use
   official APIs and should always work. LeetCode, CodeChef and GeeksforGeeks
   use community endpoints — if one is dead, set `enabled: false` for that
   provider in `src/services/codingProfiles.js`.
3. **Set your live domain** in the `og:url` meta tag in `index.html`.

## Where things live

```
src/
├── data/                   all content — edit here, never in a component
│   ├── profile.js          name, links, education, coding handles
│   ├── projects.js         every project and case study
│   ├── skills.js           skill groups and the positioning strip
│   └── certifications.js   certificates and activities
│
├── services/
│   └── codingProfiles.js   live API layer, knows nothing about React
│
├── components/             reusable UI
├── pages/                  one file per route
└── index.css               design tokens as Tailwind component classes
```

## The rule this site is built on

Nothing appears on this site that cannot be verified from the resume or from a
public GitHub repository. Where a number does not exist, the page says so
rather than inventing one — see the V2 evaluation section on the Image
Captioning page for the clearest example.

If you add a claim, add it to a file in `src/data/` and make sure you could
defend it in an interview.

## Adding a project

1. Copy an object in `src/data/projects.js`, give it a unique `slug`.
2. Create `src/pages/YourProject.jsx` using `CaseStudyLayout`.
3. Add a route in `src/App.jsx` at `/projects/<slug>`.

Categories are derived from the data automatically, so the filter buttons
update themselves.
