'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, Check, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { connectedNodes: number[]; totalNodes: number }) => void;
}

export default function Epoch2WorkerNodes({ onSuccess, onUpdateSim }: Props) {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
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

  const nodesList = [
    {
      id: 1,
      name: 'Công Nhân Putilov & Đội Cận Vệ Đỏ',
      category: 'Sự kiện 1917 · Petrograd',
      desc: 'Hơn 30.000 công nhân nhà máy luyện kim Putilov bãi công, trở thành lực lượng vũ trang nòng cốt đánh chiếm Cung điện Mùa Đông.',
      isCorrect: true,
    },
    {
      id: 2,
      name: 'Xô Viết Đại Biểu Công Nhân & Binh Lính',
      category: 'Tổ chức Quần chúng 1917',
      desc: 'Hình thức tổ chức tự quản quyền lực nhân dân độc đáo ra đời từ phong trào bãi công cách mạng tại Nga.',
      isCorrect: true,
    },
    {
      id: 3,
      name: 'Báo Pravda & Luận Cương Tháng Tư (Lenin)',
      category: 'Vũ khí Lý luận',
      desc: 'Định hướng tư tưởng cách mạng, chuyển từ dân chủ tư sản sang cách mạng vô sản, giương cao khẩu hiệu "Toàn bộ chính quyền về tay các Xô viết!".',
      isCorrect: true,
    },
    {
      id: 4,
      name: 'Liên Minh Công Nhân & Bần Nông Nga',
      category: 'Nền tảng Liên minh',
      desc: 'Sắc lệnh về Ruộng đất tịch thu ruộng đất địa chủ chia cho nông dân, tạo nên khối liên minh chính trị vững chắc.',
      isCorrect: true,
    },
    {
      id: 5,
      name: 'Chính Phủ Lâm Thời Tư Sản Kerensky',
      category: 'Cạm bẫy Thỏa hiệp',
      desc: 'Chính quyền tư sản tiếp tục lôi kéo nhân dân vào Chiến tranh thế giới thứ nhất và bảo vệ quyền lợi các nhà tư bản độc quyền.',
      isCorrect: false,
    },
  ];

  const handleToggleNode = (id: number) => {
    setHasEvaluated(false);
    let next: number[];
    if (selectedNodes.includes(id)) {
      next = selectedNodes.filter((item) => item !== id);
    } else {
      next = [...selectedNodes, id];
      playConnectTone();
    }
    setSelectedNodes(next);
    onUpdateSim({ connectedNodes: next, totalNodes: 4 });
  };

  const handleAuditNetwork = () => {
    setHasEvaluated(true);

    const hasTrap = selectedNodes.includes(5);
    const correctCount = selectedNodes.filter((id) => id >= 1 && id <= 4).length;

    if (hasTrap) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Lầm Tưởng Về Chính Phủ Lâm Thời Kerensky (1917)',
        text: 'Chính phủ lâm thời tư sản Kerensky hứa hẹn hòa bình nhưng thực tế tiếp tục đẩy hàng triệu binh lính ra chiến trường đẫm máu phục vụ các tập đoàn tư bản.',
        lesson:
          'Lenin kiên quyết: "Không ủng hộ Chính phủ lâm thời!". Giai cấp công nhân và nhân dân lao động phải tự mình nắm chính quyền thông qua các Xô viết.',
        realFact: 'Sự kiện lịch sử có thật: Tháng 7/1917, Chính phủ Kerensky đã ra lệnh bắn vào đoàn biểu tình hòa bình của công nhân và binh lính Petrograd, buộc Đảng Bolshevik phải chuyển sang khởi nghĩa vũ trang.',
      });
    } else if (correctCount === 4 && selectedNodes.length === 4) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        title: 'MẠNG LƯỚI SỨ MỆNH TIÊN PHONG NĂM 1917 ĐÃ KẾT NỐI HOÀN HẢO!',
        text: 'Bạn đã tập hợp trọn vẹn 4 lực lượng làm nên thắng lợi của Cách mạng Tháng Mười: Công nhân Putilov, các Xô viết, ngọn đuốc lý luận Pravda của Lenin và liên minh công nông kiên trung.',
        lesson:
          'Sứ mệnh lịch sử của giai cấp công nhân được cụ thể hóa bằng một Đảng tiên phong có lý luận khoa học, dẫn dắt khối liên minh giai cấp rộng rãi giành chính quyền.',
        realFact: 'Sự kiện lịch sử có thật: Đêm 25/10/1917, phát pháo lệnh của tàu tuần dương Aurora vang lên, đánh dấu giờ phút chính quyền về tay giai cấp công nhân và nhân dân lao động Nga.',
      });
    } else {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CHƯA ĐỦ LỰC LƯỢNG NÒNG CỐT NĂM 1917',
        text: `Hiện bạn mới tập hợp được ${correctCount}/4 lực lượng cách mạng thực tế. Cần kết nối đầy đủ cả 4 hạt nhân lịch sử.`,
        lesson:
          'Thiếu vũ khí tư tưởng (Báo chí lý luận) hoặc thiếu khối liên minh với nông dân thì phong trào công nhân đơn độc không thể giành thắng lợi.',
        realFact: 'Sự kiện lịch sử có thật: Nếu không có Sắc lệnh Ruộng đất lôi cuốn hàng triệu nông dân nghèo ủng hộ, chính quyền Xô viết non trẻ không thể vượt qua vòng vây thù địch.',
      });
    }
  };

  const isSuccess = hasEvaluated && feedback.status === 'success';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <label className="font-semibold uppercase tracking-wider text-stone-300">
          Khảo cứu các lực lượng thực tế trong Cách mạng Tháng Mười Nga 1917:
        </label>
        <span className="font-mono text-stone-400">
          Đã chọn: {selectedNodes.length} / 4 lực lượng
        </span>
      </div>

      {/* Node list: All 5 cards styled with completely identical neutral appearance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {nodesList.map((node) => {
          const isSelected = selectedNodes.includes(node.id);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleToggleNode(node.id)}
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
                  {node.category}
                </div>
                <div className="text-xs font-semibold text-stone-200 mt-0.5">{node.name}</div>
                <div className="text-[11px] text-stone-400 mt-1 leading-relaxed">{node.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Network Evaluation Trigger */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          disabled={selectedNodes.length === 0}
          onClick={handleAuditNetwork}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Kiểm Tra & Hòa Mạng Lực Lượng 1917
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
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.title}</span>
          </div>
          <p className="opacity-95">{feedback.text}</p>
          <div className="mt-2 pt-2 border-t border-white/10 text-[11px] opacity-90 space-y-1">
            <div>
              <strong className="text-amber-300">Sự kiện có thật:</strong> {feedback.realFact}
            </div>
            <div>
              <strong>Đúc kết lý luận:</strong> {feedback.lesson}
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
            <span>BƯỚC VÀO THỜI KỲ QUÁ ĐỘ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
