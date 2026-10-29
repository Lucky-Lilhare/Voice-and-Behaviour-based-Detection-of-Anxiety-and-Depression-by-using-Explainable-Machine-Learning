/**
 * Academic Research Specifications & Feature Engineering Guide
 * Project: Voice and Behavior-Based Detection of Depression and Anxiety Using Explainable Machine Learning
 * Final Year B.Tech Research Project
 */

export const PROJECT_DETAILS = {
  title: "Voice and Behavior-Based Detection of Depression and Anxiety Using Explainable Machine Learning",
  shortTitle: "AuraMind Explainable ML Research",
  degree: "Bachelor of Technology (B.Tech)",
  department: "Department of Computer Science & Engineering",
  academicYear: "2025 – 2026",
  abstract:
    "Conventional mental health diagnostics rely heavily on subjective self-reporting questionnaires (e.g., PHQ-9, GAD-7) which suffer from recall bias and social stigma. This research proposes a non-invasive multimodal screening framework utilizing speech acoustics (eGeMAPS acoustic parameter set) and visual facial behavioral markers (Action Units, gaze tracking, blink dynamics). Crucially, we incorporate Explainable AI (XAI) using SHAP (Shapley Additive exPlanations) to ensure transparent, accountable biomarker attribution, providing clinicians and individuals with interpretable insights rather than opaque black-box predictions.",
  disclaimer:
    "ACADEMIC RESEARCH & DEMONSTRATION PLATFORM: This web application is an educational prototype built for engineering demonstration and research evaluation. It is NOT a certified medical diagnostic device and cannot diagnose clinical depression, anxiety, or any medical condition. Always consult certified clinical psychologists, psychiatrists, or medical professionals for mental health concerns.",
};

export const ACOUSTIC_FEATURES_GUIDE = [
  {
    name: "Fundamental Frequency (F0 / Pitch)",
    category: "Prosodic Biomarker",
    significance: "Monotonous pitch and reduced fundamental frequency variation (reduced standard deviation of F0) are correlated with psychomotor retardation in depressive states.",
    unit: "Hz / Semitones",
    referenceRange: "Male: 85-155 Hz | Female: 165-255 Hz",
  },
  {
    name: "Jitter (Local Perturbation)",
    category: "Glottal & Vocal Cord Stability",
    significance: "Cycle-to-cycle frequency variation in vocal fold oscillation. Elevated jitter often reflects somatic muscle tension, vocal fatigue, and acute anxiety.",
    unit: "Percentage (%)",
    referenceRange: "< 1.5% for modal phonation",
  },
  {
    name: "Shimmer (Amplitude Perturbation)",
    category: "Glottal & Vocal Cord Stability",
    significance: "Variability in peak-to-peak sound amplitude between adjacent glottal cycles. Reflects irregularities in subglottal breath support.",
    unit: "Percentage (%)",
    referenceRange: "< 3.8% in sustained vowels",
  },
  {
    name: "Speech Rate & Pause Latency Ratio",
    category: "Temporal / Cognitive Prosody",
    significance: "Psychological distress often manifests as prolonged inter-word pauses, slower articulation rate, and hesitation latencies during spontaneous answering.",
    unit: "Syllables / sec & % silence",
    referenceRange: "3.5 – 4.8 syllables/sec",
  },
  {
    name: "MFCCs (Mel-Frequency Cepstral Coefficients)",
    category: "Spectral Envelope",
    significance: "Represents vocal tract filter characteristics, capturing subtle formant damping and resonance shifts under emotional distress.",
    unit: "13 - 39 dimensions",
    referenceRange: "Standardized z-scores",
  },
];

export const BEHAVIORAL_FEATURES_GUIDE = [
  {
    code: "AU04",
    name: "Brow Lowerer (Corrugator Supercilii)",
    relevance: "Frequent involuntary brow furrowing is a recognized affective marker of cognitive effort, anxiety, and distress.",
    modality: "Facial Action Unit (OpenFace)",
  },
  {
    code: "AU12",
    name: "Lip Corner Puller (Zygomaticus Major)",
    relevance: "Associated with smile activation. Attenuation or asymmetry in spontaneous AU12 duration is associated with emotional blunting.",
    modality: "Facial Action Unit (OpenFace)",
  },
  {
    code: "Blink Rate & Duration",
    name: "Spontaneous Eye Blink Dynamics",
    relevance: "Dopaminergic activity correlates with blink rate. Significantly elevated blink frequency (>26/min) often signals acute cognitive stress or anxiety.",
    modality: "Ocular Tracking",
  },
  {
    code: "Gaze Fixation & Aversion",
    name: "Ocular Gaze Centering Ratio",
    relevance: "Decreased direct frontal eye contact and frequent downward gaze shifts serve as nonverbal correlates of withdrawn affect and dysphoria.",
    modality: "Eye Gaze Estimation",
  },
  {
    code: "Head Pose Variance",
    name: "3D Head Yaw / Pitch / Roll Micro-movements",
    relevance: "Persistent downward head tilt and diminished head movement amplitude indicate reduced dynamic behavioral engagement.",
    modality: "Head Pose Vector (Euler angles)",
  },
];

export const XAI_METHODOLOGY = [
  {
    title: "1. Multimodal Feature Extraction",
    description: "Raw microphone audio is transformed via Librosa/openSMILE into standardized eGeMAPS acoustic vectors. Video frames yield facial landmark coordinates and Action Unit intensities via MediaPipe / OpenFace.",
  },
  {
    title: "2. Ensemble Model Architecture",
    description: "LightGBM and Multi-layer Perceptron (MLP) ensemble architectures model complex non-linear interactions across temporal audio-visual feature spaces.",
  },
  {
    title: "3. SHAP (Shapley Additive Explanations)",
    description: "Ground-truth game theoretic values compute the marginal contribution of each acoustic and behavioral feature toward the final wellness score, preventing black-box opacity.",
  },
  {
    title: "4. Human-in-the-Loop Transparency",
    description: "Predictions are presented alongside clinical biomarker breakdowns, allowing healthcare researchers to corroborate AI findings with behavioral rationale.",
  },
];
