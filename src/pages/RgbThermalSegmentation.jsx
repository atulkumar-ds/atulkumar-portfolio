import CaseStudyLayout, {
  CaseStudyBlock,
  NodeList,
  CardGrid,
  Caveat,
} from '../components/CaseStudyLayout.jsx'
import Pipeline from '../components/Pipeline.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import Reveal from '../components/Reveal.jsx'
import { getProjectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export default function RgbThermalSegmentation() {
  const project = getProjectBySlug('rgb-thermal-segmentation')
  if (!project) return <NotFound />

  const comparisonRows = [
    {
      aspect: 'Encoder backbone',
      v1: 'Custom 4-stage ConvNet (from scratch)',
      v2: 'Dual ResNet-18 (ImageNet pretrained)',
    },
    {
      aspect: 'Thermal stream init',
      v1: 'Random weight initialization',
      v2: 'RGB conv1 kernels averaged across 3 channels',
    },
    {
      aspect: 'Modality fusion',
      v1: 'Late concatenation at bottleneck',
      v2: '5-scale Cross-Modal Attention Fusion (CMAF)',
    },
    {
      aspect: 'Parameter count',
      v1: '2,990,441 (~2.99M params)',
      v2: '29,055,739 (~29.06M params)',
    },
    {
      aspect: 'Decoder architecture',
      v1: 'Standard ConvTranspose upsampling',
      v2: 'Bilinear upsampling + GroupNorm + SiLU + Dropout',
    },
    {
      aspect: 'Optimization',
      v1: 'Uniform Adam learning rate',
      v2: 'Differential AdamW (0.1x encoders, 1.0x decoder)',
    },
    {
      aspect: 'Generalization',
      v1: 'Overfit: train mIoU ~86%, val mIoU 34.56%',
      v2: 'Transfer learning + regularized multi-scale fusion',
    },
  ]

  return (
    <CaseStudyLayout project={project}>
      {/* Overview & Motivation */}
      <CaseStudyBlock title="Overview & Motivation">
        <p className="text-[15px] leading-relaxed text-muted">
          Autonomous driving and robotics vision systems depend predominantly on 3-channel RGB cameras.
          However, optical cameras fail severely under real-world hazards: total nighttime darkness, dense fog,
          tunnel lighting transitions, and direct headlamp glare.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Thermal (long-wave infrared / LWIR) sensors measure radiated thermal energy rather than reflected visible light.
          They produce sharp, high-contrast silhouettes of pedestrians, cyclists, and running engines even in complete darkness
          or thick smoke. However, thermal imagery lacks fine chromatic detail and surface texture, making lane markings and
          subtle roadway curbs harder to resolve.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          This system unifies both modalities into a complementary representation: RGB supplies high-resolution texture
          and color, while thermal supplies invariant heat signatures and boundary cues.
        </p>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">
          <span className="text-text">Dataset:</span> {project.dataset}
        </p>
      </CaseStudyBlock>

      {/* Pipeline Stage Visualization */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Architecture Pipeline</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            The active model (<code className="text-cyan font-mono text-xs">resnet18_dual_stream_cross_modal_attention_v2_1</code>)
            processes synchronized 4-channel inputs through parallel ResNet-18 encoders, fuses them at 5 pyramid scales via
            CMAF, and reconstructs full-resolution 9-class segmentation masks through a regularized U-Net decoder.
          </p>
          <div className="mt-8">
            <Pipeline stages={project.pipeline} label={project.pipelineLabel} />
          </div>
        </section>
      </Reveal>

      {/* Module Breakdown */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Model Architecture Breakdown</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Total Trainable Parameters: <span className="font-mono text-cyan font-medium">{project.totalParams}</span>.
            Every component is structured to maintain gradient flow and balance both modalities.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.architectureModules.map((module) => (
              <div key={module.name} className="panel p-5 flex flex-col justify-between hover:border-cyan/30 transition-all duration-200">
                <div>
                  <h3 className="font-display text-xl font-normal text-text">{module.name}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-secondary">{module.details}</p>
                </div>
                <div className="mt-4 border-t border-border/60 pt-3 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Parameters</span>
                  <span className="font-mono text-xs text-cyan font-medium">{module.params}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Cross-Modal Attention Fusion Deep Dive */}
      <CaseStudyBlock title="Cross-Modal Attention Fusion (CMAF)">
        <p className="text-[15px] leading-relaxed text-secondary">
          Standard fusion approaches concatenate features or compute simple element-wise sums. This often leads to modality
          dominance, where the network overfits to RGB during sunny frames and fails to leverage thermal data when glare or darkness occurs.
        </p>
        <div className="mt-6 rounded-xl border border-border/70 bg-elevated/50 p-6 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-wider text-cyan font-medium">
            Three-Stage CMAF Mechanism (Implemented across 5 Pyramid Scales)
          </h4>
          <ol className="space-y-3 text-sm leading-relaxed text-secondary">
            <li className="flex gap-3">
              <span className="font-mono text-cyan font-bold">1.</span>
              <span>
                <strong className="text-text">Channel Attention Gate:</strong> Global average pooling across concatenated RGB and thermal features passes through a squeeze-and-excitation MLP with reduction ratio 16, dynamically weighting which feature channels are most informative.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-cyan font-bold">2.</span>
              <span>
                <strong className="text-text">Cross-Spatial Attention Gate:</strong> Channel-wise mean and max projections are concatenated and passed through a large 7x7 spatial convolution with sigmoid activation, creating a spatial mask that highlights boundaries detected by either sensor.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-cyan font-bold">3.</span>
              <span>
                <strong className="text-text">Residual Identity Injection:</strong> Fused output is combined via <code className="text-cyan font-mono text-xs">Fused + 0.5 * (RGB + Thermal)</code>, ensuring raw modality signals are preserved and gradients never vanish during early training.
              </span>
            </li>
          </ol>
        </div>
      </CaseStudyBlock>

      {/* Target Classes */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">MFNet 9-Class Segmentation Targets</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            The network predicts pixel-wise logits across 9 urban classes, with void and boundary pixels (index 255) strictly masked out during loss calculation.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {project.classes.map((cls) => (
              <div key={cls.id} className="panel p-4 hover:border-cyan/30 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan font-medium">Class {cls.id}</span>
                  <span className="font-display text-lg font-normal text-text">{cls.name}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-secondary">{cls.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* v1 vs v2.1 Architectural Evolution */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">{project.v1Comparison.title}</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            The project began with a scratch dual-stream ConvNet. Measuring its failure mode directly motivated the v2.1 ResNet-18 + CMAF design.
          </p>

          <div className="mt-8">
            <ComparisonTable
              rows={comparisonRows}
              leftLabel={project.v1Comparison.v1Name}
              rightLabel={project.v1Comparison.v2Name}
            />
          </div>
        </section>
      </Reveal>

      {/* Diagnosis of Baseline Failure */}
      <CaseStudyBlock title="Diagnosing the Baseline Bottleneck">
        <div className="space-y-4">
          <p className="text-[15px] leading-relaxed text-secondary">
            {project.v1Comparison.v1Diagnosis}
          </p>
          <Caveat>
            <strong className="text-text">Why v1 plateaued:</strong> The MFNet training split contains only 1,568 images.
            Training a dual-stream architecture from scratch without pretrained weights led to catastrophic memorization.
            The network achieved 86% training mIoU while validation mIoU hovered at 34.56%. Rare classes like Bump and Color Cone
            were completely missed because random kernels could not extract generalizable features from a few dozen occurrences.
          </Caveat>
          <p className="text-[15px] leading-relaxed text-secondary">
            {project.v1Comparison.v2Solution}
          </p>
        </div>
      </CaseStudyBlock>

      {/* Training Methodology & Stability */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Training Methodology & Objective Formulation</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            Every hyperparameter and training choice is engineered for multi-spectral stability and class imbalance handling.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {project.trainingSetup.map((item) => (
              <div key={item.title} className="panel p-5 hover:border-cyan/30 transition-all duration-200">
                <h3 className="font-mono text-xs uppercase tracking-wider text-cyan font-medium">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Dataset Audit */}
      <CaseStudyBlock title="Data Integrity & Pre-Training Audit">
        <p className="text-[15px] leading-relaxed text-secondary">
          Multi-spectral datasets are notoriously prone to misalignment, missing thermal bands, and accidental data leakage.
          Before training, the repository's <code className="text-cyan font-mono text-xs">audit_mfnet.py</code> utility runs
          a non-destructive integrity audit across all 1,568 sample pairs:
        </p>
        <div className="mt-5">
          <NodeList
            items={[
              'Split separation: Verifies 0% overlap between train.txt, val.txt, and test.txt splits.',
              'Dimension alignment: Confirms 100% of images and ground truth masks match the 480x640 resolution.',
              'Channel integrity: Validates that channels 0-2 contain valid RGB data and channel 3 contains authentic LWIR infrared readings.',
              'Label range: Screens for spurious mask values outside the valid 0-8 class set and ignore token 255.',
            ]}
          />
        </div>
      </CaseStudyBlock>

      {/* Published Literature Benchmarks */}
      <Reveal>
        <section>
          <h2 className="font-display text-3xl font-normal text-text">Published Literature on MFNet</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-secondary">
            For academic context, published multi-spectral semantic segmentation benchmarks on the MFNet dataset report the following reference scores:
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-border/80">
            <div className="grid grid-cols-[1.5fr_1fr_1fr] bg-elevated/80 p-4 font-mono text-xs uppercase tracking-wider text-cyan font-medium border-b border-border/60">
              <span>Model &amp; Citation</span>
              <span>Backbone</span>
              <span className="text-right">Published mIoU</span>
            </div>
            <div className="divide-y divide-border/50">
              {project.literatureBenchmarks.map((bench) => (
                <div key={bench.model} className="grid grid-cols-[1.5fr_1fr_1fr] bg-surface/60 p-4 text-sm text-secondary">
                  <span className="text-text font-medium">{bench.model}</span>
                  <span className="font-mono text-xs">{bench.backbone}</span>
                  <span className="font-mono text-xs text-cyan text-right font-bold">{bench.mIoU}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            *Note: Literature results vary according to split definitions, ignore label handling, and whether background (class 0) is included in the macro mean.
          </p>
        </section>
      </Reveal>

      {/* Limitations & Future Work */}
      <CaseStudyBlock title="Limitations & Engineering Roadmap">
        <NodeList items={project.futureWork} />
      </CaseStudyBlock>
    </CaseStudyLayout>
  )
}
