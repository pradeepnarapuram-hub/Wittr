import React from 'react';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { AppView } from '../types';

interface BottomNavProps {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
}

export default function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  const navItems: { id: AppView; icon: React.ReactNode; label: string }[] = [
    { id: 'feed', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'search', icon: <Search className="w-5 h-5" />, label: 'Discover' },
    { id: 'create', icon: <Plus className="w-6 h-6 text-white" />, label: 'Create' },
    { id: 'inbox', icon: <MessageSquare className="w-5 h-5" />, label: 'Inbox' },
    { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' },
  ];

  return (
    <nav className="h-16 w-full bg-bg-panel border-t border-border-subtle flex items-center justify-around px-2 pb-safe lg:hidden">
      {navItems.map((item) => {
        if (item.id === 'create') {
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className="relative"
            >
              <div className="relative bg-vibrant-gradient p-2 rounded-xl active:scale-95 transition-transform shadow-lg shadow-accent-pink/20">
                {item.icon}
              </div>
            </button>
          );
        }

        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              isActive ? "text-accent-blue scale-110" : "text-gray-500 hover:text-white/80"
            )}
          >
            {item.icon}
            <span className={cn("text-[8px] font-bold uppercase tracking-widest", !isActive && "sr-only")}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
