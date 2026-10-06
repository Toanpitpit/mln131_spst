'use client';

import React, { useState } from 'react';
import { playConnectTone, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertTriangle, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { connectedNodes: number[]; totalNodes: number }) => void;
}

export default function Epoch2WorkerNodes({ onSuccess, onUpdateSim }: Props) {
  const [selectedNodes, setSelectedNodes] = useState<number[]>([]);
  const [trapTriggered, setTrapTriggered] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'warning'; text: string; lesson: string }>({
    status: 'idle',
    text: '',
    lesson: ''
  });

  const nodesList = [
    { id: 1, name: 'Công Nhân Đại Công Nghiệp', desc: 'Đại diện phương thức sản xuất tiên tiến nhất', isCorrect: true },
    { id: 2, name: 'Nghiệp Đoàn & Đoàn Thể Lao Động', desc: 'Kỷ luật tổ chức và tinh thần đoàn kết cao', isCorrect: true },
    { id: 3, name: 'Báo Chí & Lý Luận Cách Mạng', desc: 'Ngọn đuốc giác ngộ và truyền bá tư tưởng khoa học', isCorrect: true },
    { id: 4, name: 'Khối Liên Minh Công - Nông - Trí Thức', desc: 'Nền tảng chính trị - xã hội vô địch', isCorrect: true },
    { id: 5, name: 'Ảo Tưởng Kỹ Trị Tư Sản', desc: 'Phó mặc quyền lực cho các ông trùm tư bản thuật toán', isCorrect: false }
  ];

  const handleToggleNode = (node: typeof nodesList[0]) => {
    if (!node.isCorrect) {
      playWarningBeep();
      setTrapTriggered(true);
      setFeedback({
        status: 'warning',
        text: 'CẢNH BÁO CẠM BẪY TƯ BẢN: Biến con người thành công cụ tối đa hóa lợi nhuận!',
        lesson: 'Công nghệ hiện đại nếu nằm trong tay giai cấp tư sản độc quyền sẽ trở thành phương tiện bóc lột tinh vi hơn. Giai cấp công nhân phải làm chủ tư liệu sản xuất.'
      });
      return;
    }

    setTrapTriggered(false);
    let nextSelected: number[];
    if (selectedNodes.includes(node.id)) {
      nextSelected = selectedNodes.filter(id => id !== node.id);
    } else {
      nextSelected = [...selectedNodes, node.id];
      playConnectTone();
    }

    setSelectedNodes(nextSelected);
    onUpdateSim({ connectedNodes: nextSelected, totalNodes: 4 });

    if (nextSelected.length === 4) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        text: 'MẠNG LƯỚI SỨ MỆNH TIÊN PHONG ĐÃ THIẾT LẬP HOÀN TOÀN!',
        lesson: 'Sứ mệnh lịch sử toàn thế giới của giai cấp công nhân là tất yếu khách quan, do địa vị kinh tế - xã hội và bản chất cách mạng triệt để quy định.'
      });
    } else {
      setFeedback({
        status: 'idle',
        text: '',
        lesson: ''
      });
    }
  };

  const isCompleted = selectedNodes.length === 4 && !trapTriggered;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-wider text-amber-200/80 font-medium">
          Chọn & Kết Nối 4 Trọng Điểm Của Lực Lượng Tiên Phong:
        </label>
        <span className="text-xs text-amber-400 font-mono">
          Tiến độ: {selectedNodes.length} / 4 Lực Lượng
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {nodesList.map(node => {
          const isSelected = selectedNodes.includes(node.id);
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleToggleNode(node)}
              className={`p-3 text-left border transition-all cursor-pointer flex items-start gap-3 ${
                !node.isCorrect
                  ? 'border-red-900/50 bg-red-950/20 text-red-300 hover:bg-red-900/30'
                  : isSelected
                  ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 shadow-md ring-1 ring-emerald-500'
                  : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-amber-700/50 hover:bg-stone-800/60'
              }`}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold ${
                  isSelected ? 'bg-emerald-500 text-stone-950' : 'border border-stone-600 text-stone-400'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
              </div>
              <div>
                <div className="text-sm font-semibold">{node.name}</div>
                <div className="text-xs text-stone-400 mt-0.5 leading-snug">{node.desc}</div>
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

      {isCompleted && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm shadow-lg cursor-pointer transition-all border border-amber-400 flex items-center gap-1.5"
          >
            <span>BƯỚC VÀO THỜI KỲ QUÁ ĐỘ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
