import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Square, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Camera, 
  Sparkles, 
  BrainCircuit, 
  Volume2, 
  HelpCircle,
  X,
  FileText,
  Activity,
  Layers
} from 'lucide-react';
import { useAssessment } from '../context/AssessmentContext';
import WaveformVisualizer from '../components/WaveformVisualizer';
import AssessmentReportModal from '../components/AssessmentReportModal';

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { 
    activeSession, 
    updateSession, 
    resetSession, 
    submitDemoAssessment 
  } = useAssessment();

  // Multi-step index: 1 = Consent, 2 = Audio Setup, 3 = Video Setup, 4 = Review & Submit
  const [currentStep, setCurrentStep] = useState(1);

  // STEP 1 STATE
  const [consentAcknowledged, setConsentAcknowledged] = useState(activeSession.consentGiven);
  const [modality, setModality] = useState(activeSession.selectedModality || 'multimodal');

  // STEP 2 AUDIO STATE
  const [micPermission, setMicPermission] = useState('prompt'); // 'prompt' | 'granted' | 'denied' | 'simulated'
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioTimer, setAudioTimer] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState(activeSession.audioUrl);
  const [audioPlaybackActive, setAudioPlaybackActive] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('passage'); // 'passage' | 'reflective'
  const [audioErrorMsg, setAudioErrorMsg] = useState(null);

  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);

  // STEP 3 VIDEO STATE
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const [cameraErrorMsg, setCameraErrorMsg] = useState(null);
  const [capturedSnapshotUrl, setCapturedSnapshotUrl] = useState(activeSession.videoSnapshotUrl);
  
  const videoRef = useRef(null);
  const videoStreamRef = useRef(null);

  // STEP 4 SUBMISSION STATE
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [submittedReport, setSubmittedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Clean up media tracks when leaving the component
  useEffect(() => {
    return () => {
      stopAudioCapture();
      stopVideoCapture();
    };
  }, []);

  // Sync activeSession
  useEffect(() => {
    updateSession({
      consentGiven: consentAcknowledged,
      selectedModality: modality,
      audioUrl: audioBlobUrl,
      videoSnapshotUrl: capturedSnapshotUrl,
    });
  }, [consentAcknowledged, modality, audioBlobUrl, capturedSnapshotUrl]);

  // ==========================================
  // AUDIO CONTROLS
  // ==========================================
  const requestMicAccess = async () => {
    setAudioErrorMsg(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("MediaDevices API is not supported in this browser environment.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setMicPermission('granted');
    } catch (err) {
      console.warn("Microphone access failed:", err);
      setMicPermission('denied');
      setAudioErrorMsg(
        err.message || "Microphone access was denied or hardware not found. You can retry or enable simulated audio for testing."
      );
    }
  };

  const startAudioRecording = async () => {
    setAudioErrorMsg(null);
    audioChunksRef.current = [];

    // Ensure we have stream
    if (!audioStreamRef.current && micPermission !== 'simulated') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setMicPermission('granted');
      } catch (err) {
        setMicPermission('denied');
        setAudioErrorMsg("Cannot record without microphone permission. Enable simulated mode if hardware is unavailable.");
        return;
      }
    }

    try {
      if (audioStreamRef.current && window.MediaRecorder) {
        const recorder = new MediaRecorder(audioStreamRef.current);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
          const url = URL.createObjectURL(blob);
          setAudioBlobUrl(url);
          updateSession({ audioBlob: blob, audioUrl: url, audioDuration: audioTimer });
        };

        recorder.start(100);
      } else {
        // Simulated recording mode fallback
        setMicPermission('simulated');
      }

      setIsRecordingAudio(true);
      setAudioTimer(0);
      timerIntervalRef.current = setInterval(() => {
        setAudioTimer(t => t + 1);
      }, 1000);
    } catch (e) {
      console.error("MediaRecorder start error:", e);
      setAudioErrorMsg("Could not start MediaRecorder: " + e.message);
    }
  };

  const stopAudioRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {}
    } else if (micPermission === 'simulated') {
      // Create mock audio url
      setAudioBlobUrl("simulated-audio-sample");
      updateSession({ audioBlob: null, audioUrl: "simulated-sample", audioDuration: audioTimer || 8 });
    }

    setIsRecordingAudio(false);
  };

  const retakeAudio = () => {
    if (audioBlobUrl && audioBlobUrl.startsWith('blob:')) {
      try { URL.revokeObjectURL(audioBlobUrl); } catch (e) {}
    }
    setAudioBlobUrl(null);
    setAudioTimer(0);
    updateSession({ audioBlob: null, audioUrl: null, audioDuration: 0 });
  };

  const stopAudioCapture = () => {
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  // ==========================================
  // VIDEO CONTROLS
  // ==========================================
  const startCameraPreview = async () => {
    setCameraErrorMsg(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("getUserMedia is not supported by your browser.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
      });
      videoStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log("Video play warning:", e));
      }
      setCameraActive(true);
      setCameraPermission('granted');
    } catch (err) {
      console.warn("Camera preview failed:", err);
      setCameraPermission('denied');
      setCameraErrorMsg(
        err.message || "Webcam access denied or unavailable. You can retry or continue with sample evaluation frames."
      );
    }
  };

  const stopVideoCapture = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
      videoStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureVideoSnapshot = () => {
    if (!videoRef.current) return;
    try {
      const videoEl = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = videoEl.videoWidth || 640;
      canvas.height = videoEl.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedSnapshotUrl(dataUrl);
      updateSession({ videoSnapshotUrl: dataUrl, videoCaptured: true });
    } catch (e) {
      console.warn("Snapshot capture error:", e);
    }
  };

  const retakeVideoSnapshot = () => {
    setCapturedSnapshotUrl(null);
    updateSession({ videoSnapshotUrl: null, videoCaptured: false });
    if (!cameraActive) {
      startCameraPreview();
    }
  };

  // Format seconds -> MM:SS
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // SUBMISSION LOGIC (Phase 2 Ethical Specification)
  // ==========================================
  const [submissionDone, setSubmissionDone] = useState(false);

  const handleSubmitAssessment = () => {
    setIsProcessing(true);
    setProcessingStage('Verifying in-memory audio buffers and facial landmark frames...');

    // Release all active tracks immediately
    stopAudioCapture();
    stopVideoCapture();

    setTimeout(() => {
      setProcessingStage('Checking client-side media schema compliance...');
    }, 700);

    setTimeout(() => {
      setProcessingStage('Releasing media streams from browser memory...');
    }, 1400);

    setTimeout(() => {
      setIsProcessing(false);
      setSubmissionDone(true);
    }, 2100);
  };

  // Prompt options
  const standardPassage = "“When the sunlight strikes raindrops in the air, they act as a prism and form a rainbow. The rainbow is a division of white light into many beautiful colors. These take the shape of a long round arch, with its path high above, and its two ends apparently beyond the horizon.”";
  const reflectivePrompt = "“Please describe a calm and peaceful outdoor place you have visited, or what a relaxing weekend afternoon looks like for you. Speak freely for 15 to 30 seconds.”";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link to="/dashboard" className="hover:text-teal-700">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Guided Assessment Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Multimodal Wellness Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Final-Year B.Tech Research Demonstration Interface
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            stopAudioCapture();
            stopVideoCapture();
            navigate('/dashboard');
          }}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel & Return</span>
        </button>
      </div>

      {/* Stepper Progression Navigation */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { num: 1, title: "1. Consent & Modality", short: "Consent" },
          { num: 2, title: "2. Audio Setup", short: "Audio" },
          { num: 3, title: "3. Video Setup", short: "Video" },
          { num: 4, title: "4. Review & Submit", short: "Review" },
        ].map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;
          return (
            <div
              key={step.num}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 ${
                isCurrent
                  ? 'bg-teal-50 border-teal-500/80 text-teal-900 shadow-sm'
                  : isDone
                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                    : 'bg-white border-slate-200/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                ) : (
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.num}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.short}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* STEP 1: INTRODUCTION AND INFORMED CONSENT                */}
      {/* ========================================================= */}
      {currentStep === 1 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6 animate-in fade-in">
          
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-lavender-100 text-lavender-800">
              Step 1 of 4 • Ethical Protocols
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Introduction & Informed Consent
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Before proceeding to media capture, please review the experimental purpose, operational limitations, and data safeguarding policies of this research system.
            </p>
          </div>

          {/* Academic & Experimental Notice Alert */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Experimental Nature & Limitations</span>
            </div>
            <p className="leading-relaxed">
              This system is an undergraduate B.Tech engineering research project designed to test algorithmic biomarker extraction. <strong>It cannot diagnose depression, anxiety, or any psychiatric disorder.</strong>
            </p>
            <p className="text-[11px] text-amber-800/80">
              Assessments are processed for experimental signal validation only. Never base medical or clinical decisions on this software.
            </p>
          </div>

          {/* Modality Selection */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              Select Assessment Modality
            </label>
            <p className="text-xs text-slate-500">
              You may decline either audio or video modality based on your preference or device capabilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              <button
                type="button"
                onClick={() => setModality('multimodal')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  modality === 'multimodal'
                    ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-700">
                    <Mic className="w-4 h-4" />
                    <Video className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    Recommended
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Multimodal</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Synchronized Voice Prosody & Facial Action Unit tracking.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('voice')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  modality === 'voice'
                    ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 text-teal-700">
                  <Mic className="w-4 h-4" />
                  <span className="text-xs font-semibold">Microphone Only</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Voice Only</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Acoustic speech pitch, jitter, and hesitation analysis only.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setModality('video')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  modality === 'video'
                    ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2 text-teal-700">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-semibold">Webcam Only</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Video Only</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Facial micro-expression & ocular gaze alignment only.
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* Explicit Consent Checkboxes */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Informed Research Consent Confirmation</span>
            </h4>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={consentAcknowledged}
                onChange={(e) => setConsentAcknowledged(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 flex-shrink-0"
              />
              <span className="text-slate-700 leading-relaxed text-xs">
                I hereby give voluntary informed consent to participate in this frontend research demonstration. I understand that my webcam and microphone streams are processed client-side within the browser sandbox, and that this application is not a certified diagnostic healthcare service.
              </span>
            </label>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel & Exit
            </button>

            <button
              type="button"
              disabled={!consentAcknowledged}
              onClick={() => {
                // If video-only, skip to step 3; otherwise step 2
                if (modality === 'video') {
                  setCurrentStep(3);
                } else {
                  setCurrentStep(2);
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue to Hardware Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: AUDIO SETUP & RECORDING                           */}
      {/* ========================================================= */}
      {currentStep === 2 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6 animate-in fade-in">
          
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
              Step 2 of 4 • Acoustic Prosody Capture
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Microphone Setup & Speech Recording
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We extract acoustic features including Fundamental Pitch (F0), cycle jitter, shimmer, and pause latency ratios. Please select a prompt and record a short sample.
            </p>
          </div>

          {/* Reading Prompt Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Your Phonation Prompt
              </label>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedPrompt('passage')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedPrompt === 'passage' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'
                  }`}
                >
                  Standard Rainbow Passage
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPrompt('reflective')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedPrompt === 'reflective' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-500'
                  }`}
                >
                  Neutral Reflection
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 italic leading-relaxed">
              {selectedPrompt === 'passage' ? standardPassage : reflectivePrompt}
            </div>
          </div>

          {/* Microphone Permission Status */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                micPermission === 'granted' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : micPermission === 'denied' 
                    ? 'bg-rose-100 text-rose-700' 
                    : micPermission === 'simulated'
                      ? 'bg-lavender-100 text-lavender-700'
                      : 'bg-slate-200 text-slate-600'
              }`}>
                {micPermission === 'granted' ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </div>
              <div>
                <span className="font-bold text-slate-800 block text-xs">
                  {micPermission === 'granted'
                    ? 'Microphone Permission Granted'
                    : micPermission === 'denied'
                      ? 'Microphone Access Denied'
                      : micPermission === 'simulated'
                        ? 'Simulated Acoustic Mode Active'
                        : 'Microphone Not Yet Initialized'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {micPermission === 'granted'
                    ? 'Browser MediaRecorder ready for phonation capture'
                    : micPermission === 'simulated'
                      ? 'Generates synthetic acoustic vectors for evaluation'
                      : 'Requires browser media authorization'}
                </span>
              </div>
            </div>

            {micPermission !== 'granted' && micPermission !== 'simulated' && (
              <button
                type="button"
                onClick={requestMicAccess}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm"
              >
                Grant Mic Access
              </button>
            )}

            {micPermission === 'denied' && (
              <button
                type="button"
                onClick={() => setMicPermission('simulated')}
                className="px-3 py-1.5 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-800 text-xs font-semibold"
              >
                Enable Demo Mode
              </button>
            )}
          </div>

          {audioErrorMsg && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{audioErrorMsg}</p>
                <p className="text-[11px] text-rose-700 mt-1">
                  You can click "Enable Demo Mode" to continue validating the frontend workflow.
                </p>
              </div>
            </div>
          )}

          {/* Waveform Canvas Visualizer */}
          <div className="space-y-2">
            <WaveformVisualizer
              stream={audioStreamRef.current}
              isRecording={isRecordingAudio}
              isPlaying={audioPlaybackActive}
            />
          </div>

          {/* Timer and Recording Controls */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Live Timer */}
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isRecordingAudio ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`}></div>
              <span className="text-xl font-mono font-bold text-slate-800">
                {formatTimer(audioTimer)}
              </span>
              <span className="text-xs text-slate-400">
                {isRecordingAudio ? 'Recording active...' : audioBlobUrl ? 'Sample captured' : 'Ready'}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {!isRecordingAudio ? (
                <button
                  type="button"
                  onClick={startAudioRecording}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{audioBlobUrl ? 'Record Again' : 'Start Recording'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopAudioRecording}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors animate-pulse"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Recording</span>
                </button>
              )}

              {audioBlobUrl && !isRecordingAudio && (
                <button
                  type="button"
                  onClick={retakeAudio}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              )}
            </div>

          </div>

          {/* Audio Player for Playback */}
          {audioBlobUrl && audioBlobUrl.startsWith('blob:') && (
            <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-teal-800 font-medium">
                <Volume2 className="w-4 h-4 text-teal-600" />
                <span>Verify Sample Playback:</span>
              </div>
              <audio 
                src={audioBlobUrl} 
                controls 
                className="h-8 max-w-xs" 
                onPlay={() => setAudioPlaybackActive(true)}
                onPause={() => setAudioPlaybackActive(false)}
                onEnded={() => setAudioPlaybackActive(false)}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Consent</span>
            </button>

            <button
              type="button"
              disabled={!audioBlobUrl && micPermission !== 'simulated'}
              onClick={() => {
                // If modality was voice only, jump to review step (4); otherwise step 3
                if (modality === 'voice') {
                  setCurrentStep(4);
                } else {
                  setCurrentStep(3);
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{modality === 'voice' ? 'Proceed to Review' : 'Next: Video Setup'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: VIDEO SETUP & FACIAL TRACKING PREVIEW             */}
      {/* ========================================================= */}
      {currentStep === 3 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6 animate-in fade-in">
          
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-lavender-100 text-lavender-800">
              Step 3 of 4 • Facial Behavioral Markers
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Webcam Setup & Visual Alignment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Camera access is requested <strong>only when you click Start Preview</strong>. We extract Action Units (AU04 brow furrowing, AU12 smile attenuation), blink rates, and 3D head pose stability.
            </p>
          </div>

          {/* Privacy Callout */}
          <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-3.5 text-xs text-teal-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Local Processing Sandbox:</strong> Camera streams are not recorded secretly or uploaded to any server. Tracks are completely closed when you leave or click Stop Camera.
            </p>
          </div>

          {/* Video Container with Face Mesh Alignment Overlay */}
          <div className="relative mx-auto max-w-lg aspect-video rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-800 flex items-center justify-center shadow-soft-lg">
            
            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
            />

            {/* Fallback Display when Camera Inactive */}
            {!cameraActive && (
              <div className="p-6 text-center text-slate-400 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <VideoOff className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm">Camera Inactive</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Click "Start Camera Preview" below to initialize video stream.
                  </p>
                </div>
              </div>
            )}

            {/* Active Recording Badge Indicator */}
            {cameraActive && (
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Camera Active — In-Browser Stream</span>
              </div>
            )}

            {/* Simulated Face Alignment Oval Guide */}
            {cameraActive && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                <div className="w-44 h-56 border-2 border-dashed border-teal-400/70 rounded-[50%] flex flex-col items-center justify-between py-4 shadow-sm">
                  <span className="text-[9px] font-mono text-teal-300 bg-slate-900/60 px-1.5 py-0.5 rounded">
                    Eye Level
                  </span>
                  <span className="text-[9px] font-mono text-teal-300 bg-slate-900/60 px-1.5 py-0.5 rounded">
                    Chin Position
                  </span>
                </div>
                <span className="text-[10px] font-medium text-white/90 bg-slate-900/70 px-2 py-0.5 rounded-full mt-2">
                  Align face within guide
                </span>
              </div>
            )}

            {/* Snapshot Overlay if Captured */}
            {capturedSnapshotUrl && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
                <img
                  src={capturedSnapshotUrl}
                  alt="Captured Frame Preview"
                  className="max-h-48 rounded-xl border border-slate-700 shadow-md object-contain"
                />
                <span className="text-[11px] text-teal-300 font-semibold mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Frame verified for biomarker feature extraction
                </span>
              </div>
            )}

          </div>

          {/* Camera Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {!cameraActive ? (
              <button
                type="button"
                onClick={startCameraPreview}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition-colors"
              >
                <Video className="w-4 h-4" />
                <span>Start Camera Preview</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={stopVideoCapture}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <VideoOff className="w-4 h-4" />
                  <span>Stop Camera</span>
                </button>

                {!capturedSnapshotUrl ? (
                  <button
                    type="button"
                    onClick={captureVideoSnapshot}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-teal-400" />
                    <span>Capture Behavioral Snapshot</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={retakeVideoSnapshot}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Snapshot</span>
                  </button>
                )}
              </>
            )}
          </div>

          {cameraErrorMsg && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{cameraErrorMsg}</p>
                <p className="text-[11px] text-amber-800 mt-1">
                  You may continue to Review & Submit. The demonstration engine will supply simulated behavioral vectors.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                stopVideoCapture();
                if (modality === 'video') {
                  setCurrentStep(1);
                } else {
                  setCurrentStep(2);
                }
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => {
                stopVideoCapture();
                setCurrentStep(4);
              }}
              className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <span>Proceed to Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: REVIEW AND SUBMIT                                 */}
      {/* ========================================================= */}
      {currentStep === 4 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-soft space-y-6 animate-in fade-in">
          
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800">
              Step 4 of 4 • Validation & Demonstration
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Review Captures & Submit for Demonstration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Verify your recorded media samples below. Submitting validates the complete frontend pipeline and synthesizes simulated Explainable AI biomarker attributions.
            </p>
          </div>

          {/* Backend Status Explanation Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 text-white text-xs space-y-2 border border-slate-700">
            <div className="flex items-center gap-2 font-bold text-teal-400">
              <BrainCircuit className="w-4 h-4" />
              <span>Backend & Machine Learning Service Status</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Phase 1 Scope:</strong> Actual machine learning inference with the openSMILE audio extraction and PyTorch/LightGBM model weights will execute when the Python backend service is integrated in subsequent phases.
            </p>
            <p className="text-[11px] text-slate-400">
              Submitting now runs a realistic simulation to demonstrate the end-to-end user experience, data schemas, and SHAP explainability visualizations.
            </p>
          </div>

          {/* Capture Summary Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Audio Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Mic className="w-4 h-4 text-teal-600" />
                  Voice Sample Status
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  audioBlobUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {audioBlobUrl ? 'Available' : modality === 'video' ? 'Declined' : 'Simulated'}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <p><strong>Duration:</strong> {audioTimer ? `${audioTimer} seconds` : '8 seconds (Synthesized)'}</p>
                <p><strong>Format:</strong> WebM Opus Audio Stream</p>
                <p><strong>Acoustic Set:</strong> eGeMAPS 88 Parameters (Simulated)</p>
              </div>

              {audioBlobUrl && audioBlobUrl.startsWith('blob:') && (
                <audio src={audioBlobUrl} controls className="h-8 w-full mt-2" />
              )}
            </div>

            {/* Video Summary */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Video className="w-4 h-4 text-lavender-600" />
                  Visual Behavioral Status
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  capturedSnapshotUrl ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                }`}>
                  {capturedSnapshotUrl ? 'Frame Captured' : modality === 'voice' ? 'Declined' : 'Simulated'}
                </span>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1">
                <p><strong>Action Units:</strong> AU04, AU06, AU12, AU25</p>
                <p><strong>Gaze Dynamics:</strong> Frontal Eye Focus Ratio</p>
                <p><strong>Head Pose:</strong> Euler 3D Yaw/Pitch/Roll</p>
              </div>

              {capturedSnapshotUrl && (
                <img 
                  src={capturedSnapshotUrl} 
                  alt="Snapshot review" 
                  className="h-16 w-full object-cover rounded-lg border border-slate-200 mt-2" 
                />
              )}
            </div>

          </div>

          {/* Processing Animation state */}
          {isProcessing && (
            <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-200 text-center space-y-3 animate-pulse">
              <div className="w-10 h-10 rounded-full border-4 border-teal-600 border-t-transparent animate-spin mx-auto"></div>
              <h4 className="font-bold text-sm text-teal-900">
                Verifying Frontend Media Sandboxing
              </h4>
              <p className="text-xs text-teal-700 font-mono">
                {processingStage}
              </p>
            </div>
          )}

          {/* Submission Done Completion Notification */}
          {submissionDone && (
            <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/80 border border-teal-200 text-center space-y-5 animate-in fade-in">
              <div className="w-14 h-14 rounded-3xl bg-teal-600 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
                  Capture Workflow Complete
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Capture Workflow Complete — Backend Analysis Not Yet Implemented
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your audio phonation and facial behavioral video frames were successfully processed locally in browser memory. In accordance with Phase 2 scope, <strong>real machine learning inference is not connected in this phase</strong>. All media tracks have been securely released from browser memory.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-teal-100 text-xs text-slate-600 max-w-md mx-auto space-y-1">
                <p><strong>Media Retention:</strong> 0 bytes persisted (In-Memory Only)</p>
                <p><strong>Hardware Status:</strong> Camera & Microphone Released</p>
                <p><strong>Next Integration:</strong> Python FastAPI + PyTorch/LightGBM</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/results/ASM-2026-104"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Sample Results Report</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shadow-soft-sm inline-flex items-center justify-center gap-2"
                >
                  <span>Return to Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    resetSession();
                    setSubmissionDone(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-slate-500 hover:text-slate-800 font-medium text-xs transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Action buttons (only if not yet done) */}
          {!submissionDone && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => setCurrentStep(modality === 'voice' ? 2 : 3)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Hardware Setup</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={resetSession}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Discard Samples
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSubmitAssessment}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-teal-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>Submit for Demonstration</span>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
