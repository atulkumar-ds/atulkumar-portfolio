// ---------------------------------------------------------------------------
// PROJECTS — rebuilt in V2 by reading the actual repositories, not the resume.
//
// Every architectural detail, hyperparameter and metric below was taken from
// source files, committed READMEs, committed training history or committed
// data files. Where a repository does not contain a number, this file leaves
// the field empty and the page renders an honest "not measured yet" state
// instead of inventing one.
//
// Sources audited (August 2026):
//   github.com/atulkumar-ds/Image-Captioning
//   github.com/atulkumar-ds/ML-Algorithm-From-Scratch
//   github.com/atulkumar-ds/startup-dashboard
//   github.com/atulkumar-ds/Instructor-Effectiveness-Analysis
// ---------------------------------------------------------------------------

export const projects = [
  // =========================================================================
  // IMAGE CAPTIONING — the flagship. Two versions, one engineering story.
  // =========================================================================
  {
    slug: 'image-captioning',
    title: 'Image Captioning',
    kicker: 'V1 → V2 · Baseline → Attention',
    category: 'Deep Learning',
    featured: true,
    summary:
      'A captioning model built twice: first as a CNN + LSTM baseline, then rebuilt around Bahdanau attention after the baseline hit a representation limit.',
    description:
      'V1 compresses an image into a single 2048-dimensional vector and decodes a sentence from it. That vector turned out to be the ceiling. V2 keeps 64 spatial feature vectors instead of one and lets an attention layer re-weight them at every word, so the decoder can look at a different part of the picture as the sentence develops.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'InceptionV3', 'LSTM', 'Attention', 'Streamlit'],
    github: 'https://github.com/atulkumar-ds/Image-Captioning',
    demo: '',
    dataset: 'Flickr8k — roughly 8,000 images with five human-written captions each.',

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
        // From models/history.json and the committed V1 README.
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
        // Deliberately empty. The V2 directory has no BLEU script.
        metrics: [],
        trainingFacts: [
          'Vocabulary size 2,827; maximum caption length 34 tokens.',
          'Trained weights and tokenizer are committed, so the app runs without retraining.',
        ],
        metricsNote:
          'V2 has not been scored yet. The V1 directory contains a BLEU evaluation script; the V2 directory does not, so publishing a V2 BLEU number here would mean inventing one. Porting that script to the attention decoder is the next task on this project.',
      },
    },

    // The bridge between the two versions — the actual reason V2 exists.
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

    // Add { image, caption, version } entries once real screenshots exist.
    // The gallery renders nothing at all while this is empty, by design.
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
  // ML ALGORITHMS FROM SCRATCH
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

    // Exactly what is in the repository — four notebooks, no more.
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

    // Honesty note that belongs on the page, not buried in a comment.
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
  // STARTUP FUNDING DASHBOARD
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

    // Every figure below was computed from the committed startup_cleaned.csv.
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
  // INSTRUCTOR EFFECTIVENESS ANALYSIS
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
