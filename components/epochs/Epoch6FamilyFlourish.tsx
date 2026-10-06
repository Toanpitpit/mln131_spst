'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { treeGrowth: number }) => void;
}

export default function Epoch6FamilyFlourish({ onSuccess, onUpdateSim }: Props) {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const familyValues = [
    {
      id: 1,
      title: 'Hôn Nhân Tự Nguyện & Bình Đẳng Giới',
      desc: 'Vợ chồng tôn trọng, cùng gánh vác việc gia đình và phát triển sự nghiệp',
      isCorrect: true
    },
    {
      id: 2,
      title: 'Giáo Dục Toàn Diện Thế Hệ Trẻ',
      desc: 'Kết hợp chặt chẽ giữa giáo dục gia đình, nhà trường và xã hội',
      isCorrect: true
    },
    {
      id: 3,
      title: 'Gắn Kết Tổ Ấm Với Trách Nhiệm Xã Hội',
      desc: 'Gia đình ấm no, hạnh phúc, văn minh, cống hiến cho sự phồn vinh của đất nước',
      isCorrect: true
    },
    {
      id: 4,
      title: 'Duy Trì Tư Tưởng Gia Trưởng Phong Kiến',
      desc: 'Trọng nam khinh nữ, áp đặt quyền lực độc đoán lên các thành viên',
      isCorrect: false
    },
    {
      id: 5,
      title: 'Xóa Bỏ Tình Thân, Sinh Hoạt Trại Lính Vô Hồn',
      desc: 'Phủ nhận vai trò gia đình, biến con người thành những con số vô cảm',
      isCorrect: false
    }
  ];

  const handleToggle = (valItem: typeof familyValues[0]) => {
    if (!valItem.isCorrect) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO QUAN NIỆM LỖI THỜI / PHI NHÂN VĂN: Gia đình là tổ ấm thiêng liêng, không thể biến dạng!',
        lesson: 'Gia đình là tế bào tự nhiên của xã hội. Không có gia đình lành mạnh thì không thể có một xã hội văn minh, hạnh phúc.'
      });
      return;
    }

    let next: number[];
    if (selectedValues.includes(valItem.id)) {
      next = selectedValues.filter(id => id !== valItem.id);
    } else {
      next = [...selectedValues, valItem.id];
      playConnectTone();
    }
    setSelectedValues(next);

    const growth = (next.length / 3) * 100;
    onUpdateSim({ treeGrowth: Math.max(30, growth) });

    if (next.length === 3) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        text: 'CÂY SỰ SỐNG GIA ĐÌNH MỚI ĐÃ NỞ HOA KẾT TRÁI RỰC RỠ!',
        lesson: 'Xây dựng gia đình ấm no, bình đẳng, tiến bộ, hạnh phúc là một trong những mục tiêu cốt lõi của công cuộc giải phóng con người trong CNXH.'
      });
    } else {
      setFeedback({
        status: 'idle',
        text: '',
        lesson: ''
      });
    }
  };

  const isComplete = selectedValues.length === 3;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium">
          Truyền 3 Nguồn Dưỡng Chất Để Vun Đắp Tế Bào Gia Đình Xã Hội:
        </label>
        <span className="text-xs text-amber-400 font-mono">
          {selectedValues.length} / 3 Dưỡng Chất Đã Kích Hoạt
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {familyValues.map(item => {
          const isSelected = selectedValues.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggle(item)}
              className={`p-3 text-left border transition-all cursor-pointer flex items-start gap-3 ${
                !item.isCorrect
                  ? 'border-red-900/50 bg-red-950/20 text-red-300 hover:bg-red-900/30'
                  : isSelected
                  ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 ring-1 ring-emerald-500'
                  : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
              }`}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold ${
                  isSelected ? 'bg-emerald-500 text-stone-950' : 'border border-stone-600 text-stone-400'
                }`}
              >
                {isSelected ? <Heart className="w-3.5 h-3.5 fill-current" /> : null}
              </div>
              <div>
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs text-stone-400 mt-0.5 leading-snug">{item.desc}</div>
              </div>
            </button>
          );
        })}
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
            <span>TIẾN ĐẾN ĐÍCH ĐẾN CUỐI CÙNG: UTOPIA 2084</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
