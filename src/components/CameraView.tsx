import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, RotateCcw, Image, Music, Check, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CameraViewProps {
  onClose: () => void;
}

export default function CameraView({ onClose }: CameraViewProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      setRecordedDuration((prev) => {
        const next = prev + 100;
        if (next >= 60000) { // 60s max
          stopRecording();
          return 60000;
        }
        return next;
      });
    }, 100);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (recordedDuration > 500) { // Minimum 0.5s
      setHasRecorded(true);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col pt-safe px-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
          <Music className="w-4 h-4 text-white" />
          <span className="text-xs text-white font-bold uppercase tracking-widest">Add Music</span>
        </div>
        <button className="p-2 rounded-full hover:bg-white/10 text-white">
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* Main Viewfinder (Simulated) */}
      <div className="flex-1 relative rounded-3xl overflow-hidden bg-[#121212] border border-white/10 shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Visual aesthetic markers */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-mono text-white/50 uppercase tracking-tighter">REC • {(recordedDuration / 1000).toFixed(1)}s</span>
                </div>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-4">4K 60FPS</span>
            </div>
            <div className="absolute inset-0 border border-white/5 m-8 pointer-events-none rounded-2xl" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none" />
            
            <p className="text-white/20 font-bold uppercase tracking-[0.3em] rotate-90 text-sm">Wittr Viewfinder</p>
        </div>

        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(recordedDuration / 60000) * 100}%` }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>

      {/* Camera Controls */}
      <div className="pt-8 flex items-center justify-around">
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-active:scale-95 transition-transform">
            <Image className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-white/60 font-bold uppercase">Upload</span>
        </button>

        {/* Record Button */}
        <div className="relative">
          <svg className="w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/10"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (recordedDuration / 60000) * 251.2}
              className="text-blue-500"
            />
          </svg>
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white transition-all duration-300",
              isRecording ? "w-12 h-12 bg-red-500 rounded-lg hover:scale-110" : "w-16 h-16 bg-white hover:scale-105"
            )}
          />
        </div>

        <button className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-active:scale-95 transition-transform">
            <RotateCcw className="w-6 h-6 text-white" />
          </div>
          <span className="text-[10px] text-white/60 font-bold uppercase">Flip</span>
        </button>
      </div>

      {/* Done / Next Action */}
      <AnimatePresence>
        {hasRecorded && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 right-10 flex items-center gap-4"
          >
             <button
                onClick={() => { setHasRecorded(false); setRecordedDuration(0); }}
                className="p-3 rounded-full bg-white/10 text-white border border-white/20"
             >
                <RotateCcw className="w-6 h-6" />
             </button>
             <button
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 shadow-2xl shadow-blue-500/50 active:scale-95 transition-transform"
             >
                Next
                <ArrowRight className="w-5 h-5" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
