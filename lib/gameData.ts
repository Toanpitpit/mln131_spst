export interface GlossaryItem {
  id: string;
  term: string;
  category: 'Triết học & Quy luật' | 'Giai cấp & Cách mạng' | 'Kinh tế & Quá độ' | 'Nhà nước & Xã hội';
  definition: string;
  significance: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  epochIndex: number;
}

export interface HistoricalEvent {
  id: string;
  year: string;
  title: string;
  location: string;
  keyFigures: string[];
  historicalFact: string; // Sự kiện và tình tiết có thật trong lịch sử
  primarySourceSnippet: string; // Trích dẫn nguyên văn văn kiện, nghị quyết hoặc tư liệu gốc
  significance: string; // Ý nghĩa đối với lý luận và thực tiễn cách mạng
}

export interface EpochData {
  id: number;
  year: string;
  era: string;
  title: string;
  subtitle: string;
  themeColor: string;
  accentBorder: string;
  bgGradient: string;
  badgeBg: string;
  vietnamContext: string;
  quote: {
    text: string;
    author: string;
  };
  context: string;
  taskTitle: string;
  taskInstruction: string;
  keyLesson: {
    title: string;
    coreIdea: string;
    elaboration: string;
  };
  rewardStats: {
    theory: number;
    protect: number;
    build: number;
  };
  historicalEvents: HistoricalEvent[];
}

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    id: 'su-menh-lich-su',
    term: 'Sứ mệnh Lịch sử của Giai cấp Công nhân',
    category: 'Giai cấp & Cách mạng',
    definition: 'Nhiệm vụ khách quan xóa bỏ chế độ tư bản bóc lột, giải phóng giai cấp vô sản và toàn thể nhân loại, xây dựng thành công xã hội cộng sản chủ nghĩa văn minh.',
    significance: 'Đại diện cho phương thức sản xuất tiên tiến nhất của nền đại công nghiệp, gắn với tinh thần quốc tế vô sản và kỷ luật tổ chức cao.'
  },
  {
    id: 'thoi-ky-qua-do',
    term: 'Thời kỳ Quá độ lên Chủ nghĩa Xã hội',
    category: 'Kinh tế & Quá độ',
    definition: 'Giai đoạn cải biến cách mạng sâu sắc, toàn diện và lâu dài trên mọi lĩnh vực từ xã hội cũ sang xã hội mới, đan xen giữa tàn dư tư bản và mầm mống xã hội chủ nghĩa.',
    significance: 'Đòi hỏi bước đi quá độ gián tiếp, chấp nhận nền kinh tế nhiều thành phần dưới sự điều tiết của Nhà nước định hướng XHCN.'
  },
  {
    id: 'luc-luong-san-xuat',
    term: 'Quy luật Lực lượng Sản xuất & Quan hệ Sản xuất',
    category: 'Triết học & Quy luật',
    definition: 'Quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất. Khi lực lượng sản xuất phát triển vượt bậc, quan hệ sản xuất cũ trở thành xiềng xích đòi hỏi phải được thay thế.',
    significance: 'Động lực căn bản thúc đẩy sự tiến hóa và thay thế các hình thái kinh tế - xã hội trong lịch sử.'
  },
  {
    id: 'dan-chu-xhcn',
    term: 'Nền Dân chủ Xã hội Chủ nghĩa',
    category: 'Nhà nước & Xã hội',
    definition: 'Bản chất dân chủ rộng rãi nhất trong lịch sử, nơi toàn bộ quyền lực nhà nước thuộc về nhân dân, bảo đảm công bằng, bình đẳng thực chất và cơ hội phát triển toàn diện.',
    significance: 'Vận hành theo phương châm: Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng.'
  },
  {
    id: 'nha-nuoc-phap-quyen',
    term: 'Nhà nước Pháp quyền XHCN',
    category: 'Nhà nước & Xã hội',
    definition: 'Nhà nước của nhân dân, do nhân dân, vì nhân dân; đặt Hiến pháp và pháp luật ở vị trí tối thượng để quản lý xã hội, bảo vệ quyền con người và quyền công dân.',
    significance: 'Công cụ sắc bén để tổ chức kiến thiết kinh tế - văn hóa và bảo vệ thành quả cách mạng.'
  },
  {
    id: 'gia-tri-thang-du',
    term: 'Học thuyết Giá trị Thặng dư',
    category: 'Kinh tế & Quá độ',
    definition: 'Phần giá trị do lao động thặng dư của người công nhân tạo ra vượt quá giá trị sức lao động của họ, bị nhà tư bản chiếm đoạt không công.',
    significance: 'Hòn đá tảng trong kinh tế chính trị Marx, vạch trần bản chất bóc lột tinh vi của phương thức sản xuất tư bản chủ nghĩa.'
  },
  {
    id: 'dai-doan-ket',
    term: 'Khối Đại đoàn kết & Liên minh Giai cấp',
    category: 'Giai cấp & Cách mạng',
    definition: 'Sự liên minh chặt chẽ giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức, kết hợp sức mạnh của khối đại đoàn kết toàn dân tộc.',
    significance: 'Nền tảng chính trị - xã hội vững chắc quyết định mọi thắng lợi của công cuộc xây dựng và bảo vệ đất nước.'
  },
  {
    id: 'tu-do-tin-nguong',
    term: 'Chính sách Dân tộc & Tôn giáo XHCN',
    category: 'Nhà nước & Xã hội',
    definition: 'Nguyên tắc bình đẳng, đoàn kết, tôn trọng lẫn nhau giữa các dân tộc; bảo đảm quyền tự do tín ngưỡng, tôn giáo và không tín ngưỡng, tôn giáo của mọi công dân.',
    significance: 'Tôn giáo là nhu cầu tinh thần chính đáng; kiên quyết loại bỏ định kiến, mê tín dị đoan và âm mưu chia rẽ khối đoàn kết.'
  },
  {
    id: 'gia-dinh-tien-bo',
    term: 'Xây dựng Gia đình Văn hóa Mới',
    category: 'Nhà nước & Xã hội',
    definition: 'Gia đình là tế bào tự nhiên của xã hội. Gia đình mới XHCN xây dựng trên nền tảng hôn nhân tự nguyện, tiến bộ, một vợ một chồng, vợ chồng bình đẳng và yêu thương tôn trọng.',
    significance: 'Nơi hình thành và nuôi dưỡng nhân cách cao đẹp của con người mới, gắn kết hữu cơ với cộng đồng xã hội.'
  },
  {
    id: 'utopia-khoa-hoc',
    term: 'Mục tiêu Xã hội XHCN - 2084',
    category: 'Triết học & Quy luật',
    definition: 'Dân giàu, nước mạnh, dân chủ, công bằng, văn minh. Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.',
    significance: 'Xóa bỏ mọi tha hóa, hài hòa giữa tự nhiên, công nghệ và con người, đưa nhân loại bước sang vương quốc của tự do thực sự.'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Khơi Nguồn Biện Chứng',
    description: 'Điều chỉnh ăn khớp cỗ máy lực lượng sản xuất và quy luật lịch sử năm 1848.',
    iconName: 'Cog',
    epochIndex: 0
  },
  {
    id: 'ach-2',
    title: 'Ngọn Đuốc Tiên Phong',
    description: 'Kết nối mạng lưới công nhân đại công nghiệp và giải phóng khỏi ảo tưởng tư sản.',
    iconName: 'Flame',
    epochIndex: 1
  },
  {
    id: 'ach-3',
    title: 'Kiến Trúc Sư Quá Độ',
    description: 'Thiết lập điểm cân bằng vĩ mô giữa kinh tế chủ đạo và kinh tế thị trường năng động.',
    iconName: 'Sliders',
    epochIndex: 2
  },
  {
    id: 'ach-4',
    title: 'Trụ Cột Quyền Lực Dân',
    description: 'Xây dựng 4 cột trụ pháp quyền: Dân biết, Dân bàn, Dân làm, Dân giám sát & Thụ hưởng.',
    iconName: 'Landmark',
    epochIndex: 3
  },
  {
    id: 'ach-5',
    title: 'Đại Hợp Xướng Hòa Hợp',
    description: 'Đồng điệu tần số 54 dân tộc anh em và bảo vệ quyền tự do tín ngưỡng tôn giáo.',
    iconName: 'Globe',
    epochIndex: 4
  },
  {
    id: 'ach-6',
    title: 'Hạt Mầm Hạnh Phúc',
    description: 'Vun đắp tế bào gia đình văn minh bình đẳng, kết nối tình thương với cộng đồng.',
    iconName: 'HeartHandshake',
    epochIndex: 5
  },
  {
    id: 'ach-7',
    title: 'Đại Viện Sĩ Utopia 2084',
    description: 'Hoàn thành tiến trình lịch sử và kích hoạt toàn vẹn đại đô thị tương lai 2084.',
    iconName: 'Award',
    epochIndex: 6
  }
];

