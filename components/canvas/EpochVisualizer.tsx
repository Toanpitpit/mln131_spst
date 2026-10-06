'use client';

import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  epochId: number;
  simState: {
    // Epoch 1
    gearMeshRatio?: number;
    boilerPressure?: number;
    jammed?: boolean;
    // Epoch 2
    connectedNodes?: number[];
    totalNodes?: number;
    // Epoch 3
    stateRatio?: number;
    marketRatio?: number;
    welfareRatio?: number;
    // Epoch 4
    activePillars?: number[];
    // Epoch 5
    frequencySync?: number;
    // Epoch 6
    treeGrowth?: number;
    // Epoch 7
    activationPercent?: number;
  };
  isSuccess?: boolean;
}

export default function EpochVisualizer({ epochId, simState, isSuccess }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Handle high DPI
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for ambiance
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }> = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 450,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.5,
        hue: epochId === 1 ? 35 : epochId === 2 ? 15 : epochId === 7 ? 190 : 45
      });
    }

    const render = () => {
      time += 0.02;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw subtle background gradient based on epoch
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (epochId === 1) {
        bgGrad.addColorStop(0, '#15100c');
        bgGrad.addColorStop(1, '#241711');
      } else if (epochId === 2) {
        bgGrad.addColorStop(0, '#1a0d0d');
        bgGrad.addColorStop(1, '#131922');
      } else if (epochId === 3) {
        bgGrad.addColorStop(0, '#0c151c');
        bgGrad.addColorStop(1, '#111a14');
      } else if (epochId === 4) {
        bgGrad.addColorStop(0, '#0d131f');
        bgGrad.addColorStop(1, '#16192b');
      } else if (epochId === 5) {
        bgGrad.addColorStop(0, '#170e20');
        bgGrad.addColorStop(1, '#1c1611');
      } else if (epochId === 6) {
        bgGrad.addColorStop(0, '#0b1914');
        bgGrad.addColorStop(1, '#151e18');
      } else {
        bgGrad.addColorStop(0, '#071626');
        bgGrad.addColorStop(1, '#0e2333');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Render Epoch-specific dynamic scene
      if (epochId === 1) {
        renderEpoch1(ctx, w, h, time, simState);
      } else if (epochId === 2) {
        renderEpoch2(ctx, w, h, time, simState);
      } else if (epochId === 3) {
        renderEpoch3(ctx, w, h, time, simState);
      } else if (epochId === 4) {
        renderEpoch4(ctx, w, h, time, simState);
      } else if (epochId === 5) {
        renderEpoch5(ctx, w, h, time, simState);
      } else if (epochId === 6) {
        renderEpoch6(ctx, w, h, time, simState);
      } else {
        renderEpoch7(ctx, w, h, time, simState, isSuccess);
      }

      // Render floating ambient particles
      ctx.save();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [epochId, simState, isSuccess]);

  return (
    <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden border-2 border-stone-800 shadow-2xl bg-black/40">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      <div className="absolute bottom-2 right-3 pointer-events-none text-[11px] font-mono tracking-wider text-amber-200/60 uppercase bg-black/40 px-2 py-0.5 border border-amber-500/30">
        MÔ PHỎNG VẬN ĐỘNG LỊCH SỬ · LIVE SIMULATION
      </div>
    </div>
  );
}

