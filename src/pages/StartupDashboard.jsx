import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  CardGrid,
} from '../components/CaseStudyLayout.jsx'
import Pipeline from '../components/Pipeline.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function StartupDashboard() {
  const project = getProjectBySlug('startup-dashboard')
  if (!project) return <NotFound />

  return (
    <CaseStudyLayout project={project}>
      <CaseStudyBlock title="Overview">
        <p className="text-[15px] leading-relaxed text-muted">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="The problem">
        <p className="text-[15px] leading-relaxed text-muted">{project.problem}</p>
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl">The data</h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {project.dataFacts.map((fact) => (
              <div key={fact.label} className="bg-ink p-5">
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 font-display text-3xl text-brass">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 max-w-3xl">
            <NodeList items={project.dataNotes} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Data flow</h2>
          <div className="mt-8">
            <Pipeline stages={project.pipeline} label="From raw CSV to a public URL" />
          </div>
        </section>
      </Reveal>

      <CaseStudyBlock title="What the dashboard does" wide>
        <CardGrid items={project.views} columns={2} />
      </CaseStudyBlock>

      <CaseStudyBlock title="Engineering decisions" wide>
        <CardGrid items={project.engineering} columns={2} />
      </CaseStudyBlock>

      <CaseStudyBlock title="Deployment">
        <p className="text-[15px] leading-relaxed text-muted">
          Deployed to Streamlit Cloud straight from the repository, with a requirements.txt
          pinning streamlit, pandas, numpy, matplotlib and seaborn. No build step and no server
          to maintain — a push to the default branch redeploys it.
        </p>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
