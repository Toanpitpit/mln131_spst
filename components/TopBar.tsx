'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, BookOpen, History, BookMarked, Compass } from 'lucide-react';
import { isAudioMuted, toggleAudio } from '@/lib/sound';

interface TopBarProps {
  onOpenGlossary: () => void;
  onOpenSandbox: () => void;
  onOpenJournal: () => void;
  onOpenScenarios: () => void;
  currentEpoch: number;
}

export default function TopBar({
  onOpenGlossary,
  onOpenSandbox,
  onOpenJournal,
  onOpenScenarios,
  currentEpoch,
}: TopBarProps) {
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
    <header className="sticky top-0 z-40 w-full bg-[#080d15]/90 backdrop-blur-md border-b border-amber-900/30 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single Text Element, Display Face) */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-amber-200 hover:text-amber-100 transition-colors font-serif-title flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span>Project Utopia 2084</span>
        </Link>

        {/* Zone 2: Navigation Links (Clean Text with Subtle Hover Transitions) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-300">
          <span className="text-stone-400 font-mono tracking-wider">
            Chương {currentEpoch + 1} / 7
          </span>
          <a
            href="#visualizer"
            className="hover:text-amber-300 transition-colors py-1 border-b border-transparent hover:border-amber-400/60"
          >
            Mô Phỏng
          </a>
          <a
            href="#control-deck"
            className="hover:text-amber-300 transition-colors py-1 border-b border-transparent hover:border-amber-400/60"
          >
            Kiến Thiết
          </a>
          <button
            type="button"
            onClick={onOpenScenarios}
            className="hover:text-amber-300 transition-colors py-1 border-b border-transparent hover:border-amber-400/60 cursor-pointer flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-stone-400" />
            <span>Tình Huống Thực Tiễn</span>
          </button>
          <button
            type="button"
            onClick={onOpenSandbox}
            className="hover:text-amber-300 transition-colors py-1 border-b border-transparent hover:border-amber-400/60 cursor-pointer flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5 text-stone-400" />
            <span>Trục Thời Gian</span>
          </button>
          <button
            type="button"
            onClick={onOpenJournal}
            className="hover:text-amber-300 transition-colors py-1 border-b border-transparent hover:border-amber-400/60 cursor-pointer flex items-center gap-1.5"
          >
            <BookMarked className="w-3.5 h-3.5 text-stone-400" />
            <span>Nhật Ký</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Audio Toggle + Glossary) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 text-stone-300 hover:text-amber-300 rounded-md border border-stone-800 hover:border-amber-700/50 bg-stone-900/60 hover:bg-stone-850 transition-colors cursor-pointer"
            title={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            aria-label="Toggle Sound"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            type="button"
            onClick={onOpenGlossary}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Từ Điển Khái Niệm</span>
          </button>
        </div>
      </div>
    </header>
  );
}
