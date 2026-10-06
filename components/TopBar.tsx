'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, BookOpen, Sparkles, Award } from 'lucide-react';
import { isAudioMuted, toggleAudio } from '@/lib/sound';

interface TopBarProps {
  onOpenGlossary: () => void;
  onOpenSandbox: () => void;
  currentEpoch: number;
}

export default function TopBar({ onOpenGlossary, onOpenSandbox, currentEpoch }: TopBarProps) {
  const [muted, setMuted] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return isAudioMuted();
    }
    return false;
  });

  const handleToggleSound = () => {
    const nextMuted = toggleAudio();
    setMuted(nextMuted);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c1017]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 sm:px-6 py-3 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark with Emblem */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-amber-500 via-amber-600 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50 group-hover:scale-105 transition-transform">
            <span className="text-stone-950 font-black text-sm tracking-tighter">2084</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold font-serif-title tracking-wider text-amber-200 group-hover:text-amber-300 transition-colors leading-none">
              PROJECT UTOPIA <span className="text-amber-500 text-xs font-sans font-mono tracking-normal ml-1">2084</span>
            </span>
            <span className="text-[10px] text-stone-400 tracking-widest uppercase font-mono hidden sm:inline">
              Biện Chứng Lịch Sử XHCN
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-300">
          <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Chương {currentEpoch + 1} / 7</span>
          </div>
          <a href="#visualizer" className="hover:text-amber-300 transition-colors">Mô Phỏng</a>
          <a href="#control-deck" className="hover:text-amber-300 transition-colors">Nhiệm Vụ</a>
          <button
            type="button"
            onClick={onOpenSandbox}
            className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 text-amber-200/90"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kỷ Nguyên Timeline</span>
          </button>
        </nav>

        {/* Zone 3: Quick Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2.5 rounded-lg text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 bg-stone-900/80 hover:bg-stone-800/80 transition-all cursor-pointer shadow-md"
            title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            type="button"
            onClick={onOpenGlossary}
            className="px-3.5 py-2 rounded-lg text-xs font-bold text-amber-200 bg-gradient-to-r from-amber-950/80 to-stone-900/90 hover:from-amber-900/90 hover:to-stone-800 border border-amber-500/40 flex items-center gap-2 transition-all shadow-md cursor-pointer hover:shadow-amber-500/10"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Từ Điển Khái Niệm</span>
            <span className="sm:hidden">Từ Điển</span>
          </button>
        </div>

      </div>
    </header>
  );
}
