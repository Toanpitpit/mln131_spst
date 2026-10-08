'use client';

import React from 'react';
import { EPOCHS } from '@/lib/gameData';
import { BookMarked, CheckCircle2, Lock, X, Calendar, MapPin } from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedEpochs: number[];
  playerName: string;
}

export default function JournalModal({
  isOpen,
  onClose,
  completedEpochs,
  playerName,
}: JournalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#0d121b] border border-amber-900/40 p-6 shadow-2xl max-h-[88vh] flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookMarked className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-200">
                Nhật Ký Kiến Trúc Sư: {playerName || 'Đồng chí'}
              </h2>
              <p className="text-xs text-stone-400">
                Lưu trữ các sự kiện lịch sử có thật và đúc kết quy luật biện chứng đã mở khóa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 text-stone-400 hover:text-white rounded border border-stone-800 hover:border-stone-700 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto space-y-4 my-4 pr-1 flex-1">
          {EPOCHS.map((epoch, idx) => {
            const isCompleted = completedEpochs.includes(idx);

            return (
              <div
                key={epoch.id}
                className={`p-4 border transition-colors rounded ${
                  isCompleted
                    ? 'border-amber-900/50 bg-stone-900/60'
                    : 'border-stone-800/80 bg-stone-950/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Chương {epoch.id} · {epoch.year}
                    </span>
                    <span className="text-stone-500">·</span>
                    <span className="text-xs text-stone-300 font-semibold">{epoch.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đã đúc kết bài học</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-stone-500 text-[11px]">
                        <Lock className="w-3 h-3" />
                        <span>Chưa mở khóa</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-stone-300 leading-relaxed">
                  <span className="font-semibold text-amber-200/90">Luận điểm cốt lõi: </span>
                  {epoch.keyLesson.coreIdea}
                </div>

                {isCompleted && (
                  <div className="mt-3 pt-2.5 border-t border-stone-800/80 space-y-2 text-[11px] text-stone-400 leading-relaxed">
                    <div>
                      <span className="text-stone-300 font-medium">Phân tích biện chứng: </span>
                      {epoch.keyLesson.elaboration}
                    </div>

                    {/* Historical Events list */}
                    <div className="pt-2 border-t border-stone-800/60">
                      <div className="text-[11px] font-semibold text-amber-300/90 mb-1.5 uppercase tracking-wide">
                        Sự kiện lịch sử có thật đã chứng thực:
                      </div>
                      <div className="space-y-1.5">
                        {epoch.historicalEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="bg-stone-950/50 p-2 rounded border border-stone-800/60 text-stone-300"
                          >
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-200">
                              <Calendar className="w-3 h-3 text-amber-400" />
                              <span>{ev.year}</span>
                              <span className="text-stone-500">·</span>
                              <span className="text-stone-100">{ev.title}</span>
                            </div>
                            <div className="text-[10px] text-stone-400 mt-0.5 leading-snug">
                              {ev.historicalFact}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded border border-stone-700 cursor-pointer"
          >
            Đóng Nhật Ký
          </button>
        </div>
      </div>
    </div>
  );
}
