'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, CheckCircle2, Sliders, History } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { gearMeshRatio: number; jammed: boolean }) => void;
}

export default function Epoch1Gears({ onSuccess, onUpdateSim }: Props) {
  const [selectedStance, setSelectedStance] = useState<string | null>(null);
  const [prodForces, setProdForces] = useState<number>(50); // Lực lượng sản xuất
  const [prodRelations, setProdRelations] = useState<number>(30); // Quan hệ sản xuất
  const [tested, setTested] = useState<boolean>(false);
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

  const stances = [
    {
      id: 'owen',
      code: 'Sự kiện 1 (1825)',
      title: 'Thử nghiệm New Harmony của Robert Owen',
      desc: 'Bỏ tài sản mua 20.000 mẫu đất tại Mỹ lập công xã từ thiện, xin xỏ lòng tốt của giới chủ.',
      quote: '"Đi xin xỏ lòng trắc ẩn từ giai cấp bóc lột."',
    },
    {
      id: 'luddite',
      code: 'Sự kiện 2 (1811-1848)',
      title: 'Phong trào phá máy Luddite & Tự phát vô chính phủ',
      desc: 'Công nhân đột nhập xưởng đập phá khung dệt cơ khí vì coi máy móc là nguyên nhân gây đói nghèo.',
      quote: '"Đập phá máy móc, từ chối đại công nghiệp hiện đại."',
    },
    {
      id: 'marx',
      code: 'Sự kiện 3 (02/1848)',
      title: 'Tuyên ngôn của Đảng Cộng sản (Marx & Engels, London)',
      desc: 'Khám phá quy luật mâu thuẫn giữa LLSX đại công nghiệp với QHSX chiếm hữu tư nhân tư bản.',
      quote: '"Giai cấp vô sản phải làm chủ công nghệ và lật đổ trật tự tư sản."',
    },
  ];

  const handleSelectStance = (id: string) => {
    setSelectedStance(id);
    playGearSound();
    setTested(false);
  };

  const handleTuneForces = (val: number) => {
    setProdForces(val);
    playGearSound();
    onUpdateSim({ gearMeshRatio: val / 100, jammed: selectedStance !== 'marx' });
  };

  const handleTuneRelations = (val: number) => {
    setProdRelations(val);
    playGearSound();
  };

  const handleExecuteVerification = () => {
    if (!selectedStance) return;
    setTested(true);

    if (selectedStance === 'owen') {
      playWarningBeep();
      onUpdateSim({ gearMeshRatio: 0.15, jammed: true });
      setFeedback({
        status: 'warning',
        title: 'CỖ MÁY KẸT CỨNG: Thất bại thực tế của New Harmony (1828)',
        text: 'Lịch sử chứng minh: Sau 3 năm thử nghiệm, cộng đồng New Harmony của Robert Owen tan rã hoàn toàn vì không thể triệt tiêu quy luật thị trường tư bản xung quanh.',
        lesson:
          'Chủ nghĩa xã hội không thể hình thành bằng sự bố thí đạo đức của các cá nhân hảo tâm. Cần phải xóa bỏ tận gốc chế độ chiếm hữu tư nhân.',
        realFact: 'Sự kiện lịch sử có thật: Robert Owen đã mất 4/5 gia tài và thừa nhận mô hình ốc đảo từ thiện không thể tồn tại trong lòng chủ nghĩa tư bản.',
      });
    } else if (selectedStance === 'luddite') {
      playWarningBeep();
      onUpdateSim({ gearMeshRatio: 0.2, jammed: true });
      setFeedback({
        status: 'warning',
        title: 'CỖ MÁY THỤT LÙI: Sai lầm phong trào đập phá máy móc',
        text: 'Nghị viện Anh ban hành Đạo luật 1812 xử tử hình những người phá máy; xã hội rơi vào hỗn loạn mà công nhân vẫn bị bần cùng hóa.',
        lesson:
          'Kẻ thù của người lao động không phải là máy móc hay kỹ thuật hiện đại, mà là quan hệ sản xuất tư bản chủ nghĩa lỗi thời kìm hãm.',
        realFact: 'Sự kiện lịch sử có thật: Hàng trăm khung dệt bị phá hủy ở Nottinghamshire (1811-1816) nhưng không cứu được người thợ dệt khỏi bàn tay các chủ xưởng tư bản.',
      });
    } else if (selectedStance === 'marx') {
      playSuccessChime();
      onUpdateSim({ gearMeshRatio: Math.max(0.7, prodForces / 100), jammed: false });
      setFeedback({
        status: 'success',
        title: 'CỖ MÁY BIỆN CHỨNG ĂN KHỚP HOÀN HẢO! (London, 1848)',
        text: 'Tuyên ngôn của Đảng Cộng sản ra đời tháng 2/1848 đã trang bị cho phong trào công nhân toàn cầu thế giới quan khoa học và phương pháp luận duy vật biện chứng.',
        lesson:
          'Quy luật khách quan: Quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất. Giai cấp công nhân là chủ thể của nền đại công nghiệp.',
        realFact: 'Sự kiện lịch sử có thật: Tuyên ngôn 1848 đã soi đường cho các cuộc khởi nghĩa của công nhân Paris tháng 6/1848 và phong trào cách mạng châu Âu.',
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Stance Selection based on real 1848 events */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-300 block">
          1. Khảo cứu 3 sự kiện lịch sử thực tế về phong trào thế kỷ XIX:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {stances.map((st) => {
            const isSelected = selectedStance === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleSelectStance(st.id)}
                className={`p-3 text-left border rounded transition-colors cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-400 bg-amber-950/40 text-stone-100 ring-1 ring-amber-400/50'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                }`}
              >
                <div>
                  <div className="text-[11px] font-mono text-stone-400 mb-1">{st.code}</div>
                  <div className="text-xs font-semibold text-stone-200 leading-snug">{st.title}</div>
                </div>
                <div className="text-[11px] text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                  {st.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Dialectical Tension Tuning */}
      <div className="bg-stone-900/70 border border-stone-800 p-3.5 rounded space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Thử nghiệm quy luật mâu thuẫn LLSX và QHSX:</span>
          </span>
          <span className="font-mono text-stone-400 text-[11px]">
            Độ tương thích: {Math.abs(prodForces - prodRelations) < 20 ? 'Tương thích' : 'Mâu thuẫn gay gắt'}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <div className="flex justify-between text-[11px] text-stone-400 mb-1">
              <span>Trình độ Lực Lượng Sản Xuất (Công nghệ đại công nghiệp hơi nước):</span>
              <span className="font-mono text-amber-300">{prodForces}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={prodForces}
              onChange={(e) => handleTuneForces(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-stone-400 mb-1">
              <span>Tính Xã Hội Hóa của Quan Hệ Sản Xuất:</span>
              <span className="font-mono text-amber-300">{prodRelations}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={prodRelations}
              onChange={(e) => handleTuneRelations(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Verification Trigger Button */}
        <div className="pt-1 flex justify-end">
          <button
            type="button"
            disabled={!selectedStance}
            onClick={handleExecuteVerification}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
          >
            Vận Hành Thử Nghiệm Quy Luật 1848
          </button>
        </div>
      </div>

      {/* Feedback Section with Real Historical Facts */}
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
              <strong className="text-amber-300">Tư liệu lịch sử có thật:</strong> {feedback.realFact}
            </div>
            <div>
              <strong>Bài học lý luận:</strong> {feedback.lesson}
            </div>
          </div>
        </div>
      )}

      {/* Advance button */}
      {tested && feedback.status === 'success' && (
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={onSuccess}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>TIẾP TỤC BƯỚC ĐI LỊCH SỬ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
