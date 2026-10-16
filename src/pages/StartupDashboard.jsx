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
        <p className="text-[15px] leading-relaxed text-secondary">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="The problem">
        <p className="text-[15px] leading-relaxed text-secondary">{project.problem}</p>
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">The data</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.dataFacts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-border/70 bg-surface/80 p-5 hover:border-cyan/30 transition-all duration-200">
                <dt className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">{fact.label}</dt>
                <dd className="mt-2 font-display text-3xl font-normal text-cyan">{fact.value}</dd>
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
          <h2 className="font-display text-3xl font-normal text-text">Data flow</h2>
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
        <p className="text-[15px] leading-relaxed text-secondary">
          Deployed to Streamlit Cloud straight from the repository, with a requirements.txt
          pinning streamlit, pandas, numpy, matplotlib and seaborn. No build step and no server
          to maintain — a push to the default branch redeploys it.
        </p>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
