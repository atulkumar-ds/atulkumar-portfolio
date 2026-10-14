// ---------------------------------------------------------------------------
// PROJECTS — single source of truth for all verified engineering projects.
//
// Every architectural detail, hyperparameter, and metric below is taken
// directly from verified source code, committed READMEs, checkpoints, and
// evaluation logs across Atul Kumar's GitHub repositories.
//
// Repositories verified:
//   github.com/atulkumar-ds/RGB-Thermal-Semantic-Segmentation
//   github.com/atulkumar-ds/Self-RAG-On-Indian-Constitution
//   github.com/atulkumar-ds/Image-Captioning
//   github.com/atulkumar-ds/LoveDA-UNet
//   github.com/atulkumar-ds/startup-dashboard
//   github.com/atulkumar-ds/ML-Algorithm-From-Scratch
//   github.com/atulkumar-ds/Instructor-Effectiveness-Analysis
// ---------------------------------------------------------------------------

export const projects = [
  // =========================================================================
  // 1. RGB–THERMAL MULTI-SPECTRAL SEMANTIC SEGMENTATION (FEATURED)
  // =========================================================================
  {
    slug: 'rgb-thermal-segmentation',
    title: 'RGB–Thermal Semantic Segmentation',
    kicker: 'Dual-Stream ResNet-18 · Cross-Modal Attention Fusion (CMAF)',
    category: 'Computer Vision',
    featured: true,
    summary:
      'A multi-spectral urban scene semantic segmentation network fusing RGB and thermal LWIR imagery using parallel pretrained ResNet-18 encoders and 5-scale cross-modal attention.',
    description:
      'Autonomous vision fails in darkness, heavy fog, and blinding headlamp glare. Thermal sensors measure radiated heat to preserve pedestrian and obstacle boundaries in zero light, but lack fine surface texture and color. This framework unifies both modalities on the MFNet dataset: dual ImageNet-pretrained ResNet-18 streams with thermal kernel adaptation, multi-scale Cross-Modal Attention Fusion (CMAF) combining channel SE-gates and cross-spatial projections, and a GroupNorm/SiLU U-Net decoder.',
    technologies: [
      'Python',
      'PyTorch',
      'Torchvision',
      'ResNet-18',
      'U-Net',
      'Cross-Modal Attention',
      'AMP',
      'AdamW',
    ],
    github: 'https://github.com/atulkumar-ds/RGB-Thermal-Semantic-Segmentation',
    demo: '',
    dataset:
      'MFNet benchmark: 1,568 4-channel pairs (640x480 resolution; 820 day, 748 night) across 9 urban driving classes + ignore index 255.',

    pipeline: [
      '4-Ch Input (RGB+T)',
      'Dual ResNet-18',
      '5-Scale CMAF',
      'U-Net Decoder',
      'Hybrid Loss (CE + Dice)',
      '9-Class Logits',
    ],
    pipelineLabel: 'Multi-spectral feature pyramid & fusion',

    architectureModules: [
      {
        name: 'RGB Encoder',
        details: 'ResNet-18 backbone initialized with ImageNet pretrained weights. Extracts spatial features across 5 pyramid scales (stem down to 1/32).',
        params: '11,176,512',
      },
      {
        name: 'Thermal Encoder',
        details: 'ResNet-18 backbone adapted for 1-channel LWIR thermal input by averaging pretrained RGB conv1 kernels (conv1.weight.mean(dim=1, keepdim=True)).',
        params: '11,170,240',
      },
      {
        name: 'Cross-Modal Attention Fusion (CMAF)',
        details: 'Operates at all 5 feature pyramid levels. Fuses streams via Squeeze-and-Excitation channel gating, 7x7 cross-spatial attention, and residual identity (fused + 0.5 * (RGB + Thermal)).',
        params: '4,059,186',
      },
      {
        name: 'U-Net Decoder',
        details: '4-stage decoder with bilinear upsampling, 1x1 channel projections, skip concatenations, ConvNormAct blocks (GroupNorm + SiLU), and spatial dropout (p=0.10).',
        params: '2,612,224',
      },
      {
        name: 'Segmentation Head',
        details: 'ConvNormAct (64 channels) followed by a final 1x1 convolution mapping to 9 urban semantic classes.',
        params: '37,577',
      },
    ],

    totalParams: '29,055,739 (29.06M, 100% trainable)',

    classes: [
      { id: 0, name: 'Unlabeled', desc: 'Background terrain, sky, unclassified road surroundings' },
      { id: 1, name: 'Car', desc: 'Passenger cars, vans, trucks, buses' },
      { id: 2, name: 'Person', desc: 'Pedestrians, standing and moving people' },
      { id: 3, name: 'Bike', desc: 'Bicycles, motorcycles' },
      { id: 4, name: 'Curve', desc: 'Curved lane markers, roadway bends' },
      { id: 5, name: 'Car Stop', desc: 'Designated parking and stopping bays' },
      { id: 6, name: 'Guardrail', desc: 'Roadside metal/concrete safety barriers' },
      { id: 7, name: 'Color Cone', desc: 'Traffic pylons and construction cones' },
      { id: 8, name: 'Bump', desc: 'Speed breakers, asphalt road bumps' },
    ],

    trainingSetup: [
      {
        title: 'Composite Objective',
        body: 'Class-Weighted Cross-Entropy (auto inverse cube-root frequency weighting) + Multi-Class Soft Dice Loss, strictly ignoring boundary label 255.',
      },
      {
        title: 'Differential Learning Rates',
        body: 'AdamW with weight decay 1e-4. 0.1x learning rate (3e-5) for pretrained ResNet-18 encoders; 1.0x learning rate (3e-4) for CMAF fusion blocks and decoder.',
      },
      {
        title: 'Optimization & Stability',
        body: 'CUDA Automated Mixed Precision (AMP), gradient clipping at max norm 5.0, ReduceLROnPlateau scheduler (halving LR on val mIoU plateau), and early stopping with patience 12.',
      },
      {
        title: 'Data Augmentation',
        body: 'Synchronized geometric transforms (random horizontal flip p=0.5, random scale/crop) applied across RGB, thermal, and mask tensors. Photometric color jitter applied strictly to RGB; independent gain/bias applied to thermal.',
      },
    ],

    v1Comparison: {
      title: 'v1 Baseline vs v2.1 Architecture',
      v1Name: 'v1 Custom ConvNet (From Scratch)',
      v1Params: '2.99M parameters',
      v1Diagnosis:
        'Trained without pretrained weights on only 1,568 images. Rapidly memorized the training set (training mIoU reached ~86%), but validation mIoU plateaued at 34.56% at epoch 34, with validation loss diverging past 2.0 by epoch 50. Key classes: Car 54.3%, Person 60.1%, Bike 31.1%, with small objects under-detected.',
      v2Name: 'v2.1 Pretrained ResNet-18 + CMAF',
      v2Params: '29.06M parameters',
      v2Solution:
        'ImageNet-pretrained ResNet-18 encoders provide robust visual feature primitives. Kernel-averaged thermal stem adaptation preserves learned filter structures. Multi-scale CMAF at 5 stages dynamically balances modalities, while synchronized geometric augmentation and decoder dropout prevent overfitting.',
    },

    literatureBenchmarks: [
      { model: 'MFNet Baseline (Ha et al., IROS 2017)', mIoU: '56.8%', backbone: 'MiniInception' },
      { model: 'RTFNet (Sun et al., RAL 2019)', mIoU: '53.2%', backbone: 'Dual ResNet-152' },
      { model: 'EAEFNet (Freeform Robotics)', mIoU: '58.9%', backbone: 'ResNet-18 / Efficient' },
      { model: 'CMX (Liu et al., CVPR 2023)', mIoU: '58.2% – 59.7%', backbone: 'MiT-B2 / MiT-B4' },
      { model: 'SpatialSeg (Sun et al., 2024)', mIoU: '64.6%', backbone: 'Swin-B Transformer' },
    ],

    auditUtility:
      'Includes audit_mfnet.py: a verified read-only dataset sanity script checking for zero split leakage between train.txt and val.txt, exact 480x640 dimension pairing, and clean 9-class label integrity.',

    futureWork: [
      'Edge deployment benchmarking on NVIDIA Jetson Orin with TensorRT FP16 quantization.',
      'Exporting spatial attention heatmaps to visualize how thermal activations guide segmentation in darkness.',
      'Transformer-based cross-attention encoder exploration (e.g. SegFormer / MiT backbones).',
    ],
  },

  // =========================================================================
  // 2. SELF-RAG & CRAG FOR THE INDIAN CONSTITUTION & IPC
  // =========================================================================
  {
    slug: 'self-rag-constitution',
    title: 'Self-RAG on Indian Constitution & IPC',
    kicker: 'LangGraph · DeepSeek R1/V3 · Corrective RAG',
    category: 'Agentic AI / LLMs',
    featured: false,
    summary:
      'An agentic, self-evaluating RAG system over the Constitution of India and Indian Penal Code using LangGraph, DeepSeek R1/V3, ChromaDB, and Tavily web fallback.',
    description:
      'Standard RAG blindly passes retrieved context to an LLM. This project builds a 16-node LangGraph state machine that routes queries with DeepSeek R1 chain-of-thought, executes parallel multi-query vector searches, filters irrelevant chunks via Map-Reduce scoring, evaluates factual grounding with critic revision, verifies query relevance, and falls back to live Tavily web search when statutes lack coverage.',
    technologies: [
      'Python',
      'LangGraph',
      'DeepSeek R1 & V3',
      'AWS Bedrock',
      'ChromaDB',
      'Ragas',
      'FastAPI',
      'React',
      'DVC',
      'Tavily Search',
    ],
    github: 'https://github.com/atulkumar-ds/Self-RAG-On-Indian-Constitution',
    demo: '',
    dataset:
      'Constitution of India (Articles) and Indian Penal Code (IPC sections) scraped, parsed, and structured into JSON from official Indian legislative repositories.',

    pipeline: [
      'Query Routing (R1)',
      'Parallel Sub-Queries',
      'ChromaDB Retrieval',
      'Map-Reduce Relevance Filter',
      'Web Search Fallback',
      'DeepSeek R1 Generation',
      'Grounding Check & Revision',
      'Relevance Judge & Rewrite',
    ],

    methodologySteps: [
      {
        title: 'Knowledge Graph Construction',
        body: 'A knowledge graph is constructed from Constitution articles and IPC sections using Ragas KnowledgeGraph API, capturing cross-statute entity relationships.',
      },
      {
        title: 'K-Means Diverse Sampling',
        body: 'Document chunks embedded with all-mpnet-base-v2 undergo K-means clustering (sweeping k=4–24, selecting optimal k via silhouette score). Stratified sampling yields a representative 100-document evaluation corpus.',
      },
      {
        title: 'Synthetic Test Set Generation',
        body: 'Ragas TestsetGenerator generates diverse single-hop and multi-hop legal queries paired with reference answers and context ground truths.',
      },
      {
        title: 'DVC Pipeline Automation',
        body: 'The entire evaluation pipeline (knowledge graph -> clustering -> testset generation -> scoring) is tracked and reproducible via dvc.yaml (dvc repro).',
      },
    ],

    evaluationMetrics: [
      { metric: 'Faithfulness', value: '0.96', note: 'Answer factually consistent with retrieved context' },
      {
        metric: 'Context Precision',
        value: '0.95',
        note: 'Non-LLM reference-based variant (avoids multi-hop false negatives)',
      },
      { metric: 'Context Recall', value: '0.90', note: 'All required reference legal documents retrieved' },
      {
        metric: 'Answer Relevancy',
        value: '0.75',
        note: 'Score affected by documented Ragas evaluator question-diversity limitation',
      },
    ],

    latencyBenchmarks: [
      { p: 'p50', time: '2.11 s', note: 'Direct retrieval and single-pass answer' },
      { p: 'p75', time: '3.03 s', note: 'Standard retrieval with relevance filtering' },
      { p: 'p90', time: '16.0 s', note: 'Triggering query expansion or web fallback' },
      { p: 'p95', time: '81.8 s', note: 'Full self-correction loop (grounding revision + answer rewrite)' },
    ],

    tokenUsage: '~1.17 million tokens consumed across knowledge graph creation, test set generation, and evaluation.',

    interfaces: [
      {
        name: 'Terminal CLI',
        body: 'Interactive Rich-powered CLI with streaming token output, markdown rendering, and conversational thread management (/new, exit).',
      },
      {
        name: 'FastAPI Backend',
        body: 'Async REST API with Server-Sent Events (SSE) streaming endpoints for real-time token delivery and session handling.',
      },
      {
        name: 'React Web Frontend',
        body: 'Modern SPA chat interface with streaming message display, session switching, and legal source attribution.',
      },
    ],

    caveats: [
      'Evaluation was conducted on a 50-row synthetic test set generated from legal statutes.',
      'Context precision uses a non-LLM reference-based calculation because standard LLM context precision produces false negatives on multi-hop questions synthesizing multiple articles (Ragas issue #308).',
      'Answer relevancy is affected by a documented Ragas limitation (issues #1979, #1192, #1812) where generated evaluator questions lack variety and temperature is ignored.',
      'Legal Disclaimer: This system is designed as an informational and educational legal assistant, not licensed legal counsel.',
    ],
  },

  // =========================================================================
  // 3. IMAGE CAPTIONING — V1 BASELINE TO V2 ATTENTION
  // =========================================================================
  {
    slug: 'image-captioning',
    title: 'Image Captioning',
    kicker: 'V1 → V2 · Baseline → Attention',
    category: 'Deep Learning',
    featured: false,
    summary:
      'A captioning model built twice: first as a CNN + LSTM baseline, then rebuilt around Bahdanau attention after the baseline hit a representation limit.',
    description:
      'V1 compresses an image into a single 2048-dimensional vector and decodes a sentence from it. That vector turned out to be the ceiling. V2 keeps 64 spatial feature vectors instead of one and lets an attention layer re-weight them at every word, so the decoder can look at a different part of the picture as the sentence develops.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'InceptionV3', 'LSTM', 'Attention', 'Streamlit'],
    github: 'https://github.com/atulkumar-ds/Image-Captioning',
    demo: '',
    dataset: 'Flickr8k — roughly 8,000 images with five human-written captions each.',

    pipeline: [
      'Image',
      'InceptionV3 8x8x2048',
      '64 spatial features',
      'Bahdanau attention',
      'LSTM decoder',
      'Caption',
    ],

    // The two versions, used by the V1/V2 switch on the case study page.
    versions: {
      v1: {
        id: 'v1',
        label: 'V1 Baseline',
        name: 'CNN + LSTM baseline',
        status: 'Completed',
        directory: 'V1_Baseline_CNN_LSTM/',
        headline: 'One vector for the whole image, decoded word by word.',
        pipeline: [
          'Image',
          'InceptionV3',
          '2048-d vector',
          'Dense 256',
          'Add with LSTM state',
          'Softmax word',
        ],
        detail: [
          {
            title: 'Feature extraction',
            body: 'InceptionV3 pretrained on ImageNet, top removed, global average pooling on. Every image becomes one 2048-dimensional vector. Features for the whole dataset are extracted once and cached to image_features.npz so training never re-runs the CNN.',
          },
          {
            title: 'Caption preprocessing',
            body: 'Lowercase, punctuation stripped, digits removed, single-character words dropped, then wrapped in start and end tokens.',
          },
          {
            title: 'Vocabulary and tokenizer',
            body: 'A hand-written tokenizer rather than the Keras one. Reserved indices for pad, start, end and unknown; words appearing fewer than 5 times are excluded. The vocabulary is built from the training split only, so validation words cannot leak in.',
          },
          {
            title: 'Training samples',
            body: 'Each caption expands into one training pair per word: the prefix so far predicts the next token. A custom Keras Sequence generator builds these batches on the fly instead of materialising them all in memory.',
          },
          {
            title: 'Model',
            body: 'Image branch: Dropout(0.5) then Dense(256, relu). Caption branch: Embedding(256, masked), Dropout(0.5), LSTM(256). The two are merged with Add(), passed through Dense(256, relu), then a softmax over the vocabulary.',
          },
          {
            title: 'Training',
            body: 'Adam with sparse categorical crossentropy, batch size 64, a 90/10 image-level split seeded at 42. ModelCheckpoint on validation loss, EarlyStopping with patience 8, and ReduceLROnPlateau halving the learning rate. Configured for 40 epochs; early stopping ended it at 11.',
          },
          {
            title: 'Inference',
            body: 'Greedy decoding. Start from the start token, take the argmax word, append, re-pad, repeat until the end token or the length cap.',
          },
        ],
        metrics: [
          { metric: 'BLEU-1', value: '0.4830' },
          { metric: 'BLEU-2', value: '0.2961' },
          { metric: 'BLEU-3', value: '0.1774' },
          { metric: 'BLEU-4', value: '0.1012' },
        ],
        trainingFacts: [
          'Epochs actually run: 11 of 40 configured, stopped by EarlyStopping.',
          'Training accuracy 38.2%, validation accuracy 34.3% at the final epoch.',
          'Best validation loss 3.3313; learning rate decayed from 1e-3 to 1e-4.',
          'BLEU computed with NLTK corpus_bleu using method-1 smoothing.',
        ],
        metricsNote:
          'Corpus BLEU over the captioned images, from the committed evaluation script and training history.',
      },

      v2: {
        id: 'v2',
        label: 'V2 Attention',
        name: 'CNN + Bahdanau attention + LSTM',
        status: 'Trained, evaluation pending',
        directory: 'V2_Attention/',
        headline: 'Sixty-four spatial features, re-weighted at every word.',
        pipeline: [
          'Image',
          'InceptionV3 8x8x2048',
          '64 spatial features',
          'Bahdanau attention',
          'LSTM decoder',
          'Caption',
        ],
        detail: [
          {
            title: 'Spatial feature extraction',
            body: 'The same InceptionV3, but pooling is switched off. The (8, 8, 2048) activation map is reshaped to (64, 2048) — one vector per grid cell — so spatial layout survives into the decoder.',
          },
          {
            title: 'Encoder',
            body: 'A single Dense(256, relu) projects all 64 vectors into the decoder embedding space. Deliberately thin: the point of V2 is the attention layer, not a heavier encoder.',
          },
          {
            title: 'Bahdanau attention',
            body: 'Three dense layers — W1 over the features, W2 over the decoder hidden state, and V producing one score per location. tanh, then softmax across the 64 positions, then a weighted sum into a single context vector. The layer also returns the weights themselves, which is what would make attention maps drawable later.',
          },
          {
            title: 'Decoder',
            body: 'The context vector is concatenated with the embedded previous word and fed to an LSTM(256) that carries both hidden and cell state across steps, then Dense(256, relu), Dropout(0.3), Dense(vocab). Logits, not probabilities, because the loss handles the softmax.',
          },
          {
            title: 'Loss and training loop',
            body: 'A custom tf.function train_step with GradientTape rather than model.fit — teacher forcing is unrolled explicitly in the model call. Sparse categorical crossentropy from logits, masked so padding positions contribute nothing. Adam at 1e-4 with gradient clipping at norm 5.',
          },
          {
            title: 'Training configuration',
            body: 'Batch size 32, 40 epochs configured, 90/10 split seeded at 42. Only the best validation loss is checkpointed, saved as weights rather than a full model because the model is subclassed.',
          },
          {
            title: 'Committed artefacts',
            body: 'v2_attention.weights.h5 (about 11.9 MB) and tokenizer.json ship with the repository: a 2,827-word vocabulary and a maximum caption length of 34. The Streamlit app loads these directly, so nothing has to be retrained to run a demo.',
          },
          {
            title: 'Inference',
            body: 'Features are extracted, the encoder runs once, then the decoder steps one word at a time, feeding its own argmax back in until the end token. Attention weights are returned at each step but are not yet visualised.',
          },
        ],
        metrics: [],
        trainingFacts: [
          'Vocabulary size 2,827; maximum caption length 34 tokens.',
          'Trained weights and tokenizer are committed, so the app runs without retraining.',
        ],
        metricsNote:
          'V2 has not been scored yet. The V1 directory contains a BLEU evaluation script; the V2 directory does not, so publishing a V2 BLEU number here would mean inventing one. Porting that script to the attention decoder is the next task on this project.',
      },
    },

    limitation: {
      title: 'Why V1 needed replacing',
      body: 'Global average pooling collapses the entire image into one 2048-dimensional vector before a single word is generated. Whatever is not preserved in that vector is unavailable to the decoder for the rest of the sentence, and the decoder has no way to attend to one region while writing one word and a different region while writing the next. The symptom shows up in the BLEU curve: BLEU-1 of 0.4830 says individual words are often right, while BLEU-4 of 0.1012 says the four-word sequences describing specific things usually are not. The model learns the shape of a caption faster than it learns the contents of the picture. Greedy decoding compounds this, since one confident wrong word early commits the rest of the sentence.',
      chain: [
        'Build a baseline',
        'Measure it',
        'Find the bottleneck',
        'Redesign the representation',
        'Retrain',
        'Ship the app',
      ],
    },

    comparison: [
      { aspect: 'Image representation', v1: 'One 2048-d global vector', v2: '64 spatial vectors (8x8 grid)' },
      { aspect: 'CNN pooling', v1: 'Global average pooling on', v2: 'Pooling off, map reshaped' },
      { aspect: 'Region selection', v1: 'None, fixed for the whole caption', v2: 'Bahdanau attention, recomputed per word' },
      { aspect: 'Fusion', v1: 'Add() image and caption branches', v2: 'Context vector concatenated with word embedding' },
      { aspect: 'Decoder state', v1: 'LSTM hidden state only', v2: 'Hidden and cell state carried explicitly' },
      { aspect: 'Training loop', v1: 'model.fit with a Keras Sequence', v2: 'Custom tf.function step with GradientTape' },
      { aspect: 'Loss', v1: 'Sparse categorical crossentropy', v2: 'Same, masked over padding, from logits' },
      { aspect: 'Optimiser', v1: 'Adam, default rate', v2: 'Adam 1e-4 with clipnorm 5' },
      { aspect: 'Batch size', v1: '64', v2: '32' },
      { aspect: 'Saved artefact', v1: 'Full .keras model', v2: 'Weights file (subclassed model)' },
      { aspect: 'Evaluation', v1: 'BLEU-1 to BLEU-4 measured', v2: 'Not measured yet' },
    ],

    application: {
      title: 'Streamlit application',
      body: 'Both versions ship with an upload-an-image interface. The V2 app caches the CNN, the decoder and the tokenizer with st.cache_resource so the model loads once per session rather than once per click, writes the upload to a temporary file, runs the caption loop, and cleans the file up afterwards.',
      steps: [
        'Upload an image',
        'InceptionV3 extracts features',
        'Decoder generates a caption',
        'Caption is displayed',
      ],
    },

    examples: [],

    lessons: [
      'A baseline is only useful if it is measured. BLEU-1 against BLEU-4 is what pointed at the representation rather than the decoder.',
      'The bottleneck was in the encoder, but it only became visible in the output of the decoder.',
      'Subclassed models cannot be saved the way functional models can, and that changed how V2 checkpoints and how the app loads it.',
      'Extracting CNN features once and caching them to disk turned an overnight job into a repeatable one.',
      'V2 is not finished until it is scored. Trained is not the same as evaluated.',
    ],
  },

  // =========================================================================
  // 4. LOVEDA GEOSPATIAL SEMANTIC SEGMENTATION WITH U-NET
  // =========================================================================
  {
    slug: 'geospatial-segmentation',
    title: 'LoveDA Geospatial Semantic Segmentation',
    kicker: 'PyTorch U-Net · Remote Sensing · 7 Land-Cover Classes',
    category: 'Computer Vision',
    featured: false,
    summary:
      'A 7.77M parameter U-Net segmenting high-resolution aerial imagery across urban and rural land-cover classes on the LoveDA benchmark.',
    description:
      'Satellite imagery exhibits extreme domain shifts between dense cities and rural countryside. This project implements a symmetrical PyTorch U-Net with DoubleConv blocks, trained with a composite CrossEntropy + Soft Dice loss on LoveDA aerial imagery, evaluated on the official validation split.',
    technologies: [
      'Python',
      'PyTorch',
      'Torchvision',
      'U-Net',
      'NumPy',
      'Matplotlib',
      'Pillow',
      'Torchinfo',
    ],
    github: 'https://github.com/atulkumar-ds/LoveDA-UNet',
    demo: '',
    dataset:
      'LoveDA benchmark: High-resolution remote sensing imagery across Urban and Rural scenes. Unused class 0 (no-data) remapped to ignore index 255.',

    pipeline: [
      '256x256 Satellite Tile',
      '4-Stage DoubleConv Encoder',
      '512-ch Bottleneck',
      'Transposed Conv Decoder',
      'Skip Feature Concat',
      '7 Land-Cover Classes',
    ],

    architectureDetails: [
      { title: 'Contracting Encoder', detail: '4 stages with DoubleConv (Conv3x3-BN-ReLU x2) and MaxPool2d (32, 64, 128, 256 channels).' },
      { title: 'Bottleneck', detail: 'DoubleConv layer expanding feature channels from 256 to 512 at 16x16 resolution.' },
      { title: 'Expansive Decoder', detail: '4 stages with ConvTranspose2d upsampling, skip feature concatenation from encoder, and DoubleConv.' },
      { title: 'Output Head', detail: 'Final 1x1 convolution projecting 32 feature channels to 7 semantic logits.' },
    ],

    complexity: {
      params: '7,766,183 (7.77M, 100% trainable)',
      flops: '13.71 GMac (per [1, 3, 256, 256] forward pass)',
    },

    aggregateMetrics: [
      { metric: 'Pixel Accuracy', value: '55.30%', note: 'Overall correctly classified pixels' },
      { metric: 'Mean IoU', value: '35.37%', note: 'Macro average across all 7 classes' },
      { metric: 'Mean Dice Score', value: '51.58%', note: 'Macro average F1 score' },
    ],

    classMetrics: [
      { classId: 3, name: 'Water', iou: '42.63%', dice: '59.77%', precision: '52.46%', recall: '69.45%' },
      { classId: 6, name: 'Agriculture', iou: '39.95%', dice: '57.09%', precision: '63.61%', recall: '51.78%' },
      { classId: 2, name: 'Road', iou: '38.53%', dice: '55.63%', precision: '59.76%', recall: '52.03%' },
      { classId: 0, name: 'Background', iou: '38.29%', dice: '55.37%', precision: '53.36%', recall: '57.54%' },
      { classId: 1, name: 'Building', iou: '36.99%', dice: '54.01%', precision: '50.43%', recall: '58.13%' },
      { classId: 5, name: 'Forest', iou: '36.29%', dice: '53.25%', precision: '49.66%', recall: '57.40%' },
      { classId: 4, name: 'Barren', iou: '14.89%', dice: '25.92%', precision: '53.00%', recall: '17.16%' },
    ],

    trainingFacts: [
      'Trained from scratch for 20 epochs with batch size 4 on 256x256 crops.',
      'Composite objective: 0.5 * CrossEntropy + 0.5 * Soft Dice Loss ignoring label 255.',
      'Optimizer: Adam (lr 1e-4) with ReduceLROnPlateau (factor 0.5, patience 2).',
      'Data augmentation: Random horizontal/vertical flips and 90-degree rotations.',
      'Evaluated on checkpoints/best_model.pth (93.3 MB) over the official LoveDA validation set.',
    ],

    caveat:
      'These results represent a baseline model trained from scratch on 256x256 crops. Barren land exhibits lower recall (17.16%) due to visual overlap with unpaved background dirt and seasonal fields. Future work includes evaluating sliding-window 512x512 patches, benchmarking pretrained backbones (ResNet34/50), and domain adaptation between Urban and Rural distributions.',
  },

  // =========================================================================
  // 5. STARTUP FUNDING DASHBOARD
  // =========================================================================
  {
    slug: 'startup-dashboard',
    title: 'Indian Startup Funding Dashboard',
    kicker: 'Deployed on Streamlit Cloud',
    category: 'Data / Applications',
    featured: false,
    summary:
      'A four-view Streamlit application over 2,821 cleaned Indian startup funding rounds, live at a public URL.',
    description:
      'The raw dataset is 3,044 rows of inconsistent funding records: dates in mixed formats, amounts written as strings, city names spelled several ways. Cleaning it down to 2,821 usable rows is most of the work; the dashboard is the part that makes the result askable.',
    technologies: ['Python', 'Streamlit', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/atulkumar-ds/startup-dashboard',
    demo: 'https://startup-dashboard-k8qijogpwmhfls9ppswnhk.streamlit.app/',

    pipeline: ['Raw CSV 3,044 rows', 'Clean in Pandas', '2,821 rows', 'Aggregate', 'Streamlit views'],

    problem:
      'A spreadsheet of funding rounds answers nothing on its own. The questions people actually have — which sectors pulled the most money, which investors are most active, what a specific startup raised and when — each need a different slice of the same table. That is an application, not a chart.',

    dataFacts: [
      { label: 'Raw records', value: '3,044' },
      { label: 'After cleaning', value: '2,821' },
      { label: 'Unique startups', value: '2,195' },
      { label: 'Unique investors', value: '3,115' },
      { label: 'Cities', value: '101' },
      { label: 'Date range', value: 'Jan 2015 – Oct 2020' },
    ],

    dataNotes: [
      'Columns: date, startup, vertical, subvertical, city, investors, round, amount in crore rupees.',
      'Dates parsed with errors coerced, then split into month and year columns for aggregation.',
      'Amounts coerced to numeric with unparseable values falling back to zero rather than dropping the row.',
      'The investors field holds comma-separated lists, so investor views split and explode it: 2,254 raw strings resolve to 3,115 distinct investor names.',
      '770 industry verticals and 38 round types, both long-tailed, which is why the charts cap at the top 8 to 10.',
    ],

    views: [
      {
        name: 'Home',
        body: 'Record count, unique startups, unique investors and cities covered as headline metrics, plus a sample of the table.',
      },
      {
        name: 'Overall analysis',
        body: 'Total invested, largest single deal, average ticket size, a month-on-month trend that toggles between rupees and deal count, top sectors, top cities, and the distribution of round types.',
      },
      {
        name: 'Startup',
        body: 'Pick a company: total raised, number of rounds, primary city, every round in a sortable table, amount per round, and investor share as a pie. Defaults to a top-10 most-funded leaderboard before a selection is made.',
      },
      {
        name: 'Investor',
        body: 'Pick an investor: total deployed, deal count, average cheque, sectors touched, five most recent investments, biggest positions, sector mix and a year-on-year line.',
      },
    ],

    engineering: [
      {
        title: 'Loading is cached',
        body: 'Read, parse and type-coerce happen inside an st.cache_data function, so switching views does not re-read the CSV.',
      },
      {
        title: 'Paths resolve from the file, not the shell',
        body: 'The CSV path is built from the module location rather than the working directory, which is why the app runs the same locally and on Streamlit Cloud.',
      },
      {
        title: 'Charts fail quietly, not loudly',
        body: 'Long investor names are truncated before being used as pie labels and empty slices are filtered out, because both crash Matplotlib on real data.',
      },
      {
        title: 'Figures are closed',
        body: 'Every Matplotlib figure is explicitly closed after rendering. Without it, a long session leaks memory through the Streamlit rerun loop.',
      },
    ],
  },

  // =========================================================================
  // 6. ML ALGORITHMS FROM SCRATCH
  // =========================================================================
  {
    slug: 'ml-from-scratch',
    title: 'ML Algorithms From Scratch',
    kicker: 'NumPy only · No scikit-learn',
    category: 'Machine Learning',
    featured: false,
    summary:
      'Four machine learning algorithms implemented from their mathematical definitions in NumPy, with the train/test split and the accuracy metric written by hand too.',
    description:
      'Each notebook loads a dataset with Pandas, converts to NumPy, then implements the algorithm end to end: parameter initialisation, forward pass, loss, gradients, updates, prediction and evaluation. Scikit-learn is not imported anywhere in the repository — not for the models, not for splitting the data, not for scoring it.',
    technologies: ['Python', 'NumPy', 'Pandas', 'Jupyter'],
    github: 'https://github.com/atulkumar-ds/ML-Algorithm-From-Scratch',
    demo: '',

    algorithms: [
      {
        name: 'Logistic Regression',
        notebook: 'Logistic_Regression.ipynb',
        detail:
          'Sigmoid hypothesis, binary cross-entropy loss, gradients derived by hand, batch gradient descent.',
        data: '20,000 rows x 5 features',
        result: 'Test accuracy 99.875%',
      },
      {
        name: 'Gradient Descent',
        notebook: 'Gradient_Descent.ipynb',
        detail:
          'The optimiser on its own: parameter initialisation, the update rule, learning-rate experiments and convergence tracking.',
        data: '50,000 rows x 5 features',
        result: 'MSE 398.16',
      },
      {
        name: 'K-Nearest Neighbors',
        notebook: 'Knn.ipynb',
        detail:
          'Euclidean distance computed directly, majority vote via Counter, prediction loop written out rather than vectorised away.',
        data: '200 rows x 4 features',
        result: 'Test accuracy 100%',
      },
      {
        name: 'Gaussian Naive Bayes',
        notebook: 'Naive_Bayes.ipynb',
        detail:
          'Per-class means, variances and priors fitted manually; Gaussian likelihood evaluated in log space for numerical stability.',
        data: '~100,000 rows x 10 features',
        result: 'Test accuracy 100%',
      },
    ],

    problem:
      'Calling model.fit() is three lines and teaches nothing about what happened in between. This repository removes the library and forces every step to be written out: the loss, the derivative of the loss, the update, and the arithmetic that turns predictions into a score.',

    approach: [
      'Data loaded with Pandas, immediately converted to NumPy arrays for the numerical work.',
      'A hand-written train/test split with a seeded shuffle, so results are reproducible without scikit-learn.',
      'Gradients derived on paper and then written directly as NumPy expressions, with no autodiff.',
      'Naive Bayes evaluated in log space, because multiplying ten small Gaussian likelihoods underflows.',
      'Accuracy implemented as a one-line NumPy comparison rather than imported.',
    ],

    caveat:
      'The datasets in this repository are generated rather than collected, and they are close to linearly separable, which is why three of the four scores sit at or near 100%. The numbers show that the implementations are correct, not that the models are strong. Benchmarking against scikit-learn on real datasets is the next step listed in the repository.',

    learned: [
      'Why working in log space is not optional once you multiply enough probabilities together.',
      'How the learning rate and the shape of the loss surface interact, visible directly in the convergence trace.',
      'That a train/test split contains more decisions than a single function call suggests.',
      'Where each algorithm actually spends its time — KNN does nothing at fit time and everything at predict time.',
    ],
  },

  // =========================================================================
  // 7. INSTRUCTOR EFFECTIVENESS ANALYSIS
  // =========================================================================
  {
    slug: 'instructor-effectiveness',
    title: 'Instructor Effectiveness Analysis',
    kicker: 'Classification · Model comparison',
    category: 'Machine Learning',
    featured: false,
    summary:
      'A supervised classification study that aggregates 2,000 course batches into 120 instructor profiles and sorts them into effectiveness tiers.',
    description:
      'Engagement data arrives per batch, but the question is about instructors. The interesting part of this project is the reshape: 2,000 batch rows become 120 instructor rows with 25 aggregated features, which turns a comfortable dataset into a small one and changes how the results have to be read.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/atulkumar-ds/Instructor-Effectiveness-Analysis',
    demo: '',

    problem:
      'Nine engagement signals per batch — completion, dropout, score improvement, quiz scores, watch time, submissions, forum activity, feedback score, feedback response rate — and no label saying who taught well. The label has to be constructed from the data before anything can be predicted from it.',

    approach: [
      'A composite effectiveness score is computed per batch, then instructors are aggregated to 25 features covering means and minimums across their batches.',
      'Instructors are split into Low, Medium and High tiers at 40 each, so the classes are balanced by construction.',
      'A stratified split of 90 training and 30 test rows, with scaling inside a Pipeline so the scaler is fitted on training folds only.',
      'Three models compared on the same split: logistic regression, random forest and gradient boosting.',
      'Stratified 5-fold cross-validation on weighted F1, because a single 30-row test set is not enough to separate them.',
    ],

    results: [
      { metric: 'Random Forest', value: '0.90', note: 'test accuracy · CV F1 0.873 ± 0.051' },
      { metric: 'Gradient Boosting', value: '0.90', note: 'test accuracy · CV F1 0.821 ± 0.047' },
      { metric: 'Logistic Regression', value: '0.87', note: 'test accuracy · CV F1 0.828 ± 0.059' },
    ],

    findings: [
      'Random forest feature importances put completion rate (0.164) and average score improvement (0.157) clearly ahead of the rest.',
      'Feedback score (0.117) and quiz score (0.110) follow, so self-reported satisfaction and measured learning both carry signal.',
      'Dropout rate and watch time contribute far less than expected, with watch time landing at 0.039.',
      'Random forest and gradient boosting tie at 0.90 on the test set, but cross-validation separates them: 0.873 against 0.821 weighted F1.',
    ],

    caveat:
      'The modelling set is 120 rows with a 30-row test split. A single misclassification moves test accuracy by 3.3 percentage points, which is why the cross-validated F1 with its standard deviation is the number worth reading and the headline accuracy is not. The dataset is also generated rather than collected from a real platform.',
  },
]

// Categories are derived from the data, so a filter can never point at an
// empty set and the list stays correct when a project is added or removed.
export const projectCategories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