// ----------------- EPOCH 1: CỖ MÁY BIỆN CHỨNG 1848 -----------------
function renderEpoch1(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const isJammed = sim.jammed;
  const meshRate = sim.gearMeshRatio || 0;
  const rotSpeed = isJammed ? 0 : 0.8 * (0.3 + meshRate * 0.7);

  // Background furnace glow
  const furnaceGrad = ctx.createRadialGradient(cx, cy + 60, 20, cx, cy + 60, 160);
  furnaceGrad.addColorStop(0, isJammed ? 'rgba(220, 38, 38, 0.45)' : 'rgba(217, 119, 6, 0.35)');
  furnaceGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = furnaceGrad;
  ctx.fillRect(0, 0, w, h);

  // Draw steam / smoke puffs
  ctx.save();
  for (let i = 0; i < 6; i++) {
    const steamY = cy - 40 - ((time * 40 + i * 35) % 140);
    const steamX = cx - 120 + Math.sin(time + i) * 20;
    const steamRadius = 15 + ((time * 40 + i * 35) % 140) * 0.25;
    const alpha = Math.max(0, 0.35 - (cy - 40 - steamY) / 140);
    ctx.fillStyle = isJammed ? `rgba(180, 50, 50, ${alpha})` : `rgba(200, 200, 210, ${alpha * 0.7})`;
    ctx.beginPath();
    ctx.arc(steamX, steamY, steamRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Steam pipe
  ctx.strokeStyle = '#574838';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 120, cy + 70);
  ctx.lineTo(cx - 120, cy - 30);
  ctx.stroke();

  // Metallic joint
  ctx.fillStyle = '#b49463';
  ctx.beginPath();
  ctx.arc(cx - 120, cy - 30, 12, 0, Math.PI * 2);
  ctx.fill();

  // Draw 3 Interlocking Gears
  // Gear A: Lực Lượng Sản Xuất (Big, Left)
  drawGear(ctx, cx - 80, cy, 60, 14, time * rotSpeed, '#c5a059', '#856427', 'LLSX');
  // Gear B: Quan Hệ Sản Xuất (Middle-Right)
  drawGear(ctx, cx + 30, cy - 25, 48, 12, -time * rotSpeed * 1.25 + 0.3, '#d4af37', '#997321', 'QHSX');
  // Gear C: Ý Thức Lý Luận (Bottom-Right)
  drawGear(ctx, cx + 65, cy + 50, 42, 10, time * rotSpeed * 1.4, '#b45309', '#78350f', 'LÝ LUẬN');

  // Piston shaft
  const pistonOffset = isJammed ? 0 : Math.sin(time * rotSpeed * 2) * 25;
  ctx.strokeStyle = '#856e52';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(cx - 80, cy);
  ctx.lineTo(cx - 80 - 70 + pistonOffset, cy + 55);
  ctx.stroke();

  // Sparks if jammed or engaged
  if (isJammed) {
    ctx.save();
    for (let s = 0; s < 12; s++) {
      const sparkX = cx - 20 + (Math.random() - 0.5) * 40;
      const sparkY = cy - 10 + (Math.random() - 0.5) * 40;
      ctx.fillStyle = Math.random() > 0.5 ? '#ef4444' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 1.5 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (meshRate > 0.8) {
    // Golden resonance energy rays
    ctx.save();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx - 80, cy, 75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawGear(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  teeth: number,
  angle: number,
  fillColor: string,
  strokeColor: string,
  label: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3;

  const toothDepth = radius * 0.16;
  const toothWidth = (Math.PI * 2) / (teeth * 2);

  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a1 = i * (Math.PI * 2) / teeth;
    const a2 = a1 + toothWidth;
    const a3 = a1 + (Math.PI * 2) / teeth;

    const rOuter = radius + toothDepth;
    const rInner = radius - toothDepth;

    const x1 = Math.cos(a1) * rInner;
    const y1 = Math.sin(a1) * rInner;
    const x2 = Math.cos(a1 + toothWidth * 0.4) * rOuter;
    const y2 = Math.sin(a1 + toothWidth * 0.4) * rOuter;
    const x3 = Math.cos(a2 - toothWidth * 0.4) * rOuter;
    const y3 = Math.sin(a2 - toothWidth * 0.4) * rOuter;
    const x4 = Math.cos(a2) * rInner;
    const y4 = Math.sin(a2) * rInner;

    if (i === 0) ctx.moveTo(x1, y1);
    else ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center axle
  ctx.fillStyle = '#1c150c';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Spoke holes
  for (let s = 0; s < 4; s++) {
    const sa = (s * Math.PI) / 2;
    const sx = Math.cos(sa) * (radius * 0.6);
    const sy = Math.sin(sa) * (radius * 0.6);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.arc(sx, sy, radius * 0.12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // Gear text label (non-rotating)
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy);
}

// ----------------- EPOCH 2: MẠNG LƯỚI SỨ MỆNH TIÊN PHONG 1917 -----------------
function renderEpoch2(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const connected = sim.connectedNodes || [];

  // Factory silhouette in background
  ctx.fillStyle = 'rgba(20, 26, 36, 0.7)';
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h - 50);
  ctx.lineTo(w * 0.15, h - 80);
  ctx.lineTo(w * 0.25, h - 50);
  ctx.lineTo(w * 0.4, h - 90);
  ctx.lineTo(w * 0.5, h - 60);
  ctx.lineTo(w * 0.7, h - 110);
  ctx.lineTo(w * 0.85, h - 65);
  ctx.lineTo(w, h - 75);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Nodes definition
  const nodes = [
    { id: 0, x: cx, y: cy, label: 'ĐẢNG TIÊN PHONG', isCenter: true },
    { id: 1, x: cx - 140, y: cy - 40, label: 'Công Nhân Luyện Kim' },
    { id: 2, x: cx + 130, y: cy - 50, label: 'Nghiệp Đoàn Đường Sắt' },
    { id: 3, x: cx - 110, y: cy + 55, label: 'Báo Chí Cách Mạng' },
    { id: 4, x: cx + 120, y: cy + 45, label: 'Thợ Mỏ & Năng Lượng' },
    { id: 5, x: cx, y: cy - 85, label: 'Liên Minh Nông Dân' }
  ];

  // Draw connections to center
  nodes.forEach(node => {
    if (node.isCenter) return;
    const isConn = connected.includes(node.id);

    ctx.strokeStyle = isConn ? 'rgba(239, 68, 68, 0.8)' : 'rgba(100, 116, 139, 0.25)';
    ctx.lineWidth = isConn ? 3 : 1.5;
    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    // Moving pulse if connected
    if (isConn) {
      const prog = (time * 1.5 + node.id * 0.3) % 1;
      const px = node.x + (cx - node.x) * prog;
      const py = node.y + (cy - node.y) * prog;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw Nodes
  nodes.forEach(node => {
    const isConn = connected.includes(node.id) || node.isCenter;
    const r = node.isCenter ? 26 : 18;

    // Outer glow
    if (isConn) {
      ctx.fillStyle = node.isCenter ? 'rgba(220, 38, 38, 0.35)' : 'rgba(245, 158, 11, 0.25)';
      ctx.beginPath();
      ctx.arc(node.x, node.y, r + 8 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = isConn ? (node.isCenter ? '#991b1b' : '#b45309') : '#334155';
    ctx.strokeStyle = isConn ? '#fbbf24' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Node icon/symbol (drawn cleanly with canvas paths)
    if (node.isCenter) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      for (let s = 0; s < 5; s++) {
        const a1 = (s * Math.PI * 2) / 5 - Math.PI / 2;
        const a2 = a1 + Math.PI / 5;
        const r1 = 11;
        const r2 = 5;
        if (s === 0) ctx.moveTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        else ctx.lineTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        ctx.lineTo(node.x + Math.cos(a2) * r2, node.y + Math.sin(a2) * r2);
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 7.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Label below
    ctx.fillStyle = isConn ? '#fef08a' : '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.fillText(node.label, node.x, node.y + r + 13);
  });
}

// ----------------- EPOCH 3: CÂN BẰNG KINH TẾ QUÁ ĐỘ (1921-1986) -----------------
function renderEpoch3(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const stateR = sim.stateRatio ?? 50;
  const marketR = sim.marketRatio ?? 30;
  const welfareR = sim.welfareRatio ?? 20;

  // Draw real-time macro-economic sinusoidal wave (Growth vs Equilibrium)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  for (let y = 30; y < h; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Wave 1: Dynamic Market Output
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (marketR / 100) * 35;
    const freq = 0.02 + (stateR / 100) * 0.01;
    const y = h * 0.45 + Math.sin(x * freq + time * 2) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Wave 2: Social Equity & Stability
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (welfareR / 100) * 25;
    const y = h * 0.6 + Math.cos(x * 0.015 - time * 1.5) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Dynamic Infrastructure visualizer bars
  const barY = h - 55;
  const barW = (w - 80) / 3;

  // Column 1: Nhà nước Chủ đạo
  drawEcoBar(ctx, 40, barY, barW, stateR, '#dc2626', 'Kinh Tế Nhà Nước Chủ Đạo');
  // Column 2: Kinh tế Tư nhân & Hợp tác
  drawEcoBar(ctx, 40 + barW + 15, barY, barW, marketR, '#059669', 'Kinh Tế Thị Trường Năng Động');
  // Column 3: Quỹ An Sinh Xã Hội
  drawEcoBar(ctx, 40 + (barW + 15) * 2, barY, barW, welfareR, '#d97706', 'Phúc Lợi & Công Bằng XH');
}

function drawEcoBar(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, val: number, color: string, label: string) {
  const barH = 14;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(x, y, width, barH);

  ctx.fillStyle = color;
  const fillW = (val / 100) * width;
  ctx.fillRect(x, y, fillW, barH);

  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.strokeRect(x, y, width, barH);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${label}: ${Math.round(val)}%`, x, y - 5);
}

// ----------------- EPOCH 4: TRỤ CỘT DÂN CHỦ PHÁP QUYỀN -----------------
function renderEpoch4(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const activePillars = sim.activePillars || [];

  // Pediment Temple Top
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 160, 50);
  ctx.lineTo(cx, 18);
  ctx.lineTo(cx + 160, 50);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Emblem of Law in pediment
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA', cx, 40);

  // Architrave beam
  ctx.fillStyle = '#334155';
  ctx.fillRect(cx - 160, 50, 320, 16);
  ctx.strokeRect(cx - 160, 50, 320, 16);

  // 4 Pillars
  const pillarTitles = ['DÂN BIẾT', 'DÂN BÀN', 'DÂN LÀM & GIÁM SÁT', 'DÂN THỤ HƯỞNG'];
  const pillarW = 46;
  const pillarH = h - 130;
  const spacing = 72;
  const startX = cx - (3 * spacing) / 2;

  for (let i = 0; i < 4; i++) {
    const px = startX + i * spacing;
    const py = 66;
    const isActive = activePillars.includes(i);

    // Pillar Glow if active
    if (isActive) {
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.fillRect(px - pillarW / 2 - 4, py, pillarW + 8, pillarH);
    }

    ctx.fillStyle = isActive ? '#946c1e' : '#1e293b';
    ctx.strokeStyle = isActive ? '#fbbf24' : '#475569';
    ctx.lineWidth = 2;
    ctx.fillRect(px - pillarW / 2, py, pillarW, pillarH);
    ctx.strokeRect(px - pillarW / 2, py, pillarW, pillarH);

    // Fluting lines
    ctx.strokeStyle = isActive ? 'rgba(254, 240, 138, 0.4)' : 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let f = -12; f <= 12; f += 8) {
      ctx.beginPath();
      ctx.moveTo(px + f, py + 8);
      ctx.lineTo(px + f, py + pillarH - 8);
      ctx.stroke();
    }

    // Capital & Base
    ctx.fillStyle = isActive ? '#d4af37' : '#334155';
    ctx.fillRect(px - pillarW / 2 - 4, py, pillarW + 8, 8);
    ctx.fillRect(px - pillarW / 2 - 4, py + pillarH - 8, pillarW + 8, 8);

    // Label on pillar
    ctx.save();
    ctx.translate(px, py + pillarH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = isActive ? '#ffffff' : '#94a3b8';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pillarTitles[i], 0, 3);
    ctx.restore();
  }

  // Base platform
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.fillRect(cx - 180, h - 60, 360, 24);
  ctx.strokeRect(cx - 180, h - 60, 360, 24);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NỀN TẢNG: MỌI QUYỀN LỰC THUỘC VỀ NHÂN DÂN', cx, h - 44);
}

// ----------------- EPOCH 5: HÒA ÂM SẮC TỘC & TÍN NGƯỠNG -----------------
function renderEpoch5(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const sync = sim.frequencySync ?? 50;

  // Concentric Mandala Circles of Unity
  const rings = [40, 75, 110];
  rings.forEach((r, idx) => {
    ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 + idx * 0.15})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    // Rotating petals / spokes
    const count = 12 + idx * 6;
    const rotSpeed = (idx % 2 === 0 ? 1 : -1) * 0.3;
    for (let i = 0; i < count; i++) {
      const a = (i * Math.PI * 2) / count + time * rotSpeed;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;

      ctx.fillStyle = idx === 0 ? '#ef4444' : idx === 1 ? '#eab308' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Central Lotus Star of Unity
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(time * 0.2);
  ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    const rOuter = 32;
    const rInner = 14;
    const xO = Math.cos(a) * rOuter;
    const yO = Math.sin(a) * rOuter;
    const xI = Math.cos(a + Math.PI / 8) * rInner;
    const yI = Math.sin(a + Math.PI / 8) * rInner;
    if (i === 0) ctx.moveTo(xO, yO);
    else ctx.lineTo(xO, yO);
    ctx.lineTo(xI, yI);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Central Core Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('54 DÂN TỘC', cx, cy - 4);
  ctx.font = '9px sans-serif';
  ctx.fillText('ĐỒNG BÀO', cx, cy + 8);

  // Status banner
  ctx.fillStyle = sync > 75 ? '#22c55e' : '#f59e0b';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`MỨC ĐỘ ĐỒNG THUẬN & HÒA HỢP: ${Math.round(sync)}%`, cx, h - 20);
}

// ----------------- EPOCH 6: CÂY SỰ SỐNG GIA ĐÌNH MỚI -----------------
function renderEpoch6(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const growth = (sim.treeGrowth ?? 50) / 100;

  // Bioluminescent Tree Trunk
  ctx.strokeStyle = '#4d7c0f';
  ctx.lineWidth = 14 * (0.6 + growth * 0.4);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, h - 30);
  ctx.quadraticCurveTo(cx - 15, h - 100, cx, h - 140 * growth);
  ctx.stroke();

  // Branches
  const drawBranch = (startX: number, startY: number, len: number, angle: number, depth: number) => {
    if (depth <= 0) return;
    const endX = startX + Math.cos(angle + Math.sin(time + depth) * 0.05) * len;
    const endY = startY - Math.sin(angle) * len;

    ctx.strokeStyle = depth === 2 ? '#65a30d' : '#84cc16';
    ctx.lineWidth = depth * 3.5;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Blossoms / Lanterns representing happy households
    if (depth === 1) {
      ctx.fillStyle = 'rgba(236, 72, 153, 0.75)';
      ctx.beginPath();
      ctx.arc(endX, endY, 6 + Math.sin(time * 2 + endX) * 2, 0, Math.PI * 2);
      ctx.fill();

      // Glowing golden heart/center core
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    drawBranch(endX, endY, len * 0.72, angle - 0.5, depth - 1);
    drawBranch(endX, endY, len * 0.72, angle + 0.5, depth - 1);
  };

  drawBranch(cx, h - 140 * growth, 65 * growth, Math.PI / 2, 3);

  // Ground Roots
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx, h - 30);
  ctx.lineTo(cx - 50, h - 15);
  ctx.moveTo(cx, h - 30);
  ctx.lineTo(cx + 50, h - 15);
  ctx.stroke();

  // Foundation banner
  ctx.fillStyle = '#a3e635';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GIA ĐÌNH BÌNH ĐẲNG, TIẾN BỘ · TẾ BÀO LÀNH MẠNH CỦA XÃ HỘI', cx, h - 10);
}

// ----------------- EPOCH 7: ĐẠI ĐÔ THỊ UTOPIA 2084 -----------------
function renderEpoch7(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState'], isSuccess?: boolean) {
  const cx = w / 2;
  const cy = h / 2;
  const act = (sim.activationPercent ?? (isSuccess ? 100 : 70)) / 100;

  // Sky Aurora
  const aurora = ctx.createLinearGradient(0, 0, w, 100);
  aurora.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
  aurora.addColorStop(0.5, 'rgba(168, 85, 247, 0.3)');
  aurora.addColorStop(1, 'rgba(16, 185, 129, 0.25)');
  ctx.fillStyle = aurora;
  ctx.fillRect(0, 0, w, 140);

  // Futuristic Socialist-Modernist Skyline
  const buildings = [
    { x: w * 0.08, w: 55, h: 160, spire: 30 },
    { x: w * 0.22, w: 75, h: 210, spire: 50 },
    { x: w * 0.38, w: 90, h: 250, spire: 60, isCentral: true },
    { x: w * 0.60, w: 80, h: 200, spire: 40 },
    { x: w * 0.78, w: 60, h: 150, spire: 25 },
  ];

  buildings.forEach(b => {
    const bx = b.x;
    const by = h - b.h;
    // Tower body
    const towerGrad = ctx.createLinearGradient(bx, by, bx + b.w, by + b.h);
    towerGrad.addColorStop(0, '#1e293b');
    towerGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = towerGrad;
    ctx.fillRect(bx, by, b.w, b.h);

    // Glowing window grids
    ctx.fillStyle = act > 0.8 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(251, 191, 36, 0.5)';
    for (let r = by + 20; r < h - 20; r += 14) {
      for (let c = bx + 8; c < bx + b.w - 8; c += 10) {
        if (Math.sin(c * r + time) > -0.3) {
          ctx.fillRect(c, r, 5, 8);
        }
      }
    }

    // Glowing Spire
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + b.w / 2, by);
    ctx.lineTo(bx + b.w / 2, by - b.spire);
    ctx.stroke();

    // Spire beacon
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(bx + b.w / 2, by - b.spire, 3 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Connecting Skybridges with Light Pulses
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.22 + 75, h - 140);
  ctx.lineTo(w * 0.38, h - 160);
  ctx.moveTo(w * 0.38 + 90, h - 160);
  ctx.lineTo(w * 0.60, h - 130);
  ctx.stroke();

  // Flying solar transit pod (maglev transport)
  const podProg = (time * 0.3) % 1;
  const podX = w * podProg;
  const podY = 60 + Math.sin(time) * 8;
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(podX, podY, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Central GAIA Harmony Core Pulsing Above Metropolis
  ctx.save();
  const gaiaGrad = ctx.createRadialGradient(cx, 80, 10, cx, 80, 70);
  gaiaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
  gaiaGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
  gaiaGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gaiaGrad;
  ctx.fillRect(cx - 100, 10, 200, 140);

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, 80, 26 + Math.sin(time * 2) * 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAIA 2084', cx, 84);
  ctx.restore();

  // Bottom Banner
  ctx.fillStyle = '#38bdf8';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MỤC TIÊU: DÂN GIÀU, NƯỚC MẠNH, DÂN CHỦ, CÔNG BẰNG, VĂN MINH', cx, h - 12);
}
