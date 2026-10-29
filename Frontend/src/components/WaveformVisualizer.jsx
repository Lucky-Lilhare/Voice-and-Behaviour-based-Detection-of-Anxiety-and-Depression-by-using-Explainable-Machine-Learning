import React, { useEffect, useRef } from 'react';

export default function WaveformVisualizer({ stream, isRecording, isPlaying }) {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth || 300;
    const height = 90;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let analyser = null;
    let audioCtx = null;

    if (stream && isRecording) {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          audioCtx = new AudioCtxClass();
          audioContextRef.current = audioCtx;
          analyser = audioCtx.createAnalyser();
          analyser.fftSize = 256;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          sourceRef.current = source;
          source.connect(analyser);
        }
      } catch (err) {
        console.warn("Web Audio API initialisation warning:", err);
      }
    }

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const bufferLength = analyser ? analyser.frequencyBinCount : 64;
      const dataArray = new Uint8Array(bufferLength);

      if (analyser && isRecording) {
        analyser.getByteTimeDomainData(dataArray);
      }

      // Draw background subtle grid line
      ctx.beginPath();
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw waveform
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#0D9488'); // teal-600
      gradient.addColorStop(0.5, '#14B8A6'); // teal-500
      gradient.addColorStop(1, '#8B5CF6'); // lavender/violet

      ctx.strokeStyle = gradient;
      ctx.lineWidth = isRecording ? 2.5 : 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const sliceWidth = width / (bufferLength - 1);
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = 0.5;

        if (analyser && isRecording) {
          v = dataArray[i] / 128.0; // 0 to 2, centered at 1
          v = (v - 1) * 0.9 + 1; // scale slightly
        } else if (isRecording || isPlaying) {
          // Synthetic organic wave if AudioContext is pending or during simulated demo
          const freq = 0.15;
          v = 1 + Math.sin(i * freq + phase) * 0.25 * Math.sin(phase * 0.5 + i * 0.05);
        } else {
          // Idle calm line
          v = 1 + Math.sin(i * 0.08 + phase) * 0.04;
        }

        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();

      phase += isRecording ? 0.08 : 0.02;
      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (sourceRef.current) {
        try { sourceRef.current.disconnect(); } catch (e) {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (e) {}
      }
    };
  }, [stream, isRecording, isPlaying]);

  return (
    <div className="w-full bg-slate-900/5 rounded-xl border border-slate-200 p-2 overflow-hidden flex flex-col justify-center">
      <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 font-medium">
          <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : isPlaying ? 'bg-teal-500' : 'bg-slate-300'}`}></span>
          {isRecording ? 'Live Audio Input (Capturing Acoustics)' : isPlaying ? 'Recorded Sample Playback' : 'Microphone Inactive'}
        </span>
        <span className="font-mono text-[10px] text-slate-400">eGeMAPS Acoustic Stream</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[90px] block rounded-lg bg-white/70 backdrop-blur-sm shadow-inner"
      />
    </div>
  );
}
