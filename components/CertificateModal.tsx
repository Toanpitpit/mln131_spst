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

  // Determine Title based on score profile
  const titleBadge =
    stats.theory >= stats.protect && stats.theory >= stats.build
      ? 'Viện Sĩ Triết Học Biện Chứng Utopia'
      : stats.protect >= stats.build
      ? 'Đại Hiệp Sĩ Khối Đại Đoàn Kết Nhân Dân'
      : 'Tổng Công Trình Sư Kiến Thiết Xã Hội Mới';

  useEffect(() => {
    // Generate QR Code
    const verifyPayload = JSON.stringify({
      app: 'Project-Utopia-2084',
      name: playerName || 'Kiến Trúc Sư Vô Danh',
      title: titleBadge,
      date: '2084-10-05',
      scores: stats,
      verifiedBy: 'GAIA AI Core Authority'
    });

    QRCode.toDataURL(verifyPayload, {
      width: 140,
      margin: 1,
      color: {
        dark: '#78350f',
        light: '#fef3c7'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR generation error', err));

    // Celebrate
    try {
      confetti({
        particleCount: 80,
        spread: 90,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f141d] border-2 border-amber-500/70 p-6 sm:p-8 shadow-[0_0_50px_rgba(217,119,6,0.25)] my-8">
        
        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-100 w-8 h-8 flex items-center justify-center bg-stone-900 border border-stone-700 cursor-pointer transition-colors"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Frame */}
        <div ref={certRef} className="border-4 border-double border-amber-600/70 bg-[#161d28] p-6 text-center relative overflow-hidden">
          
          {/* Subtle Watermark Seal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="w-80 h-80 border-[16px] border-amber-400 flex items-center justify-center text-8xl font-serif">
              ★
            </div>
          </div>

          <div className="text-amber-500 text-xs tracking-[0.3em] uppercase font-mono font-bold mb-1">
            HỘI ĐỒNG LÝ LUẬN & KIẾN THIẾT UTOPIA 2084
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-200 tracking-wide">
            CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-3" />

          <p className="text-xs text-stone-400 italic">Chứng nhận đồng chí đã hoàn thành xuất sắc 7 chặng đường biện chứng lịch sử</p>
          
          <div className="my-4">
            <div className="text-stone-300 text-xs uppercase tracking-wider">Trao tặng cho:</div>
            <div className="font-serif-title text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-wider mt-1 underline decoration-amber-500/40 underline-offset-4">
              {playerName || 'ĐỒNG CHÍ KIẾN TRÚC SƯ'}
            </div>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-amber-950/60 border border-amber-500/50 text-xs font-semibold text-amber-300">
              <Medal className="w-3.5 h-3.5 text-amber-400" />
              <span>{titleBadge}</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 my-5 py-3 px-4 bg-black/40 border border-amber-500/20 text-xs">
            <div>
              <div className="text-stone-400 flex items-center justify-center gap-1">
                <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                <span>Lý Luận</span>
              </div>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.theory))}%</div>
            </div>
            <div>
              <div className="text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                <span>Bảo Vệ</span>
              </div>
              <div className="text-base font-bold text-red-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.protect))}%</div>
            </div>
            <div>
              <div className="text-stone-400 flex items-center justify-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kiến Trúc</span>
              </div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{Math.min(100, Math.round(stats.build))}%</div>
            </div>
          </div>

          {/* QR Code and Authority stamp */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-amber-500/20">
            <div className="flex items-center gap-3">
              {qrDataUrl && (
                <Image
                  src={qrDataUrl}
                  alt="QR Verification"
                  width={80}
                  height={80}
                  unoptimized
                  className="border border-amber-500/40 p-1 bg-amber-50 shadow-md"
                />
              )}
              <div className="text-left">
                <div className="text-[11px] font-mono font-bold text-amber-300">MÃ XÁC THỰC GAIA 2084</div>
                <div className="text-[10px] text-stone-400 leading-snug">
                  Đã ghi vào sổ cái lịch sử.<br />
                  Chữ ký số: SEC-2084-UTOPIA
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] text-stone-400">Hà Nội - Utopia Metropolis, 2084</div>
              <div className="font-serif-title font-bold text-sm text-amber-300 mt-1">HỆ THỐNG AI GAIA & NHÂN DÂN</div>
              <div className="text-[10px] text-amber-400/80 italic">Đã phê chuẩn toàn diện</div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mt-5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép thành tích'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>In chứng chỉ</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSandbox}
              className="px-3.5 py-2 bg-amber-950/70 hover:bg-amber-900/70 text-amber-200 text-xs font-medium border border-amber-600/50 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chế độ Tự do (Sandbox)</span>
            </button>
            <button
              onClick={onRestart}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors border border-amber-300"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chơi Lại Từ Đầu</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
