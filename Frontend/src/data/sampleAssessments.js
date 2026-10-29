/**
 * DEMONSTRATION DATA NOTICE:
 * This data is simulated sample data for academic project presentation and UI testing.
 * It does NOT represent real medical assessments or actual clinical diagnoses.
 */

export const DEMO_USER = {
  name: "Arjun Sharma",
  email: "arjun.sharma@example.edu",
  role: "Research Participant",
  institution: "Department of Computer Science & Engineering",
  id: "STU-2026-8842",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
};

export const DEMO_METRICS = {
  totalAssessments: 6,
  lastAssessmentDate: "24 Oct 2026, 04:30 PM",
  latestStatus: "Screening Completed (Demo)",
  latestWellnessCategory: "Mild Variation Detected",
  stabilityScore: "78 / 100",
  confidenceScore: "87.4%",
};

export const DEMO_HISTORY_CHART = [
  { date: "Oct 01", compositeScore: 68, voiceStability: 72, behavioralEngagement: 65 },
  { date: "Oct 06", compositeScore: 71, voiceStability: 74, behavioralEngagement: 69 },
  { date: "Oct 11", compositeScore: 65, voiceStability: 67, behavioralEngagement: 64 },
  { date: "Oct 16", compositeScore: 79, voiceStability: 82, behavioralEngagement: 76 },
  { date: "Oct 20", compositeScore: 74, voiceStability: 76, behavioralEngagement: 72 },
  { date: "Oct 24", compositeScore: 78, voiceStability: 80, behavioralEngagement: 77 },
];

export const DEMO_RECENT_ASSESSMENTS = [
  {
    id: "ASM-2026-104",
    date: "24 Oct 2026, 16:30",
    type: "Multimodal (Voice + Facial)",
    status: "Completed (Demo)",
    statusColor: "emerald",
    compositeScore: 78,
    summary: "Balanced prosodic variability; mild transient gaze avoidance observed during open reflection prompt.",
    acousticFeatures: {
      pitchJitter: "1.42%",
      shimmer: "3.18%",
      meanF0: "148.5 Hz",
      speakingRate: "3.8 syllables/sec",
      vocalHesitationCount: 2,
    },
    visualFeatures: {
      blinkRate: "18 blinks/min (Optimal)",
      headPoseStability: "89%",
      actionUnits: "AU06 (Cheek Raiser), AU12 (Lip Corner Puller) detected",
      eyeGazeConsistency: "76% frontal focus",
    },
    shapContributions: [
      { feature: "Pitch Variation (F0 SD)", value: 0.18, type: "positive", label: "Prosodic expressiveness (+0.18)" },
      { feature: "Pause Duration Ratio", value: -0.12, type: "negative", label: "Elevated hesitation latency (-0.12)" },
      { feature: "Eye Gaze Centering", value: 0.15, type: "positive", label: "Steady visual engagement (+0.15)" },
      { feature: "AU04 (Brow Lowerer)", value: -0.09, type: "negative", label: "Transient tension expression (-0.09)" },
      { feature: "Speech Energy Entropy", value: 0.11, type: "positive", label: "Dynamic vocal energy (+0.11)" },
    ],
  },
  {
    id: "ASM-2026-098",
    date: "20 Oct 2026, 11:15",
    type: "Voice Only",
    status: "Completed (Demo)",
    statusColor: "emerald",
    compositeScore: 74,
    summary: "Consistent pitch modulation across standard reading passage; slight vocal fatigue noted.",
    acousticFeatures: {
      pitchJitter: "1.65%",
      shimmer: "3.42%",
      meanF0: "142.1 Hz",
      speakingRate: "3.5 syllables/sec",
      vocalHesitationCount: 3,
    },
    visualFeatures: {
      blinkRate: "N/A (Voice Modality Only)",
      headPoseStability: "N/A",
      actionUnits: "N/A",
      eyeGazeConsistency: "N/A",
    },
    shapContributions: [
      { feature: "Pitch Variation (F0 SD)", value: 0.14, type: "positive", label: "Moderate prosody (+0.14)" },
      { feature: "Harmonic-to-Noise Ratio", value: 0.16, type: "positive", label: "Clear vocal acoustics (+0.16)" },
      { feature: "Vocal Hesitation Latency", value: -0.15, type: "negative", label: "Slight hesitation delay (-0.15)" },
    ],
  },
  {
    id: "ASM-2026-091",
    date: "16 Oct 2026, 09:40",
    type: "Multimodal (Voice + Facial)",
    status: "Completed (Demo)",
    statusColor: "emerald",
    compositeScore: 79,
    summary: "Strong verbal fluency, relaxed facial musculature, and steady frontal gaze alignment.",
    acousticFeatures: {
      pitchJitter: "1.28%",
      shimmer: "2.95%",
      meanF0: "152.0 Hz",
      speakingRate: "4.1 syllables/sec",
      vocalHesitationCount: 1,
    },
    visualFeatures: {
      blinkRate: "16 blinks/min (Optimal)",
      headPoseStability: "94%",
      actionUnits: "AU12 (Smile), AU25 (Lips Part) detected",
      eyeGazeConsistency: "88% frontal focus",
    },
    shapContributions: [
      { feature: "Speaking Rate Fluency", value: 0.22, type: "positive", label: "High verbal fluidity (+0.22)" },
      { feature: "AU12 Expression Activation", value: 0.19, type: "positive", label: "Relaxed facial posture (+0.19)" },
      { feature: "Head Pose Micro-tremor", value: 0.08, type: "positive", label: "Stable orientation (+0.08)" },
    ],
  },
  {
    id: "ASM-2026-084",
    date: "11 Oct 2026, 18:20",
    type: "Multimodal (Voice + Facial)",
    status: "Completed (Demo)",
    statusColor: "amber",
    compositeScore: 65,
    summary: "Elevated acoustic pause ratio and reduced eye contact duration under evening exam stress.",
    acousticFeatures: {
      pitchJitter: "1.98%",
      shimmer: "4.12%",
      meanF0: "134.8 Hz",
      speakingRate: "3.0 syllables/sec",
      vocalHesitationCount: 5,
    },
    visualFeatures: {
      blinkRate: "28 blinks/min (Elevated)",
      headPoseStability: "74%",
      actionUnits: "AU04 (Brow furrowing) observed",
      eyeGazeConsistency: "61% frontal focus",
    },
    shapContributions: [
      { feature: "Elevated Pause Latency", value: -0.24, type: "negative", label: "Prolonged response hesitations (-0.24)" },
      { feature: "Blink Frequency Spikes", value: -0.19, type: "negative", label: "Elevated blink rate (-0.19)" },
      { feature: "Acoustic Shimmer", value: -0.14, type: "negative", label: "Acoustic micro-irregularities (-0.14)" },
      { feature: "Mean F0 Regularity", value: 0.09, type: "positive", label: "Sustained base pitch (+0.09)" },
    ],
  },
  {
    id: "ASM-2026-077",
    date: "06 Oct 2026, 14:05",
    type: "Video Only",
    status: "Completed (Demo)",
    statusColor: "emerald",
    compositeScore: 71,
    summary: "Adequate visual engagement; smooth facial dynamics with occasional downward gaze drift.",
    acousticFeatures: {
      pitchJitter: "N/A",
      shimmer: "N/A",
      meanF0: "N/A",
      speakingRate: "N/A",
      vocalHesitationCount: 0,
    },
    visualFeatures: {
      blinkRate: "19 blinks/min",
      headPoseStability: "82%",
      actionUnits: "AU01, AU02 (Inner/Outer Brow Raiser)",
      eyeGazeConsistency: "72% frontal focus",
    },
    shapContributions: [
      { feature: "Gaze Alignment Stability", value: 0.16, type: "positive", label: "Consistent camera focus (+0.16)" },
      { feature: "Head Pitch Variance", value: -0.11, type: "negative", label: "Downward tilt tendency (-0.11)" },
    ],
  },
  {
    id: "ASM-2026-062",
    date: "01 Oct 2026, 10:10",
    type: "Multimodal (Voice + Facial)",
    status: "Completed (Demo)",
    statusColor: "emerald",
    compositeScore: 68,
    summary: "Baseline calibration session. System established individual vocal pitch and facial landmark baseline.",
    acousticFeatures: {
      pitchJitter: "1.52%",
      shimmer: "3.25%",
      meanF0: "146.0 Hz",
      speakingRate: "3.6 syllables/sec",
      vocalHesitationCount: 2,
    },
    visualFeatures: {
      blinkRate: "17 blinks/min",
      headPoseStability: "86%",
      actionUnits: "Neutral baseline state",
      eyeGazeConsistency: "80% frontal focus",
    },
    shapContributions: [
      { feature: "Baseline F0 Pitch Mean", value: 0.12, type: "positive", label: "Standard baseline calibration (+0.12)" },
      { feature: "Initial Session Nervousness", value: -0.10, type: "negative", label: "First-run hesitation (-0.10)" },
    ],
  },
];

