import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  Caveat,
} from '../components/CaseStudyLayout.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function InstructorEffectiveness() {
  const project = getProjectBySlug('instructor-effectiveness')
  if (!project) return <NotFound />

  return (
    <CaseStudyLayout project={project}>
      <CaseStudyBlock title="Overview">
        <p className="text-[15px] leading-relaxed text-muted">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="The problem">
        <p className="text-[15px] leading-relaxed text-muted">{project.problem}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="Approach">
        <NodeList items={project.approach} />
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Model comparison</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
            Three classifiers on the same stratified split, then cross-validated because a
            30-row test set cannot separate models that are close.
          </p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.metric} className="panel p-5">
                <dt className="eyebrow">{result.metric}</dt>
                <dd className="mt-2 font-display text-4xl text-brass">{result.value}</dd>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">
                  {result.note}
                </p>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <CaseStudyBlock title="What the model found">
        <NodeList items={project.findings} />
      </CaseStudyBlock>

      <CaseStudyBlock title="Reading those numbers honestly">
        <Caveat>{project.caveat}</Caveat>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
