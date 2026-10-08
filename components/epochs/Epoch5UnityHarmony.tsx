'use client';

import React, { useState } from 'react';
import { playGearSound, playSuccessChime, playWarningBeep } from '@/lib/sound';
import { AlertCircle, ArrowRight, CheckCircle2, Users, HeartHandshake, Compass } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onUpdateSim: (state: { frequencySync: number }) => void;
}

export default function Epoch5UnityHarmony({ onSuccess, onUpdateSim }: Props) {
  const [ethnicEquality, setEthnicEquality] = useState<number>(55);
  const [beliefFreedom, setBeliefFreedom] = useState<number>(50);
  const [allianceStrength, setAllianceStrength] = useState<number>(50);
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

  const handleUpdate = (eVal: number, bVal: number, aVal: number) => {
    setEthnicEquality(eVal);
    setBeliefFreedom(bVal);
    setAllianceStrength(aVal);
    setTested(false);
    playGearSound();

    const avg = (eVal + bVal + aVal) / 3;
    onUpdateSim({ frequencySync: avg });
  };

  const handleAuditHarmony = () => {
    setTested(true);

    if (beliefFreedom < 35) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Bài học về chính sách tôn giáo và tự do tín ngưỡng',
        text: 'Cấm đoán hành chính hoặc kỳ thị niềm tin tôn giáo sẽ làm tổn thương sâu sắc tình cảm của đồng bào có đạo, tạo cơ hội cho các thế lực thù địch kích động chia rẽ.',
        lesson:
          'Chủ tịch Hồ Chí Minh đã ký Sắc lệnh số 234/SL ngày 14/06/1955: "Chính phủ bảo đảm quyền tự do tín ngưỡng và quyền tự do thờ phụng của nhân dân. Mọi người đều có quyền theo một tôn giáo hoặc không theo tôn giáo nào."',
        realFact: 'Sự kiện lịch sử có thật: Trong suốt hai cuộc kháng chiến, hàng triệu tín đồ Phật giáo, Công giáo, Cao Đài, Hòa Hảo đã sát cánh cùng toàn dân tộc theo tinh thần "Kính Chúa yêu Nước", "Tốt đời đẹp đạo".',
      });
    } else if (ethnicEquality < 40) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Nguy cơ chia rẽ khối đoàn kết 54 dân tộc anh em',
        text: 'Thiếu quan tâm đầu tư phát triển kinh tế - văn hóa cho vùng đồng bào dân tộc thiểu số sẽ làm xói mòn khối đại đoàn kết toàn dân tộc.',
        lesson:
          'Nguyên tắc vàng của chính sách dân tộc Việt Nam: Bình đẳng, đoàn kết, tôn trọng, tương trợ và giúp nhau cùng tiến bộ.',
        realFact: 'Sự kiện lịch sử có thật: Năm 1946, Bác Hồ viết thư gửi Đại hội các dân tộc thiểu số miền Nam tại Playku: "Đồng bào Kinh hay Thổ, Mường hay Mán, Gia Rai hay Ê Đê... đều là con cháu Việt Nam, đều là anh em ruột thịt. Sông có thể cạn, núi có thể mòn, nhưng lòng đoàn kết của chúng ta không bao giờ giảm bớt."',
      });
    } else if (allianceStrength < 45) {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẢNH BÁO: Liên minh giai cấp công - nông - trí thức bị suy giảm',
        text: 'Tách rời công nhân khỏi nông dân và trí thức sẽ làm mất đi bệ đỡ chính trị - xã hội cốt tử của chế độ.',
        lesson:
          'Mặt trận Việt Minh (1941) và Mặt trận Tổ quốc Việt Nam luôn đặt nền tảng trên khối liên minh công nhân - nông dân - trí thức vững như bàn thạch.',
        realFact: 'Sự kiện lịch sử có thật: Tháng 5/1941 tại Pác Bó, Hội nghị Trung ương 8 thành lập Mặt trận Việt Minh, quy tụ trí thức, công nhân, nông dân làm nên kỳ tích Cách mạng Tháng Tám 1945.',
      });
    } else if (ethnicEquality >= 70 && beliefFreedom >= 65 && allianceStrength >= 70) {
      playSuccessChime();
      setFeedback({
        status: 'success',
        title: 'BẢN HÒA CA ĐẠI ĐOÀN KẾT TOÀN DÂN ĐẠT ĐỈNH CAO!',
        text: 'Bạn đã vận dụng xuất sắc tư tưởng Hồ Chí Minh: Đoàn kết 54 dân tộc, bảo vệ quyền tự do tín ngưỡng theo Sắc lệnh 234/SL và củng cố khối liên minh công nông trí thức.',
        lesson:
          'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công. Khối đại đoàn kết toàn dân tộc là đường lối chiến lược sống còn của cách mạng Việt Nam.',
        realFact: 'Sự kiện lịch sử có thật: Đại đoàn kết toàn dân tộc đã đưa cách mạng Việt Nam vượt qua nạn đói 1945, đánh thắng hai đế quốc to lớn và đưa đất nước phát triển vững mạnh hôm nay.',
      });
    } else {
      playWarningBeep();
      setFeedback({
        status: 'warning',
        title: 'CẦN NÂNG CAO THÊM ĐỘ ĐỒNG BỘ CẢ 3 MẶT',
        text: 'Hãy tiếp tục điều chỉnh cả 3 chỉ số đạt mức trên 70% để tạo nên thế trận lòng dân vững chắc nhất.',
        lesson:
          'Đoàn kết không thể phiến diện mà phải toàn diện giữa dân tộc, tôn giáo và các giai cấp, tầng lớp xã hội.',
        realFact: 'Sự kiện lịch sử có thật: Cương lĩnh Đại hội XIII khẳng định: "Lấy mục tiêu xây dựng một nước Việt Nam hòa bình, độc lập, thống nhất, toàn vẹn lãnh thổ, dân giàu, nước mạnh, dân chủ, công bằng, văn minh làm điểm tương đồng".',
      });
    }
  };

  const avgConsensus = Math.round((ethnicEquality + beliefFreedom + allianceStrength) / 3);
  const isSuccess = tested && feedback.status === 'success';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-stone-300">
          Khảo sát chính sách Mặt trận Việt Minh 1941 & Sắc lệnh 234/SL (1955):
        </span>
        <span className="font-mono text-stone-400">
          Đồng thuận: <strong className="text-amber-300">{avgConsensus}%</strong>
        </span>
      </div>

      <div className="space-y-3.5 bg-stone-900/60 p-4 border border-stone-800 rounded">
        {/* Slider 1: Ethnic Equality */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              <span>1. Bình Đẳng & Tương Trợ 54 Dân Tộc Anh Em (Thư Playku 1946):</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{ethnicEquality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={ethnicEquality}
            onChange={(e) => handleUpdate(Number(e.target.value), beliefFreedom, allianceStrength)}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Slider 2: Belief Freedom */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-stone-400" />
              <span>2. Tôn Trọng Quyền Tự Do Tín Ngưỡng (Sắc lệnh 234/SL năm 1955):</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{beliefFreedom}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={beliefFreedom}
            onChange={(e) => handleUpdate(ethnicEquality, Number(e.target.value), allianceStrength)}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Slider 3: Class Alliance */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-stone-300 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-stone-400" />
              <span>3. Liên Minh Giai Cấp (Công Nhân - Nông Dân - Trí Thức):</span>
            </span>
            <span className="font-mono text-amber-300 font-semibold">{allianceStrength}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={allianceStrength}
            onChange={(e) => handleUpdate(ethnicEquality, beliefFreedom, Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Verification Trigger Button */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={handleAuditHarmony}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded border border-stone-700 cursor-pointer transition-colors"
        >
          Kiểm Tra Tần Số Hòa Hợp Toàn Dân
        </button>
      </div>

      {/* Feedback Section with Historical Context */}
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
              <strong>Nguyên lý căn bản:</strong> {feedback.lesson}
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
            <span>VUN ĐẮP TẾ BÀO HẠNH PHÚC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
