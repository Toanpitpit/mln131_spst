'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, Check, CheckCircle2, Plus, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { activePillars: number[] }) => void;
}

export default function Epoch4DemocracyPillars({ onSuccess, onUpdateSim }: Props) {
  const [activePillars, setActivePillars] = useState<number[]>([]);
  const [governanceMode, setGovernanceMode] = useState<'rule_of_law' | 'ai_autocracy' | null>(null);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const pillars = [
    { id: 0, title: 'DÂN BIẾT', desc: 'Công khai, minh bạch dữ liệu quy hoạch và chính sách' },
    { id: 1, title: 'DÂN BÀN', desc: 'Trưng cầu ý dân, thảo luận dân chủ và phản biện xã hội' },
    { id: 2, title: 'DÂN LÀM & GIÁM SÁT', desc: 'Nhân dân trực tiếp tham gia quản lý, kiểm soát quyền lực' },
    { id: 3, title: 'DÂN THỤ HƯỞNG', desc: 'Mọi thành quả kinh tế - văn hóa phải thuộc về toàn dân' }
  ];

  const handleTogglePillar = (id: number) => {
    let next: number[];
    if (activePillars.includes(id)) {
      next = activePillars.filter(p => p !== id);
    } else {
      next = [...activePillars, id];
      playConnectTone();
    }
    setActivePillars(next);
    onUpdateSim({ activePillars: next });

    if (next.length === 4 && governanceMode === 'rule_of_law') {
      playSuccessChime();
      setFeedback({
        status: 'success',
        text: '4 TRỤ CỘT DÂN CHỦ PHÁP QUYỀN ĐÃ HOÀN HẢO!',
        lesson: 'Dân chủ XHCN là bản chất của chế độ ta, vừa là mục tiêu, vừa là động lực của sự phát triển. Quyền lực thực sự thuộc về nhân dân.'
      });
    }
  };

  const handleSelectMode = (mode: 'rule_of_law' | 'ai_autocracy') => {
    setGovernanceMode(mode);
    if (mode === 'ai_autocracy') {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO ĐỘC TÀI KỸ THUẬT SỐ: Phó mặc toàn quyền cho AI biến con người thành đối tượng bị thao túng!',
        lesson: 'Dân chủ XHCN là quyền làm chủ tự giác của con người. Không một cỗ máy hay thuật toán nào được phép đứng trên nhân dân và pháp luật.'
      });
    } else {
      playSuccessChime();
      if (activePillars.length === 4) {
        setFeedback({
          status: 'success',
          text: 'THỂ CHẾ DÂN CHỦ XÃ HỘI CHỦ NGHĨA VỮNG CHẮC!',
          lesson: 'Nhà nước pháp quyền XHCN thượng tôn Hiến pháp và pháp luật, đặt con người ở vị trí trung tâm, của nhân dân, do nhân dân, vì nhân dân.'
        });
      } else {
        setFeedback({
          status: 'idle',
          text: '',
          lesson: ''
        });
      }
    }
  };

  const isComplete = activePillars.length === 4 && governanceMode === 'rule_of_law';

  return (
    <div className="space-y-4">
      {/* Step 1: Ideological governance choice */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium block">
          1. Lựa Chọn Thể Chế Quyền Lực Xã Hội:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSelectMode('ai_autocracy')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              governanceMode === 'ai_autocracy'
                ? 'border-red-500 bg-red-950/40 text-red-200'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-stone-400">Phương Án A</div>
            <div className="text-sm font-medium mt-0.5">Độc tài Thuật toán AI GAIA</div>
            <div className="text-xs text-stone-400 mt-1">Phó mặc quyết sách cho hệ thống máy lạnh lùng</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('rule_of_law')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              governanceMode === 'rule_of_law'
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-emerald-400 flex items-center gap-1">
              <span>Phương Án B</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-sm font-medium mt-0.5">Nhà Nước Pháp Quyền XHCN</div>
            <div className="text-xs text-stone-400 mt-1">Của nhân dân, do nhân dân, vì nhân dân</div>
          </button>
        </div>
      </div>

      {/* Step 2: 4 Pillars Activation */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium block">
          2. Kích Hoạt 4 Trụ Cột Cơ Chế Thực Thi Quyền Làm Chủ:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {pillars.map(p => {
            const isActive = activePillars.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleTogglePillar(p.id)}
                className={`p-2.5 text-center border transition-all cursor-pointer ${
                  isActive
                    ? 'border-amber-400 bg-amber-950/50 text-amber-200 ring-1 ring-amber-400'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-amber-700/50 hover:text-stone-200'
                }`}
              >
                <div className="text-xs font-bold uppercase">{p.title}</div>
                <div className="text-[10px] text-stone-400 mt-1 line-clamp-2">{p.desc}</div>
                <div className="text-xs mt-1.5 font-bold flex items-center justify-center gap-1">
                  {isActive ? (
                    <>
                      <Check className="w-3 h-3 text-amber-300" />
                      <span>ĐÃ DỰNG</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-stone-400" />
                      <span>KÍCH HOẠT</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {feedback.status !== 'idle' && (
        <div
          className={`p-3.5 border text-sm transition-all ${
            feedback.status === 'success'
              ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
              : 'bg-red-950/40 border-red-600/50 text-red-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2">
            {feedback.status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <div className="text-xs mt-1.5 opacity-90 leading-relaxed italic">
            <strong>Bài học cốt lõi:</strong> {feedback.lesson}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg cursor-pointer transition-all border border-amber-400 flex items-center gap-1.5"
          >
            <span>HÒA NHẬP ĐẠI ĐOÀN KẾT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
