'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playFanfare, playSuccessChime, playWarningBeep, playConnectTone } from '@/lib/sound';
import { AlertTriangle, Award, Check, CheckCircle2, Plus, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { activationPercent: number }) => void;
  stats: { theory: number; protect: number; build: number };
}

export default function Epoch7UtopiaActivation({ onSuccess, onUpdateSim, stats }: Props) {
  const [activatedCores, setActivatedCores] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const cores = [
    { id: 'theory', name: 'Lõi Lý Luận Biện Chứng', val: stats.theory, color: 'text-amber-400' },
    { id: 'protect', name: 'Lõi Bảo Vệ & Đoàn Kết', val: stats.protect, color: 'text-red-400' },
    { id: 'build', name: 'Lõi Kiến Trúc Xã Hội', val: stats.build, color: 'text-emerald-400' }
  ];

  const handleToggleCore = (id: string) => {
    let next: string[];
    if (activatedCores.includes(id)) {
      next = activatedCores.filter(c => c !== id);
    } else {
      next = [...activatedCores, id];
      playConnectTone();
    }
    setActivatedCores(next);
    onUpdateSim({ activationPercent: (next.length / 3) * 100 });
  };

  const handleSelectGoal = (goal: 'elite' | 'utopia') => {
    setSelectedGoal(goal);
    if (goal === 'elite') {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO SỤP ĐỔ LÝ TƯỞNG: Lợi ích của nhóm thiểu số sẽ tái lập chế độ áp bức tư bản!',
        lesson: 'Bản chất sâu sắc nhất của CNXH là phục vụ lợi ích của đại đa số nhân dân lao động, tuyệt đối không phục vụ bất kỳ phe nhóm đặc quyền đặc lợi nào.'
      });
    } else {
      if (activatedCores.length < 3) {
        setActivatedCores(['theory', 'protect', 'build']);
        onUpdateSim({ activationPercent: 100 });
      }

      playFanfare();
      // Blast confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe catch for environment
      }

      setFeedback({
        status: 'success',
        text: 'ĐẠI ĐÔ THỊ UTOPIA 2084 ĐÃ CHÍNH THỨC HOÀN THÀNH VÀ KÍCH HOẠT VĨNH CỬU!',
        lesson: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh! Bạn đã dẫn dắt tiến trình lịch sử vượt qua mọi gian truân để bước vào kỷ nguyên tự do và hạnh phúc đích thực.'
      });
    }
  };

  const isCompleted = selectedGoal === 'utopia' && activatedCores.length === 3;

  return (
    <div className="space-y-4">
      {/* Step 1: Activate 3 Energy Cores */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium block">
          1. Hòa Mạng 3 Năng Lượng Kiến Thiết Đã Tích Lũy:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {cores.map(core => {
            const isAct = activatedCores.includes(core.id);
            return (
              <button
                key={core.id}
                type="button"
                onClick={() => handleToggleCore(core.id)}
                className={`p-3 border text-left transition-all cursor-pointer ${
                  isAct
                    ? 'border-amber-400 bg-amber-950/40 text-amber-200 shadow-md ring-1 ring-amber-400'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-amber-700/50 hover:bg-stone-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold uppercase ${core.color}`}>{core.name}</span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {Math.min(100, Math.round(core.val))}%
                  </span>
                </div>
                <div className="text-xs mt-2 font-medium flex items-center gap-1">
                  {isAct ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-amber-300" />
                      <span>ĐÃ HÒA MẠNG VÀO GAIA</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-stone-400" />
                      <span>NHẤP ĐỂ HÒA MẠNG</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Affirm supreme objective */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium block">
          2. Xác Lập Mục Tiêu Tối Thượng Của Nhân Loại Năm 2084:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSelectGoal('elite')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedGoal === 'elite'
                ? 'border-red-500 bg-red-950/40 text-red-200'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-stone-400">Phương Án A</div>
            <div className="text-sm font-medium mt-0.5">Thịnh vượng riêng cho tầng lớp cai trị GAIA</div>
            <div className="text-xs text-stone-400 mt-1">Biến xã hội thành đế chế công nghệ độc quyền</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectGoal('utopia')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedGoal === 'utopia'
                ? 'border-amber-400 bg-amber-950/40 text-amber-100 ring-1 ring-amber-400 shadow-xl'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-amber-400 flex items-center gap-1">
              <span>Phương Án B</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-amber-200 mt-0.5">Dân giàu, nước mạnh, dân chủ, công bằng, văn minh</div>
            <div className="text-xs text-amber-100/80 mt-1">
              Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người
            </div>
          </button>
        </div>
      </div>

      {feedback.status !== 'idle' && (
        <div
          className={`p-4 border text-sm transition-all ${
            feedback.status === 'success'
              ? 'bg-gradient-to-r from-amber-950/60 to-emerald-950/60 border-amber-500/70 text-amber-100 shadow-xl'
              : 'bg-red-950/40 border-red-600/50 text-red-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2 text-base">
            {feedback.status === 'success' ? (
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <div className="text-xs mt-2 opacity-95 leading-relaxed">
            <strong>BÀI HỌC LỊCH SỬ KHẮC CỐT GHI TÂM:</strong> {feedback.lesson}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={onSuccess}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-base shadow-2xl active:scale-98 cursor-pointer transition-all border-2 border-amber-200 tracking-wide uppercase flex items-center gap-2"
          >
            <span>NHẬN CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ UTOPIA 2084</span>
            <Award className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
