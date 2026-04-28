/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView } from './types';
import VideoFeed from './components/VideoFeed';
import BottomNav from './components/BottomNav';
import CameraView from './components/CameraView';
import PostEditor from './components/PostEditor';
import { Search, User, Grid, Bookmark, Heart, Settings, Menu } from 'lucide-react';
import { cn } from './lib/utils';

const SearchView = () => (
  <div className="flex-1 bg-bg-base text-white p-4 pt-12 overflow-y-auto">
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
      <input
        type="text"
        placeholder="Search Wittr creators..."
        className="w-full bg-bg-card border border-border-subtle rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent-blue transition-colors placeholder:text-gray-500 text-xs font-bold uppercase tracking-widest"
      />
    </div>
    
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Trending Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['#vloglife', '#tech', '#daily', '#minimal', '#wittr', '#behindthescenes'].map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-bg-card rounded-md text-[10px] font-bold border border-border-subtle hover:border-accent-pink transition-colors hover:text-accent-pink cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section>
         <h3 className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Popular Creators</h3>
         <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="bg-bg-card rounded-xl p-4 border border-border-subtle flex flex-col items-center gap-3 group hover:border-accent-blue transition-colors">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${idx}`} className="w-12 h-12 rounded-full border border-border-subtle group-hover:border-accent-blue" alt="user" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">@creator_{idx}</span>
                    <button className="w-full py-1.5 bg-bg-base border border-border-subtle rounded-lg text-[8px] font-black uppercase tracking-widest hover:border-accent-blue transition-colors">Follow</button>
                </div>
            ))}
         </div>
      </section>
    </div>
  </div>
);

const ProfileView = () => (
    <div className="flex-1 bg-bg-base text-white flex flex-col pt-12 overflow-y-auto">
        <div className="px-6 flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">Me</h2>
            <div className="flex gap-4">
                <Settings className="w-5 h-5 text-gray-500" />
                <Menu className="w-5 h-5 text-gray-500" />
            </div>
        </div>

        <div className="flex flex-col items-center gap-4 px-6 mb-8">
            <div className="relative">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pradeep" className="w-20 h-20 rounded-full border border-border-subtle p-1" alt="profile" />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-bg-base" />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold tracking-tight">Pradeep N.</h3>
                <p className="text-gray-500 text-xs tracking-widest uppercase">@pradeep_vlogs</p>
            </div>
            <div className="flex items-center gap-8 w-full justify-center">
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">246</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Following</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">1.2K</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-base font-bold">8.4K</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Likes</span>
                </div>
            </div>
            <button className="w-full py-2 bg-bg-card border border-border-subtle text-white text-xs font-bold uppercase tracking-widest rounded-xl active:scale-95 transition-transform hover:border-accent-pink">
                Edit Profile
            </button>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex flex-col bg-bg-panel rounded-t-[40px] border-t border-border-subtle p-6">
            <div className="flex items-center justify-around mb-6 border-b border-border-subtle pb-4">
                <Grid className="w-5 h-5 text-accent-blue" />
                <Bookmark className="w-5 h-5 text-gray-600" />
                <Heart className="w-5 h-5 text-gray-600" />
            </div>
            {/* Grid */}
            <div className="grid grid-cols-3 gap-2">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-bg-card rounded-xl border border-border-subtle overflow-hidden relative group">
                        <img 
                            src={`https://images.unsplash.com/photo-${1516245834210 + i}-c4c142787335?w=200&auto=format&fit=crop&q=60`}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                            alt="vlog"
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('feed');
  const [createMode, setCreateMode] = useState<'text' | 'video'>('text');

  return (
    <div className="flex h-dvh bg-bg-base font-sans selection:bg-accent-blue/30 overflow-hidden">
      {/* Sidebar - Discovery */}
      <aside className="hidden lg:flex w-64 border-r border-border-subtle flex-col bg-bg-panel h-full">
         <div className="p-6 border-b border-border-subtle">
            <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-vibrant-gradient rounded-lg shadow-lg shadow-accent-pink/20"></div>
               <span className="text-xl font-bold tracking-tight">WITTR</span>
            </div>
            <nav className="space-y-6">
               <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">Discovery</p>
                  <button 
                  onClick={() => setActiveView('feed')}
                  className={cn("flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm", activeView === 'feed' ? "bg-bg-card text-white" : "text-gray-400 hover:bg-bg-card")}>
                     <div className={cn("w-4 h-4 rounded-sm", activeView === 'feed' ? "bg-accent-pink" : "border border-gray-600")}></div>
                     <span>For You</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm text-gray-400 hover:bg-bg-card">
                     <div className="w-4 h-4 border border-gray-600 rounded-sm"></div>
                     <span>Trending</span>
                  </button>
                  <button 
                  onClick={() => setActiveView('search')}
                  className={cn("flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm", activeView === 'search' ? "bg-bg-card text-white" : "text-gray-400 hover:bg-bg-card")}>
                     <div className={cn("w-4 h-4 rounded-sm", activeView === 'search' ? "bg-accent-blue" : "border border-gray-600")}></div>
                     <span>Explore</span>
                  </button>
               </div>
               <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">Personalization</p>
                  <button 
                  onClick={() => setActiveView('profile')}
                  className={cn("flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-sm", activeView === 'profile' ? "bg-bg-card text-white" : "text-gray-400 hover:bg-bg-card")}>
                     <div className="w-4 h-4 border border-gray-600 rounded-sm"></div>
                     <span>My Profile</span>
                  </button>
               </div>
            </nav>
         </div>
         <div className="mt-auto p-6 space-y-4">
            <div className="bg-bg-card p-3 rounded-xl border border-border-subtle">
               <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-gray-400">Cloud Storage</span>
                  <span className="text-[10px] text-gray-400">82%</span>
               </div>
               <div className="w-full bg-border-subtle h-1 rounded-full overflow-hidden">
                  <div className="bg-accent-pink w-[82%] h-full"></div>
               </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span>System Online</span>
            </div>
         </div>
      </aside>

   <main className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-b from-bg-base to-[#1A1A1A]">
         {/* The "Phone" Container */}
         <div className="w-full h-screen lg:w-[360px] lg:h-[720px] bg-black shadow-2xl relative overflow-hidden lg:rounded-[48px] lg:border-[12px] lg:border-border-subtle ring-1 ring-[#3A3A3A] flex flex-col">
            <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeView === 'feed' && (
                    <motion.div
                      key="feed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <VideoFeed />
                    </motion.div>
                  )}

                  {activeView === 'search' && (
                    <motion.div
                      key="search"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-bg-base"
                    >
                      <SearchView />
                    </motion.div>
                  )}

                  {activeView === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-bg-base"
                    >
                      <ProfileView />
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
            <BottomNav activeView={activeView} onViewChange={setActiveView} />
         </div>

         {activeView === 'create' && (
            <>
              {createMode === 'text' ? (
                <PostEditor 
                  onClose={() => setActiveView('feed')} 
                  onSwitchToCamera={() => setCreateMode('video')} 
                />
              ) : (
                <CameraView onClose={() => {
                  setCreateMode('text');
                  setActiveView('feed');
                }} />
              )}
            </>
          )}
      </main>

      {/* Sidebar - Creative Studio & Analytics */}
      <aside className="hidden xl:flex w-80 border-l border-border-subtle flex-col h-full bg-bg-panel">
         <div className="p-6 border-b border-border-subtle">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Creative Studio</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
                <button 
                onClick={() => setActiveView('create')}
                className="h-20 bg-bg-card rounded-xl border border-border-subtle flex flex-col items-center justify-center gap-1 hover:border-accent-pink transition-colors cursor-pointer group">
                  <div className="text-lg group-hover:scale-110 transition-transform">📹</div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Camera</span>
                </button>
                <div className="h-20 bg-bg-card rounded-xl border border-border-subtle flex flex-col items-center justify-center gap-1 hover:border-accent-blue transition-colors cursor-pointer group">
                  <div className="text-lg group-hover:scale-110 transition-transform">🎨</div>
                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Templates</span>
                </div>
            </div>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Voice-over</span>
                  <div className="w-8 h-4 bg-gray-700 rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Smart Captions</span>
                  <div className="w-8 h-4 bg-accent-pink rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
               </div>
            </div>
         </div>
         <div className="p-6 flex-1 flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Analytics</h2>
            <div className="space-y-4">
               <div className="bg-bg-base p-4 rounded-xl border border-border-subtle">
                  <div className="text-[8px] text-gray-500 mb-1 uppercase font-bold tracking-widest">Playback Quality</div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-xl font-bold">4K</span>
                     <span className="text-[10px] text-green-500 font-bold">60 FPS</span>
                  </div>
               </div>
               <div className="bg-bg-base p-4 rounded-xl border border-border-subtle">
                  <div className="text-[8px] text-gray-500 mb-1 uppercase font-bold tracking-widest">Avg. Upload Speed</div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-xl font-bold font-mono">42.8</span>
                     <span className="text-[10px] text-gray-400 font-bold">MBPS</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="p-6 border-t border-border-subtle">
            <button className="w-full py-4 bg-vibrant-gradient rounded-xl font-bold text-xs tracking-widest uppercase active:scale-95 transition-transform shadow-lg shadow-accent-pink/30">
               Publish Vlog
            </button>
         </div>
      </aside>
    </div>
  );
}
