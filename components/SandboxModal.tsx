'use client';

import React from 'react';
import { EPOCHS } from '@/lib/gameData';
import { History, X, CheckCircle2 } from 'lucide-react';

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
  completedEpochs,
}: SandboxModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0d121b] border border-amber-900/60 p-6 shadow-2xl max-h-[85vh] flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-amber-200">
                Trục Lịch Sử Biện Chứng (Timeline Sandbox)
              </h2>
              <p className="text-xs text-stone-400">
                Chọn bất kỳ giai đoạn nào để khảo sát và điều phối mô phỏng
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded flex items-center justify-center cursor-pointer border border-stone-800 transition-colors"
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
                className={`p-3.5 border rounded transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'border-amber-400 bg-amber-950/30'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-amber-400 text-stone-950'
                        : isCompleted
                        ? 'bg-emerald-950 border border-emerald-700/60 text-emerald-300'
                        : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    <span>{idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {epoch.year}
                      </span>
                      <span className="text-stone-500">·</span>
                      <span className="text-xs text-stone-300 font-medium">{epoch.era}</span>
                    </div>
                    <div className="text-sm font-semibold text-stone-100 mt-0.5">{epoch.title}</div>
                    <div className="text-xs text-stone-400 mt-0.5">{epoch.subtitle}</div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Đã hoàn thành</span>
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[11px] font-mono text-amber-300 border border-amber-600/40 px-2 py-0.5 rounded bg-amber-950/40">
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
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded border border-stone-700 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
