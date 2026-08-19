import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  Caveat,
} from '../components/CaseStudyLayout.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function MLFromScratch() {
  const project = getProjectBySlug('ml-from-scratch')
  if (!project) return <NotFound />

  const { algorithms = [] } = project

  return (
    <CaseStudyLayout project={project}>
      <CaseStudyBlock title="Goal">
        <p className="text-[15px] leading-relaxed text-muted">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="Why do it the hard way">
        <p className="text-[15px] leading-relaxed text-muted">{project.problem}</p>
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl">What is actually implemented</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
            Four notebooks, one algorithm each. Every result below came from running the
            notebook in the repository.
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {algorithms.map((algorithm) => (
              <div key={algorithm.name} className="flex h-full flex-col bg-ink p-6">
                <div className="flex items-start gap-3">
                  <span className="node-dot mt-2" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{algorithm.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-muted">{algorithm.notebook}</p>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {algorithm.detail}
                </p>

                <dl className="mt-5 space-y-2 border-t border-line pt-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Data
                    </dt>
                    <dd className="font-mono text-xs text-muted">{algorithm.data}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Result
                    </dt>
                    <dd className="font-mono text-xs text-brass">{algorithm.result}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <CaseStudyBlock title="Reading those numbers honestly">
        <Caveat>{project.caveat}</Caveat>
      </CaseStudyBlock>

      <CaseStudyBlock title="Approach">
        <NodeList items={project.approach} />
      </CaseStudyBlock>

      <CaseStudyBlock title="What I learned">
        <NodeList items={project.learned} />
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