export const EPOCHS: EpochData[] = [
  {
    id: 1,
    year: '1848',
    era: 'Kỷ Nguyên Khởi Thức',
    title: 'Cơn Thức Tỉnh & Cỗ Máy Lịch Sử',
    subtitle: 'Từ không tưởng mơ mộng đến quy luật duy vật biện chứng',
    themeColor: '#f59e0b',
    accentBorder: 'border-amber-500/60',
    bgGradient: 'from-amber-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Quy luật quan hệ sản xuất phải phù hợp với trình độ phát triển của lực lượng sản xuất là cơ sở khoa học để Đảng ta xướng xuất đường lối Đổi Mới năm 1986, giải phóng năng lực sản xuất của toàn xã hội.',
    quote: {
      text: 'Các nhà triết học từ trước đến nay chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới.',
      author: 'Karl Marx (Luận cương về Feuerbach, 1845)'
    },
    context: 'Thế kỷ XIX, khói bụi nhà máy bủa vây châu Âu. Phong trào công nhân nổi dậy khắp nơi nhưng rơi vào khủng hoảng bế tắc. Chủ nghĩa xã hội Không tưởng đầy lòng trắc ẩn tha thiết nhưng bất lực vì đi xin xỏ lòng thương hại của giới chủ.',
    taskTitle: 'Điều Khiển Cỗ Máy Biện Chứng Lịch Sử',
    taskInstruction: 'Tương tác điều chỉnh 2 thông số: [Lực Lượng Sản Xuất] và [Quan Hệ Sản Xuất], đánh giá 3 khuynh hướng tư tưởng có thật trong lịch sử thế kỷ XIX.',
    keyLesson: {
      title: 'Bước nhảy từ Không tưởng sang Khoa học',
      coreIdea: 'Lịch sử không vận động nhờ sự bố thí đạo đức, mà vận động theo quy luật kinh tế khách quan.',
      elaboration: 'Khi lực lượng sản xuất đại công nghiệp xã hội hóa cao mâu thuẫn gay gắt với chế độ chiếm hữu tư nhân tư bản chủ nghĩa, cuộc cách mạng xã hội là tất yếu khách quan. Chủ nghĩa xã hội khoa học đã khám phá ra quy luật này.'
    },
    rewardStats: {
      theory: 35,
      protect: 15,
      build: 20
    },
    historicalEvents: [
      {
        id: 'ev-1848-manifesto',
        year: '21/02/1848',
        title: 'Xuất bản tác phẩm "Tuyên ngôn của Đảng Cộng sản"',
        location: 'London, Vương quốc Anh',
        keyFigures: ['Karl Marx', 'Friedrich Engels'],
        historicalFact: 'Được Đại hội II của Liên đoàn những người Cộng sản ủy thác, Marx và Engels đã viết và in bản tuyên ngôn 23 trang bằng tiếng Đức tại nhà in Bishopsgate Street, London. Tác phẩm chính thức đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học.',
        primarySourceSnippet: '"Lịch sử tất cả các xã hội cho đến ngày nay chỉ là lịch sử đấu tranh giai cấp... Sự sụp đổ của giai cấp tư sản và thắng lợi của giai cấp vô sản là tất yếu như nhau."',
        significance: 'Văn kiện kết tinh thế giới quan duy vật biện chứng, vạch ra sứ mệnh lịch sử toàn thế giới của giai cấp công nhân.'
      },
      {
        id: 'ev-1848-spring',
        year: 'Tháng 2 & 6/1848',
        title: 'Cách mạng 1848: "Mùa xuân của các dân tộc"',
        location: 'Paris (Pháp), Berlin (Đức), Viên (Áo)',
        keyFigures: ['Công nhân Paris', 'Louis Blanc', 'Auguste Blanqui'],
        historicalFact: 'Ngày 22-24/2/1848, công nhân Paris dựng chiến lũy lật đổ nền quân chủ Tháng Bảy của Louis-Philippe. Đến tháng 6/1848, công nhân Paris tiếp tục khởi nghĩa vũ trang khi chính phủ tư sản đóng cửa các Công xưởng quốc gia. Cuộc khởi nghĩa bị đàn áp dã man nhưng vạch trần ranh giới giai cấp đối kháng.',
        primarySourceSnippet: '"Đây là trận quyết chiến lớn đầu tiên giữa hai giai cấp phân chia xã hội hiện đại." — Karl Marx (Đấu tranh giai cấp ở Pháp)',
        significance: 'Chứng minh bằng máu rằng giai cấp tư sản và vô sản không thể điều hòa lợi ích kinh tế trong trật tự tư bản cũ.'
      },
      {
        id: 'ev-1825-owen',
        year: '1825 - 1828',
        title: 'Thực nghiệm cộng đồng không tưởng New Harmony',
        location: 'Bang Indiana, Hợp chúng quốc Hoa Kỳ',
        keyFigures: ['Robert Owen'],
        historicalFact: 'Nhà công nghiệp nhân đạo người Anh Robert Owen bỏ ra 80% gia sản mua lại 20.000 mẫu đất tại Indiana để xây dựng mô hình cộng đồng xã hội chủ nghĩa không tưởng "New Harmony" gồm 1.000 người, không có tiền tệ, chia đều lao động. Tuy nhiên, sau 3 năm, mô hình sụp đổ hoàn toàn vì nội bộ mâu thuẫn và bị môi trường thị trường tư bản xung quanh bóp nghẹt.',
        primarySourceSnippet: '"Mọi nỗ lực xây dựng ốc đảo cộng sản chủ nghĩa biệt lập bên trong lòng biển cả tư bản chủ nghĩa mà không giành lấy chính quyền đều là ảo tưởng." — F. Engels (Sự phát triển của CNXH từ không tưởng đến khoa học)',
        significance: 'Bài học thực tiễn: Lòng bác ái cá nhân không thể thay thế việc xóa bỏ cơ sở kinh tế chiếm hữu tư nhân tư bản.'
      },
      {
        id: 'ev-1838-chartism',
        year: '1838 - 1848',
        title: 'Phong trào Hiến chương (Chartism) của công nhân Anh',
        location: 'Birmingham, Manchester, London (Anh)',
        keyFigures: ['William Lovett', 'Feargus O\'Connor'],
        historicalFact: 'Năm 1838, Hiến chương Nhân dân (People\'s Charter) được công bố với 6 yêu sách chính trị, trong đó có quyền phổ thông đầu phiếu cho nam giới và bầu cử bí mật. Phong trào tổ chức các cuộc đại bãi công (Plug Plot 1842) và đệ trình bản thỉnh nguyện có tới 3,3 triệu chữ ký lên Nghị viện Anh năm 1842.',
        primarySourceSnippet: '"Phong trào công nhân có quy mô toàn quốc đầu tiên, mang tính chính trị rõ rệt và có tính chất quần chúng vô sản thực sự trên thế giới." — V.I. Lenin',
        significance: 'Chứng minh giai cấp công nhân đã bước lên vũ đài chính trị độc lập với tư cách một lực lượng giai cấp tự giác.'
      }
    ]
  },
  {
    id: 2,
    year: '1917',
    era: 'Sứ Mệnh Tiên Phong',
    title: 'Lực Lượng Dẫn Dắt Toàn Thế Giới',
    subtitle: 'Giai cấp công nhân đại công nghiệp & ngọn đuốc giác ngộ',
    themeColor: '#ef4444',
    accentBorder: 'border-red-500/60',
    bgGradient: 'from-red-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Giữ vững bản chất giai cấp công nhân của Đảng Cộng sản Việt Nam; phát huy khối liên minh vững chắc Công nhân - Nông dân - Trí thức dưới sự lãnh đạo của Đảng.',
    quote: {
      text: 'Không có lý luận cách mạng thì cũng không thể có phong trào cách mạng.',
      author: 'V.I. Lenin (Làm gì?, 1902)'
    },
    context: 'Năm 1917, giữa Chiến tranh thế giới thứ nhất đầy máu lửa, giai cấp công nhân Nga dưới sự lãnh đạo của Đảng Bolshevik đã biến lý luận khoa học thành hiện thực lịch sử vĩ đại: Đập tan cỗ máy nhà nước bóc lột, mở ra kỷ nguyên quá độ lên CNXH.',
    taskTitle: 'Thiết Lập Mạng Lưới Tiên Phong',
    taskInstruction: 'Kết nối 4 lực lượng trụ cột của phong trào công nhân cách mạng: Công nhân đại công nghiệp, nghiệp đoàn, lý luận báo chí và liên minh công - nông - trí thức.',
    keyLesson: {
      title: 'Bản chất Sứ mệnh Lịch sử Toàn thế giới',
      coreIdea: 'Giai cấp công nhân chỉ có thể tự giải phóng khi đồng thời giải phóng toàn thể xã hội khỏi áp bức bóc lột.',
      elaboration: 'Họ là đại diện cho lực lượng sản xuất tiên tiến nhất. Dưới sự lãnh đạo của Đảng Cộng sản tiên phong, khối liên minh công nông trí thức trở thành lực lượng quyết định thắng lợi cách mạng.'
    },
    rewardStats: {
      theory: 25,
      protect: 35,
      build: 20
    },
    historicalEvents: [
      {
        id: 'ev-1917-october',
        year: '07/11/1917 (25/10 lịch cũ)',
        title: 'Cách mạng Tháng Mười Nga bùng nổ thành công',
        location: 'Petrograd (nay là Saint Petersburg), Nga',
        keyFigures: ['V.I. Lenin', 'Leon Trotsky', 'Thủy thủ và Công nhân Đỏ'],
        historicalFact: 'Đêm 24 rạng sáng 25/10/1917, theo lệnh của Lenin tại Điện Smolny, các đội Cận vệ Đỏ công nhân và binh lính cách mạng chiếm các vị trí huyết mạch (bưu điện, nhà ga, cầu bắc qua sông Neva). Đúng 21h40 ngày 25/10, phát pháo hiệu từ tuần dương hạm Rạng Đông (Aurora) phát hỏa, lực lượng vũ trang tấn công Cung điện Mùa Đông, bắt giữ Chính phủ lâm thời Kerensky.',
        primarySourceSnippet: '"Chính phủ lâm thời đã bị lật đổ. Chính quyền nhà nước đã chuyển vào tay cơ quan của Xô viết đại biểu công nhân và binh lính Petrograd... Toàn bộ chính quyền về tay các Xô viết!" — Tuyên cáo gửi công dân nước Nga, 25/10/1917',
        significance: 'Lần đầu tiên trong lịch sử loài người, giai cấp công nhân và nhân dân lao động giành chính quyền, thiết lập Nhà nước chuyên chính vô sản.'
      },
      {
        id: 'ev-1917-april-theses',
        year: '17/04/1917 (04/04 lịch cũ)',
        title: 'Lenin công bố "Luận cương Tháng Tư"',
        location: 'Cung điện Tauride, Petrograd',
        keyFigures: ['V.I. Lenin'],
        historicalFact: 'Ngay sau khi trở về Nga trên chuyến tàu bọc thép kín qua Đức và Thụy Điển, Lenin đã đọc bản báo cáo nổi tiếng "Nhiệm vụ của giai cấp vô sản trong cuộc cách mạng hiện nay" trước hội nghị đại biểu Bolshevik. Ông kiên quyết chống lại việc ủng hộ Chính phủ lâm thời tư sản và chiến tranh đế quốc.',
        primarySourceSnippet: '"Đặc điểm của thời điểm hiện nay ở Nga là sự quá độ từ giai đoạn thứ nhất của cách mạng (giai đoạn giao chính quyền cho giai cấp tư sản) sang giai đoạn thứ hai của nó, giai đoạn phải trao chính quyền vào tay giai cấp vô sản và các tầng lớp nghèo khổ nhất trong nông dân." — V.I. Lenin',
        significance: 'Bản cương lĩnh chiến lược vạch rõ con đường chuyển từ cách mạng dân chủ tư sản sang cách mạng xã hội chủ nghĩa.'
      },
      {
        id: 'ev-1920-lhumanite',
        year: 'Tháng 7/1920',
        title: 'Nguyễn Ái Quốc đọc Luận cương của Lenin tại Paris',
        location: 'Biệt thự Compoint, Quận 17, Paris, Pháp',
        keyFigures: ['Nguyễn Ái Quốc (Hồ Chí Minh)'],
        historicalFact: 'Tại căn phòng trọ nhỏ ở ngõ Compoint, chàng thanh niên yêu nước Nguyễn Ái Quốc đọc bản "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của Lenin đăng trên báo L\'Humanité (Nhân đạo). Người đã khóc vì xúc động khi tìm thấy chân lý cứu nước.',
        primarySourceSnippet: '"Luận cương của Lênin làm cho tôi rất cảm động, phấn khởi, sáng tỏ, tin tưởng biết bao! Tôi vui mừng đến phát khóc lên. Ngồi một mình trong buồng mà tôi nói to lên như đang nói trước quần chúng đông đảo: Hỡi đồng bào bị đọa đày đau khổ! Đây là cái cần thiết cho chúng ta, đây là con đường giải phóng chúng ta!" — Hồ Chí Minh (Con đường dẫn tôi đến chủ nghĩa Lênin)',
        significance: 'Bước ngoặt lịch sử gắn kết cuộc đấu tranh giải phóng dân tộc của nhân dân Việt Nam với phong trào cách mạng vô sản thế giới.'
      }
    ]
  },
  {
    id: 3,
    year: '1921 - 1986',
    era: 'Thời Kỳ Quá Độ',
    title: 'Bàn Điều Phối Kinh Tế Quá Độ',
    subtitle: 'Nghệ thuật bước quá độ gián tiếp & Kinh tế nhiều thành phần',
    themeColor: '#10b981',
    accentBorder: 'border-emerald-500/60',
    bgGradient: 'from-emerald-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Đường lối Đổi Mới (Đại hội VI năm 1986) bãi bỏ cơ chế tập trung quan liêu bao cấp duy ý chí, phát triển nền kinh tế thị trường định hướng xã hội chủ nghĩa nhiều thành phần, khơi thông mọi nguồn lực đất nước.',
    quote: {
      text: 'Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản.',
      author: 'Chủ tịch Hồ Chí Minh (1960)'
    },
    context: 'Giành chính quyền đã khó, xây dựng xã hội mới còn gian truân gấp bội. Đất nước nghèo nàn vừa bước ra khỏi chiến tranh không thể lập tức có CNXH thuần nhất. Cần một thời kỳ quá độ bền bỉ với những bước đi khoa học xuất phát từ thực tiễn khách quan.',
    taskTitle: 'Cân Bằng Tam Giác Kinh Tế Vĩ Mô',
    taskInstruction: 'Khảo cứu các sự kiện lịch sử có thật (Chính sách NEP 1921, Khoán chui Kim Ngọc 1968, Đổi Mới 1986) và điều tiết 3 đòn bẩy: [Kinh tế Nhà nước], [Kinh tế Thị trường] và [Quỹ Phúc lợi].',
    keyLesson: {
      title: 'Tính Tất Yếu của Thời Kỳ Quá Độ',
      coreIdea: 'Không thể xóa bỏ quan hệ hàng hóa - tiền tệ bằng mệnh lệnh chủ quan nóng vội.',
      elaboration: 'Kinh tế thị trường định hướng XHCN cho phép phát huy mọi nguồn lực xã hội, công nghiệp hóa - hiện đại hóa, nhưng luôn đặt con người làm trung tâm, gắn tăng trưởng kinh tế với tiến bộ và công bằng xã hội.'
    },
    rewardStats: {
      theory: 20,
      protect: 20,
      build: 40
    },
    historicalEvents: [
      {
        id: 'ev-1921-nep',
        year: 'Tháng 3/1921',
        title: 'Lenin ban hành Chính sách Kinh tế Mới (NEP)',
        location: 'Moskva, Đại hội X Đảng Bolshevik',
        keyFigures: ['V.I. Lenin'],
        historicalFact: 'Sau cuộc nổi dậy của thủy thủ Kronstadt và nông dân Tambov do chính sách "Cộng sản thời chiến" trưng thu lương thực quá gắt gao, Lenin đã dũng cảm đề xuất NEP: bãi bỏ trưng thu lương thực thừa, thay bằng thuế lương thực cố định (thấp hơn nhiều), cho phép nông dân tự do bán nông sản thừa trên thị trường, cho phép thương nghiệp tư nhân nhỏ và tô nhượng cho tư bản nước ngoài.',
        primarySourceSnippet: '"Chúng ta đã lầm lỡ: chúng ta đã quyết định tiến thẳng lên sản xuất và phân phối theo nguyên tắc cộng sản chủ nghĩa... Cần phải xây dựng chủ nghĩa xã hội không phải trực tiếp bằng nhiệt tình cách mạng, mà bằng sự quan tâm cá nhân, bằng lợi ích cá nhân, bằng hạch toán kinh tế." — V.I. Lenin',
        significance: 'Đột phá lý luận vĩ đại của chủ nghĩa Mác: Khẳng định thời kỳ quá độ phải trải qua các bước quá độ gián tiếp, dùng kinh tế thị trường làm phương tiện xây dựng CNXH.'
      },
      {
        id: 'ev-1968-khoan-chui',
        year: '1966 - 1968',
        title: 'Sự kiện "Khoán hộ" (Khoán chui) của Bí thư Kim Ngọc',
        location: 'Tỉnh Vĩnh Phú (nay là Vĩnh Phúc & Phú Thọ), Việt Nam',
        keyFigures: ['Kim Ngọc (Bí thư Tỉnh ủy Vĩnh Phú)'],
        historicalFact: 'Nhận thấy nông dân vào hợp tác xã làm việc cầm chừng theo kiểu "đánh trống ghi tên", năng suất lúa thấp kém, Bí thư Tỉnh ủy Kim Ngọc đã cho thí điểm giao khoán ruộng đất tới từng hộ gia đình (Nghị quyết 68-NQ/TU ngày 10/9/1966). Sản lượng lúa Vĩnh Phú tăng vọt, người dân đủ ăn. Dù lúc đó bị phê phán vì đi chệch mô hình hợp tác xã tập trung, "khoán chui" chính là ngòi nổ thực tiễn khai sinh Chỉ thị 100 (1981) và Nghị quyết Khoán 10 (1988) sau này.',
        primarySourceSnippet: '"Phải để người nông dân làm chủ thửa ruộng của mình, gắn mồ hôi của họ với hạt thóc họ làm ra thì họ mới tận tụy với ruộng đồng." — Bí thư Kim Ngọc',
        significance: 'Bài học thực tiễn kinh điển: Chân lý thuộc về quy luật khách quan của đời sống sản xuất; không thể áp đặt ý muốn chủ quan lên người nông dân.'
      },
      {
        id: 'ev-1986-doi-moi',
        year: '15 - 18/12/1986',
        title: 'Đại hội Đảng lần thứ VI: Khởi xướng đường lối Đổi Mới toàn diện',
        location: 'Hà Nội, Việt Nam',
        keyFigures: ['Nguyễn Văn Linh', 'Trường Chinh', 'Võ Văn Kiệt'],
        historicalFact: 'Giữa bối cảnh khủng hoảng kinh tế - xã hội gay gắt (lạm phát lên tới 774%), Đại hội VI của Đảng Cộng sản Việt Nam đã đưa ra tuyên bố dũng cảm: "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật". Đảng thừa nhận sai lầm chủ quan duy ý chí, nóng vội xóa bỏ các thành phần kinh tế phi xã hội chủ nghĩa, và chính thức quyết định chuyển sang nền kinh tế nhiều thành phần.',
        primarySourceSnippet: '"Lực lượng sản xuất bị kìm hãm không chỉ trong trường hợp quan hệ sản xuất lạc hậu, mà cả khi quan hệ sản xuất phát triển không đồng bộ, có những yếu tố đi quá xa so với trình độ phát triển của lực lượng sản xuất." — Văn kiện Đại hội VI (1986)',
        significance: 'Bước ngoặt lịch sử mở ra kỷ nguyên phát triển rực rỡ của đất nước, xác lập mô hình Kinh tế thị trường định hướng XHCN.'
      }
    ]
  },
  {
    id: 4,
    year: 'Thời Đại Mới',
    era: 'Trụ Cột Dân Chủ',
    title: 'Kiến Trúc Pháp Quyền Xã Hội Chủ Nghĩa',
    subtitle: 'Nhà nước của dân, do dân, vì dân — Bản chất dân chủ thực chất',
    themeColor: '#3b82f6',
    accentBorder: 'border-blue-500/60',
    bgGradient: 'from-blue-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Nghị quyết số 27-NQ/TW (Hội nghị Trung ương 6 Khóa XIII, 2022) về tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam; Luật Thực hiện Dân chủ ở cơ sở (2022).',
    quote: {
      text: 'Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân.',
      author: 'Hồ Chí Minh (Báo Sự thật, 1949)'
    },
    context: 'Một xã hội văn minh không thể vận hành bằng sự độc đoán của cá nhân hay sự phó mặc vô hồn cho máy móc kỹ trị. Quyền lực nhà nước bắt nguồn từ nhân dân, được thực thi theo Hiến pháp và pháp luật với cơ chế kiểm soát quyền lực chặt chẽ.',
    taskTitle: 'Định Vị 4 Trụ Cột Dân Chủ Nhân Dân',
    taskInstruction: 'Khảo cứu bản Hiến pháp 1946 lịch sử và Nghị quyết 27-NQ/TW; kích hoạt đủ 4 trụ cột thực thi quyền lực: Dân biết, Dân bàn, Dân làm & giám sát, Dân thụ hưởng.',
    keyLesson: {
      title: 'Bản chất Nền Dân chủ Xã hội Chủ nghĩa',
      coreIdea: 'Dân chủ không phải là khẩu hiệu trừu tượng mà là quyền lực hiện thực của nhân dân.',
      elaboration: 'Nhà nước pháp quyền XHCN thượng tôn Hiến pháp và pháp luật, nhưng pháp luật ấy phải kết tinh ý chí của nhân dân lao động, bảo đảm quyền con người và ngăn chặn mọi biểu hiện quan liêu, tham nhũng.'
    },
    rewardStats: {
      theory: 30,
      protect: 30,
      build: 20
    },
    historicalEvents: [
      {
        id: 'ev-1946-constitution',
        year: '09/11/1946',
        title: 'Quốc hội khóa I thông qua bản Hiến pháp đầu tiên (Hiến pháp 1946)',
        location: 'Nhà hát Lớn Hà Nội, Việt Nam',
        keyFigures: ['Chủ tịch Hồ Chí Minh', 'Ban Dự thảo Hiến pháp'],
        historicalFact: 'Sau cuộc Tổng tuyển cử toàn quốc ngày 06/01/1946, Quốc hội khóa I đã thảo luận dân chủ và thông qua bản Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hòa với 240 phiếu tán thành trên 242 đại biểu có mặt. Bản Hiến pháp khẳng định nguyên tắc quyền lực nhà nước thuộc về toàn thể nhân dân, không phân biệt nòi giống, gái trai, tôn giáo, giai cấp.',
        primarySourceSnippet: '"Điều 1: Nước Việt Nam là một nước dân chủ cộng hòa. Tất cả quyền bính trong nước là của toàn thể nhân dân Việt Nam, không phân biệt nòi giống, gái trai, giàu nghèo, giai cấp, tôn giáo." — Hiến pháp 1946',
        significance: 'Bản khai sinh pháp lý nền dân chủ cộng hòa đầu tiên ở Đông Nam Á, đặt nền móng vững chắc cho Nhà nước pháp quyền Việt Nam.'
      },
      {
        id: 'ev-2022-nq27',
        year: '09/11/2022',
        title: 'Ban hành Nghị quyết số 27-NQ/TW về Nhà nước Pháp quyền XHCN',
        location: 'Hà Nội, Ban Chấp hành Trung ương Đảng Khóa XIII',
        keyFigures: ['Tổng Bí thư Nguyễn Phú Trọng'],
        historicalFact: 'Hội nghị lần thứ 6 Ban Chấp hành Trung ương Đảng khóa XIII đã ban hành Nghị quyết số 27-NQ/TW chuyên đề đầu tiên về "Tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam trong giai đoạn mới", xác lập mục tiêu thượng tôn Hiến pháp, kiểm soát quyền lực nhà nước, phòng chống tham nhũng tiêu cực và bảo vệ quyền con người.',
        primarySourceSnippet: '"Nhà nước pháp quyền xã hội chủ nghĩa Việt Nam do Đảng Cộng sản Việt Nam lãnh đạo; thượng tôn Hiến pháp và pháp luật; tôn trọng, bảo đảm, bảo vệ hiệu quả quyền con người, quyền công dân; quyền lực nhà nước là thống nhất, có sự phân công rành mạch, phối hợp chặt chẽ, kiểm soát hiệu quả giữa các cơ quan." — Nghị quyết 27-NQ/TW',
        significance: 'Cột mốc lý luận và thực tiễn định hình toàn diện thể chế nhà nước pháp quyền hiện đại, minh bạch, liêm chính.'
      },
      {
        id: 'ev-2022-dan-chu-co-so',
        year: '10/11/2022',
        title: 'Quốc hội thông qua Luật Thực hiện Dân chủ ở cơ sở',
        location: 'Kỳ họp thứ 4, Quốc hội khóa XV, Hà Nội',
        keyFigures: ['Quốc hội Việt Nam'],
        historicalFact: 'Quốc hội khóa XV đã chính thức luật hóa phương châm lớn của Đảng: "Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng" thành đạo luật có hiệu lực thi hành từ ngày 01/07/2023, quy định bắt buộc việc công khai thông tin ngân sách, quy hoạch và cơ chế để người dân trực tiếp bàn bạc, biểu quyết và giám sát các công trình địa phương.',
        primarySourceSnippet: '"Bảo đảm quyền của công dân, cán bộ, công chức, viên chức, người lao động được biết, tham gia ý kiến, quyết định và kiểm tra, giám sát việc thực hiện dân chủ ở cơ sở." — Điều 3, Luật Thực hiện Dân chủ ở cơ sở 2022',
        significance: 'Chuyển hóa nguyên lý dân chủ từ lý luận trừu tượng thành quyền năng pháp lý thực chất, bảo đảm người dân trực tiếp thụ hưởng thành quả.'
      }
    ]
  },
  {
    id: 5,
    year: 'Hòa Hợp Vững Bền',
    era: 'Sức Mạnh Liên Minh',
    title: 'Hòa Âm Sắc Tộc & Tự Do Tín Ngưỡng',
    subtitle: 'Khối đại đoàn kết toàn dân tộc & Tôn trọng tự do tinh thần',
    themeColor: '#eab308',
    accentBorder: 'border-yellow-500/60',
    bgGradient: 'from-yellow-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Thực hiện chính sách 54 dân tộc bình đẳng, đoàn kết, tương trợ, giúp nhau cùng tiến bộ; tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo và tự do không tín ngưỡng của mọi công dân.',
    quote: {
      text: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
      author: 'Chủ tịch Hồ Chí Minh (1962)'
    },
    context: 'Trong lịch sử, các thế lực thù địch luôn tìm cách khoét sâu vào mâu thuẫn sắc tộc và niềm tin tôn giáo để gây phân rã đất nước. Thực tiễn cách mạng Việt Nam chứng minh: Khối đại đoàn kết toàn dân tộc là cội nguồn sức mạnh làm nên mọi thắng lợi vẻ vang.',
    taskTitle: 'Điều Chỉnh Tần Số Đại Đoàn Kết',
    taskInstruction: 'Khảo cứu sự kiện Mặt trận Việt Minh 1941 và Sắc lệnh 234/SL năm 1955 của Chủ tịch Hồ Chí Minh; cân bằng các dải sóng văn hóa: Bình đẳng 54 dân tộc, Tự do tín ngưỡng chân chính và Khối liên minh công - nông - trí thức.',
    keyLesson: {
      title: 'Nguyên tắc Dân tộc & Tôn giáo trong CNXH',
      coreIdea: 'Bình đẳng, đoàn kết, tương trợ giúp nhau cùng phát triển.',
      elaboration: 'Tôn giáo là nhu cầu tinh thần chính đáng cần được tôn trọng tự do tín ngưỡng. Việc vận động chức sắc, tín đồ sống "tốt đời đẹp đạo", củng cố khối đại đoàn kết là chiến lược sống còn lâu dài.'
    },
    rewardStats: {
      theory: 20,
      protect: 40,
      build: 20
    },
    historicalEvents: [
      {
        id: 'ev-1941-viet-minh',
        year: '19/05/1941',
        title: 'Thành lập Mặt trận Việt Nam Độc lập Đồng minh (Việt Minh)',
        location: 'Lán Khuổi Nặm, Pác Bó, Cao Bằng',
        keyFigures: ['Chủ tịch Hồ Chí Minh', 'Trung ương Đảng'],
        historicalFact: 'Hội nghị Trung ương Đảng lần thứ 8 do đồng chí Nguyễn Ái Quốc chủ trì đã quyết định thành lập Mặt trận Việt Minh, giương cao ngọn cờ giải phóng dân tộc lên trên hết. Mặt trận kết nạp mọi tầng lớp nhân dân không phân biệt tôn giáo, đảng phái, giàu nghèo, dân tộc thiểu số hay đa số.',
        primarySourceSnippet: '"Quyền lợi của bộ phận, của giai cấp phải đặt dưới quyền lợi giải phóng của toàn thể dân tộc... Không phân biệt giàu nghèo, già trẻ, gái trai, tôn giáo và xu hướng chính trị, hễ là người Việt Nam yêu nước đều cùng nhau vào Mặt trận Việt Minh." — Nghị quyết Hội nghị Trung ương 8 (1941)',
        significance: 'Đỉnh cao của nghệ thuật đại đoàn kết dân tộc, tập hợp hơn 20 triệu đồng bào làm nên thắng lợi của Cách mạng Tháng Tám năm 1945.'
      },
      {
        id: 'ev-1955-sac-lenh-234',
        year: '14/06/1955',
        title: 'Chủ tịch Hồ Chí Minh ký Sắc lệnh số 234/SL về Tôn giáo',
        location: 'Hà Nội, Việt Nam',
        keyFigures: ['Chủ tịch Hồ Chí Minh'],
        historicalFact: 'Ngay sau hòa bình lập lại ở miền Bắc, Bác Hồ ký Sắc lệnh số 234/SL gồm 5 chương 16 điều khẳng định quyền tự do tín ngưỡng của nhân dân. Sắc lệnh quy định rõ: Chính quyền tôn trọng quyền tự do thờ phụng của mọi tôn giáo; chức sắc tôn giáo được tự do giảng đạo; các nơi thờ phụng được pháp luật bảo hộ.',
        primarySourceSnippet: '"Điều 1: Chính phủ bảo đảm quyền tự do tín ngưỡng và quyền tự do thờ phụng của nhân dân. Không ai được xâm phạm quyền tự do ấy. Mọi người Việt Nam đều có quyền theo một tôn giáo hoặc không theo tôn giáo nào." — Sắc lệnh số 234/SL (1955)',
        significance: 'Văn bản pháp lý nền tảng đập tan âm mưu của các thế lực phản động kích động di cư, chia rẽ lương giáo; xây dựng tình đoàn kết gắn bó đạo và đời.'
      },
      {
        id: 'ev-1946-thu-dong-bao-tay-nguyen',
        year: '19/04/1946',
        title: 'Thư của Bác Hồ gửi Đại hội các Dân tộc Thiểu số miền Nam',
        location: 'Playku (Gia Lai) & Hà Nội',
        keyFigures: ['Chủ tịch Hồ Chí Minh', 'Đồng bào các dân tộc Tây Nguyên'],
        historicalFact: 'Nhân dịp Đại hội các dân tộc thiểu số miền Nam họp tại Playku, Chủ tịch Hồ Chí Minh đã gửi bức thư tâm huyết khẳng định mối quan hệ máu thịt giữa người Kinh và các đồng bào dân tộc thiểu số như anh em ruột thịt một nhà.',
        primarySourceSnippet: '"Đồng bào Kinh hay Thổ, Mường hay Mán, Gia Rai hay Ê Đê, Xê Đăng hay Ba Na và các dân tộc thiểu số khác, đều là con cháu Việt Nam, đều là anh em ruột thịt. Chúng ta sống chết có nhau, sướng khổ cùng nhau, no đói giúp nhau... Sông có thể cạn, núi có thể mòn, nhưng lòng đoàn kết của chúng ta không bao giờ giảm bớt." — Hồ Chí Minh (1946)',
        significance: 'Chân lý bất diệt về khối đại đoàn kết các dân tộc anh em trên dải đất hình chữ S.'
      }
    ]
  },
  {
    id: 6,
    year: 'Nền Tảng Nhân Văn',
    era: 'Tế Bào Hạnh Phúc',
    title: 'Vườn Ươm Gia Đình & Con Người Toàn Diện',
    subtitle: 'Gia đình văn minh tiến bộ — Tế bào lành mạnh của xã hội mới',
    themeColor: '#ec4899',
    accentBorder: 'border-pink-500/60',
    bgGradient: 'from-pink-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    vietnamContext: 'Vận dụng tại Việt Nam: Luật Hôn nhân và Gia đình năm 1959 (bản luật đầu tiên xóa bỏ chế độ đa thê, phong kiến); Chiến lược phát triển gia đình Việt Nam đến năm 2030; bảo đảm bình đẳng giới và bảo vệ trẻ em.',
    quote: {
      text: 'Nhiều gia đình cộng lại mới thành xã hội, gia đình tốt thì xã hội mới tốt, xã hội tốt thì gia đình càng tốt hơn.',
      author: 'Chủ tịch Hồ Chí Minh (1959)'
    },
    context: 'Con người không phải là những cỗ máy cơ giới vô tri trong các trại lao động tập trung tẻ nhạt. Utopia cần những mái ấm tràn đầy tình thương, nơi mỗi cá nhân được yêu thương, giáo dục và phát triển toàn diện mọi tiềm năng nhân phẩm.',
    taskTitle: 'Vun Đắp Cây Sự Sống Xã Hội',
    taskInstruction: 'Khảo cứu sự kiện lịch sử ban hành Luật Hôn nhân và Gia đình năm 1959; truyền 3 nguồn dưỡng chất tiến bộ: [Hôn nhân tự nguyện & bình đẳng giới], [Giáo dục nhân cách toàn diện] và [Gắn kết tình thương với trách nhiệm cộng đồng].',
    keyLesson: {
      title: 'Vị trí Xã hội của Gia đình Mới',
      coreIdea: 'Gia đình là tế bào của xã hội, chiếc nôi đầu đời của nhân phẩm.',
      elaboration: 'Xây dựng gia đình văn hóa mới XHCN là cuộc giải phóng thực sự cho phụ nữ, xóa bỏ tư tưởng gia trưởng phong kiến, tạo môi trường thuận lợi nhất để nuôi dưỡng thế hệ kiến trúc sư tương lai.'
    },
    rewardStats: {
      theory: 15,
      protect: 25,
      build: 40
    },
    historicalEvents: [
      {
        id: 'ev-1959-luat-hn-gd',
        year: '29/12/1959',
        title: 'Quốc hội thông qua Luật Hôn nhân và Gia đình đầu tiên',
        location: 'Hà Nội, Việt Nam',
        keyFigures: ['Chủ tịch Hồ Chí Minh', 'Quốc hội khóa I'],
        historicalFact: 'Tại kỳ họp thứ 11 Quốc hội khóa I, bản Luật Hôn nhân và Gia đình đầu tiên của nước ta được nhất trí thông qua. Đạo luật xóa bỏ triệt để hủ tục phong kiến: cấm đa thê, cấm gả bán ép hôn, cấm đánh đập ngược đãi phụ nữ; chính thức xác lập nguyên tắc hôn nhân tự nguyện, tiến bộ, một vợ một chồng và vợ chồng bình đẳng trước pháp luật.',
        primarySourceSnippet: '"Luật Hôn nhân và Gia đình này là một cuộc cách mạng trong đời sống gia đình, là một sự giải phóng phụ nữ triệt để... Không giải phóng phụ nữ thì không giải phóng một nửa loài người. Nếu không giải phóng phụ nữ thì không xây dựng được chủ nghĩa xã hội." — Chủ tịch Hồ Chí Minh phát biểu thảo luận luật (1959)',
        significance: 'Cuộc cách mạng nhân văn sâu sắc nhất trong lịch sử pháp luật Việt Nam, giải phóng phụ nữ và trẻ em khỏi gông cùm gia trưởng.'
      },
      {
        id: 'ev-1965-ba-dam-dang',
        year: 'Tháng 3/1965',
        title: 'Phát động Phong trào "Ba đảm đang" của phụ nữ Việt Nam',
        location: 'Hà Nội và toàn miền Bắc',
        keyFigures: ['Hội Liên hiệp Phụ nữ Việt Nam', 'Hàng triệu phụ nữ miền Bắc'],
        historicalFact: 'Trước cuộc chiến tranh phá hoại của đế quốc Mỹ, Trung ương Hội Phụ nữ phát động phong trào "Ba đảm đang": Đảm đang sản xuất và công tác thay nam giới ra trận; Đảm đang gia đình phụng dưỡng cha mẹ, nuôi dạy con cái; Đảm đang phục vụ chiến đấu và sẵn sàng chiến đấu. Phong trào lôi cuốn hơn 1,7 triệu phụ nữ tham gia, khẳng định vai trò trụ cột của phụ nữ trong gia đình và xã hội.',
        primarySourceSnippet: '"Phụ nữ Việt Nam dũng cảm, đảm đang, vừa sản xuất giỏi, vừa chiến đấu giỏi, gánh vác việc nước, việc nhà, xứng đáng là con cháu Bà Trưng, Bà Triệu." — Bác Hồ khen tặng phụ nữ Ba đảm đang',
        significance: 'Minh chứng sống động rằng gia đình hạnh phúc không tách rời vận mệnh quốc gia; phụ nữ là lực lượng kiến thiết xã hội vĩ đại.'
      },
      {
        id: 'ev-2006-binh-dang-gioi',
        year: '29/11/2006',
        title: 'Quốc hội ban hành Luật Bình đẳng giới',
        location: 'Kỳ họp thứ 10, Quốc hội khóa XI, Hà Nội',
        keyFigures: ['Quốc hội Việt Nam'],
        historicalFact: 'Đạo luật số 73/2006/QH11 chính thức xác lập các biện pháp thúc đẩy bình đẳng giới trong mọi lĩnh vực chính trị, kinh tế, lao động, giáo dục, y tế và gia đình; đưa Việt Nam trở thành một trong những quốc gia có tỷ lệ nữ đại biểu Quốc hội và tỷ lệ phụ nữ làm chủ doanh nghiệp cao hàng đầu khu vực.',
        primarySourceSnippet: '"Mục tiêu bình đẳng giới là xóa bỏ phân biệt đối xử về giới, tạo cơ hội như nhau cho nam và nữ trong phát triển kinh tế - xã hội và phát triển nguồn nhân lực." — Điều 4, Luật Bình đẳng giới 2006',
        significance: 'Hiện thực hóa mục tiêu con người phát triển toàn diện, bình đẳng thực chất của chủ nghĩa xã hội.'
      }
    ]
  },
  {
    id: 7,
    year: '2084',
    era: 'Đỉnh Cao Utopia',
    title: 'Đại Đô Thị Xã Hội Chủ Nghĩa 2084',
    subtitle: 'Hiện thực hóa lý tưởng: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh',
    themeColor: '#06b6d4',
    accentBorder: 'border-cyan-500/60',
    bgGradient: 'from-cyan-950/40 via-stone-900/90 to-stone-950',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    vietnamContext: 'Khát vọng Việt Nam 2084: Xây dựng đất nước phồn vinh, văn minh, hạnh phúc; phát triển thu nhập cao theo định hướng xã hội chủ nghĩa; khoa học công nghệ, năng lượng xanh và trí tuệ nhân tạo GAIA phụng sự con người trọn vẹn.',
    quote: {
      text: 'Thay cho xã hội tư bản cũ... sẽ xuất hiện một liên hợp, trong đó sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.',
      author: 'K. Marx & F. Engels (Tuyên ngôn của Đảng Cộng sản, 1848)'
    },
    context: 'Năm 2084. Trải qua hành trình hơn một thế kỷ rưỡi kiên trì vận dụng quy luật duy vật biện chứng, Dự án Utopia đã hoàn thành. Hệ thống AI GAIA hòa hợp cùng trí tuệ nhân loại phụng sự con người. Xã hội vươn lên đỉnh cao của tự do, nhân văn và thịnh vượng bền vững.',
    taskTitle: 'Kích Hoạt Lõi Điều Phối GAIA Utopia',
    taskInstruction: 'Khảo cứu Cương lĩnh phát triển đất nước thế kỷ XXI; tích hợp 3 nguồn năng lượng đã tích lũy và xác lập mục tiêu tối thượng vì hạnh phúc của muôn người.',
    keyLesson: {
      title: 'Mục Tiêu Tối Thượng của Chủ Nghĩa Xã Hội',
      coreIdea: 'Giải phóng con người hoàn toàn, đưa con người từ vương quốc tất yếu sang vương quốc tự do.',
      elaboration: 'CNXH không phải là cào bằng nghèo đói, mà là sự phát triển phong phú, hài hòa, nơi khoa học công nghệ phụng sự hạnh phúc đích thực của muôn người.'
    },
    rewardStats: {
      theory: 35,
      protect: 35,
      build: 35
    },
    historicalEvents: [
      {
        id: 'ev-2011-cuong-linh',
        year: '19/01/2011',
        title: 'Cương lĩnh xây dựng đất nước trong thời kỳ quá độ (bổ sung 2011)',
        location: 'Đại hội Đảng lần thứ XI, Hà Nội',
        keyFigures: ['Ban Chấp hành Trung ương Đảng'],
        historicalFact: 'Đại hội XI đã thông qua Cương lĩnh bổ sung, phát triển năm 2011 xác định 8 đặc trưng cốt lõi của xã hội XHCN mà nhân dân ta xây dựng, đặt mục tiêu bao trùm: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh; do nhân dân làm chủ; có nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và quan hệ sản xuất tiến bộ phù hợp.',
        primarySourceSnippet: '"Đi lên chủ nghĩa xã hội là khát vọng của nhân dân ta, là sự lựa chọn đúng đắn của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh, phù hợp với xu thế phát triển của lịch sử." — Cương lĩnh (bổ sung, phát triển 2011)',
        significance: 'Bản thiết kế chiến lược định hướng toàn bộ công cuộc xây dựng và bảo vệ Tổ quốc bước vào thế kỷ XXI và tầm nhìn 2084.'
      },
      {
        id: 'ev-2045-tam-nhin',
        year: 'Đại hội XIII (2021) & Tầm nhìn 2045 - 2084',
        title: 'Chiến lược phát triển đất nước kỷ niệm 100 năm thành lập nước',
        location: 'Hà Nội, Việt Nam',
        keyFigures: ['Đảng và Nhân dân Việt Nam'],
        historicalFact: 'Đại hội XIII của Đảng đã xác định các mốc lịch sử phát triển quan trọng: Đến năm 2025 là nước đang phát triển có công nghiệp theo hướng hiện đại; đến năm 2030 là nước đang phát triển có công nghiệp hiện đại, thu nhập trung bình cao; và đến năm 2045 (kỷ niệm 100 năm thành lập nước) trở thành nước phát triển, thu nhập cao theo định hướng XHCN.',
        primarySourceSnippet: '"Khơi dậy khát vọng phát triển đất nước phồn vinh, hạnh phúc; phát huy ý chí và sức mạnh đại đoàn kết toàn dân tộc kết hợp với sức mạnh thời đại... xây dựng một nước Việt Nam hòa bình, độc lập, thống nhất, dân chủ và giàu mạnh." — Nghị quyết Đại hội XIII',
        significance: 'Tiền đề hiện thực hóa đại đô thị Utopia 2084 nơi khoa học, công nghệ số và trí tuệ nhân tạo giải phóng sức lao động con người.'
      }
    ]
  }
];
