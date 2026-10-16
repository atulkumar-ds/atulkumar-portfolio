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
        <p className="text-[15px] leading-relaxed text-secondary">{project.description}</p>
      </CaseStudyBlock>

      <CaseStudyBlock title="Why do it the hard way">
        <p className="text-[15px] leading-relaxed text-secondary">{project.problem}</p>
      </CaseStudyBlock>

      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">What is actually implemented</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Four notebooks, one algorithm each. Every result below came from running the
            notebook in the repository.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {algorithms.map((algorithm) => (
              <div key={algorithm.name} className="flex h-full flex-col justify-between rounded-xl border border-border/70 bg-surface/80 p-6 hover:border-cyan/30 transition-all duration-200">
                <div>
                  <div className="flex items-start gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan/70 mt-2 shrink-0 shadow-[0_0_6px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                    <div>
                      <h3 className="font-display text-2xl font-normal text-text leading-tight">{algorithm.name}</h3>
                      <p className="mt-1 font-mono text-xs text-cyan/80">{algorithm.notebook}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-secondary">
                    {algorithm.detail}
                  </p>
                </div>

                <dl className="mt-5 space-y-2 border-t border-border/60 pt-4 font-mono text-xs">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-wider text-muted">
                      Data
                    </dt>
                    <dd className="text-secondary">{algorithm.data}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-wider text-muted">
                      Result
                    </dt>
                    <dd className="text-cyan font-semibold">{algorithm.result}</dd>
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
