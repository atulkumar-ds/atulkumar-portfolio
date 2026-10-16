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
        <p className="text-[15px] leading-relaxed text-secondary">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="The problem">
        <p className="text-[15px] leading-relaxed text-secondary">{project.problem}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="Approach">
        <NodeList items={project.approach} />
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Model comparison</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Three classifiers on the same stratified split, then cross-validated because a
            30-row test set cannot separate models that are close.
          </p>
          <dl className="mt-8 grid gap-5 sm:grid-cols-3">
            {project.results.map((result) => (
              <div key={result.metric} className="panel p-5 hover:border-cyan/30 transition-all duration-200">
                <dt className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">{result.metric}</dt>
                <dd className="mt-2 font-display text-4xl font-normal text-cyan">{result.value}</dd>
                <p className="mt-3 font-mono text-xs leading-relaxed text-secondary">
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
