import CaseStudyLayout, { CaseStudyBlock, NodeList } from '../components/CaseStudyLayout.jsx'
import Pipeline from '../components/Pipeline.jsx'
import VersionExplorer from '../components/VersionExplorer.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function ImageCaptioning() {
  const project = getProjectBySlug('image-captioning')
  if (!project) return <NotFound />

  const { versions, limitation, comparison, application, examples, lessons } = project

  return (
    <CaseStudyLayout project={project}>
      <CaseStudyBlock title="Overview">
        <p className="text-[15px] leading-relaxed text-secondary">{project.description}</p>
        <p className="mt-5 text-[15px] leading-relaxed text-secondary">
          <span className="text-text font-medium">Dataset:</span> {project.dataset}
        </p>
      </CaseStudyBlock>

      <CaseStudyBlock title="Why I built it">
        <p className="text-[15px] leading-relaxed text-secondary">
          Captioning needs two kinds of understanding at once — seeing what is in the frame, and
          saying it in grammatical English — which makes it a good test of whether a pipeline
          actually holds together end to end. I wanted a project where I could not hide behind a
          single accuracy number, and where a second attempt would have to be justified by
          something specific the first attempt got wrong.
        </p>
      </CaseStudyBlock>

      {/* The interactive V1 / V2 switch */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">The two versions</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Both versions live in the same repository, in separate directories, with their own
            source, their own saved artefacts and their own app. Switch between them to see what
            actually changed.
          </p>
          <div className="mt-8">
            <VersionExplorer versions={versions} />
          </div>
        </section>
      </Reveal>

      {/* The hinge of the whole project */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">{limitation.title}</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-secondary">
            {limitation.body}
          </p>
          <div className="mt-8">
            <Pipeline stages={limitation.chain} label="The loop that produced V2" />
          </div>
        </section>
      </Reveal>

      <CaseStudyBlock title="V1 against V2" wide>
        <ComparisonTable
          rows={comparison}
          leftLabel={versions.v1.label}
          rightLabel={versions.v2.label}
        />
      </CaseStudyBlock>

      <CaseStudyBlock title={application.title}>
        <p className="text-[15px] leading-relaxed text-secondary">{application.body}</p>
        <div className="mt-8">
          <Pipeline stages={application.steps} label="What happens when you press the button" />
        </div>
      </CaseStudyBlock>

      {/* Example gallery */}
      {examples.length > 0 && (
        <CaseStudyBlock title="Example outputs" wide>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <figure key={example.image} className="panel overflow-hidden hover:border-cyan/30 transition-all duration-200">
                <img
                  src={example.image}
                  alt={`Generated caption: ${example.caption}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="border-t border-border/60 p-4">
                  {example.version && (
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan font-semibold">{example.version}</span>
                  )}
                  <p className="mt-2 font-mono text-xs leading-relaxed text-secondary">
                    {example.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </CaseStudyBlock>
      )}

      <CaseStudyBlock title="What the second attempt taught me">
        <NodeList items={lessons} />
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
