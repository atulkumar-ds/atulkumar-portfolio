import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  CardGrid,
  Caveat,
} from '../components/CaseStudyLayout.jsx'
import Pipeline from '../components/Pipeline.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function SelfRAGConstitution() {
  const project = getProjectBySlug('self-rag-constitution')
  if (!project) return <NotFound />

  return (
    <CaseStudyLayout project={project}>
      {/* Overview */}
      <CaseStudyBlock title="Overview">
        <p className="text-[15px] leading-relaxed text-muted">
          Legal question answering over statutory texts like the <span className="text-text">Constitution of India</span> and
          the <span className="text-text">Indian Penal Code (IPC)</span> demands zero tolerance for hallucination.
          Vanilla RAG pipelines retrieve static chunks and blindly feed them to an LLM, often passing irrelevant
          statutory clauses, losing multi-hop context across articles, or generating plausible-sounding but legally ungrounded answers.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          This project implements an agentic <span className="text-text">Self-RAG (Self-Reflective RAG)</span> and{' '}
          <span className="text-text">Corrective RAG (CRAG)</span> workflow using <span className="text-text">LangGraph</span>.
          Instead of a single-pass sequence, the pipeline operates as a dynamic state machine that routes queries,
          scores document relevance in parallel, verifies factual grounding against retrieved sources, corrects hallucinated text,
          and falls back to live web search via Tavily when statutory coverage is insufficient.
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          <span className="text-text">Corpus:</span> {project.dataset}
        </p>
      </CaseStudyBlock>

      {/* Pipeline Stages */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl">LangGraph Agentic State Machine</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            The workflow consists of 16 LangGraph nodes coordinating query routing, parallel retrieval fan-out,
            Map-Reduce document filtering, context generation, and self-correction critique loops.
          </p>
          <div className="mt-8">
            <Pipeline stages={project.pipeline} label="End-to-end self-correcting execution loop" />
          </div>
        </section>
      </Reveal>

      {/* Verified Quantitative Results */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Ragas Benchmark Evaluation Results</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            Evaluated using the Ragas framework on a 50-row diverse test set generated directly from the legal corpus.
            The entire evaluation pipeline is versioned and reproducible via <code className="text-brass font-mono text-xs">dvc repro</code>.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.evaluationMetrics.map((item) => (
              <div key={item.metric} className="panel p-5">
                <span className="eyebrow text-brass">{item.metric}</span>
                <p className="mt-3 font-display text-4xl text-text">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-line bg-surface/40 p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="node-dot" aria-hidden="true" />
              <span className="font-mono text-xs text-muted">Token Consumption:</span>
              <span className="font-mono text-sm text-brass font-medium">{project.tokenUsage}</span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Tracked via DVC Pipeline
            </span>
          </div>
        </section>
      </Reveal>

      {/* Latency Benchmarks */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Latency Distribution Across 50 Queries</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            Direct statutory queries return in ~2 seconds. The long tail reflects complex multi-hop queries that trigger
            self-correction loops (grounding critique and answer rewrite).
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.latencyBenchmarks.map((bench) => (
              <div key={bench.p} className="panel p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-brass uppercase font-bold">{bench.p}</span>
                  <span className="font-mono text-xl text-text">{bench.time}</span>
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-muted">{bench.note}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Evaluation Methodology Breakdown */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Evaluation Dataset Generation Methodology</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            Rather than authoring arbitrary manual test questions, the evaluation dataset was created systematically
            to ensure statutory diversity and rigorous reproducibility.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {project.methodologySteps.map((step, index) => (
              <div key={step.title} className="panel p-5">
                <span className="font-mono text-xs text-brass font-bold">Step 0{index + 1}</span>
                <h3 className="mt-2 font-display text-xl text-text">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Technical Context & Nuances */}
      <CaseStudyBlock title="Evaluation Nuances & Metrics Context">
        <div className="space-y-4">
          <Caveat>
            <strong className="text-text">Context Precision Nuance:</strong> Standard LLM-based <code className="text-brass font-mono text-xs">context_precision</code> evaluates
            each retrieved chunk independently against the full synthetic answer. For legal questions synthesizing multiple articles,
            this produces false negatives because neither article alone supports the combined answer (documented Ragas issue #308).
            We adopted <code className="text-brass font-mono text-xs">NonLLMContextPrecisionWithReference</code>, which scores retrieval directly
            against reference ground truth contexts, yielding an accurate 0.95 precision.
          </Caveat>

          <Caveat>
            <strong className="text-text">Answer Relevancy Score (0.75):</strong> Ragas calculates relevancy by generating 3 hypothetical questions from the generated answer and computing cosine similarity against the original question.
            A known limitation in Ragas (issues #1979, #1192, #1812) causes generated questions to lack lexical variation when evaluating compound, multi-part legal inquiries, artificially depressing the measured score.
          </Caveat>
        </div>
      </CaseStudyBlock>

      {/* Interfaces & Architecture */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl">Application Delivery & Interfaces</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            The pipeline is deployed across both terminal and web interfaces, backed by asynchronous streaming.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {project.interfaces.map((ui) => (
              <div key={ui.name} className="panel p-5">
                <h3 className="font-display text-xl text-text">{ui.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{ui.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Architectural Decisions */}
      <CaseStudyBlock title="Architectural Decisions">
        <NodeList
          items={[
            'Parallel Sub-Query Fan-Out: User queries are split into focused sub-queries and dispatched simultaneously using LangGraph Send API to eliminate sequential retrieval bottlenecks.',
            'Map-Reduce Relevance Scoring: Retrieved chunks are evaluated in parallel by a fast grading model before passing into context generation, filtering out legal noise early.',
            'Tavily Search Fallback: When statutory vectors do not yield relevant chunks (e.g. recent legal amendments or non-IPC queries), the pipeline automatically generates search queries and falls back to live web context.',
            'Conversational State Checkpointing: SQLite checkpointer records full graph state at every step, allowing users to pause, resume, and fork legal research sessions.',
            'Full Observability: Arize Phoenix tracing logs every LLM call, token count, latency step, and conditional routing choice for production auditability.',
          ]}
        />
      </CaseStudyBlock>

      {/* Legal Disclaimer & Scope */}
      <CaseStudyBlock title="Disclaimer & Operational Bounds">
        <div className="space-y-4">
          <NodeList items={project.caveats} />
        </div>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
