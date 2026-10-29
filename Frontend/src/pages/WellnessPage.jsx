import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Moon, 
  Sun, 
  Activity, 
  Users, 
  Coffee, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import BreathingWidget from '../components/BreathingWidget';
import WellnessCard from '../components/WellnessCard';

export default function WellnessPage({ onOpenHelpline }) {
  // Session completion tracking (in-memory per session)
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  const wellnessList = [
    {
      id: "wel-1",
      title: "4-7-8 Rhythmic Vagal Breathing",
      category: "Breathing & Grounding",
      duration: "4 mins",
      description: "Inhale quietly through the nose for 4 seconds, hold gently for 7 seconds, and exhale completely with a whoosh sound through the mouth for 8 seconds.",
      instructions: "Repeat for 4 full breath cycles. Relaxes somatic muscle tension and stimulates the vagus nerve to downregulate acute autonomic arousal.",
    },
    {
      id: "wel-2",
      title: "5-4-3-2-1 Sensory Grounding Technique",
      category: "Breathing & Grounding",
      duration: "5 mins",
      description: "A cognitive-somatic sensory exercise that anchors wandering or racing thoughts directly to the physical present moment.",
      instructions: "Notice: 5 things you can see around you, 4 things you can physically touch/feel, 3 distinct sounds you can hear, 2 scents you can smell, and 1 positive emotion you can cultivate.",
    },
    {
      id: "wel-3",
      title: "Circadian Light Alignment & Sleep Hygiene",
      category: "Sleep & Routine",
      duration: "Daily habit",
      description: "Natural sunlight exposure within 45 minutes of waking stimulates healthy cortisol awakening response and resets the biological melatonin clock.",
      instructions: "View outdoor indirect sunlight for 10-15 minutes upon waking. Dim overhead ambient lights 90 minutes before bedtime and keep bedroom temperature cool (around 18-20°C).",
    },
    {
      id: "wel-4",
      title: "Cervical & Vocal Cord Release Stretch",
      category: "Physical Activity",
      duration: "3 mins",
      description: "Releases subconscious tightness in the sternocleidomastoid and suboccipital muscles, which directly constrict acoustic vocal fold vibration.",
      instructions: "Slowly drop your right ear toward your right shoulder for 20 seconds while keeping shoulders relaxed. Switch to left side. Follow with gentle open-mouthed yawning phonations.",
    },
    {
      id: "wel-5",
      title: "Expressive Social Connection Check-In",
      category: "Social Connection",
      duration: "10 mins",
      description: "Voice-to-voice interaction stimulates prosodic expressiveness and reduces affective feelings of withdrawal and isolation.",
      instructions: "Call or voice-note a close friend or family member today. Share a neutral or pleasant memory rather than solely texting.",
    },
    {
      id: "wel-6",
      title: "Cognitive Offloading Journaling",
      category: "Self-Care",
      duration: "7 mins",
      description: "Translating unstructured internal worry loops into structured handwritten words reduces working memory cognitive burden.",
      instructions: "Write continuously on paper for 5 minutes without editing. Capture immediate thoughts, then identify one small manageable action you can take today.",
    },
    {
      id: "wel-7",
      title: "Professional Support & Clinical Guidance",
      category: "Professional Care",
      duration: "As needed",
      description: "Recognizing when distress exceeds self-guided tools is an essential part of responsible mental wellbeing.",
      instructions: "If you experience persistent low mood, loss of interest in activities, or disruptive anxiety for more than 2 weeks, consult a certified psychologist or psychiatrist.",
    },
  ];

  const toggleComplete = (id) => {
    setCompletedActivities(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredList = activeCategory === 'all'
    ? wellnessList
    : wellnessList.filter(item => item.category === activeCategory);

  const categories = [
    { key: 'all', label: 'All Resources' },
    { key: 'Breathing & Grounding', label: 'Breathing & Grounding' },
    { key: 'Sleep & Routine', label: 'Sleep & Routine' },
    { key: 'Physical Activity', label: 'Physical Activity' },
    { key: 'Social Connection', label: 'Social Connection' },
    { key: 'Self-Care', label: 'Self-Care' },
    { key: 'Professional Care', label: 'Professional Support' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-soft-lg border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold">
          <Heart className="w-4 h-4 text-teal-400" />
          <span>Compassionate Wellness & Restorative Toolkit</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
          Evidence-Based Practices for Everyday Grounding
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Complementing our vocal and behavioral biomarker research, this curated collection offers practical, scientifically informed tools to support somatic regulation, sleep hygiene, and intentional connection.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5 font-medium text-emerald-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>Activities Completed Today: {completedActivities.size} of {wellnessList.length}</span>
          </span>
          {completedActivities.size > 0 && (
            <button
              type="button"
              onClick={() => setCompletedActivities(new Set())}
              className="text-slate-400 hover:text-white underline text-xs"
            >
              Reset Session Tracker
            </button>
          )}
        </div>
      </div>

      {/* Non-Diagnostic Clinical Ethics Alert */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
            Important Responsible-Use Disclaimer
          </p>
          <p className="leading-relaxed">
            The guidance provided here is intended for educational, preventive, and supportive purposes only. <strong>These exercises do not cure, treat, or replace medical diagnosis or psychotherapy for clinical depression, clinical anxiety, or mood disorders.</strong> If you need urgent assistance, contact trusted support networks or a licensed medical professional.
          </p>
        </div>
      </div>

      {/* Grid: Interactive Breathing Tool + Category Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Breathing Widget */}
        <div className="lg:col-span-5 space-y-6">
          <BreathingWidget />

          {/* Quick Help Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Seeking Professional Care?</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Speaking with a qualified therapist, clinical counselor, or psychiatrist can provide structured, confidential guidance tailored to your individual needs.
            </p>
            <button
              type="button"
              onClick={onOpenHelpline}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Free 24/7 Helpline Contacts</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Filterable Wellness Cards List */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredList.map((res) => (
              <WellnessCard
                key={res.id}
                resource={res}
                isCompleted={completedActivities.has(res.id)}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
