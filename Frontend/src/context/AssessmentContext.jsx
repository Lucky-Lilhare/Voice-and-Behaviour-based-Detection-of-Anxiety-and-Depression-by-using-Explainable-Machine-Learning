import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_RECENT_ASSESSMENTS } from '../data/sampleAssessments';

const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const [assessments, setAssessments] = useState(() => {
    try {
      const stored = localStorage.getItem('auramind_assessments');
      return stored ? JSON.parse(stored) : DEMO_RECENT_ASSESSMENTS;
    } catch {
      return DEMO_RECENT_ASSESSMENTS;
    }
  });

  const [activeSession, setActiveSession] = useState({
    consentGiven: false,
    selectedModality: 'multimodal', // 'multimodal' | 'voice' | 'video'
    audioBlob: null,
    audioUrl: null,
    audioDuration: 0,
    videoSnapshotUrl: null,
    videoCaptured: false,
    promptType: 'passage', // 'passage' | 'reflective'
    isSubmitting: false,
    submissionComplete: false,
    resultReport: null,
  });

  useEffect(() => {
    try {
      localStorage.setItem('auramind_assessments', JSON.stringify(assessments));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [assessments]);

  const updateSession = (fields) => {
    setActiveSession(prev => ({ ...prev, ...fields }));
  };

  const resetSession = () => {
    if (activeSession.audioUrl) {
      try {
        URL.revokeObjectURL(activeSession.audioUrl);
      } catch (e) {}
    }
    setActiveSession({
      consentGiven: false,
      selectedModality: 'multimodal',
      audioBlob: null,
      audioUrl: null,
      audioDuration: 0,
      videoSnapshotUrl: null,
      videoCaptured: false,
      promptType: 'passage',
      isSubmitting: false,
      submissionComplete: false,
      resultReport: null,
    });
  };

  const submitDemoAssessment = () => {
    const newId = `ASM-2026-${Math.floor(110 + Math.random() * 890)}`;
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const modalityLabel = activeSession.selectedModality === 'multimodal' 
      ? 'Multimodal (Voice + Facial)' 
      : activeSession.selectedModality === 'voice' 
        ? 'Voice Only' 
        : 'Video Only';

    const newAssessment = {
      id: newId,
      date: formattedDate,
      type: modalityLabel,
      status: "Completed (Demo)",
      statusColor: "emerald",
      compositeScore: 76,
      summary: "Newly submitted demonstration assessment. Synthesized acoustic pitch contours and facial action units indicate steady verbal stability.",
      acousticFeatures: {
        pitchJitter: "1.38%",
        shimmer: "3.10%",
        meanF0: "145.2 Hz",
        speakingRate: "3.7 syllables/sec",
        vocalHesitationCount: 2,
      },
      visualFeatures: {
        blinkRate: activeSession.selectedModality === 'voice' ? "N/A (Voice Only)" : "17 blinks/min",
        headPoseStability: activeSession.selectedModality === 'voice' ? "N/A" : "91%",
        actionUnits: activeSession.selectedModality === 'voice' ? "N/A" : "AU06, AU12 activated",
        eyeGazeConsistency: activeSession.selectedModality === 'voice' ? "N/A" : "82% frontal focus",
      },
      shapContributions: [
        { feature: "Prosodic Stability (F0 variance)", value: 0.17, type: "positive", label: "Adaptive voice pitch (+0.17)" },
        { feature: "Speech Articulation Rate", value: 0.14, type: "positive", label: "Fluent articulation (+0.14)" },
        { feature: "Gaze Alignment Consistency", value: 0.12, type: "positive", label: "Direct camera engagement (+0.12)" },
        { feature: "Inter-word Pause Latency", value: -0.08, type: "negative", label: "Minor momentary pauses (-0.08)" },
      ],
    };

    setAssessments(prev => [newAssessment, ...prev]);
    updateSession({ submissionComplete: true, resultReport: newAssessment });
    return newAssessment;
  };

  const getAssessmentById = (id) => {
    return assessments.find(item => item.id === id) || null;
  };

  return (
    <AssessmentContext.Provider
      value={{
        assessments,
        activeSession,
        updateSession,
        resetSession,
        submitDemoAssessment,
        getAssessmentById,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};
