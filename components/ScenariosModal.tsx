'use client';

import React, { useState } from 'react';
import { playSuccessChime, playWarningBeep, playConnectTone, playTick } from '@/lib/sound';
import { Compass, CheckCircle2, AlertCircle, ArrowRight, X, Calendar, MapPin, Users, FileText, BookOpen } from 'lucide-react';

interface ScenariosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialScenarioIdx?: number;
}

interface ScenarioOption {
  id: number;
  label: string;
  isCorrect: boolean;
  historicalAnalysis: string;
  dialecticalLesson: string;
}

interface ScenarioItem {
  id: number;
  epochNum: number;
  year: string;
  location: string;
  keyFigures: string[];
  title: string;
  historicalBackground: string; // Tình huống và bối cảnh lịch sử có thật
  primaryDocument: {
    title: string;
    snippet: string;
  };
  dilemmaQuestion: string; // Câu hỏi quyết sách thực tế
  options: ScenarioOption[];
}

export default function ScenariosModal({
  isOpen,
  onClose,
  initialScenarioIdx = 0,
}: ScenariosModalProps) {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState<number>(initialScenarioIdx);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [evaluation, setEvaluation] = useState<{
    tested: boolean;
    isCorrect: boolean;
    analysis: string;
    lesson: string;
  } | null>(null);

  const scenarios: ScenarioItem[] = [
    {
      id: 1,
      epochNum: 1,
      year: '1844 - 1848',
      location: 'Silesia (Đức), Indiana (Mỹ) & London (Anh)',
      keyFigures: ['Karl Marx', 'Friedrich Engels', 'Robert Owen'],
      title: 'Khủng Hoảng Không Tưởng & Bế Tắc Của Phong Trào Đập Phá Máy Móc',
      historicalBackground:
        'Thập niên 1840, công nhân châu Âu bị bần cùng hóa cùng cực. Ở Anh, công nhân tuyệt vọng đập phá máy dệt (phong trào Luddite) vì nghĩ máy móc cướp cơm áo; ở Silesia (Đức, 1844), thợ dệt nổi dậy nhưng bị quân đội đàn áp đẫm máu. Trong khi đó, nhà tư bản nhân đạo Robert Owen bỏ 80% gia sản lập công xã New Harmony tại Mỹ (1825-1828) nhưng sụp đổ hoàn toàn sau 3 năm vì bị thị trường tư bản xung quanh bóp nghẹt.',
      primaryDocument: {
        title: 'Tuyên ngôn của Đảng Cộng sản (21/02/1848, London)',
        snippet:
          '"Giai cấp tư sản không thể tồn tại nếu không luôn luôn cách mạng hóa công cụ sản xuất... Lực lượng sản xuất mà giai cấp tư sản tạo ra đã phát triển đến mức quan hệ sở hữu tư sản trở thành xiềng xích kìm hãm chúng. Sự sụp đổ của giai cấp tư sản và thắng lợi của giai cấp vô sản là tất yếu như nhau."',
      },
      dilemmaQuestion:
        'Trước bế tắc lịch sử này, các nhà sáng lập Chủ nghĩa xã hội khoa học đã chỉ ra hướng đi khách quan nào cho giai cấp công nhân?',
      options: [
        {
          id: 0,
          label: 'A. Tiếp tục đập phá các máy dệt cơ khí và quay trở về phương thức thủ công nghiệp thời phong kiến',
          isCorrect: false,
          historicalAnalysis:
            'Sai lầm phong trào Luddite: Kẻ thù của công nhân không phải là máy móc hay kỹ thuật tiên tiến, mà là chế độ chiếm hữu tư nhân tư bản chủ nghĩa sử dụng máy móc để bóc lột.',
          dialecticalLesson:
            'Lực lượng sản xuất đại công nghiệp là tiền đề vật chất tiến bộ; giải pháp là làm chủ công nghệ, không phải giật lùi lịch sử.',
        },
        {
          id: 1,
          label: 'B. Thành lập các ốc đảo từ thiện biệt lập và trông chờ vào lòng hảo tâm bố thí của giới tư sản',
          isCorrect: false,
          historicalAnalysis:
            'Thực nghiệm New Harmony (1825-1828) của Robert Owen chứng minh: Không thể xóa bỏ bóc lột bằng cách đi xin xỏ lòng thương hại của giai cấp thống trị khi bộ máy nhà nước tư sản còn nguyên vẹn.',
          dialecticalLesson:
            'Chủ nghĩa xã hội không tưởng có giá trị phê phán nhưng bất lực về phương pháp; cần một thế giới quan duy vật biện chứng khoa học.',
        },
        {
          id: 2,
          label: 'C. Nhận thức quy luật mâu thuẫn giữa Lực lượng sản xuất xã hội hóa với Quan hệ sản xuất tư nhân; tổ chức chính đảng vô sản để làm cách mạng xã hội',
          isCorrect: true,
          historicalAnalysis:
            'Bước nhảy vĩ đại từ Không tưởng sang Khoa học: Tuyên ngôn Đảng Cộng sản (1848) chỉ rõ sứ mệnh lịch sử của giai cấp công nhân là tự giải phóng và giải phóng toàn xã hội khỏi áp bức bóc lột.',
          dialecticalLesson:
            'Lịch sử vận động theo quy luật kinh tế khách quan: Quan hệ sản xuất phải phù hợp với trình độ phát triển của Lực lượng sản xuất.',
        },
      ],
    },
    {
      id: 2,
      epochNum: 2,
      year: '1917',
      location: 'Petrograd (Saint Petersburg), Nước Nga',
      keyFigures: ['V.I. Lenin', 'Aleksandr Kerensky', 'Cận vệ Đỏ Putilov'],
      title: 'Bẫy Thỏa Hiệp Của Chính Phủ Lâm Thời Tư Sản & Khởi Nghĩa Tháng Mười',
      historicalBackground:
        'Sau Cách mạng Tháng Hai 1917, chế độ Nga Hoàng sụp đổ, tại Nga xuất hiện tình trạng hai chính quyền song song tồn tại: Chính phủ lâm thời tư sản Kerensky và các Xô viết công nhân - binh lính. Chính phủ Kerensky hứa hẹn đem lại hòa bình và ruộng đất, nhưng trên thực tế tiếp tục đẩy hàng triệu thanh niên ra chiến trường đẫm máu phục vụ các đế quốc đồng minh, và đàn áp cuộc biểu tình tháng 7/1917 tại Petrograd.',
      primaryDocument: {
        title: 'Luận cương Tháng Tư & Tuyên cáo ngày 25/10/1917 (Lenin)',
        snippet:
          '"Không ủng hộ một chút nào Chính phủ lâm thời tư sản!... Đặc điểm hiện nay là bước quá độ từ giai đoạn 1 sang giai đoạn 2: trao toàn bộ chính quyền về tay các Xô viết công nhân, nông dân và binh lính."',
      },
      dilemmaQuestion:
        'Nếu đồng chí là đại biểu của Đảng Bolshevik tại Petrograd tháng 10/1917, quyết sách mang tính sống còn là gì?',
      options: [
        {
          id: 0,
          label: 'A. Thỏa hiệp, gia nhập liên minh chính phủ Kerensky và kêu gọi binh lính tiếp tục cuộc chiến tranh đế quốc',
          isCorrect: false,
          historicalAnalysis:
            'Bản chất tư sản của Chính phủ Kerensky không bao giờ đáp ứng nguyện vọng Hòa bình - Ruộng đất - Bánh mì của quần chúng nhân dân.',
          dialecticalLesson:
            'Giai cấp vô sản không thể chia sẻ quyền lực với giai cấp bóc lột muốn duy trì trật tự áp bức cũ.',
        },
        {
          id: 1,
          label: 'B. Quyết đoán phát động khởi nghĩa vũ trang, lật đổ Chính phủ lâm thời, ban hành ngay Sắc lệnh về Hòa bình và Sắc lệnh về Ruộng đất',
          isCorrect: true,
          historicalAnalysis:
            'Đêm 24 rạng sáng 25/10/1917, tiếng súng tuần dương hạm Rạng Đông phát hỏa, Cung điện Mùa Đông bị đánh chiếm. Cách mạng Tháng Mười thắng lợi hoàn toàn, khai sinh Nhà nước Xô viết đầu tiên.',
          dialecticalLesson:
            'Chớp thời cơ cách mạng chín muồi, đáp ứng đúng lợi ích thiết thân của đại đa số nhân dân lao động (hòa bình và ruộng đất).',
        },
        {
          id: 2,
          label: 'C. Chờ đợi vô thời hạn cho đến khi các nước tư bản Tây Âu cùng nổi dậy khởi nghĩa',
          isCorrect: false,
          historicalAnalysis:
            'Ảo tưởng thụ động giáo điều: Lenin chỉ rõ khâu yếu nhất trong sợi dây chuyền đế quốc chủ nghĩa là nước Nga, nơi phong trào cách mạng có thể và cần phải đột phá trước.',
          dialecticalLesson:
            'Chủ nghĩa Mác - Lênin là kim chỉ nam hành động, không phải là mớ công thức xơ cứng.',
        },
      ],
    },
    {
      id: 3,
      epochNum: 3,
      year: '03/1921',
      location: 'Moskva, Nước Nga Xô Viết',
      keyFigures: ['V.I. Lenin', 'Đại hội X Đảng Bolshevik'],
      title: 'Khủng Hoảng Sau Nội Chiến: Chuyển Sang Chính Sách Kinh Tế Mới (NEP)',
      historicalBackground:
        'Sau 4 năm nội chiến chống 14 nước đế quốc can thiệp, nước Nga Xô Viết kiệt quệ hoàn toàn. Việc duy trì quá lâu chính sách "Cộng sản thời chiến" với chế độ cưỡng bức trưng thu toàn bộ lương thực thừa của nông dân đã thổi bùng làn sóng bất mãn: Nông dân Tambov nổi dậy, thủy thủ căn cứ quân sự Kronstadt biểu tình đòi tự do buôn bán lúa mì. Nạn đói đe dọa các thành phố lớn.',
      primaryDocument: {
        title: 'Báo cáo của Lenin tại Đại hội X Đảng Bolshevik (08/03/1921)',
        snippet:
          '"Chúng ta đã lầm lỡ: chúng ta đã tưởng rằng có thể bằng mệnh lệnh trực tiếp của nhà nước vô sản tiến thẳng lên sản xuất và phân phối theo nguyên tắc cộng sản chủ nghĩa... Cần phải xây dựng chủ nghĩa xã hội không phải trực tiếp bằng lòng nhiệt tình cách mạng, mà bằng sự quan tâm cá nhân, bằng lợi ích cá nhân, bằng hạch toán kinh tế."',
      },
      dilemmaQuestion:
        'Lenin đã đưa ra quyết sách lịch sử nào tại Đại hội X để cứu vãn chính quyền Xô viết và khơi thông nền kinh tế?',
      options: [
        {
          id: 0,
          label: 'A. Tăng cường trấn áp hành chính, siết chặt cấm chợ ngăn sông và xử bắn người buôn bán nhỏ',
          isCorrect: false,
          historicalAnalysis:
            'Nóng vội duy ý chí: Tiếp tục áp đặt mệnh lệnh khi sức sản xuất cạn kiệt chỉ đẩy đất nước vào cảnh sụp đổ kinh tế và mất lòng dân.',
          dialecticalLesson:
            'Không thể dùng quyền lực chính trị để xóa bỏ quy luật kinh tế khách quan.',
        },
        {
          id: 1,
          label: 'B. Ban hành Chính sách Kinh tế Mới (NEP): Bãi bỏ trưng thu, thay bằng thuế lương thực cố định, mở chợ tự do và phát triển kinh tế nhiều thành phần',
          isCorrect: true,
          historicalAnalysis:
            'Đột phá thiên tài của Lenin: Nông dân được tự do bán nông sản dư thừa sau khi nộp thuế; sản xuất nông nghiệp và tiểu thủ công nghiệp hồi sinh nhanh chóng chỉ sau 1 năm.',
          dialecticalLesson:
            'Thời kỳ quá độ đòi hỏi những bước đi quá độ gián tiếp, vận dụng quan hệ hàng hóa - tiền tệ dưới sự định hướng của Nhà nước Xô viết.',
        },
        {
          id: 2,
          label: 'C. Tư nhân hóa hoàn toàn toàn bộ đất đai và giao các hầm mỏ, đường sắt cho các tập đoàn phương Tây',
          isCorrect: false,
          historicalAnalysis:
            'Mất quyền tự chủ: Đầu hàng tư bản quốc tế sẽ làm biến chất Nhà nước công nông non trẻ.',
          dialecticalLesson:
            'Sử dụng kinh tế thị trường làm phương tiện nhưng Nhà nước vô sản phải nắm chắc các huyết mạch kinh tế cốt tử.',
        },
      ],
    },
    {
      id: 4,
      epochNum: 4,
      year: '1946 - 1950',
      location: 'Hà Nội & Chiến khu Việt Bắc, Việt Nam',
      keyFigures: ['Chủ tịch Hồ Chí Minh', 'Quốc hội khóa I', 'Đại tá Trần Dụ Châu'],
      title: 'Bản Hiến Pháp 1946 Đầu Tiên & Bản Án Liêm Chính Bảo Vệ Lòng Dân',
      historicalBackground:
        'Năm 1946, nước Việt Nam Dân chủ Cộng hòa vừa lập phải đối mặt với muôn trùng hiểm nguy. Quốc hội khóa I đã ban hành bản Hiến pháp đầu tiên khẳng định chủ quyền nhân dân. Đến năm 1950, giữa lúc chiến sĩ ngoài mặt trận thiếu từng manh áo, bát cơm, Cục trưởng Cục Quân nhu Trần Dụ Châu lại sa vào hưởng lạc xa hoa, bớt xén công quỹ quân nhu. Tòa án Quân sự Tối cao đã tuyên án tử hình Trần Dụ Châu. Đơn xin ân xá được gửi lên Bác Hồ.',
      primaryDocument: {
        title: 'Lời Bác Hồ trong vụ án Trần Dụ Châu (1950) & Hiến pháp 1946',
        snippet:
          '"Điều 1 Hiến pháp 1946: Nước Việt Nam là một nước dân chủ cộng hòa. Tất cả quyền bính trong nước là của toàn thể nhân dân Việt Nam..."\nBác Hồ nói với đồng chí Trần Đăng Ninh: "Một cái cưa mục thì phải vứt bỏ. Với một con sâu mọt đục khoét nhân dân, ta phải cắt bỏ một ung nhọt để cứu chữa toàn bộ cơ thể."',
      },
      dilemmaQuestion:
        'Bài học sâu sắc nhất về bản chất của Nhà nước pháp quyền xã hội chủ nghĩa được thể hiện qua sự kiện này là gì?',
      options: [
        {
          id: 0,
          label: 'A. Bao che cho cán bộ cấp cao có công trạng vì thời kỳ kháng chiến đang thiếu người chỉ huy',
          isCorrect: false,
          historicalAnalysis:
            'Dung túng tham nhũng sẽ phá hủy niềm tin thiêng liêng của hàng triệu đồng bào và chiến sĩ vào tính chính danh của chính quyền cách mạng.',
          dialecticalLesson:
            'Chủ nghĩa cá nhân, quan liêu, tham nhũng là kẻ thù nguy hiểm nhất từ bên trong phá hoại chế độ.',
        },
        {
          id: 1,
          label: 'B. Pháp luật thượng tôn không có vùng cấm: Quyền lực nhà nước xuất phát từ nhân dân và phải phục vụ nhân dân một cách liêm chính',
          isCorrect: true,
          historicalAnalysis:
            'Bác Hồ kiên quyết bác đơn xin tha tội chết. Vụ án củng cố kỷ cương sắt của quân đội và lòng tin tuyệt đối của nhân dân vào chính phủ cách mạng.',
          dialecticalLesson:
            'Nhà nước pháp quyền XHCN lấy dân làm gốc; sự nghiêm minh của pháp luật là để bảo vệ quyền con người và thành quả cách mạng.',
        },
        {
          id: 2,
          label: 'C. Tuyên bố xóa bỏ hoàn toàn hệ thống tòa án và xét xử theo cảm tính đám đông',
          isCorrect: false,
          historicalAnalysis:
            'Vô chính phủ sẽ dẫn tới oan sai, hỗn loạn và làm suy yếu thể chế pháp quyền cách mạng.',
          dialecticalLesson:
            'Mọi phán quyết phải dựa trên Hiến pháp, pháp luật minh bạch và chứng cứ khách quan.',
        },
      ],
    },
    {
      id: 5,
      epochNum: 5,
      year: '1941 - 1955',
      location: 'Pác Bó (Cao Bằng) & Hà Nội',
      keyFigures: ['Chủ tịch Hồ Chí Minh', 'Linh mục Phạm Bá Trực', 'Đồng bào 54 Dân tộc'],
      title: 'Mặt Trận Đại Đoàn Kết Pác Bó & Sắc Lệnh 234/SL Về Tự Do Tín Ngưỡng',
      historicalBackground:
        'Tháng 5/1941, tại Lán Khuổi Nặm, Bác Hồ thành lập Mặt trận Việt Minh, đoàn kết mọi tầng lớp không phân biệt tôn giáo, giàu nghèo. Năm 1954 - 1955, sau Hiệp định Genève, thực dân Pháp và các thế lực phản động ráo riết tiến hành chiến tranh tâm lý, tung tin thất thiệt "Chúa đã vào Nam", kích động cưỡng ép hàng vạn đồng bào Công giáo miền Bắc rời bỏ quê hương nhà thờ. Trước tình hình căng thẳng, ngày 14/6/1955, Bác Hồ ký Sắc lệnh số 234/SL.',
      primaryDocument: {
        title: 'Sắc lệnh số 234/SL (14/06/1955) do Chủ tịch Hồ Chí Minh ban hành',
        snippet:
          '"Điều 1: Chính phủ bảo đảm quyền tự do tín ngưỡng và quyền tự do thờ phụng của nhân dân. Không ai được xâm phạm quyền tự do ấy. Mọi người Việt Nam đều có quyền theo một tôn giáo hoặc không theo tôn giáo nào... Nhà thờ, chùa chiền, miếu đường và tài sản của các tôn giáo được pháp luật bảo hộ."',
      },
      dilemmaQuestion:
        'Sắc lệnh 234/SL đã giải quyết bài toán đoàn kết tôn giáo trong cách mạng Việt Nam như thế nào?',
      options: [
        {
          id: 0,
          label: 'A. Dùng biện pháp hành chính cưỡng bức đóng cửa các nhà thờ, chùa chiền vì coi tôn giáo là tàn dư cũ',
          isCorrect: false,
          historicalAnalysis:
            'Cấm đoán cực đoan sẽ đẩy đồng bào có đạo vào vòng tay của các thế lực thù địch, làm rạn nứt khối đại đoàn kết toàn dân tộc.',
          dialecticalLesson:
            'Tôn giáo là nhu cầu tinh thần chính đáng; phải tôn trọng và phân biệt giữa niềm tin chân chính với âm mưu lợi dụng tôn giáo.',
        },
        {
          id: 1,
          label: 'B. Bảo đảm quyền tự do tín ngưỡng bằng luật pháp, bảo hộ nơi thờ tự, vận động đồng bào sống "tốt đời đẹp đạo", "Kính Chúa yêu Nước"',
          isCorrect: true,
          historicalAnalysis:
            'Sắc lệnh 234/SL đã đập tan âm mưu chia rẽ tôn giáo; giữ chân hàng chục vạn đồng bào có đạo ở lại miền Bắc cùng chung tay kiến thiết đất nước.',
          dialecticalLesson:
            'Đại đoàn kết toàn dân tộc là chiến lược nhất quán: Lấy điểm tương đồng vì độc lập, ấm no của Tổ quốc làm mẫu số chung gắn kết muôn người.',
        },
        {
          id: 2,
          label: 'C. Phân biệt đối xử giữa người theo tôn giáo và người không theo tôn giáo trong tuyển dụng và công tác',
          isCorrect: false,
          historicalAnalysis:
            'Kỳ thị niềm tin sẽ gây chia rẽ sâu sắc trong lòng xã hội, đi ngược lại tôn chỉ bình đẳng của CNXH.',
          dialecticalLesson:
            'Mọi công dân đều bình đẳng trước pháp luật không phân biệt nòi giống, niềm tin hay tín ngưỡng.',
        },
      ],
    },
    {
      id: 6,
      epochNum: 6,
      year: '1959 - 1968',
      location: 'Hà Nội & Tỉnh Vĩnh Phú (nay là Vĩnh Phúc - Phú Thọ)',
      keyFigures: ['Chủ tịch Hồ Chí Minh', 'Bí thư Tỉnh ủy Kim Ngọc'],
      title: 'Luật Hôn Nhân 1959 & Đột Phá Lịch Sử Của "Khoán Hộ" Kim Ngọc (1968)',
      historicalBackground:
        'Năm 1959, Quốc hội khóa I thông qua bản Luật Hôn nhân và Gia đình đầu tiên xóa bỏ tập tục đa thê, bảo đảm bình đẳng vợ chồng. Đến năm 1966-1968, tại Vĩnh Phú, mô hình hợp tác xã nông nghiệp tập trung theo lối "đánh trống ghi tên" khiến nông dân đi làm cầm chừng, lúa thiếu phân, năng suất thấp kém. Bí thư Tỉnh ủy Kim Ngọc đã dũng cảm ban hành Nghị quyết 68-NQ/TU giao khoán lúa cho từng hộ gia đình. Nông dân Vĩnh Phú lập tức chăm bón cần cù, sản lượng lúa tăng vọt, người dân đủ ăn.',
      primaryDocument: {
        title: 'Lời Bác Hồ về Luật Hôn nhân 1959 & Bút tích Bí thư Kim Ngọc (1968)',
        snippet:
          '"Không giải phóng phụ nữ thì không giải phóng một nửa loài người. Nếu không giải phóng phụ nữ thì không xây dựng được chủ nghĩa xã hội." — Hồ Chí Minh (1959)\n"Phải để người nông dân làm chủ thửa ruộng của mình, gắn mồ hôi của họ với hạt thóc họ làm ra thì họ mới tận tụy với ruộng đồng." — Bí thư Kim Ngọc',
      },
      dilemmaQuestion:
        'Bài học thực tiễn kinh điển rút ra từ hai sự kiện lịch sử có thật này là gì?',
      options: [
        {
          id: 0,
          label: 'A. Tiếp tục duy trì chế độ đa thê phong kiến và cơ chế hợp tác xã tập trung cào bằng',
          isCorrect: false,
          historicalAnalysis:
            'Bảo thủ kìm hãm: Cào bằng không phải là CNXH; duy trì gia trưởng là tước đoạt quyền sống hạnh phúc của người phụ nữ.',
          dialecticalLesson:
            'Tiến bộ xã hội được đo bằng mức độ tự do và bình đẳng của người phụ nữ cũng như người lao động.',
        },
        {
          id: 1,
          label: 'B. Tôn trọng quy luật khách quan: Giải phóng phụ nữ bằng luật pháp bình đẳng, gắn lợi ích của người lao động trực tiếp với sản phẩm làm ra',
          isCorrect: true,
          historicalAnalysis:
            'Dù ban đầu bị phê phán vì "đi chệch mô hình tập trung", mô hình "Khoán hộ" của Kim Ngọc chính là tiền đề thực tiễn khai sinh Chỉ thị 100 (1981) và Nghị quyết Khoán 10 (1988) đưa Việt Nam trở thành cường quốc xuất khẩu gạo.',
          dialecticalLesson:
            'Chân lý là cụ thể: Quy luật của đời sống sản xuất và hạnh phúc gia đình luôn mạnh hơn mọi giáo điều chủ quan duy ý chí.',
        },
        {
          id: 2,
          label: 'C. Xóa bỏ hoàn toàn đơn vị gia đình, đưa con cái vào trại tập trung nhà nước nuôi từ bé',
          isCorrect: false,
          historicalAnalysis:
            'Tư tưởng cơ giới quái đản: Gia đình là tế bào tự nhiên thiêng liêng của xã hội, chiếc nôi đầu đời của nhân phẩm con người.',
          dialecticalLesson:
            'Gia đình hạnh phúc tiến bộ là nền tảng vững bền nhất của một xã hội nhân văn.',
        },
      ],
    },
    {
      id: 7,
      epochNum: 7,
      year: '1986 - 2084',
      location: 'Hà Nội & Đô thị Tương lai 2084',
      keyFigures: ['Nguyễn Văn Linh', 'Trường Chinh', 'Võ Văn Kiệt', 'Hệ thống AI GAIA'],
      title: 'Đổi Mới 1986 "Nhìn Thẳng Vào Sự Thật" & Tầm Nhìn Kỷ Nguyên Số 2084',
      historicalBackground:
        'Tại Đại hội VI (12/1986), giữa cơn bão lạm phát 774%, Đảng ta đã thể hiện bản lĩnh khoa học khi tuyên bố: "Nhìn thẳng vào sự thật, nói rõ sự thật", xóa bỏ bao cấp tem phiếu, phát triển kinh tế thị trường nhiều thành phần định hướng XHCN. Đến kỷ nguyên 2084, trí tuệ nhân tạo (AI GAIA) và tự động hóa phát triển tột bậc. Bài toán nhân loại đặt ra: Biến công nghệ thành công cụ sa thải làm giàu cho các tài phiệt hay biến công nghệ thành hạ tầng công cộng giải phóng sức lao động con người?',
      primaryDocument: {
        title: 'Văn kiện Đại hội VI (1986) & Cương lĩnh phát triển đất nước (2011)',
        snippet:
          '"Lực lượng sản xuất bị kìm hãm không chỉ khi quan hệ sản xuất lạc hậu, mà cả khi quan hệ sản xuất đi quá xa so với trình độ phát triển của lực lượng sản xuất..." — Đại hội VI (1986)\n"Mục tiêu là sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người; xây dựng xã hội Dân giàu, nước mạnh, dân chủ, công bằng, văn minh." — Cương lĩnh 2011',
      },
      dilemmaQuestion:
        'Định hướng quản trị công nghệ và kiến thiết xã hội đúng đắn của Utopia 2084 là gì?',
      options: [
        {
          id: 0,
          label: 'A. Tư nhân hóa độc quyền toàn bộ thuật toán AI để các tập đoàn sa thải hàng triệu công nhân và tối đa hóa lợi nhuận',
          isCorrect: false,
          historicalAnalysis:
            'Chủ nghĩa tư bản công nghệ cực đoan: Đẩy nhân loại vào cảnh tha hóa và phân hóa giàu nghèo sâu sắc.',
          dialecticalLesson:
            'Công nghệ không thể trở thành công cụ áp bức bóc lột mới của thiểu số tài phiệt.',
        },
        {
          id: 1,
          label: 'B. Sở hữu xã hội hóa hạ tầng trí tuệ nhân tạo, chuyển hóa thặng dư tự động hóa thành phúc lợi y tế, giáo dục trọn đời và rút ngắn thời gian lao động',
          isCorrect: true,
          historicalAnalysis:
            'Hiện thực hóa lý tưởng cộng sản chủ nghĩa khoa học: Máy móc làm việc nặng nhọc, con người được giải phóng để phát triển khoa học, văn hóa, nghệ thuật và sống hạnh phúc.',
          dialecticalLesson:
            'Đích đến tối thượng của CNXH là sự phát triển tự do và toàn diện của mỗi cá nhân trong một cộng đồng hài hòa, phồn vinh.',
        },
        {
          id: 2,
          label: 'C. Cấm tiệt mọi nghiên cứu trí tuệ nhân tạo và quay về lao động chân tay thuần túy',
          isCorrect: false,
          historicalAnalysis:
            'Chủ nghĩa bi quan kìm hãm sức sản xuất của thời đại.',
          dialecticalLesson:
            'Lực lượng sản xuất tiên tiến luôn là động lực thúc đẩy văn minh nhân loại tiến lên.',
        },
      ],
    },
  ];

  if (!isOpen) return null;

  const current = scenarios[currentScenarioIdx];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setEvaluation(null);
    playConnectTone();
  };

  const handleTestDecision = () => {
    if (selectedOption === null) return;
    const opt = current.options[selectedOption];

    if (opt.isCorrect) {
      playSuccessChime();
    } else {
      playWarningBeep();
    }

    setEvaluation({
      tested: true,
      isCorrect: opt.isCorrect,
      analysis: opt.historicalAnalysis,
      lesson: opt.dialecticalLesson,
    });
  };

  const handleNextScenario = () => {
    setSelectedOption(null);
    setEvaluation(null);
    if (currentScenarioIdx < scenarios.length - 1) {
      setCurrentScenarioIdx(currentScenarioIdx + 1);
    } else {
      setCurrentScenarioIdx(0);
    }
    playTick();
  };

  const handleSelectSpecific = (idx: number) => {
    setSelectedOption(null);
    setEvaluation(null);
    setCurrentScenarioIdx(idx);
    playTick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#0d121b] border border-amber-900/60 p-5 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-amber-200 font-serif-title">
                Viện Khảo Cứu Tình Huống Thực Tế & Sự Kiện Lịch Sử
              </h2>
              <p className="text-[11px] sm:text-xs text-stone-400">
                Khám phá {scenarios.length} hồ sơ sự kiện có thật từ 1848 đến 2084
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded flex items-center justify-center cursor-pointer border border-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Scenario Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-b border-stone-800/80 text-[11px]">
          {scenarios.map((sc, idx) => {
            const isCur = currentScenarioIdx === idx;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => handleSelectSpecific(idx)}
                className={`px-2.5 py-1 rounded text-center whitespace-nowrap cursor-pointer transition-colors border ${
                  isCur
                    ? 'bg-amber-400 text-stone-950 font-bold border-amber-400'
                    : 'bg-stone-900/70 text-stone-400 hover:text-stone-200 border-stone-800 hover:border-stone-700'
                }`}
              >
                Kỳ {sc.epochNum}: {sc.year}
              </button>
            );
          })}
        </div>

        {/* Scenario Body */}
        <div className="overflow-y-auto space-y-4 my-3 pr-1 flex-1 text-xs">
          {/* Historical Fact Header Box */}
          <div className="p-4 bg-stone-900/70 border border-stone-800 rounded space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 font-mono text-[11px] font-bold text-amber-300">
                Năm {current.year}
              </span>
              <div className="flex items-center gap-3 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{current.location}</span>
                </span>
                <span className="text-stone-600">·</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>{current.keyFigures.join(', ')}</span>
                </span>
              </div>
            </div>

            <h3 className="font-serif-title font-bold text-sm sm:text-base text-stone-100">
              {current.title}
            </h3>

            {/* Real Incident Context */}
            <div className="text-stone-300 leading-relaxed text-xs">
              <div className="font-semibold text-stone-200 mb-1 text-[11px] uppercase tracking-wide flex items-center gap-1 text-amber-400/90">
                <Calendar className="w-3 h-3" />
                <span>Diễn biến sự kiện có thật trong lịch sử:</span>
              </div>
              <p className="bg-stone-950/50 p-2.5 rounded border border-stone-800/80">
                {current.historicalBackground}
              </p>
            </div>

            {/* Primary Document Quote */}
            <div className="bg-amber-950/20 border-l-2 border-amber-500/80 p-3 rounded-r text-stone-200">
              <div className="text-[11px] font-mono text-amber-300/90 font-semibold mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Trích lục tư liệu gốc: {current.primaryDocument.title}</span>
              </div>
              <blockquote className="italic text-[11px] text-amber-100/90 leading-relaxed font-serif">
                {current.primaryDocument.snippet}
              </blockquote>
            </div>

            {/* Dilemma Question */}
            <div className="text-amber-300 font-medium pt-2 border-t border-stone-800/80 flex items-start gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{current.dilemmaQuestion}</span>
            </div>
          </div>

          {/* Options (Completely neutral styles, zero pre-highlighting) */}
          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold px-0.5">
              Chọn phương án giải quyết dựa trên quy luật thực tiễn:
            </div>
            {current.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 text-left border rounded transition-colors cursor-pointer text-xs ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 text-stone-100 ring-1 ring-amber-400/50'
                      : 'border-stone-800 bg-stone-900/50 text-stone-300 hover:border-stone-700 hover:bg-stone-850'
                  }`}
                >
                  <div className="leading-relaxed">{opt.label}</div>
                </button>
              );
            })}
          </div>

          {/* Evaluation output */}
          {evaluation && evaluation.tested && (
            <div
              className={`p-3.5 border rounded text-xs transition-all leading-relaxed ${
                evaluation.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-700/60 text-rose-200'
              }`}
            >
              <div className="font-bold flex items-center gap-2 text-sm mb-1">
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>
                  {evaluation.isCorrect
                    ? 'QUYẾT SÁCH CHUẨN XÁC VỚI THỰC TIỄN LỊCH SỬ!'
                    : 'CẢNH BÁO: CHỆCH HƯỚNG QUY LUẬT KHÁCH QUAN!'}
                </span>
              </div>
              <p className="opacity-95">{evaluation.analysis}</p>
              <div className="mt-2 pt-2 border-t border-white/10 text-[11px] opacity-90">
                <strong>Đúc kết bài học biện chứng: </strong> {evaluation.lesson}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 cursor-pointer"
          >
            Đóng
          </button>

          <div className="flex items-center gap-2">
            {!evaluation?.tested ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleTestDecision}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-bold rounded cursor-pointer transition-colors"
              >
                Thẩm Định Quyết Sách
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextScenario}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <span>Hồ Sơ Tiếp Theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
