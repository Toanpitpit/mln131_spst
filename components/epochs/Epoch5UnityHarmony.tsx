'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { frequencySync: number }) => void;
}

export default function Epoch5UnityHarmony({ onSuccess, onUpdateSim }: Props) {
  const [ethnicEquality, setEthnicEquality] = useState<number>(50);
  const [beliefFreedom, setBeliefFreedom] = useState<number>(50);
  const [allianceStrength, setAllianceStrength] = useState<number>(50);

  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const checkHarmonicSync = (eVal: number, bVal: number, aVal: number) => {
    setEthnicEquality(eVal);
    setBeliefFreedom(bVal);
    setAllianceStrength(aVal);
    playGearSound();

    const avg = (eVal + bVal + aVal) / 3;
    onUpdateSim({ frequencySync: avg });

    if (bVal < 25) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO CỰC ĐOAN: Bức hại tôn giáo hoặc bãi bỏ cưỡng bức gây chia rẽ niềm tin xã hội!',
        lesson: 'Tôn giáo là nhu cầu tinh thần của một bộ phận nhân dân. Nhà nước XHCN tôn trọng quyền tự do tín ngưỡng, tôn giáo và tự do không tín ngưỡng.'
      });
    } else if (eVal < 30) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO BẤT BÌNH ĐẲNG DÂN TỘC: Nguy cơ chia rẽ khối đại đoàn kết!',
        lesson: 'Chính sách dân tộc của CNXH là bình đẳng, đoàn kết, tương trợ, tôn trọng và giúp nhau cùng tiến bộ trên mọi lĩnh vực.'
      });
    } else if (eVal >= 70 && bVal >= 70 && aVal >= 70) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        text: 'BẢN HÒA CA ĐẠI ĐOÀN KẾT ĐÃ ĐẠT ĐỈNH CAO!',
        lesson: 'Khối đại đoàn kết toàn dân tộc trên nền tảng liên minh công - nông - trí thức là nguồn sức mạnh vô địch, bảo đảm thắng lợi của công cuộc kiến thiết đất nước.'
      });
    } else {
      setFeedback({
        status: 'idle',
        text: '',
        lesson: ''
      });
    }
  };

  const isComplete = ethnicEquality >= 70 && beliefFreedom >= 70 && allianceStrength >= 70;

  return (
    <div className="space-y-4">
      <div className="text-xs uppercase tracking-wider text-amber-200/80 font-medium">
        Đồng Điệu 3 Dải Tần Số Của Khối Đại Đoàn Kết Toàn Dân:
      </div>

      <div className="space-y-3 bg-stone-900/40 p-4 border border-stone-800">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-rose-400">1. Bình Đẳng & Tương Trợ 54 Dân Tộc Anh Em:</span>
            <span className="font-mono text-rose-300 font-bold">{ethnicEquality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={ethnicEquality}
            onChange={(e) => checkHarmonicSync(Number(e.target.value), beliefFreedom, allianceStrength)}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-amber-400">2. Tôn Trọng Tự Do Tín Ngưỡng & Tôn Giáo Chân Chính:</span>
            <span className="font-mono text-amber-300 font-bold">{beliefFreedom}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={beliefFreedom}
            onChange={(e) => checkHarmonicSync(ethnicEquality, Number(e.target.value), allianceStrength)}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-sky-400">3. Liên Minh Giai Cấp (Công Nhân - Nông Dân - Trí Thức):</span>
            <span className="font-mono text-sky-300 font-bold">{allianceStrength}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={allianceStrength}
            onChange={(e) => checkHarmonicSync(ethnicEquality, beliefFreedom, Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => checkHarmonicSync(85, 85, 90)}
          className="text-xs px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-600/50 cursor-pointer flex items-center gap-1"
        >
          <span>Thiết lập cấu hình Hòa Hợp Toàn Dân</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </button>
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
            <span>VUN ĐẮP TẾ BÀO HẠNH PHÚC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
