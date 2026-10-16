import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  Caveat,
} from '../components/CaseStudyLayout.jsx'
import Pipeline from '../components/Pipeline.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function GeospatialSegmentation() {
  const project = getProjectBySlug('geospatial-segmentation')
  if (!project) return <NotFound />

  return (
    <CaseStudyLayout project={project}>
      {/* Overview & Motivation */}
      <CaseStudyBlock title="Overview & Motivation">
        <p className="text-[15px] leading-relaxed text-secondary">
          High-resolution satellite and aerial imagery is crucial for environmental monitoring, infrastructure planning,
          and disaster response. However, remote-sensing semantic segmentation faces steep challenges:
        </p>
        <div className="mt-4">
          <NodeList
            items={[
              'Domain Shift Across Geography: Building styles, road pavements, and vegetation appearances differ radically between compact urban centers and expansive rural farmlands.',
              'Multi-Scale Spatial Features: The model must capture broad natural boundaries (rivers, agricultural zones) alongside slender, compact structures (narrow roads, residential roofs).',
              'Class Imbalance: Dominant natural classes outnumber specialized structural land covers by orders of magnitude.',
            ]}
          />
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-secondary">
          <span className="text-text font-medium">Benchmark:</span> {project.dataset}
        </p>
      </CaseStudyBlock>

      {/* Pipeline Stages */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Processing Pipeline</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            The data pipeline ingests multi-spectral aerial tiles, applies online geometric rotations and flips,
            passes tensors through a 4-stage contracting and expansive U-Net, and outputs 7-class probability maps.
          </p>
          <div className="mt-8">
            <Pipeline stages={project.pipeline} label="Symmetric U-Net feature flow" />
          </div>
        </section>
      </Reveal>

      {/* Architecture Breakdown */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">U-Net Architecture & Complexity</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            A symmetrical encoder-decoder network implemented from scratch in PyTorch, structured with DoubleConv blocks
            (<code className="text-cyan font-mono text-xs">Conv3x3 &rarr; BatchNorm &rarr; ReLU &rarr; Conv3x3 &rarr; BatchNorm &rarr; ReLU</code>).
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {project.architectureDetails.map((block) => (
              <div key={block.title} className="panel p-5 hover:border-cyan/30 transition-all duration-200">
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-medium">{block.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary">{block.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="panel p-5 flex items-baseline justify-between hover:border-cyan/30 transition-all duration-200">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Total Parameters</p>
                <p className="mt-1 font-display text-2xl text-text">{project.complexity.params}</p>
              </div>
              <span className="tag text-cyan font-mono text-xs">100% Trainable</span>
            </div>
            <div className="panel p-5 flex items-baseline justify-between hover:border-cyan/30 transition-all duration-200">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Forward Pass Complexity</p>
                <p className="mt-1 font-display text-2xl text-text">{project.complexity.flops}</p>
              </div>
              <span className="tag text-cyan font-mono text-xs">Torchinfo Verified</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Aggregate Results */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Verified Validation Benchmark Results</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Evaluated on the official LoveDA validation set using weights saved at the minimum validation loss checkpoint
            (<code className="text-cyan font-mono text-xs">checkpoints/best_model.pth</code>). Results logged in{' '}
            <code className="text-cyan font-mono text-xs">outputs/evaluation_results.txt</code>.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {project.aggregateMetrics.map((item) => (
              <div key={item.metric} className="panel p-5 hover:border-cyan/30 transition-all duration-200">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan font-medium">{item.metric}</span>
                <p className="mt-3 font-display text-4xl text-text">{item.value}</p>
                <p className="mt-2 text-xs leading-relaxed text-secondary">{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Class-wise Performance Table */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Class-Wise Segmentation Performance</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Breakdown across all seven land-cover classes, demonstrating distinct convergence behaviors between homogeneous natural surfaces and fine structural boundaries.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-border/80">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] bg-elevated/80 p-4 font-mono text-xs uppercase tracking-wider text-cyan font-medium border-b border-border/60">
              <span>Land-Cover Class</span>
              <span className="text-right">IoU</span>
              <span className="text-right">Dice Score</span>
              <span className="text-right">Precision</span>
              <span className="text-right">Recall</span>
            </div>
            <div className="divide-y divide-border/50">
              {project.classMetrics.map((row) => (
                <div key={row.name} className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] bg-surface/60 p-4 text-sm text-secondary">
                  <span className="text-text font-medium flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan/70 shadow-[0_0_6px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                    {row.name}
                  </span>
                  <span className="font-mono text-xs text-cyan text-right font-bold">{row.iou}</span>
                  <span className="font-mono text-xs text-text text-right">{row.dice}</span>
                  <span className="font-mono text-xs text-secondary text-right">{row.precision}</span>
                  <span className="font-mono text-xs text-secondary text-right">{row.recall}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Honest Error Analysis */}
      <CaseStudyBlock title="Analyzing Class-Wise Results & Failure Modes">
        <div className="space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            <strong className="text-text">Water (42.63% IoU) and Agriculture (39.95% IoU):</strong> Achieve the highest IoU and recall.
            These classes cover continuous, high-contrast geographic regions where spatial continuity gives the convolutional kernels consistent activation signals.
          </p>
          <p className="text-[15px] leading-relaxed text-secondary">
            <strong className="text-text">Road (38.53% IoU) and Building (36.99% IoU):</strong> Show solid precision (~50–60%) but suffer from edge softening.
            At 256x256 resolution, a two-lane roadway occupies only 2–4 pixels across, making boundary localization difficult without higher input resolution.
          </p>
          <Caveat>
            <strong className="text-text">The Barren Land Outlier (14.89% IoU):</strong> Barren ground achieved a precision of 53.00% but a recall of only 17.16%.
            The confusion matrix reveals that unpaved background dirt, excavated construction sites, and dry, harvested crop fields share near-identical spectral and textural features in visible RGB imagery.
            Without multi-spectral infrared bands or temporal sequence data, optical models struggle to separate fallow agriculture from barren ground.
          </Caveat>
        </div>
      </CaseStudyBlock>

      {/* Training Methodology */}
      <CaseStudyBlock title="Training Configuration & Methodology">
        <NodeList items={project.trainingFacts} />
      </CaseStudyBlock>

      {/* Caveat and Future Iterations */}
      <CaseStudyBlock title="Engineering Caveat & Roadmap">
        <div className="space-y-4">
          <Caveat>{project.caveat}</Caveat>
          <div className="mt-5">
            <NodeList
              items={[
                'Sliding-Window Inference: Evaluating full 512x512 satellite tiles via overlapping sliding windows to recover fine road edges.',
                'Pretrained Backbone Benchmarks: Replacing the scratch DoubleConv encoder with ImageNet-pretrained ResNet-34 or EfficientNet backbones.',
                'Domain Adaptation Modules: Implementing adversarial domain discriminators or Fourier domain alignment to bridge the gap between Urban and Rural feature distributions.',
              ]}
            />
          </div>
        </div>
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}

