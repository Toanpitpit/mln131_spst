'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, BookOpen, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full bg-[#0c1017]/90 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <Link href="/" className="text-base sm:text-lg font-bold font-serif-title tracking-wider text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
          PROJECT UTOPIA 2084
        </Link>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-400">
          <span className="text-amber-300/90 font-semibold">Chương {currentEpoch + 1} / 7</span>
          <a href="#visualizer" className="hover:text-stone-200 transition-colors">Mô Phỏng</a>
          <a href="#control-deck" className="hover:text-stone-200 transition-colors">Nhiệm Vụ</a>
          <button
            type="button"
            onClick={onOpenSandbox}
            className="hover:text-stone-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Kỷ Nguyên</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 text-stone-400 hover:text-amber-300 border border-stone-800 hover:border-amber-500/40 bg-stone-900/60 transition-colors cursor-pointer"
            title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenGlossary}
            className="px-3 py-1.5 text-xs font-semibold text-amber-200 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-600/50 flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Từ Điển</span>
          </button>
        </div>

      </div>
    </header>
  );
}

