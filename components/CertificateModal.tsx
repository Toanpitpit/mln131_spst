'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Award, Building2, CheckCircle2, Copy, Download, Medal, RotateCcw, ScrollText, ShieldCheck, X } from 'lucide-react';
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
  onClose,
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
      verifiedBy: 'Hội Đồng Kiến Thiết Utopia 2084',
    });

    QRCode.toDataURL(verifyPayload, {
      width: 140,
      margin: 1,
      color: {
        dark: '#78350f',
        light: '#fffbeb',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR error', err));

    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.45 },
      });
    } catch {
      // safe
    }
  }, [playerName, stats, titleBadge]);

  const handleCopy = () => {
    const text = `CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ UTOPIA 2084\nHọ Tên: ${playerName || 'Đồng chí'}\nDanh hiệu: ${titleBadge}\nĐiểm Lý Luận: ${Math.min(100, Math.round(stats.theory))}%\nĐiểm Đoàn Kết: ${Math.min(100, Math.round(stats.protect))}%\nĐiểm Kiến Trúc: ${Math.min(100, Math.round(stats.build))}%\nDự Án Utopia 2084: Xã hội Dân giàu, nước mạnh, dân chủ, công bằng, văn minh!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0d121b] border border-amber-900/60 p-6 sm:p-8 shadow-2xl my-8 rounded-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white w-8 h-8 flex items-center justify-center bg-stone-900 rounded border border-stone-800 cursor-pointer transition-colors z-20"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Frame with Background Image cert_bg.png */}
        <div
          ref={certRef}
          className="border-2 border-amber-600/60 p-6 text-center relative overflow-hidden rounded shadow-2xl min-h-[420px] flex flex-col justify-between"
        >
          {/* Background image display */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/cert_bg.png"
              alt="Certificate Background"
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/75 to-stone-950/90" />
          </div>

          <div className="relative z-10">
            {/* Top Header unboxed text */}
            <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-2">
              HỘI ĐỒNG LÝ LUẬN & KIẾN THIẾT UTOPIA 2084
            </div>

            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-100 tracking-wide">
              CHỨNG CHỈ CÔNG DÂN KIẾN TRÚC SƯ
            </h2>
            <div className="w-24 h-0.5 bg-amber-400/80 mx-auto my-2.5" />

            <p className="text-xs text-stone-300 italic font-medium">
              Chứng nhận đồng chí đã hoàn thành xuất sắc 7 chặng đường kiến tạo biện chứng lịch sử
            </p>

            <div className="my-5">
              <div className="text-stone-400 text-xs uppercase tracking-wider">
                Trân trọng vinh danh Kiến Trúc Sư:
              </div>
              <div className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-300 tracking-wide mt-1">
                {playerName || 'ĐỒNG CHÍ KIẾN TRÚC SƯ'}
              </div>
              <div className="mt-2 text-xs font-semibold text-amber-200 flex items-center justify-center gap-1.5">
                <Medal className="w-3.5 h-3.5 text-amber-400" />
                <span>{titleBadge}</span>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 my-4 py-3 px-4 bg-stone-950/70 border border-stone-800 rounded text-xs">
              <div>
                <div className="text-stone-400 flex items-center justify-center gap-1 text-[11px]">
                  <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lý Luận</span>
                </div>
                <div className="text-lg font-bold text-stone-100 font-mono mt-0.5 tabular-nums">
                  {Math.min(100, Math.round(stats.theory))}%
                </div>
              </div>
              <div>
                <div className="text-stone-400 flex items-center justify-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>Đoàn Kết</span>
                </div>
                <div className="text-lg font-bold text-stone-100 font-mono mt-0.5 tabular-nums">
                  {Math.min(100, Math.round(stats.protect))}%
                </div>
              </div>
              <div>
                <div className="text-stone-400 flex items-center justify-center gap-1 text-[11px]">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kiến Trúc</span>
                </div>
                <div className="text-lg font-bold text-stone-100 font-mono mt-0.5 tabular-nums">
                  {Math.min(100, Math.round(stats.build))}%
                </div>
              </div>
            </div>

            {/* QR Code and verification seal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-3.5 border-t border-stone-800">
              <div className="flex items-center gap-3">
                {qrDataUrl && (
                  <Image
                    src={qrDataUrl}
                    alt="QR Verification"
                    width={72}
                    height={72}
                    unoptimized
                    className="border border-amber-600/50 p-1 bg-amber-50 rounded"
                  />
                )}
                <div className="text-left">
                  <div className="text-[11px] font-mono font-bold text-amber-300">
                    XÁC THỰC SỐ GAIA 2084
                  </div>
                  <div className="text-[10px] text-stone-400 leading-snug">
                    Sổ cái Quốc gia Utopia 2084.<br />
                    Mã xác thực: SEC-UTOPIA-2084
                  </div>
                </div>
              </div>

              <div className="text-right text-xs">
                <div className="text-stone-400 text-[11px]">Đại Đô Thị Utopia, Năm 2084</div>
                <div className="font-serif-title font-bold text-stone-200 mt-0.5">
                  HỘI ĐỒNG KIẾN THIẾT XÃ HỘI
                </div>
                <div className="text-[10px] text-amber-300/80">Đã phê chuẩn toàn văn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 relative z-10 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded border border-stone-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép kết quả'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded border border-stone-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>In chứng chỉ</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSandbox}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded border border-stone-700 cursor-pointer transition-colors"
            >
              Trục Thời Gian
            </button>
            <button
              onClick={onRestart}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Khởi Động Lại</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
