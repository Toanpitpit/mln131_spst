'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playFanfare, playWarningBeep, playConnectTone } from '@/lib/sound';
import { AlertCircle, Award, Check, CheckCircle2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { activationPercent: number }) => void;
  stats: { theory: number; protect: number; build: number };
}

export default function Epoch7UtopiaActivation({ onSuccess, onUpdateSim, stats }: Props) {
  const [activatedCores, setActivatedCores] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'success' | 'warning';
    title: string;
    text: string;
    lesson: string;
    historicalContinuity: string;
  }>({
    status: 'idle',
    title: '',
    text: '',
    lesson: '',
    historicalContinuity: '',
  });

  const cores = [
    { id: 'theory', name: 'Lõi Lý Luận Biện Chứng (Từ Tuyên Ngôn 1848)', val: stats.theory },
    { id: 'protect', name: 'Lõi Khối Đại Đoàn Kết (Từ Mặt Trận 1941)', val: stats.protect },
    { id: 'build', name: 'Lõi Kiến Trúc Pháp Quyền (Từ Hiến Pháp 1946)', val: stats.build },
  ];

  const goals = [
    {
      id: 'elite_technocracy',
      code: 'Mục Tiêu 1 (Nguy Cơ Sai Lạc)',
      title: 'Đặc Quyền Tinh Hoa Kỹ Thuật Số GAIA',
      desc: 'Tập trung tư liệu công nghệ tự động hóa và AI phục vụ riêng cho tầng lớp chuyên gia cai trị.',
      critique: 'Tái lập mâu thuẫn giai cấp và chế độ bất bình đẳng dưới vỏ bọc công nghệ mới.',
    },
    {
      id: 'socialist_utopia',
      code: 'Mục Tiêu 2 (Cương Lĩnh & Khát Vọng Dân Tộc)',
      title: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh',
      desc: 'Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.',
      critique: 'Mục tiêu tối thượng của chủ nghĩa xã hội: Giải phóng con người hoàn toàn, đưa nhân loại sang vương quốc tự do.',
    },
  ];

  const handleToggleCore = (id: string) => {
    setHasEvaluated(false);
    let next: string[];
    if (activatedCores.includes(id)) {
      next = activatedCores.filter((c) => c !== id);
    } else {
      next = [...activatedCores, id];
      playConnectTone();
    }
    setActivatedCores(next);
    onUpdateSim({ activationPercent: (next.length / 3) * 100 });
  };

  const handleAuditUtopia = () => {
    setHasEvaluated(true);

    if (activatedCores.length < 3) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CHƯA HÒA MẠNG ĐỦ 3 LÕI NĂNG LƯỢNG LỊCH SỬ',
        text: 'Cần kết nối đầy đủ cả 3 nguồn lực đã tích lũy từ lịch sử: Lý luận biện chứng (1848), Khối đại đoàn kết (1941) và Kiến trúc pháp quyền nhân dân (1946).',
        lesson:
          'Một tương lai văn minh không thể tách rời nền tảng lý luận khoa học, sức mạnh đại đoàn kết toàn dân và kỷ cương thể chế pháp quyền.',
        historicalContinuity: 'Tính kế thừa lịch sử: Từ những bước đi đầu tiên của Cách mạng Tháng Tám đến kỷ nguyên số 2084, ba trụ cột này luôn là chìa khóa quyết định.',
      });
      return;
    }

    if (!selectedGoal) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CHƯA XÁC LẬP MỤC TIÊU TỐI THƯỢNG CỦA XÃ HỘI',
        text: 'Vui lòng xác định bản chất của Đại đô thị Utopia 2084: Phục vụ thiểu số đặc quyền hay phụng sự toàn thể nhân dân?',
        lesson: 'Mục tiêu chính trị quyết định phương hướng vận hành của toàn bộ khoa học, công nghệ và trí tuệ nhân tạo.',
        historicalContinuity: 'Chân lý bất diệt: Khoa học công nghệ phải là công cụ giải phóng con người, không phải phương tiện nô dịch mới.',
      });
      return;
    }

    if (selectedGoal === 'elite_technocracy') {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Bài Học Về Sự Tha Hóa Quyền Lực & Công Nghệ',
        text: 'Biến AI và tự động hóa thành đặc quyền của thiểu số cai trị sẽ đưa xã hội trở lại bóng tối của áp bức, chia rẽ và bóc lột tinh vi hơn.',
        lesson:
          'Chủ nghĩa Mác - Lênin và tư tưởng Hồ Chí Minh luôn kiên định: Mục tiêu của cách mạng là giải phóng giai cấp, giải phóng dân tộc, giải phóng con người; kiên quyết chống đặc quyền đặc lợi.',
        historicalContinuity: 'Cương lĩnh 2011 nhấn mạnh: "Dân chủ xã hội chủ nghĩa là bản chất của chế độ ta, vừa là mục tiêu, vừa là động lực của sự phát triển".',
      });
    } else if (selectedGoal === 'socialist_utopia') {
      playFanfare();
      try {
        confetti({
          particleCount: 140,
          spread: 95,
          origin: { y: 0.55 },
        });
      } catch {
        // Safe catch
      }

      onUpdateSim({ activationPercent: 100 });
      setFeedback({
        status: 'success',
        title: 'ĐẠI ĐÔ THỊ UTOPIA 2084 ĐÃ KÍCH HOẠT THÀNH CÔNG VĨNH CỬU!',
        text: 'Lý tưởng cao đẹp đã trở thành hiện thực sống động: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh! Hệ thống AI GAIA và nền đại công nghệ số phụng sự trọn vẹn hạnh phúc, tự do và sự phát triển toàn diện của mỗi công dân.',
        lesson:
          'Từ Luận cương Feuerbach 1845 đến Utopia 2084: "Các nhà triết học từ trước đến nay chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới."',
        historicalContinuity: 'Bạn đã hoàn thành sứ mệnh lịch sử của một Kiến trúc sư Xã hội chân chính, kết nối mạch nguồn duy vật biện chứng từ năm 1848 đến tương lai 2084 rực rỡ.',
      });
    }
  };

  const isSuccess = hasEvaluated && feedback.status === 'success';

  return (
    <div className="space-y-4">
      {/* 1. Integrate 3 core energies */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold uppercase tracking-wider text-stone-300">
            1. Hòa mạng 3 nguồn năng lượng đã tích lũy từ lịch sử:
          </label>
          <span className="font-mono text-stone-400">
            {activatedCores.length} / 3 Lõi đã kết nối
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {cores.map((core) => {
            const isAct = activatedCores.includes(core.id);
            return (
              <button
                key={core.id}
                type="button"
                onClick={() => handleToggleCore(core.id)}
                className={`p-3 border rounded text-left transition-colors cursor-pointer ${
                  isAct
                    ? 'border-amber-400 bg-amber-950/40 text-stone-100 ring-1 ring-amber-400/50'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-200">{core.name}</span>
                  <span className="text-xs font-mono font-bold text-amber-300">
                    {Math.min(100, Math.round(core.val))}%
                  </span>
                </div>
                <div className="text-[11px] mt-2 flex items-center gap-1.5 text-stone-400 font-medium">
                  <div
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border ${
                      isAct ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                    }`}
                  >
                    {isAct ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : null}
                  </div>
                  <span>{isAct ? 'Đã hòa mạng GAIA' : 'Nhấp để hòa mạng'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Choose ultimate societal objective */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
          2. Khảo sát và xác lập mục tiêu tối thượng của nền văn minh năm 2084:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {goals.map((g) => {
            const isSelected = selectedGoal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setSelectedGoal(g.id);
                  setHasEvaluated(false);
                }}
                className={`p-3 text-left border rounded transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/40 text-stone-100 ring-1 ring-amber-400/50'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-stone-400">{g.code}</div>
                  <div className="text-xs font-semibold text-stone-200 mt-0.5">{g.title}</div>
                </div>
                <div className="text-[11px] text-stone-400 mt-2 leading-relaxed">{g.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Trigger Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={activatedCores.length === 0 || !selectedGoal}
          onClick={handleAuditUtopia}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Kích Hoạt & Thẩm Định Lõi GAIA 2084
        </button>
      </div>

      {/* Feedback Section */}
      {hasEvaluated && feedback.status !== 'idle' && (
        <div
          className={`p-4 border rounded text-xs transition-all leading-relaxed ${
            feedback.status === 'success'
              ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
              : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
          }`}
        >
          <div className="font-bold flex items-center gap-2 text-sm mb-1.5">
            {feedback.status === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.title}</span>
          </div>
          <p className="opacity-95">{feedback.text}</p>
          <div className="mt-2.5 pt-2 border-t border-white/10 text-[11px] opacity-90 space-y-1">
            <div>
              <strong className="text-amber-300">Tính kế thừa biện chứng:</strong> {feedback.historicalContinuity}
            </div>
            <div>
              <strong>BÀI HỌC LỊCH SỬ KHẮC CỐT GHI TÂM:</strong> {feedback.lesson}
            </div>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onSuccess}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs rounded transition-all cursor-pointer border border-amber-200 tracking-wider uppercase flex items-center gap-2 shadow-lg hover:shadow-amber-400/20"
          >
            <Award className="w-4 h-4" />
            <span>NHẬN CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ UTOPIA 2084</span>
          </button>
        </div>
      )}
    </div>
  );
}
