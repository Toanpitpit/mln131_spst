import type {Metadata} from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project Utopia 2084 | Hành Trình Kiến Thiết Biện Chứng',
  description: 'Trò chơi mô phỏng tương tác lịch sử và kiến thiết tương lai xã hội chủ nghĩa Utopia 2084 với hình ảnh động và mini-game biện chứng.',
  openGraph: {
    title: 'Project Utopia 2084 | Hành Trình Kiến Thiết Biện Chứng',
    description: 'Trò chơi mô phỏng tương tác lịch sử và kiến thiết tương lai xã hội chủ nghĩa Utopia 2084 với hình ảnh động và mini-game biện chứng.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Utopia 2084 | Hành Trình Kiến Thiết Biện Chứng',
    description: 'Trò chơi mô phỏng tương tác lịch sử và kiến thiết tương lai xã hội chủ nghĩa Utopia 2084 với hình ảnh động và mini-game biện chứng.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="font-sans bg-[#0c1017] text-[#e2e8f0] min-h-screen antialiased selection:bg-amber-500/30 selection:text-amber-200" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

