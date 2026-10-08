'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { activePillars: number[] }) => void;
}

export default function Epoch4DemocracyPillars({ onSuccess, onUpdateSim }: Props) {
  const [governanceMode, setGovernanceMode] = useState<string | null>(null);
  const [activePillars, setActivePillars] = useState<number[]>([]);
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

  const governanceModels = [
    {
      id: 'technocracy',
      code: 'Mô Hình 1 (Cảnh Báo)',
      title: 'Độc Tài Kỹ Trị & Thuật Toán Tự Trị',
      desc: 'Giao toàn quyền lập pháp và điều hành cho các thuật toán AI khép kín hoặc giới tinh hoa kỹ thuật số.',
      flaw: 'Con người bị tước đoạt quyền làm chủ, biến thành đối tượng bị thao túng kỹ thuật số.',
    },
    {
      id: 'rule_of_law',
      code: 'Mô Hình 2 (Hiến Pháp 1946 & Nghị Quyết 27)',
      title: 'Nhà Nước Pháp Quyền XHCN Việt Nam',
      desc: 'Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân; Hiến pháp và pháp luật thượng tôn.',
      flaw: 'Bản chất dân chủ thực chất: Quyền lực nhà nước thuộc về toàn thể nhân dân, đặt con người ở vị trí trung tâm.',
    },
  ];

  const pillars = [
    {
      id: 0,
      title: '1. Dân Biết',
      desc: 'Công khai, minh bạch dữ liệu quy hoạch, ngân sách và chính sách theo Luật Thực hiện Dân chủ ở cơ sở 2022.',
    },
    {
      id: 1,
      title: '2. Dân Bàn',
      desc: 'Trưng cầu ý dân, lấy ý kiến rộng rãi nhân dân trong xây dựng Hiến pháp và pháp luật.',
    },
    {
      id: 2,
      title: '3. Dân Làm & Giám Sát',
      desc: 'Nhân dân trực tiếp tham gia quản lý, Ban Thanh tra nhân dân và Mặt trận Tổ quốc kiểm soát quyền lực.',
    },
    {
      id: 3,
      title: '4. Dân Thụ Hưởng',
      desc: 'Mọi thành quả phát triển kinh tế, y tế, văn hóa phải trực tiếp phục vụ cải thiện đời sống nhân dân.',
    },
  ];

  const handleSelectMode = (id: string) => {
    setGovernanceMode(id);
    setHasEvaluated(false);
  };

  const handleTogglePillar = (id: number) => {
    setHasEvaluated(false);
    let next: number[];
    if (activePillars.includes(id)) {
      next = activePillars.filter((p) => p !== id);
    } else {
      next = [...activePillars, id];
      playConnectTone();
    }
    setActivePillars(next);
    onUpdateSim({ activePillars: next });
  };

  const handleAuditConstitution = () => {
    setHasEvaluated(true);

    if (governanceMode === 'technocracy') {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Bẫy Độc Tài Kỹ Trị Thuật Toán',
        text: 'Phó mặc quyền lực cho các cỗ máy lạnh lùng hay giới tinh hoa tài phiệt công nghệ sẽ tước đoạt quyền sống, quyền tự do và quyền làm chủ thiêng liêng của con người.',
        lesson:
          'Chủ tịch Hồ Chí Minh khẳng định: "Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân." Không một thuật toán nào được phép đứng trên nhân dân.',
        realFact: 'Sự kiện lịch sử có thật: Bản Hiến pháp 1946 do Bác Hồ làm Trưởng ban soạn thảo đã thiết lập một nền dân chủ cộng hòa nhân văn sâu sắc, nơi nhân dân là chủ thể tối cao của quyền lực.',
      });
    } else if (governanceMode === 'rule_of_law') {
      if (activePillars.length < 4) {
        playWarningBeep();
        setFeedback({
          status: 'warning',
          title: 'CHƯA ĐỦ 4 TRỤ CỘT THỰC THI DÂN CHỦ Ở CƠ SỞ',
          text: `Bạn mới kích hoạt ${activePillars.length}/4 trụ cột. Hãy hoàn thiện đủ cả 4 cơ chế theo luật định.`,
          lesson:
            'Nền dân chủ không thể chỉ dừng ở lời nói; phải được bảo đảm bằng các quy trình pháp lý cụ thể: Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng.',
          realFact: 'Sự kiện lịch sử có thật: Ngày 10/11/2022, Quốc hội khóa XV đã chính thức thông qua Luật Thực hiện Dân chủ ở cơ sở, luật hóa toàn diện 6 chữ "Dân" của Đảng.',
        });
      } else {
        playSuccessChime();
        setFeedback({
          status: 'success',
          title: 'THIẾT CHẾ PHÁP QUYỀN XHCN VỮNG CHẮC HOÀN TOÀN!',
          text: 'Bạn đã hoàn thiện trọn vẹn kiến trúc Nhà nước pháp quyền xã hội chủ nghĩa: Thượng tôn Hiến pháp và pháp luật, kiểm soát quyền lực, bảo vệ quyền con người và bảo đảm quyền làm chủ thực chất của nhân dân.',
          lesson:
            'Nghị quyết số 27-NQ/TW khẳng định: Nhà nước pháp quyền XHCN Việt Nam là công cụ sắc bén nhất để tổ chức kiến thiết đất nước và bảo vệ thành quả cách mạng.',
          realFact: 'Sự kiện lịch sử có thật: Hiến pháp 1946 (Điều 1) và Hiến pháp 2013 (Điều 2) đều kiên định chân lý: "Nước Cộng hòa XHCN Việt Nam do Nhân dân làm chủ; tất cả quyền lực nhà nước thuộc về Nhân dân".',
        });
      }
    }
  };

  const isSuccess = hasEvaluated && feedback.status === 'success';

  return (
    <div className="space-y-4">
      {/* 1. Governance Model Choice */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
          1. Khảo sát 2 mô hình thể chế quyền lực nhà nước:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {governanceModels.map((m) => {
            const isSelected = governanceMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectMode(m.id)}
                className={`p-3 text-left border rounded transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/30 text-stone-100 ring-1 ring-amber-400/50'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-stone-400">{m.code}</div>
                  <div className="text-xs font-semibold text-stone-200 mt-0.5">{m.title}</div>
                </div>
                <div className="text-[11px] text-stone-400 mt-2 leading-relaxed">{m.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Four Pillars Assembly */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold uppercase tracking-wider text-stone-300">
            2. Xác lập 4 trụ cột thực thi theo Luật Dân chủ ở cơ sở 2022:
          </label>
          <span className="font-mono text-stone-400">{activePillars.length} / 4 trụ cột</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {pillars.map((p) => {
            const isActive = activePillars.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleTogglePillar(p.id)}
                className={`p-2.5 text-left border rounded transition-colors cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'border-amber-400 bg-amber-950/40 text-stone-100 ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-amber-200">{p.title}</div>
                  <div className="text-[10px] text-stone-400 mt-1 line-clamp-3 leading-tight">
                    {p.desc}
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t border-stone-800/80 flex items-center gap-1 text-[10px] text-stone-400 font-medium">
                  <div
                    className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border ${
                      isActive ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
                    }`}
                  >
                    {isActive ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : null}
                  </div>
                  <span>{isActive ? 'Đã kích hoạt' : 'Kích hoạt'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Verification Action */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={!governanceMode || activePillars.length === 0}
          onClick={handleAuditConstitution}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Thẩm Tra Thể Chế Dân Chủ Thực Tế
        </button>
      </div>

      {/* Feedback Card */}
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
              <strong>Bài học lý luận:</strong> {feedback.lesson}
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
            <span>BƯỚC VÀO KHỐI ĐẠI ĐOÀN KẾT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
