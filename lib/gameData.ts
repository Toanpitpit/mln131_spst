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

export interface EpochData {
  id: number;
  year: string;
  era: string;
  title: string;
  subtitle: string;
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
    quote: {
      text: 'Các nhà triết học từ trước đến nay chỉ giải thích thế giới bằng nhiều cách khác nhau, song vấn đề là cải tạo thế giới.',
      author: 'Karl Marx (Luận cương về Feuerbach, 1845)'
    },
    context: 'Thế kỷ XIX, khói bụi nhà máy bủa vây châu Âu. Phong trào công nhân nổi dậy nhưng chìm trong bế tắc. Chủ nghĩa xã hội Không tưởng đầy lòng trắc ẩn tha thiết nhưng bất lực vì đi xin xỏ lòng thương hại của giới chủ.',
    taskTitle: 'Điều Khiển Cỗ Máy Biện Chứng Lịch Sử',
    taskInstruction: 'Tương tác điều chỉnh 3 bánh răng: [Lực Lượng Sản Xuất], [Quan Hệ Sản Xuất] và [Ý Thức Lý Luận] để tìm điểm ăn khớp giải phóng động lực xã hội.',
    keyLesson: {
      title: 'Bước nhảy từ Không tưởng sang Khoa học',
      coreIdea: 'Lịch sử không vận động nhờ sự bố thí đạo đức, mà vận động theo quy luật khách quan.',
      elaboration: 'Khi lực lượng sản xuất xã hội hóa cao mâu thuẫn với chế độ chiếm hữu tư nhân tư bản chủ nghĩa, cuộc cách mạng xã hội là tất yếu khách quan. Chủ nghĩa xã hội khoa học đã phát hiện ra quy luật này.'
    },
    rewardStats: {
      theory: 35,
      protect: 15,
      build: 20
    }
  },
  {
    id: 2,
    year: '1917',
    era: 'Sứ Mệnh Tiên Phong',
    title: 'Lực Lượng Dẫn Dắt Toàn Thế Giới',
    subtitle: 'Giai cấp công nhân đại công nghiệp & ngọn đuốc giác ngộ',
    quote: {
      text: 'Không có lý luận cách mạng thì cũng không thể có phong trào cách mạng.',
      author: 'V.I. Lenin (Làm gì?, 1902)'
    },
    context: 'Giữa những nhà máy khổng lồ, một giai cấp mới ra đời — không có tư liệu sản xuất riêng, gắn bó với công nghệ hiện đại nhất và mang tính tổ chức kỷ luật thép. Họ chính là chủ thể giải phóng toàn thể nhân loại.',
    taskTitle: 'Thiết Lập Mạng Lưới Tiên Phong',
    taskInstruction: 'Kết nối các hạt nhân công nhân đại công nghiệp, đoàn thể nghiệp đoàn và trạm truyền thông lý luận, tránh các cạm bẫy phá hoại tư sản và suy thoái.',
    keyLesson: {
      title: 'Bản chất Sứ mệnh Lịch sử Toàn thế giới',
      coreIdea: 'Giai cấp công nhân chỉ có thể tự giải phóng khi đồng thời giải phóng vĩnh viễn toàn xã hội khỏi áp bức bóc lột.',
      elaboration: 'Họ là đại diện cho lực lượng sản xuất tiên tiến nhất. Dưới sự lãnh đạo của Đảng tiên phong, khối liên minh công nông trí thức trở thành lực lượng vô địch.'
    },
    rewardStats: {
      theory: 25,
      protect: 35,
      build: 20
    }
  },
  {
    id: 3,
    year: '1921 - 1986',
    era: 'Thời Kỳ Quá Độ',
    title: 'Bàn Điều Phối Kinh Tế Quá Độ',
    subtitle: 'Nghệ thuật bước quá độ gián tiếp & Kinh tế nhiều thành phần',
    quote: {
      text: 'Muốn cứu nước và giải phóng dân tộc không có con đường nào khác con đường cách mạng vô sản.',
      author: 'Chủ tịch Hồ Chí Minh (1960)'
    },
    context: 'Giành chính quyền đã khó, kiến thiết xã hội mới còn gian truân gấp bội. Đất nước nghèo nàn vừa bước ra khỏi chiến tranh không thể lập tức có CNXH hoàn chỉnh. Cần một thời kỳ quá độ bền bỉ với những bước đi khoa học.',
    taskTitle: 'Cân Bằng Tam Giác Kinh Tế Vĩ Mô',
    taskInstruction: 'Điều tiết thanh trượt: [Kinh Tế Nhà Nước Chủ Đạo], [Kinh Tế Thị Trường Năng Động] và [Quỹ An Sinh & Bình Đẳng]. Tránh 2 cực: Nóng vội duy ý chí OR Buông lỏng tư bản hóa.',
    keyLesson: {
      title: 'Tính Tất Yếu của Thời Kỳ Quá Độ',
      coreIdea: 'Không thể xóa bỏ quan hệ hàng hóa - tiền tệ bằng mệnh lệnh chủ quan.',
      elaboration: 'Kinh tế thị trường định hướng XHCN cho phép phát huy mọi nguồn lực xã hội, công nghiệp hóa - hiện đại hóa, nhưng luôn đặt con người làm trung tâm, gắn tăng trưởng kinh tế với tiến bộ và công bằng xã hội.'
    },
    rewardStats: {
      theory: 20,
      protect: 20,
      build: 40
    }
  },
  {
    id: 4,
    year: 'Thời Đại Mới',
    era: 'Trụ Cột Dân Chủ',
    title: 'Kiến Trúc Pháp Quyền Xã Hội Chủ Nghĩa',
    subtitle: 'Nhà nước của dân, do dân, vì dân — Bản chất dân chủ thực chất',
    quote: {
      text: 'Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân.',
      author: 'Hồ Chí Minh (Báo Sự thật, 1949)'
    },
    context: 'Một xã hội tương lai không thể dựa vào sự độc đoán của bất kỳ phe nhóm nào hay sự phó mặc vô hồn cho máy móc. Quyền lực phải thuộc về toàn thể nhân dân với cơ chế minh bạch và kiểm soát quyền lực chặt chẽ.',
    taskTitle: 'Định Vị 4 Trụ Cột Dân Chủ Nhân Dân',
    taskInstruction: 'Xếp và kích hoạt đủ 4 cột trụ quyền lực: [Dân Biết], [Dân Bàn], [Dân Làm & Dân Giám Sát], [Dân Thụ Hưởng] để tạo nên trường năng lượng pháp quyền kiên cố.',
    keyLesson: {
      title: 'Bản chất Nền Dân chủ Xã hội Chủ nghĩa',
      coreIdea: 'Dân chủ không phải là khẩu hiệu trừu tượng mà là quyền lực hiện thực của nhân dân.',
      elaboration: 'Nhà nước pháp quyền XHCN thượng tôn pháp luật nhưng pháp luật ấy phải kết tinh ý chí của nhân dân lao động, bảo đảm quyền con người và ngăn chặn mọi biểu hiện quan liêu, tham nhũng.'
    },
    rewardStats: {
      theory: 30,
      protect: 30,
      build: 20
    }
  },
  {
    id: 5,
    year: 'Hòa Hợp Vững Bền',
    era: 'Sức Mạnh Liên Minh',
    title: 'Hòa Âm Sắc Tộc & Tự Do Tín Ngưỡng',
    subtitle: 'Khối đại đoàn kết toàn dân tộc & Tôn trọng tự do tinh thần',
    quote: {
      text: 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.',
      author: 'Chủ tịch Hồ Chí Minh (1962)'
    },
    context: 'Kẻ thù luôn tìm cách khoét sâu vào mâu thuẫn sắc tộc và niềm tin tôn giáo để gây phân rã xã hội. Một quốc gia XHCN hùng cường chỉ có thể vững vàng khi các dân tộc anh em hòa hợp như một thân thể thống nhất.',
    taskTitle: 'Điều Chỉnh Tần Số Đại Đoàn Kết',
    taskInstruction: 'Cân bằng các dải sóng văn hóa của các cộng đồng dân tộc và tổ chức tín ngưỡng. Hóa giải các điểm nhiễu thù địch bằng nguyên tắc [Bình Đẳng], [Đoàn Kết] và [Tôn Trọng Tín Ngưỡng].',
    keyLesson: {
      title: 'Nguyên tắc Dân tộc & Tôn giáo trong CNXH',
      coreIdea: 'Bình đẳng, đoàn kết, tương trợ giúp nhau cùng phát triển.',
      elaboration: 'Tôn giáo là nhu cầu tinh thần chính đáng cần được tôn trọng tự do tín ngưỡng. Việc vận động chức sắc, tín đồ sống tốt đời đẹp đạo, củng cố khối đại đoàn kết là chiến lược sống còn lâu dài.'
    },
    rewardStats: {
      theory: 20,
      protect: 40,
      build: 20
    }
  },
  {
    id: 6,
    year: 'Nền Tảng Nhân Văn',
    era: 'Tế Bào Hạnh Phúc',
    title: 'Vườn Ươm Gia Đình & Con Người Toàn Diện',
    subtitle: 'Gia đình văn minh tiến bộ — Tế bào lành mạnh của xã hội mới',
    quote: {
      text: 'Nhiều gia đình cộng lại mới thành xã hội, gia đình tốt thì xã hội mới tốt, xã hội tốt thì gia đình càng tốt hơn.',
      author: 'Chủ tịch Hồ Chí Minh (1959)'
    },
    context: 'Con người không phải là những cỗ máy cơ giới vô tri trong các trại lao động tập trung tẻ nhạt. Utopia cần những mái ấm tràn đầy tình thương, nơi mỗi cá nhân được yêu thương, giáo dục và phát triển toàn diện mọi tiềm năng.',
    taskTitle: 'Vun Đắp Cây Sự Sống Xã Hội',
    taskInstruction: 'Truyền 3 nguồn dưỡng chất: [Hôn Nhân Tự Nguyện & Bình Đẳng Giới], [Giáo Dục Nhân Cách & Đạo Đức], [Gắn Kết Yêu Thương với Cộng Đồng]. Quan sát cây đời đâm chồi nở hoa.',
    keyLesson: {
      title: 'Vị trí Xã hội của Gia đình Mới',
      coreIdea: 'Gia đình là tế bào của xã hội, chiếc nôi đầu đời của nhân phẩm.',
      elaboration: 'Xây dựng gia đình văn hóa mới XHCN là cuộc giải phóng thực sự cho phụ nữ, xóa bỏ tư tưởng gia trưởng phong kiến, tạo môi trường thuận lợi nhất để nuôi dưỡng thế hệ kiến trúc sư tương lai.'
    },
    rewardStats: {
      theory: 15,
      protect: 25,
      build: 40
    }
  },
  {
    id: 7,
    year: '2084',
    era: 'Đỉnh Cao Utopia',
    title: 'Đại Đô Thị Xã Hội Chủ Nghĩa 2084',
    subtitle: 'Hiện thực hóa lý tưởng: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh',
    quote: {
      text: 'Thay cho xã hội tư bản cũ... sẽ xuất hiện một liên hợp, trong đó sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.',
      author: 'K. Marx & F. Engels (Tuyên ngôn của Đảng Cộng sản, 1848)'
    },
    context: 'Năm 2084. Trải qua hành trình biện chứng hơn một thế kỷ rưỡi, Dự án Utopia đã hoàn thành. Hệ thống AI GAIA hòa hợp cùng trí tuệ nhân loại phụng sự con người. Xã hội đã vươn lên đỉnh cao của tự do, nhân văn và thịnh vượng bền vững.',
    taskTitle: 'Kích Hoạt Lõi Điều Phối GAIA Utopia',
    taskInstruction: 'Hòa nhập 3 nguồn năng lượng đã tích lũy: [Lý Luận Sáng Suốt], [Bảo Vệ Kiên Cường] và [Kiến Trúc Vững Chắc] để thắp sáng toàn bộ đại đô thị 2084.',
    keyLesson: {
      title: 'Mục Tiêu Tối Thượng của Chủ Nghĩa Xã Hội',
      coreIdea: 'Giải phóng con người hoàn toàn, đưa con người từ vương quốc tất yếu sang vương quốc tự do.',
      elaboration: 'CNXH không phải là cào bằng nghèo đói, mà là sự phát triển phong phú, hài hòa, nơi khoa học công nghệ phụng sự hạnh phúc đích thực của muôn người.'
    },
    rewardStats: {
      theory: 35,
      protect: 35,
      build: 35
    }
  }
];