export const WELLNESS_RESOURCES = [
  {
    id: "res-1",
    title: "4-7-8 Rhythmic Breathing",
    category: "Mindfulness Tool",
    duration: "3-5 mins",
    description: "Scientifically proven breath modulation technique to stimulate the parasympathetic nervous system and downregulate acute anxiety.",
    type: "interactive",
  },
  {
    id: "res-2",
    title: "5-4-3-2-1 Sensory Grounding",
    category: "Cognitive Exercise",
    duration: "5 mins",
    description: "A somatic technique that uses your five senses to ground your awareness in the present moment when experiencing racing thoughts.",
    type: "guide",
  },
  {
    id: "res-3",
    title: "Sleep Hygiene Optimization",
    category: "Behavioral Wellness",
    duration: "Daily habit",
    description: "Guidelines on circadian rhythm preservation, blue light reduction, and room temperature control for restorative deep sleep.",
    type: "checklist",
  },
  {
    id: "res-4",
    title: "Vocal Cord & Diaphragmatic Warm-up",
    category: "Speech Physiology",
    duration: "4 mins",
    description: "Gentle phonation and neck release exercises designed to alleviate somatic throat constriction caused by psychological tension.",
    type: "exercise",
  },
];

export const CRISIS_HELPLINES = [
  {
    name: "Tele-MANAS (Govt of India)",
    phone: "14416 / 1800-891-4416",
    available: "24/7, Toll-Free",
    note: "Official national tele-mental health programme of India with multi-language counselor support.",
  },
  {
    name: "KIRAN Helpline (Govt of India)",
    phone: "1800-599-0019",
    available: "24/7, Toll-Free",
    note: "Department of Empowerment of Persons with Disabilities mental health helpline.",
  },
  {
    name: "Vandrevala Foundation",
    phone: "+91 9999 666 555",
    available: "24/7, Free & Confidential",
    note: "Leading non-profit crisis intervention and professional clinical counseling hotline.",
  },
  {
    name: "iCall Psychosocial Helpline (TISS)",
    phone: "9152987821",
    available: "Mon–Sat, 10 AM to 8 PM",
    note: "Managed by Tata Institute of Social Sciences, offering qualified counselor guidance.",
  },
  {
    name: "International 988 Suicide & Crisis Lifeline (US/Global)",
    phone: "988 or text HOME to 741741",
    available: "24/7, Multilingual",
    note: "For international participants or exchange research scholars.",
  },
];
