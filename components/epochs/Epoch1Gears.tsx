'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { gearMeshRatio: number; jammed: boolean }) => void;
}

export default function Epoch1Gears({ onSuccess, onUpdateSim }: Props) {
  const [selectedStance, setSelectedStance] = useState<string | null>(null);
  const [speed, setSpeed] = useState<number>(50);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const handleSelectStance = (stanceId: string) => {
    setSelectedStance(stanceId);
    playGearSound();

    if (stanceId === 'utopian') {
      playWarningBeep();
      onUpdateSim({ gearMeshRatio: 0.1, jammed: true });
      setFeedback({
        status: 'warning',
        text: 'CỖ MÁY BỊ KẸT CỨNG: Lòng trắc ẩn không thể lay chuyển giới chủ xí nghiệp!',
        lesson: 'Chủ nghĩa xã hội Không tưởng tuy nhân văn nhưng không hiểu quy luật kinh tế khách quan. Cầu xin lòng tốt từ giai cấp bóc lột là ảo tưởng.'
      });
    } else if (stanceId === 'luddite') {
      playWarningBeep();
      onUpdateSim({ gearMeshRatio: 0.2, jammed: true });
      setFeedback({
        status: 'warning',
        text: 'SỤP ĐỔ KỸ THUẬT: Đập phá máy móc chỉ đẩy xã hội thụt lùi về phong kiến!',
        lesson: 'Kẻ thù của người lao động không phải là máy móc hay kỹ thuật hiện đại, mà là quan hệ sản xuất tư bản chủ nghĩa đã lỗi thời.'
      });
    } else if (stanceId === 'scientific') {
      playSuccessChime();
      onUpdateSim({ gearMeshRatio: 1.0, jammed: false });
      setFeedback({
        status: 'success',
        text: 'CỖ MÁY BIỆN CHỨNG ĂN KHỚP HOÀN HẢO: Đã phát hiện ra quy luật vận động của lịch sử!',
        lesson: 'Sự ra đời của Chủ nghĩa Xã hội Khoa học: Kế thừa hạt nhân hợp lý, vạch trần mâu thuẫn giữa Lực lượng sản xuất xã hội hóa cao với Quan hệ chiếm hữu tư nhân.'
      });
    }
  };

  const handleSliderChange = (val: number) => {
    setSpeed(val);
    playGearSound();
    if (selectedStance === 'scientific') {
      onUpdateSim({ gearMeshRatio: val / 100, jammed: false });
    }
  };

  return (
    <div className="space-y-4">
      {/* Ideology Selector Cards */}
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium block">
          Chọn Định Hướng Lý Luận & Hành Động Biện Chứng:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => handleSelectStance('utopian')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedStance === 'utopian'
                ? 'border-red-500 bg-red-950/40 text-red-200 shadow-md ring-1 ring-red-500'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-stone-400 mb-1">Khuynh Hướng A</div>
            <div className="text-sm font-medium">Kêu gọi lòng từ bi & trắc ẩn từ giới chủ xí nghiệp</div>
            <div className="text-[11px] text-stone-500 mt-1">CNXH Không tưởng thế kỷ XIX</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectStance('luddite')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedStance === 'luddite'
                ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-md ring-1 ring-amber-500'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-stone-400 mb-1">Khuynh Hướng B</div>
            <div className="text-sm font-medium">Đập phá máy móc, từ chối đại công nghiệp</div>
            <div className="text-[11px] text-stone-500 mt-1">Phong trào tự phát vô chính phủ</div>
          </button>

          <button
            type="button"
            onClick={() => handleSelectStance('scientific')}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedStance === 'scientific'
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-md ring-1 ring-emerald-500'
                : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
            }`}
          >
            <div className="text-xs font-semibold uppercase text-emerald-400 mb-1 flex items-center gap-1">
              <span>Khuynh Hướng C</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-sm font-medium">Khám phá quy luật phát triển & sứ mệnh lịch sử</div>
            <div className="text-[11px] text-stone-400 mt-1">Chủ nghĩa Xã hội Khoa học</div>
          </button>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="bg-stone-900/60 border border-stone-800 p-3 flex items-center justify-between gap-4">
        <div className="text-xs text-stone-300">
          <span className="font-semibold text-amber-400">Tốc độ xã hội hóa sản xuất:</span> {speed}%
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={speed}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="w-48 accent-amber-500 cursor-pointer"
        />
      </div>

      {/* Feedback Card */}
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

      {/* Advance button */}
      {feedback.status === 'success' && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg cursor-pointer transition-all border border-amber-400 flex items-center gap-1.5"
          >
            <span>TIẾP TỤC HÀNH TRÌNH BIỆN CHỨNG</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
