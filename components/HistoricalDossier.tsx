'use client';

import React, { useState } from 'react';
import { HistoricalEvent } from '@/lib/gameData';
import {
  Calendar,
  MapPin,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  BookOpenCheck,
  CheckCircle2,
  Bookmark,
  Share2,
} from 'lucide-react';
import { playTick, playConnectTone } from '@/lib/sound';

interface HistoricalDossierProps {
  events: HistoricalEvent[];
  epochYear: string;
  onSelectEventForTask?: (eventId: string) => void;
}

export default function HistoricalDossier({
  events,
  epochYear,
  onSelectEventForTask,
}: HistoricalDossierProps) {
  const [expandedId, setExpandedId] = useState<string | null>(events[0]?.id || null);
  const [filterMode, setFilterMode] = useState<'all' | 'documents' | 'facts'>('all');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    playTick();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopySnippet = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    playConnectTone();
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  return (
    <div className="space-y-3.5">
      {/* Dossier Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-stone-100 text-xs sm:text-sm uppercase tracking-wider font-serif-title">
              Hồ Sơ Khảo Cứu Thực Địa: Sự Kiện Có Thật ({events.length} Tư Liệu)
            </span>
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">
            Các sự kiện lịch sử xác thực, văn kiện gốc và diễn biến có thật thời kỳ {epochYear}
          </p>
        </div>

        {/* Filter view pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-[11px]">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              filterMode === 'all'
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
            }`}
          >
            Tất cả
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('documents')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              filterMode === 'documents'
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
            }`}
          >
            Văn kiện gốc
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('facts')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer border ${
              filterMode === 'facts'
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
            }`}
          >
            Diễn biến
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3">
        {events.map((ev, idx) => {
          const isExpanded = expandedId === ev.id;
          return (
            <div
              key={ev.id}
              className={`border rounded transition-all overflow-hidden ${
                isExpanded
                  ? 'border-amber-900/70 bg-stone-900/90 shadow-lg'
                  : 'border-stone-800 bg-stone-900/40 hover:border-stone-700'
              }`}
            >
              {/* Accordion Trigger Bar */}
              <button
                type="button"
                onClick={() => handleToggle(ev.id)}
                className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-[11px] font-mono font-bold text-amber-300 shrink-0 mt-0.5">
                    {ev.year}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-stone-100 group-hover:text-amber-200 transition-colors font-serif-title leading-snug">
                      {ev.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        <span>{ev.location}</span>
                      </span>
                      <span className="text-stone-600">·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-400" />
                        <span>{ev.keyFigures.join(', ')}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-stone-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Detailed Real Historical Content */}
              {isExpanded && (
                <div className="p-3.5 sm:p-4 pt-0 border-t border-stone-800/80 space-y-3 text-xs leading-relaxed text-stone-300">
                  {/* Real Historical Fact */}
                  {filterMode !== 'documents' && (
                    <div>
                      <div className="font-semibold text-stone-200 text-[11px] uppercase tracking-wide mb-1 flex items-center gap-1.5 text-amber-400/90">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Diễn biến sự kiện lịch sử có thật:</span>
                      </div>
                      <p className="text-stone-300 bg-stone-950/60 p-3 rounded border border-stone-800/80 leading-relaxed">
                        {ev.historicalFact}
                      </p>
                    </div>
                  )}

                  {/* Primary Source Snippet */}
                  {filterMode !== 'facts' && (
                    <div className="bg-amber-950/25 border-l-2 border-amber-500/80 p-3 sm:p-3.5 rounded-r text-stone-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/90 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>Trích lục tư liệu / văn kiện gốc có thật:</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopySnippet(ev.id, ev.primarySourceSnippet)}
                          className="hover:text-amber-100 text-stone-400 transition-colors flex items-center gap-1 cursor-pointer font-sans normal-case text-[10px]"
                        >
                          {copiedSnippetId === ev.id ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Đã sao chép
                            </span>
                          ) : (
                            <span>Sao chép trích dẫn</span>
                          )}
                        </button>
                      </div>
                      <blockquote className="italic text-xs text-amber-100/90 leading-relaxed font-serif">
                        {ev.primarySourceSnippet}
                      </blockquote>
                    </div>
                  )}

                  {/* Dialectical Significance */}
                  <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-800/70 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200 font-medium">
                        Quy luật biện chứng & bài học lịch sử:{' '}
                      </strong>
                      <span>{ev.significance}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
