'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, CheckCircle2, TrendingUp, Scale, ShieldCheck } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { stateRatio: number; marketRatio: number; welfareRatio: number }) => void;
}

export default function Epoch3EconomicBalance({ onSuccess, onUpdateSim }: Props) {
  const [stateRatio, setStateRatio] = useState<number>(45);
  const [marketRatio, setMarketRatio] = useState<number>(35);
  const [welfareRatio, setWelfareRatio] = useState<number>(20);
  const [tested, setTested] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'warning';
    title: string;
    text: string;
    lesson: string;
    realEventContext: string;
  }>({
    status: 'idle',
    title: '',
    text: '',
    lesson: '',
    realEventContext: '',
  });

  const handleSliderChange = (s: number, m: number, w: number) => {
    setStateRatio(s);
    setMarketRatio(m);
    setWelfareRatio(w);
    setTested(false);
    playGearSound();
    onUpdateSim({ stateRatio: s, marketRatio: m, welfareRatio: w });
  };

  const handleApplyPreset = (s: number, m: number, w: number) => {
    handleSliderChange(s, m, w);
  };

  const handleEvaluateEconomy = () => {
    setTested(true);

    if (marketRatio < 15) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Bài học khủng hoảng bao cấp duy ý chí (Việt Nam trước 1986)',
        text: 'Lịch sử chứng minh: Giai đoạn 1976 - 1985, việc xóa bỏ kinh tế tư nhân và hợp tác xã tự chủ quá sớm, duy trì cơ chế "ngăn sông cấm chợ" đã đẩy lạm phát lên 774%, đất nước thiếu hụt lương thực trầm trọng.',
        lesson:
          'Chính sách NEP (1921) của Lenin và Đổi Mới (1986) của Việt Nam khẳng định: Không thể xóa bỏ quan hệ hàng hóa - tiền tệ bằng mệnh lệnh chủ quan khi sức sản xuất còn thấp.',
        realEventContext: 'Sự kiện có thật: Vụ án "Khoán chui" Kim Ngọc năm 1968 và các cuộc "xé rào bù giá vào lương" của Võ Văn Kiệt ở TP.HCM (1979-1985) đã chứng minh thực tiễn bức thiết phải giải phóng kinh tế thị trường.',
      });
    } else if (stateRatio < 30) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Bài học "Liệu pháp sốc" tư bản hóa ở Đông Âu (1990s)',
        text: 'Tư nhân hóa ồ ạt, thả nổi hoàn toàn các ngành then chốt khiến các tập đoàn đầu cơ lũng đoạn, phân hóa giàu nghèo sâu sắc, hạ tầng quốc gia bị thâu tóm.',
        lesson:
          'Kinh tế thị trường định hướng XHCN phải đảm bảo kinh tế Nhà nước giữ vai trò chủ đạo, nắm giữ huyết mạch năng lượng, giao thông, viễn thông và tài chính.',
        realEventContext: 'Sự kiện có thật: Thập niên 1990 ở Nga và Đông Âu, việc tư nhân hóa vô tội vạ đã sinh ra tầng lớp tài phiệt (oligarchs), làm sụp đổ hệ thống an sinh xã hội.',
      });
    } else if (welfareRatio < 18) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Tăng trưởng kinh tế không đi liền với công bằng xã hội',
        text: 'Chỉ chú trọng GDP mà coi nhẹ an sinh, y tế, giáo dục sẽ biến con người thành công cụ kiếm lợi nhuận, đi ngược lại tôn chỉ của CNXH.',
        lesson:
          'Mục tiêu của CNXH là vì con người. Mỗi bước tăng trưởng kinh tế phải đi đôi với tiến bộ và công bằng xã hội ngay trong từng chính sách.',
        realEventContext: 'Sự kiện có thật: Việt Nam luôn chủ trương "không đánh đổi tiến bộ, công bằng xã hội và môi trường để chạy theo tăng trưởng kinh tế đơn thuần".',
      });
    } else if (
      stateRatio >= 40 &&
      stateRatio <= 65 &&
      marketRatio >= 25 &&
      marketRatio <= 50 &&
      welfareRatio >= 20 &&
      welfareRatio <= 40
    ) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        title: 'XÁC LẬP THÀNH CÔNG HÀNH LANG KINH TẾ ĐỔI MỚI (1986 - NAY)!',
        text: 'Bạn đã vận dụng chuẩn xác bài học của Đại hội VI (1986): Kinh tế Nhà nước giữ vai trò chủ đạo, các thành phần kinh tế (tư nhân, HTX, FDI) bình đẳng cùng phát triển, quỹ an sinh bảo vệ người yếu thế.',
        lesson:
          'Kinh tế thị trường định hướng XHCN là mô hình kinh tế tổng quát của Việt Nam trong thời kỳ quá độ, khơi thông mọi nguồn lực để đưa đất nước thoát nghèo trở thành quốc gia phát triển năng động.',
        realEventContext: 'Sự kiện có thật: Từ nước thiếu đói năm 1986, nhờ Đổi Mới, Việt Nam đã trở thành nước xuất khẩu gạo hàng đầu thế giới, quy mô GDP tăng hơn 50 lần.',
      });
    } else {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẦN ĐIỀU CHỈNH ĐỂ ĐẠT HÀNH LANG TỐI ƯU',
        text: 'Tỷ trọng chưa đạt thế cân bằng: Hãy giữ Kinh tế Nhà nước 40-65%, Thị trường 25-50%, và Phúc lợi trên 20%.',
        lesson:
          'Hài hòa giữa quản lý nhà nước, tính năng động của thị trường và chính sách an sinh toàn dân.',
        realEventContext: 'Sự kiện có thật: Nghị quyết Trung ương 5 Khóa XII khẳng định kinh tế tư nhân là một động lực quan trọng của nền kinh tế thị trường định hướng XHCN.',
      });
    }
  };

  const isSuccess = tested && feedback.status === 'success';

  return (
    <div className="space-y-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
        Khảo sát và điều tiết 3 đòn bẩy vĩ mô thời kỳ quá độ (NEP 1921 & Đổi Mới 1986):
      </div>

      {/* Sliders Container */}
      <div className="space-y-3.5 bg-stone-900/60 p-4 border border-stone-800 rounded">
        {/* Slider 1: State Sector */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>1. Kinh Tế Nhà Nước (Chủ đạo, hạ tầng then chốt):</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{stateRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={stateRatio}
            onChange={(e) => handleSliderChange(Number(e.target.value), marketRatio, welfareRatio)}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Slider 2: Market Sector */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-stone-400" />
              <span>2. Kinh Tế Thị Trường Năng Động (Tư nhân, HTX, FDI):</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{marketRatio}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            value={marketRatio}
            onChange={(e) => handleSliderChange(stateRatio, Number(e.target.value), welfareRatio)}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Slider 3: Welfare & Equity */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-stone-400" />
              <span>3. Quỹ Phúc Lợi Xã Hội & An Sinh Toàn Dân:</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{welfareRatio}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            value={welfareRatio}
            onChange={(e) => handleSliderChange(stateRatio, marketRatio, Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Historical Comparative Presets */}
      <div className="space-y-1.5">
        <div className="text-[11px] text-stone-400">
          Khảo cứu 3 bài học chính sách kinh tế có thật trong lịch sử:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleApplyPreset(90, 5, 10)}
            className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-left text-xs rounded transition-colors cursor-pointer"
          >
            <div className="font-medium">Thời chiến & Bao cấp cũ</div>
            <div className="text-[10px] text-stone-500 font-mono">Nga 1918 · VN trước 1986</div>
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(20, 75, 10)}
            className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-left text-xs rounded transition-colors cursor-pointer"
          >
            <div className="font-medium">Liệu pháp sốc tư bản</div>
            <div className="text-[10px] text-stone-500 font-mono">Đông Âu thập niên 1990</div>
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(50, 35, 25)}
            className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 text-left text-xs rounded transition-colors cursor-pointer"
          >
            <div className="font-medium">NEP 1921 & Đổi Mới 1986</div>
            <div className="text-[10px] text-stone-500 font-mono">Định hướng XHCN thực tiễn</div>
          </button>
        </div>
      </div>

      {/* Evaluation Trigger Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleEvaluateEconomy}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Thẩm Định Cân Bằng Kinh Tế Thực Tế
        </button>
      </div>

      {/* Feedback Section */}
      {tested && feedback.status !== 'idle' && (
        <div
          className={`p-3.5 border rounded text-xs transition-all leading-relaxed ${
            feedback.status === 'success'
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2 text-sm mb-1">
            {feedback.status === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.title}</span>
          </div>
          <p className="opacity-95">{feedback.text}</p>
          <div className="mt-2 pt-2 border-t border-white/10 text-[11px] opacity-90 space-y-1">
            <div>
              <strong className="text-amber-300">Tư liệu lịch sử có thật:</strong> {feedback.realEventContext}
            </div>
            <div>
              <strong>Ý nghĩa thời đại:</strong> {feedback.lesson}
            </div>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>TIẾN ĐẾN TRỤ CỘT DÂN CHỦ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
