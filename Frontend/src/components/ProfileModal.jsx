import React, { useState } from 'react';
import { 
  X, 
  User, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Lock, 
  Bell, 
  Sparkles, 
  ExternalLink,
  Volume2,
  Sliders
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ isOpen, onClose, initialTab = 'profile' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab); // 'profile' | 'settings' | 'privacy'

  // Settings mock state
  const [soundCues, setSoundCues] = useState(true);
  const [simulatedMode, setSimulatedMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-soft-lg border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
              alt={user?.name || "Participant"}
              className="w-11 h-11 rounded-2xl object-cover ring-2 ring-teal-400"
            />
            <div>
              <h3 id="profile-modal-title" className="text-base font-bold text-white tracking-tight">
                {user?.name || "Participant"}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {user?.id || "STU-2026-8842"} • Research Participant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 pt-2 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-white text-teal-700 border-t-2 border-teal-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-white text-teal-700 border-t-2 border-teal-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2.5 rounded-t-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-white text-teal-700 border-t-2 border-teal-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Ethics</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          
          {/* TAB 1: VIEW PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500">Full Name:</span>
                  <span className="font-semibold text-slate-900">{user?.name || "Arjun Sharma"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500">Institutional Email:</span>
                  <span className="font-semibold text-slate-900">{user?.email || "arjun.sharma@example.edu"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-semibold text-slate-900">{user?.institution || "Department of CSE"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                  <span className="text-slate-500">Evaluation Role:</span>
                  <span className="font-semibold text-teal-700">{user?.role || "Research Participant"}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Session Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                    Frontend Sandbox Session
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
                <strong>Demonstration Mode:</strong> Participant accounts are stored in client memory for testing purposes. Real multi-factor authentication will activate in Phase 3.
              </div>
            </div>
          )}

          {/* TAB 2: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-in fade-in">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Evaluation Preferences
              </h4>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block text-xs">Audio Cues in Breathing Widget</span>
                    <span className="text-[11px] text-slate-500">Play gentle harmonic chimes at cycle changes</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundCues}
                    onChange={(e) => setSoundCues(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-800 block text-xs">Force Simulated Modality Data</span>
                    <span className="text-[11px] text-slate-500">Bypass hardware requests during automated testing</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={simulatedMode}
                    onChange={(e) => setSimulatedMode(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & ETHICS */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in leading-relaxed">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 text-teal-900 space-y-1.5">
                <span className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-600" />
                  Client-Side Media Sandbox Guarantee
                </span>
                <p className="text-[11px]">
                  Webcam video frames and microphone audio streams are captured solely in browser memory via standard HTML5 APIs. No raw media is sent across the network or persisted in storage.
                </p>
              </div>

              <div className="space-y-2 text-[11px] text-slate-600">
                <p><strong>1. Hardware Control:</strong> Camera and microphone hardware access is opt-in, per-session, and released immediately when stopped.</p>
                <p><strong>2. Informed Consent:</strong> You have the right to decline either audio or video modality on the assessment setup screen.</p>
                <p><strong>3. Non-Diagnostic:</strong> Results displayed are educational demonstrations for B.Tech project review and do not constitute clinical advice.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              logout();
              onClose();
              navigate('/login');
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Demo Session</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
