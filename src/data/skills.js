// ---------------------------------------------------------------------------
// SKILLS — audited against the GitHub repositories in August 2026.
//
// A technology only appears here if it is used in code Atul has published, or
// is stated on the resume. Removed during the V2 audit because nothing in the
// repositories supports them: PyTorch, GRU, Transformers, generic "RNN",
// XGBoost, Linux, and any backend framework.
//
// Flagged for Atul to confirm: C and SQL come from the resume, not from a
// public repository. React / Vite / Tailwind are listed because this site is
// built with them. Delete anything you would not want to be questioned on.
// ---------------------------------------------------------------------------

export const skillGroups = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'C', 'SQL'],
  },
  {
    category: 'Software engineering',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Git',
      'GitHub',
      'Modular project structure',
    ],
  },
  {
    category: 'Data handling',
    items: [
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Exploratory Data Analysis',
      'Data cleaning',
      'Feature engineering',
    ],
  },
  {
    category: 'Machine learning',
    items: [
      'Scikit-learn',
      'Logistic Regression',
      'K-Nearest Neighbors',
      'Gaussian Naive Bayes',
      'Random Forest',
      'Gradient Boosting',
      'Gradient Descent',
      'Cross-validation',
    ],
  },
  {
    category: 'Deep learning',
    items: [
      'TensorFlow',
      'Keras',
      'CNN',
      'LSTM',
      'Bahdanau Attention',
      'Transfer Learning',
      'Teacher Forcing',
    ],
  },
  {
    category: 'Building & shipping',
    items: ['Streamlit', 'Streamlit Cloud', 'React', 'Vite', 'Tailwind CSS', 'REST APIs'],
  },
]

// The three-part positioning strip under the hero.
export const engineeringIdentity = [
  {
    title: 'Software engineering',
    stack: ['C++', 'Python', 'DSA', 'OOP', 'Git'],
    blurb:
      'Data structures and algorithms practised in C++, and projects laid out as modules rather than a single notebook.',
  },
  {
    title: 'Machine learning',
    stack: ['NumPy', 'Scikit-learn', 'TensorFlow', 'Keras'],
    blurb:
      'Algorithms written by hand from their maths first, then the same problems solved with the standard libraries.',
  },
  {
    title: 'Shipping',
    stack: ['Streamlit', 'Streamlit Cloud', 'React'],
    blurb:
      'Every project ends at something somebody can open — a deployed dashboard, an upload-an-image app, this site.',
  },
]
