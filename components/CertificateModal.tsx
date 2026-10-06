'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Award, Building2, CheckCircle2, Copy, Download, Medal, RotateCcw, ScrollText, ShieldCheck, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  playerName: string;
  stats: { theory: number; protect: number; build: number };
  onRestart: () => void;
  onOpenSandbox: () => void;
  onClose: () => void;
}

export default function CertificateModal({
  playerName,
  stats,
  onRestart,
  onOpenSandbox,
  onClose
}: CertificateModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const certRef = useRef<HTMLDivElement | null>(null);

  const titleBadge =
    stats.theory >= stats.protect && stats.theory >= stats.build
      ? 'Viện Sĩ Triết Học Biện Chứng Utopia'
      : stats.protect >= stats.build
      ? 'Đại Hiệp Sĩ Khối Đại Đoàn Kết Nhân Dân'
      : 'Tổng Công Trình Sư Kiến Thiết Xã Hội Mới';

  useEffect(() => {
    const verifyPayload = JSON.stringify({
      app: 'Project-Utopia-2084',
      name: playerName || 'Kiến Trúc Sư Vô Danh',
      title: titleBadge,
      date: '2084-10-06',
      scores: stats,
      verifiedBy: 'Hội Đồng GAIA 2084'
    });

    QRCode.toDataURL(verifyPayload, {
      width: 150,
      margin: 1,
      color: {
        dark: '#78350f',
        light: '#fffbeb'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR generation error', err));

    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 }
      });
    } catch {
      // ignore
    }
  }, [playerName, stats, titleBadge]);

  const handleCopy = () => {
    const text = `CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ UTOPIA 2084\nHọ Tên: ${playerName || 'Đồng chí'}\nDanh hiệu: ${titleBadge}\nĐiểm Lý Luận: ${Math.min(100, Math.round(stats.theory))}%\nĐiểm Bảo Vệ: ${Math.min(100, Math.round(stats.protect))}%\nĐiểm Kiến Trúc: ${Math.min(100, Math.round(stats.build))}%\nDự Án Utopia 2084: Xã hội Dân giàu, nước mạnh, dân chủ, công bằng, văn minh!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f141d] border-2 border-amber-500/80 p-6 sm:p-8 shadow-[0_0_70px_rgba(217,119,6,0.35)] my-8 rounded-2xl">
        
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-300 hover:text-white w-9 h-9 flex items-center justify-center bg-stone-900/90 border border-amber-500/40 rounded-full cursor-pointer transition-colors z-20 shadow-lg"
          title="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Frame with REAL Background Image cert_bg.png */}
        <div ref={certRef} className="border-4 border-double border-amber-400/90 p-6 text-center relative overflow-hidden rounded-xl shadow-2xl min-h-[420px] flex flex-col justify-between">
          
          {/* BACKGROUND IMAGE DISPLAY */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/cert_bg.png"
              alt="Certificate Border"
              fill
              priority
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
          </div>

          <div className="relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/20 border border-amber-400/60 rounded-full text-xs font-mono tracking-widest text-amber-300 uppercase mb-3 shadow-md backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>HỘI ĐỒNG LÝ LUẬN & KIẾN THIẾT UTOPIA 2084</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl font-black text-amber-200 tracking-wider drop-shadow-lg">
              CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />

            <p className="text-xs text-stone-200 italic font-medium">
              Chứng nhận đồng chí đã xuất sắc hoàn thành 7 chặng đường kiến tạo biện chứng lịch sử
            </p>
            
            <div className="my-5">
              <div className="text-stone-300 text-xs uppercase tracking-wider font-semibold">Trân trọng vinh danh Kiến Trúc Sư:</div>
              <div className="font-serif-title text-3xl sm:text-4xl font-black text-amber-300 tracking-wider mt-1 drop-shadow-md">
                {playerName || 'ĐỒNG CHÍ KIẾN TRÚC SƯ'}
              </div>
              <div className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-amber-950/90 border border-amber-400/80 rounded-full text-xs font-extrabold text-amber-200 shadow-xl backdrop-blur-md">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>{titleBadge}</span>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 my-4 py-3.5 px-4 bg-stone-950/80 border border-amber-500/40 rounded-xl text-xs backdrop-blur-md shadow-inner">
              <div>
                <div className="text-stone-300 flex items-center justify-center gap-1 font-semibold">
                  <ScrollText className="w-4 h-4 text-amber-400" />
                  <span>Lý Luận</span>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.theory))}%</div>
              </div>
              <div>
                <div className="text-stone-300 flex items-center justify-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>Bảo Vệ</span>
                </div>
                <div className="text-xl font-black text-red-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.protect))}%</div>
              </div>
              <div>
                <div className="text-stone-300 flex items-center justify-center gap-1 font-semibold">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Kiến Trúc</span>
                </div>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.build))}%</div>
              </div>
            </div>

            {/* QR Code and Authority stamp */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-amber-500/40">
              <div className="flex items-center gap-3">
                {qrDataUrl && (
                  <Image
                    src={qrDataUrl}
                    alt="QR Verification"
                    width={85}
                    height={85}
                    unoptimized
                    className="border-2 border-amber-400 p-1 bg-amber-50 rounded-lg shadow-lg"
                  />
                )}
                <div className="text-left">
                  <div className="text-xs font-mono font-bold text-amber-300">XÁC THỰC SỐ GAIA 2084</div>
                  <div className="text-[10px] text-stone-300 leading-snug">
                    Sổ cái Quốc gia Utopia 2084.<br />
                    Mã chứng thư: SEC-UTOPIA-2084
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-stone-300">Đại Đô Thị Utopia, Năm 2084</div>
                <div className="font-serif-title font-black text-sm text-amber-300 mt-1">HỆ THỐNG AI GAIA & NHÂN DÂN</div>
                <div className="text-[11px] text-amber-400 italic font-semibold">Đã phê chuẩn cấp Quốc gia</div>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 relative z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold rounded-xl border border-stone-700 flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép thành tích'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-bold rounded-xl border border-stone-700 flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>In chứng chỉ</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSandbox}
              className="px-4 py-2.5 bg-amber-950/90 hover:bg-amber-900 text-amber-200 text-xs font-bold rounded-xl border border-amber-500/60 flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Chế độ Sandbox</span>
            </button>
            <button
              onClick={onRestart}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-black rounded-xl shadow-xl flex items-center gap-2 cursor-pointer transition-all border border-amber-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>BẮT ĐẦU LẠI</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
