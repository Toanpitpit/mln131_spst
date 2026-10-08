'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { treeGrowth: number }) => void;
}

export default function Epoch6FamilyFlourish({ onSuccess, onUpdateSim }: Props) {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'warning';
    title: string;
    text: string;
    lesson: string;
    realFact: string;
  }>({
    status: 'idle',
    title: '',
    text: '',
    lesson: '',
    realFact: '',
  });

  const familyValues = [
    {
      id: 1,
      title: 'Hôn Nhân Tự Nguyện & Bình Đẳng Vợ Chồng (Luật 1959)',
      category: 'Đạo luật Lịch sử 1959',
      desc: 'Quốc hội khóa I thông qua đạo luật xóa bỏ chế độ đa thê phong kiến, cưỡng ép hôn nhân; xác lập quyền bình đẳng vợ chồng trước pháp luật.',
      isCorrect: true,
    },
    {
      id: 2,
      title: 'Giáo Dục Toàn Diện & Phát Triển Trẻ Em',
      category: 'Chức năng Nuôi dưỡng',
      desc: 'Kết hợp hài hòa giữa giáo dục gia đình, nhà trường và xã hội để bồi dưỡng thế hệ tương lai phát triển đầy đủ đức - trí - thể - mỹ.',
      isCorrect: true,
    },
    {
      id: 3,
      title: 'Gắn Kết Hạnh Phúc Với Trách Nhiệm Xã Hội (Ba Đảm Đang 1965)',
      category: 'Thực tiễn Lịch sử 1965',
      desc: 'Phụ nữ gánh vác việc nước lẫn việc nhà, vừa sản xuất vừa công tác, kết nối tế bào gia đình với sự phồn vinh của Tổ quốc.',
      isCorrect: true,
    },
    {
      id: 4,
      title: 'Duy Trì Hủ Tục Gia Trưởng Phong Kiến',
      category: 'Hủ tục Cũ',
      desc: 'Trọng nam khinh nữ, coi phụ nữ là tài sản phụ thuộc, tước đoạt quyền tự do hôn nhân và quyền thừa kế của phụ nữ.',
      isCorrect: false,
    },
    {
      id: 5,
      title: 'Phủ Nhận Tình Thân, Sinh Hoạt Trại Lính Vô Hồn',
      category: 'Tư tưởng Cơ giới Cực đoan',
      desc: 'Xem nhẹ gia đình, coi con người như công cụ cơ học vô cảm, phủ nhận thiên chức làm cha mẹ và tình cảm ruột thịt.',
      isCorrect: false,
    },
  ];

  const handleToggle = (id: number) => {
    setHasEvaluated(false);
    let next: number[];
    if (selectedValues.includes(id)) {
      next = selectedValues.filter((v) => v !== id);
    } else {
      next = [...selectedValues, id];
      playConnectTone();
    }
    setSelectedValues(next);

    const growth = (next.length / 3) * 100;
    onUpdateSim({ treeGrowth: Math.max(30, Math.min(100, growth)) });
  };

  const handleAuditFamily = () => {
    setHasEvaluated(true);

    const hasTrap = selectedValues.some((id) => id === 4 || id === 5);
    const correctCount = selectedValues.filter((id) => id >= 1 && id <= 3).length;

    if (hasTrap) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Hủ Tục Phong Kiến Hoặc Tư Tưởng Phi Nhân Tính!',
        text: 'Chủ tịch Hồ Chí Minh đã chỉ rõ: Hủ tục gia trưởng hay việc biến đời sống thành trại lính cơ học đều đi ngược lại bản chất giải phóng con người của chủ nghĩa xã hội.',
        lesson:
          'Bác Hồ căn dặn năm 1959: "Không giải phóng phụ nữ thì không giải phóng một nửa loài người. Nếu không giải phóng phụ nữ thì không xây dựng được chủ nghĩa xã hội."',
        realFact: 'Sự kiện lịch sử có thật: Ngày 29/12/1959, tại Nhà hát Lớn Hà Nội, Quốc hội khóa I đã chính thức bãi bỏ chế độ đa thê phong kiến, xác lập bình đẳng giới trong hôn nhân.',
      });
    } else if (correctCount === 3 && selectedValues.length === 3) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        title: 'CÂY SỰ SỐNG GIA ĐÌNH VĂN HÓA MỚI NỞ HOA RỰC RỠ!',
        text: 'Bạn đã xác lập trọn vẹn 3 trụ cột của gia đình mới XHCN: Hôn nhân tự nguyện tiến bộ (Luật 1959), giáo dục nhân cách thế hệ tương lai và tinh thần phụng sự Tổ quốc (Phong trào Ba đảm đang 1965).',
        lesson:
          'Gia đình là tế bào tự nhiên của xã hội. Gia đình ấm no, bình đẳng, tiến bộ, hạnh phúc là nền tảng vững chắc nhất để xây dựng xã hội phồn vinh.',
        realFact: 'Sự kiện lịch sử có thật: Phong trào Ba đảm đang (1965) đã lôi cuốn hơn 1,7 triệu phụ nữ Việt Nam, trở thành biểu tượng rực rỡ của sự kết hợp hài hòa giữa hạnh phúc tổ ấm và độc lập dân tộc.',
      });
    } else {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CHƯA ĐỦ CÁC CHUẨN MỰC LỊCH SỬ',
        text: `Hiện bạn mới lựa chọn được ${correctCount}/3 chuẩn mực tiến bộ. Hãy hoàn thiện đầy đủ nền tảng của gia đình mới XHCN.`,
        lesson:
          'Một mái ấm hạnh phúc đòi hỏi sự kết hợp toàn diện giữa bình đẳng vợ chồng, nuôi dạy con cái và trách nhiệm với xã hội.',
        realFact: 'Sự kiện lịch sử có thật: Luật Hôn nhân và Gia đình 1959 là một trong những đạo luật đầu tiên của miền Bắc sau hòa bình, thể hiện sự quan tâm đặc biệt của Đảng đối với quyền con người.',
      });
    }
  };

  const isSuccess = hasEvaluated && feedback.status === 'success';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold uppercase tracking-wider text-stone-300">
          Khảo cứu các giá trị thực tế trong lịch sử xây dựng Gia đình mới (1959 - Nay):
        </label>
        <span className="font-mono text-stone-400">
          Đã chọn: {selectedValues.length} / 3 chuẩn mực
        </span>
      </div>

      {/* 5 Neutral Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {familyValues.map((item) => {
          const isSelected = selectedValues.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleToggle(item.id)}
              className={`p-3 text-left border rounded transition-colors cursor-pointer flex items-start gap-3 ${
                isSelected
                  ? 'border-amber-400 bg-amber-950/30 text-stone-100 ring-1 ring-amber-400/40'
                  : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400 text-stone-950'
                    : 'border-stone-600 bg-stone-950 text-transparent'
                }`}
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-stone-400 uppercase tracking-wide">
                  {item.category}
                </div>
                <div className="text-xs font-semibold text-stone-200 mt-0.5">{item.title}</div>
                <div className="text-[11px] text-stone-400 mt-1 leading-relaxed">{item.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Verification Trigger Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={selectedValues.length === 0}
          onClick={handleAuditFamily}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Thẩm Định Chuẩn Mực Gia Đình Thực Tế
        </button>
      </div>

      {/* Feedback Section */}
      {hasEvaluated && feedback.status !== 'idle' && (
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
              <strong className="text-amber-300">Tư liệu lịch sử có thật:</strong> {feedback.realFact}
            </div>
            <div>
              <strong>Ý nghĩa giáo dục:</strong> {feedback.lesson}
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
            <span>BƯỚC VÀO ĐẠI ĐÔ THỊ UTOPIA 2084</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
