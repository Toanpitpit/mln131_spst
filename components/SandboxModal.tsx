'use client';

import React from 'react';
import { EPOCHS } from '@/lib/gameData';
import { Sparkles, X, CheckCircle2 } from 'lucide-react';

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEpoch: (index: number) => void;
  currentEpoch: number;
  completedEpochs: number[];
}

export default function SandboxModal({
  isOpen,
  onClose,
  onSelectEpoch,
  currentEpoch,
  completedEpochs
}: SandboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0f141d] border-2 border-amber-600/50 p-6 shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-amber-200">Trục Lịch Sử Biện Chứng (Timeline Sandbox)</h2>
              <p className="text-xs text-stone-400">Chọn bất kỳ kỷ nguyên nào để mô phỏng và thử nghiệm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer border border-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Epoch list */}
        <div className="overflow-y-auto space-y-2.5 my-4 pr-1 flex-1">
          {EPOCHS.map((epoch, idx) => {
            const isCurrent = currentEpoch === idx;
            const isCompleted = completedEpochs.includes(idx);

            return (
              <div
                key={epoch.id}
                onClick={() => {
                  onSelectEpoch(idx);
                  onClose();
                }}
                className={`p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-950/40 shadow-md ring-1 ring-amber-400/50'
                    : 'border-stone-800 bg-stone-900/50 hover:border-amber-600/40 hover:bg-stone-850'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 flex flex-col items-center justify-center text-xs font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-amber-500 text-stone-950'
                        : isCompleted
                        ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{epoch.year}</span>
                      <span className="text-xs text-stone-500">·</span>
                      <span className="text-xs text-stone-300 font-semibold">{epoch.era}</span>
                    </div>
                    <div className="text-sm font-bold text-stone-100 mt-0.5">{epoch.title}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{epoch.subtitle}</div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Hoàn thành</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2 py-0.5 border border-amber-500/30">
                      Đang xem
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
