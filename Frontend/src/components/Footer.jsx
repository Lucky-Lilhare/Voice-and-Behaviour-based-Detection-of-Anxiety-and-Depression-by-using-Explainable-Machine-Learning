import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, ShieldAlert, HeartHandshake, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/researchData';

export default function Footer({ onOpenHelpline }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0B0F19] text-slate-300 border-t border-slate-800 text-sm">
      {/* Research Disclaimer Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-4 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Academic & Research Protocol:</strong> {PROJECT_DETAILS.disclaimer}
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenHelpline}
            className="flex-shrink-0 text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1"
          >
            <span>Emergency Crisis Support Resources</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Research Scope */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <defs>
                  <linearGradient id="footerNexoraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#60A5FA" />
                  </linearGradient>
                </defs>
                <path 
                  d="M9 27L9 11C9 8.8 11.2 7 13.5 8.5L22.5 14.5C24.8 16 27 14.2 27 12V25" 
                  stroke="url(#footerNexoraGrad)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <span className="font-bold text-xl text-white tracking-tight">
                Nexora
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Non-invasive acoustic speech analysis and affective facial behavioral dynamics powered by Explainable Machine Learning (SHAP).
            </p>

            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">openSMILE eGeMAPS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">MediaPipe Vision</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">Shapley Additive (SHAP)</span>
            </div>
          </div>

          {/* Col 3: Sections (Matching Navbar) */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home (Overview)
                </Link>
              </li>
              <li>
                <Link to="/product" className="hover:text-blue-400 transition-colors">
                  Product (Screening Engine)
                </Link>
              </li>
              <li>
                <Link to="/technology" className="hover:text-blue-400 transition-colors">
                  Technology (Explainable AI)
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-blue-400 transition-colors text-blue-300 font-semibold">
                  Research & Clinical Evidence
                </Link>
              </li>
              <li>
                <Link to="/use-cases" className="hover:text-blue-400 transition-colors">
                  Use Cases (Deployments)
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-blue-400 transition-colors">
                  Pricing (Access Tiers)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Applications & Pages */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Application Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/assessment" className="hover:text-blue-400 transition-colors">
                  Assessment Setup & Session
                </Link>
              </li>
              <li>
                <Link to="/explainable-ai" className="hover:text-blue-400 transition-colors">
                  Explainable AI Methodology
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors">
                  Participant Telemetry Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-blue-400 transition-colors">
                  Historical Assessment Records
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-blue-400 transition-colors">
                  Mindfulness & Guided Breathing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Support & Urgent Crisis */}
          <div className="text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-300 mb-3 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Immediate Support</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenHelpline}
                  className="text-rose-400 hover:text-rose-300 transition-colors font-medium text-left"
                >
                  24/7 Suicide & Crisis Lifeline (988)
                </button>
              </li>
              <li>
                <Link to="/crisis-support" className="text-slate-400 hover:text-slate-200 transition-colors">
                  Crisis Resources Directory
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-slate-200 transition-colors">
                  Researcher Portal Login
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Host Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nexora • Explainable AI Multimodal Biomarker Platform.</p>
          <p className="text-[11px] text-slate-500">
            For academic, engineering demonstration, and research evaluation purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
