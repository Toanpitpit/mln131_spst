'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { stateRatio: number; marketRatio: number; welfareRatio: number }) => void;
}

export default function Epoch3EconomicBalance({ onSuccess, onUpdateSim }: Props) {
  const [stateRatio, setStateRatio] = useState<number>(50);
  const [marketRatio, setMarketRatio] = useState<number>(30);
  const [welfareRatio, setWelfareRatio] = useState<number>(25);

  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const handleUpdate = (stateR: number, marketR: number, welfareR: number) => {
    setStateRatio(stateR);
    setMarketRatio(marketR);
    setWelfareRatio(welfareR);
    playGearSound();
    onUpdateSim({ stateRatio: stateR, marketRatio: marketR, welfareRatio: welfareR });

    // Validate economics
    if (marketR < 15) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO NÓNG VỘI DUY Ý CHÍ: Triệt tiêu kinh tế hàng hóa quá sớm gây khủng hoảng khan hiếm!',
        lesson: 'Thời kỳ quá độ không thể dùng ý muốn chủ quan để xóa bỏ quan hệ thị trường. Cần kinh tế nhiều thành phần để khơi thông sức sản xuất.'
      });
    } else if (stateR < 30) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO CHỆCH HƯỚNG TƯ BẢN: Kinh tế Nhà nước mất vai trò chủ đạo!',
        lesson: 'Kinh tế thị trường định hướng XHCN phải có sự điều tiết của Nhà nước và kinh tế Nhà nước giữ vai trò chủ đạo để bảo đảm định hướng xã hội.'
      });
    } else if (welfareR < 18) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO BẤT BÌNH ĐẲNG: Phúc lợi xã hội quá thấp, khoảng cách giàu nghèo gia tăng!',
        lesson: 'Mục tiêu của CNXH là vì con người. Tăng trưởng kinh tế phải đi đôi với tiến bộ và công bằng xã hội ngay trong từng bước đi.'
      });
    } else if (stateR >= 40 && stateR <= 65 && marketR >= 25 && marketR <= 50 && welfareR >= 20 && welfareR <= 40) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        text: 'ĐIỂM CÂN BẰNG TỐI ƯU CỦA THỜI KỲ QUÁ ĐỘ ĐÃ ĐƯỢC THIẾT LẬP!',
        lesson: 'Bạn đã áp dụng chuẩn xác tinh thần Chính sách Kinh tế Mới (NEP) và đường lối Đổi mới: Đa dạng hóa hình thức sở hữu, kích thích động lực, giữ vững định hướng XHCN.'
      });
    } else {
      setFeedback({
        status: 'idle',
        text: '',
        lesson: ''
      });
    }
  };

  const isOptimal = stateRatio >= 40 && stateRatio <= 65 && marketRatio >= 25 && marketRatio <= 50 && welfareRatio >= 20 && welfareRatio <= 40;

  return (
    <div className="space-y-4">
      <div className="text-xs uppercase tracking-wider text-amber-200/80 font-medium">
        Điều Phối 3 Trọng Số Kinh Tế Vĩ Mô Trong Thời Kỳ Quá Độ:
      </div>

      <div className="space-y-3 bg-stone-900/60 p-4 border border-stone-800">
        {/* Slider 1: Nhà nước */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-red-400">1. Kinh Tế Nhà Nước (Chủ đạo & Hạ tầng xương sống):</span>
            <span className="font-mono text-red-300 font-bold">{stateRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={stateRatio}
            onChange={(e) => handleUpdate(Number(e.target.value), marketRatio, welfareRatio)}
            className="w-full accent-red-500 cursor-pointer"
          />
        </div>

        {/* Slider 2: Thị trường */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-emerald-400">2. Kinh Tế Thị Trường Năng Động (Tư nhân, Hợp tác xã, FDI):</span>
            <span className="font-mono text-emerald-300 font-bold">{marketRatio}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            value={marketRatio}
            onChange={(e) => handleUpdate(stateRatio, Number(e.target.value), welfareRatio)}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Slider 3: Phúc lợi */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-amber-400">3. Quỹ Phúc Lợi Xã Hội & An Sinh Toàn Dân:</span>
            <span className="font-mono text-amber-300 font-bold">{welfareRatio}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={welfareRatio}
            onChange={(e) => handleUpdate(stateRatio, marketRatio, Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Preset helper buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-stone-400 py-1">Thử nghiệm các phương án lịch sử:</span>
        <button
          type="button"
          onClick={() => handleUpdate(90, 5, 10)}
          className="px-2.5 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 cursor-pointer"
        >
          Cơ chế Tập trung Quan liêu cũ
        </button>
        <button
          type="button"
          onClick={() => handleUpdate(20, 75, 10)}
          className="px-2.5 py-1 bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 cursor-pointer"
        >
          Tư bản Tự do Hoàn toàn
        </button>
        <button
          type="button"
          onClick={() => handleUpdate(50, 35, 28)}
          className="px-2.5 py-1 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-600/50 cursor-pointer flex items-center gap-1"
        >
          <span>Định Hướng XHCN Cân Bằng</span>
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

      {isOptimal && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg cursor-pointer transition-all border border-amber-400 flex items-center gap-1.5"
          >
            <span>TIẾN LÊN TRỤ CỘT DÂN CHỦ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
