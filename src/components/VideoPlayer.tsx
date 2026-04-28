import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, Share2, Music, UserPlus, Check, Plus } from 'lucide-react';
import { Video } from '../types';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(() => {
        // Autoplay might be blocked if not muted
      });
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full bg-black snap-start overflow-hidden group">
      {/* Video Content */}
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Overlay - Dark Gradient Top/Bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Play/Pause indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-full bg-white/20 backdrop-blur-md"
          >
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
          </motion.div>
        </div>
      )}

      {/* Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <div className="relative mb-2">
          <div className="p-0.5 rounded-full bg-vibrant-gradient">
            <img
              src={video.user.avatar}
              alt={video.user.username}
              className="w-11 h-11 rounded-full border-2 border-black object-cover"
            />
          </div>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={cn(
              "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full p-1 transition-all border border-bg-base",
              isFollowing ? "bg-accent-blue" : "bg-accent-pink"
            )}
          >
            {isFollowing ? (
              <Check className="w-2 h-2 text-white" />
            ) : (
              <Plus className="w-2 h-2 text-white" />
            )}
          </button>
        </div>

        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center gap-1 group/btn">
          <motion.div 
            whileTap={{ scale: 1.2 }}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg"
          >
            <Heart
              className={cn(
                "w-6 h-6 transition-colors",
                isLiked ? "fill-accent-pink text-accent-pink" : "text-white group-hover/btn:text-accent-pink"
              )}
            />
          </motion.div>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-widest uppercase">
            {video.likes + (isLiked ? 1 : 0)}
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group/btn">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <MessageCircle className="w-6 h-6 text-white group-hover/btn:text-accent-blue" />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-widest uppercase">{video.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group/btn">
          <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <Share2 className="w-6 h-6 text-white group-hover/btn:text-accent-blue rotate-span" />
          </div>
          <span className="text-[10px] font-bold text-white drop-shadow-md tracking-widest uppercase">{video.shares}</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-4 right-16 z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
             <h3 className="font-bold text-base text-white drop-shadow-md">@{video.user.username}</h3>
             <span className="px-1.5 py-0.5 rounded bg-accent-blue/20 text-accent-blue text-[8px] font-black uppercase tracking-widest border border-accent-blue/30">Verified</span>
          </div>
          <p className="text-sm text-white/90 drop-shadow-sm leading-snug font-medium">
            {video.caption}{' '}
            {video.hashtags.map((tag) => (
              <span key={tag} className="font-bold text-accent-blue hover:text-accent-pink cursor-pointer transition-colors">
                #{tag}{' '}
              </span>
            ))}
          </p>
          {video.songName && (
            <div className="flex items-center gap-2 mt-1 py-1 px-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full self-start">
              <Music className="w-3 h-3 text-accent-blue animate-spin-slow" />
              <span className="text-[10px] text-white/80 font-bold tracking-tight">
                {video.songName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar (Custom) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          animate={isActive ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
          className="h-full bg-accent-blue"
        />
      </div>
    </div>
  );
}
