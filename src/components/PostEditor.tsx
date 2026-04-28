import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Camera, Image, Smile, AtSign, Hash } from 'lucide-react';
import { cn } from '../lib/utils';

interface PostEditorProps {
  onClose: () => void;
  onSwitchToCamera: () => void;
}

export default function PostEditor({ onClose, onSwitchToCamera }: PostEditorProps) {
  const [content, setContent] = useState('');
  const CHAR_LIMIT = 300;

  const handlePublish = () => {
    if (content.trim().length === 0) return;
    console.log('Publishing post:', content);
    onClose();
  };

  const progress = (content.length / CHAR_LIMIT) * 100;
  const isOverLimit = content.length > CHAR_LIMIT;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
    >
      <div className="w-full max-w-[360px] bg-bg-panel border border-border-subtle rounded-[40px] overflow-hidden shadow-2xl flex flex-col h-[500px]">
        {/* Header */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">New Post</span>
          <button
            onClick={handlePublish}
            disabled={content.trim().length === 0 || isOverLimit}
            className={cn(
              "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              content.trim().length > 0 && !isOverLimit
                ? "bg-accent-blue text-black shadow-lg shadow-accent-blue/30 scale-100 active:scale-95"
                : "bg-border-subtle text-gray-600 opacity-50 cursor-not-allowed"
            )}
          >
            Publish
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 relative flex flex-col">
          <div className="flex gap-4 mb-4">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pradeep"
              className="w-10 h-10 rounded-full border border-border-subtle"
              alt="avatar"
            />
            <div className="flex-1 flex flex-col gap-4">
              <textarea
                autoFocus
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-40 bg-transparent text-white border-none focus:ring-0 resize-none text-base placeholder:text-gray-600 font-medium"
              />
            </div>
          </div>

          {/* Action Tools */}
          <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onSwitchToCamera}
                className="p-2 rounded-lg bg-bg-card border border-border-subtle text-accent-pink hover:border-accent-pink transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-bg-card border border-border-subtle text-gray-500 hover:text-white transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-bg-card border border-border-subtle text-gray-500 hover:text-white transition-colors">
                <Hash className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex items-center justify-center">
                <svg className="w-10 h-10 -rotate-90">
                    <circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-border-subtle"
                    />
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="113.1"
                        strokeDashoffset={113.1 - (Math.min(content.length, CHAR_LIMIT) / CHAR_LIMIT) * 113.1}
                        className={cn(
                            "transition-colors duration-300",
                            isOverLimit ? "text-accent-pink" : "text-accent-blue"
                        )}
                    />
                </svg>
                <span className={cn(
                    "absolute text-[8px] font-black uppercase tracking-tighter",
                    isOverLimit ? "text-accent-pink" : "text-gray-500"
                )}>
                    {CHAR_LIMIT - content.length}
                </span>
            </div>
          </div>
        </div>

        {/* Footer Warning */}
        <AnimatePresence>
          {isOverLimit && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-accent-pink/10 border-t border-accent-pink/20 px-6 py-2"
            >
              <p className="text-[10px] text-accent-pink font-bold uppercase tracking-widest text-center">
                300 Character Limit Exceeded
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
