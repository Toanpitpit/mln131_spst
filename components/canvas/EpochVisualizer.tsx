'use client';

import React, { useEffect, useRef } from 'react';
import { EPOCHS } from '@/lib/gameData';

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
  const currentEpochData = EPOCHS.find(e => e.id === epochId) || EPOCHS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dynamic ambient particle engine
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }> = [];
    const particleCount = 50;
    const epochHueMap: Record<number, number> = { 1: 35, 2: 0, 3: 155, 4: 210, 5: 45, 6: 320, 7: 185 };
    const hue = epochHueMap[epochId] || 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 450,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.6,
        size: 1.5 + Math.random() * 3,
        alpha: 0.2 + Math.random() * 0.6,
        hue: hue + (Math.random() - 0.5) * 30
      });
    }

    const render = () => {
      time += 0.025;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Background Gradient according to Epoch Theme
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (epochId === 1) {
        bgGrad.addColorStop(0, '#1c130b');
        bgGrad.addColorStop(1, '#0c0a08');
      } else if (epochId === 2) {
        bgGrad.addColorStop(0, '#220b0b');
        bgGrad.addColorStop(1, '#0d090a');
      } else if (epochId === 3) {
        bgGrad.addColorStop(0, '#0a1a14');
        bgGrad.addColorStop(1, '#070f0b');
      } else if (epochId === 4) {
        bgGrad.addColorStop(0, '#0b1628');
        bgGrad.addColorStop(1, '#070b14');
      } else if (epochId === 5) {
        bgGrad.addColorStop(0, '#211808');
        bgGrad.addColorStop(1, '#0e0b06');
      } else if (epochId === 6) {
        bgGrad.addColorStop(0, '#1c0a17');
        bgGrad.addColorStop(1, '#0d060b');
      } else {
        bgGrad.addColorStop(0, '#061a24');
        bgGrad.addColorStop(1, '#040b10');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Render Epoch-specific scene
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

      // Render floating ambient glowing particles
      ctx.save();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 50%, 0.8)`;
        ctx.shadowBlur = 8;
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
    <div className={`relative w-full h-[280px] md:h-[340px] overflow-hidden rounded-xl border-2 ${currentEpochData.accentBorder} shadow-2xl bg-black/60 group`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
      />
      <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-amber-200 font-bold">MÔ PHỎNG VẬN ĐỘNG LỊCH SỬ</span>
      </div>
      <div className="absolute bottom-3 right-3 pointer-events-none text-[11px] font-mono tracking-widest text-amber-300/80 uppercase bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-500/30">
        CHƯƠNG {epochId} · LIVE SIMULATION
      </div>
    </div>
  );
}

// ----------------- EPOCH 1: 1848 DIALECTICAL GEAR MECHANISM -----------------
function renderEpoch1(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const isJammed = sim.jammed;
  const meshRate = sim.gearMeshRatio || 0;
  const rotSpeed = isJammed ? 0 : 0.9 * (0.3 + meshRate * 0.7);

  // Background furnace glow
  const furnaceGrad = ctx.createRadialGradient(cx, cy + 50, 10, cx, cy + 50, 180);
  furnaceGrad.addColorStop(0, isJammed ? 'rgba(239, 68, 68, 0.45)' : 'rgba(245, 158, 11, 0.35)');
  furnaceGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = furnaceGrad;
  ctx.fillRect(0, 0, w, h);

  // Industrial steam puffs
  ctx.save();
  for (let i = 0; i < 7; i++) {
    const steamY = cy - 30 - ((time * 45 + i * 30) % 150);
    const steamX = cx - 130 + Math.sin(time * 1.5 + i) * 22;
    const steamRadius = 16 + ((time * 45 + i * 30) % 150) * 0.28;
    const alpha = Math.max(0, 0.4 - (cy - 30 - steamY) / 150);
    ctx.fillStyle = isJammed ? `rgba(220, 38, 38, ${alpha})` : `rgba(220, 210, 195, ${alpha * 0.8})`;
    ctx.beginPath();
    ctx.arc(steamX, steamY, steamRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Draw 3 Interlocking Metallic Gears
  drawGear(ctx, cx - 85, cy, 64, 14, time * rotSpeed, '#d97706', '#78350f', 'LLSX');
  drawGear(ctx, cx + 35, cy - 30, 50, 12, -time * rotSpeed * 1.28 + 0.3, '#f59e0b', '#92400e', 'QHSX');
  drawGear(ctx, cx + 70, cy + 52, 44, 10, time * rotSpeed * 1.45, '#b45309', '#451a03', 'LÝ LUẬN');

  // Sparks if jammed or engaged
  if (isJammed) {
    ctx.save();
    for (let s = 0; s < 16; s++) {
      const sparkX = cx - 20 + (Math.random() - 0.5) * 50;
      const sparkY = cy - 10 + (Math.random() - 0.5) * 50;
      ctx.fillStyle = Math.random() > 0.5 ? '#ef4444' : '#f59e0b';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 2 + Math.random() * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (meshRate > 0.8) {
    ctx.save();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 12;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(cx - 85, cy, 80, 0, Math.PI * 2);
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
  ctx.lineWidth = 3.5;
  ctx.shadowColor = fillColor;
  ctx.shadowBlur = 8;

  const toothDepth = radius * 0.17;
  const toothWidth = (Math.PI * 2) / (teeth * 2);

  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const a1 = i * (Math.PI * 2) / teeth;
    const a2 = a1 + toothWidth;
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

  // Axle center
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();

  // Center text label
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy);
}

// ----------------- EPOCH 2: 1917 VANGUARD WORKER NETWORK -----------------
function renderEpoch2(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const connected = sim.connectedNodes || [];

  const nodes = [
    { id: 0, x: cx, y: cy, label: 'ĐẢNG TIÊN PHONG', isCenter: true },
    { id: 1, x: cx - 145, y: cy - 45, label: 'Công Nhân Luyện Kim' },
    { id: 2, x: cx + 135, y: cy - 55, label: 'Nghiệp Đoàn Đường Sắt' },
    { id: 3, x: cx - 120, y: cy + 55, label: 'Báo Chí Cách Mạng' },
    { id: 4, x: cx + 125, y: cy + 50, label: 'Thợ Mỏ & Năng Lượng' },
    { id: 5, x: cx, y: cy - 90, label: 'Liên Minh Nông Dân' }
  ];

  // Draw connections to center
  nodes.forEach(node => {
    if (node.isCenter) return;
    const isConn = connected.includes(node.id);

    ctx.strokeStyle = isConn ? '#ef4444' : 'rgba(100, 116, 139, 0.3)';
    ctx.lineWidth = isConn ? 3.5 : 1.5;
    ctx.shadowColor = isConn ? '#ef4444' : 'transparent';
    ctx.shadowBlur = isConn ? 10 : 0;

    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    if (isConn) {
      const prog = (time * 1.8 + node.id * 0.4) % 1;
      const px = node.x + (cx - node.x) * prog;
      const py = node.y + (cy - node.y) * prog;
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw Nodes
  nodes.forEach(node => {
    const isConn = connected.includes(node.id) || node.isCenter;
    const r = node.isCenter ? 28 : 19;

    ctx.fillStyle = isConn ? (node.isCenter ? '#dc2626' : '#d97706') : '#334155';
    ctx.strokeStyle = isConn ? '#fef08a' : '#64748b';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = isConn ? (node.isCenter ? '#dc2626' : '#f59e0b') : 'transparent';
    ctx.shadowBlur = isConn ? 14 : 0;

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (node.isCenter) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      for (let s = 0; s < 5; s++) {
        const a1 = (s * Math.PI * 2) / 5 - Math.PI / 2;
        const a2 = a1 + Math.PI / 5;
        const r1 = 12;
        const r2 = 5.5;
        if (s === 0) ctx.moveTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        else ctx.lineTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        ctx.lineTo(node.x + Math.cos(a2) * r2, node.y + Math.sin(a2) * r2);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = isConn ? '#fef08a' : '#cbd5e1';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x, node.y + r + 14);
  });
}

// ----------------- EPOCH 3: 1921-1986 MACROECONOMIC BALANCE -----------------
function renderEpoch3(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const stateR = sim.stateRatio ?? 50;
  const marketR = sim.marketRatio ?? 30;
  const welfareR = sim.welfareRatio ?? 20;

  // Wave 1: Market Output Wave
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3.5;
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (marketR / 100) * 38;
    const y = h * 0.42 + Math.sin(x * 0.02 + time * 2) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Wave 2: Welfare Stability Wave
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 8;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (welfareR / 100) * 28;
    const y = h * 0.58 + Math.cos(x * 0.016 - time * 1.6) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Bottom Progress Bars
  const barY = h - 50;
  const barW = (w - 80) / 3;

  drawEcoBar(ctx, 40, barY, barW, stateR, '#ef4444', 'Kinh Tế Nhà Nước');
  drawEcoBar(ctx, 40 + barW + 15, barY, barW, marketR, '#10b981', 'Kinh Tế Thị Trường');
  drawEcoBar(ctx, 40 + (barW + 15) * 2, barY, barW, welfareR, '#f59e0b', 'Phúc Lợi An Sinh');
}

function drawEcoBar(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, val: number, color: string, label: string) {
  const barH = 14;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(x, y, width, barH);

  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  const fillW = (val / 100) * width;
  ctx.fillRect(x, y, fillW, barH);

  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${label}: ${Math.round(val)}%`, x, y - 5);
}

// ----------------- EPOCH 4: RULE OF LAW PILLARS -----------------
function renderEpoch4(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const activePillars = sim.activePillars || [];

  // Pediment Temple Top
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 170, 52);
  ctx.lineTo(cx, 18);
  ctx.lineTo(cx + 170, 52);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#60a5fa';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM', cx, 42);

  // 4 Pillars
  const pillarTitles = ['DÂN BIẾT', 'DÂN BÀN', 'DÂN LÀM & GIÁM SÁT', 'DÂN THỤ HƯỞNG'];
  const pillarW = 48;
  const pillarH = h - 130;
  const spacing = 76;
  const startX = cx - (3 * spacing) / 2;

  for (let i = 0; i < 4; i++) {
    const px = startX + i * spacing;
    const py = 68;
    const isActive = activePillars.includes(i);

    ctx.fillStyle = isActive ? '#1d4ed8' : '#1e293b';
    ctx.strokeStyle = isActive ? '#93c5fd' : '#475569';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = isActive ? '#3b82f6' : 'transparent';
    ctx.shadowBlur = isActive ? 12 : 0;

    ctx.fillRect(px - pillarW / 2, py, pillarW, pillarH);
    ctx.strokeRect(px - pillarW / 2, py, pillarW, pillarH);

    ctx.save();
    ctx.translate(px, py + pillarH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = isActive ? '#ffffff' : '#94a3b8';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pillarTitles[i], 0, 3);
    ctx.restore();
  }

  // Base platform
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.fillRect(cx - 190, h - 55, 380, 24);
  ctx.strokeRect(cx - 190, h - 55, 380, 24);
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NỀN TẢNG: TẤT CẢ QUYỀN LỰC NHÀ NƯỚC THUỘC VỀ NHÂN DÂN', cx, h - 39);
}

// ----------------- EPOCH 5: ETHNIC & BELIEF HARMONY MANDALA -----------------
function renderEpoch5(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const cy = h / 2;
  const sync = sim.frequencySync ?? 50;

  const rings = [42, 80, 118];
  rings.forEach((r, idx) => {
    ctx.strokeStyle = `rgba(234, 179, 8, ${0.3 + idx * 0.2})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const count = 12 + idx * 6;
    const rotSpeed = (idx % 2 === 0 ? 1 : -1) * 0.35;
    for (let i = 0; i < count; i++) {
      const a = (i * Math.PI * 2) / count + time * rotSpeed;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;

      ctx.fillStyle = idx === 0 ? '#ef4444' : idx === 1 ? '#eab308' : '#3b82f6';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('54 DÂN TỘC ANH EM', cx, cy - 3);
  ctx.font = '10px sans-serif';
  ctx.fillText('ĐẠI ĐOÀN KẾT TOÀN DÂN', cx, cy + 10);

  ctx.fillStyle = sync > 75 ? '#4ade80' : '#facc15';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText(`MỨC ĐỘ ĐỒNG THUẬN & HÒA HỢP: ${Math.round(sync)}%`, cx, h - 18);
}

// ----------------- EPOCH 6: BIOLUMINESCENT FAMILY LIFE TREE -----------------
function renderEpoch6(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState']) {
  const cx = w / 2;
  const growth = (sim.treeGrowth ?? 50) / 100;

  ctx.strokeStyle = '#84cc16';
  ctx.lineWidth = 15 * (0.6 + growth * 0.4);
  ctx.lineCap = 'round';
  ctx.shadowColor = '#84cc16';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(cx, h - 30);
  ctx.quadraticCurveTo(cx - 15, h - 100, cx, h - 145 * growth);
  ctx.stroke();

  const drawBranch = (startX: number, startY: number, len: number, angle: number, depth: number) => {
    if (depth <= 0) return;
    const endX = startX + Math.cos(angle + Math.sin(time * 1.5 + depth) * 0.06) * len;
    const endY = startY - Math.sin(angle) * len;

    ctx.strokeStyle = depth === 2 ? '#65a30d' : '#a3e635';
    ctx.lineWidth = depth * 3.8;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (depth === 1) {
      ctx.fillStyle = 'rgba(236, 72, 153, 0.85)';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(endX, endY, 7 + Math.sin(time * 2 + endX) * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(endX, endY, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    drawBranch(endX, endY, len * 0.72, angle - 0.5, depth - 1);
    drawBranch(endX, endY, len * 0.72, angle + 0.5, depth - 1);
  };

  drawBranch(cx, h - 145 * growth, 68 * growth, Math.PI / 2, 3);

  ctx.fillStyle = '#f472b6';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GIA ĐÌNH VĂN MINH MỚI · TẾ BÀO LÀNH MẠNH CỦA XÃ HỘI', cx, h - 12);
}

// ----------------- EPOCH 7: UTOPIA 2084 METROPOLIS & GAIA CORE -----------------
function renderEpoch7(ctx: CanvasRenderingContext2D, w: number, h: number, time: number, sim: VisualizerProps['simState'], isSuccess?: boolean) {
  const cx = w / 2;
  const act = (sim.activationPercent ?? (isSuccess ? 100 : 70)) / 100;

  // Sky Aurora Rays
  const aurora = ctx.createLinearGradient(0, 0, w, 120);
  aurora.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
  aurora.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)');
  aurora.addColorStop(1, 'rgba(16, 185, 129, 0.35)');
  ctx.fillStyle = aurora;
  ctx.fillRect(0, 0, w, 150);

  // Futuristic Socialist-Modernist Skyscrapers
  const buildings = [
    { x: w * 0.08, w: 58, h: 170, spire: 35 },
    { x: w * 0.22, w: 78, h: 220, spire: 55 },
    { x: w * 0.38, w: 94, h: 260, spire: 65 },
    { x: w * 0.60, w: 84, h: 210, spire: 45 },
    { x: w * 0.78, w: 62, h: 160, spire: 30 },
  ];

  buildings.forEach(b => {
    const bx = b.x;
    const by = h - b.h;

    const towerGrad = ctx.createLinearGradient(bx, by, bx + b.w, by + b.h);
    towerGrad.addColorStop(0, '#0f172a');
    towerGrad.addColorStop(1, '#020617');
    ctx.fillStyle = towerGrad;
    ctx.fillRect(bx, by, b.w, b.h);

    ctx.fillStyle = act > 0.8 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(251, 191, 36, 0.6)';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    for (let r = by + 20; r < h - 20; r += 14) {
      for (let c = bx + 8; c < bx + b.w - 8; c += 10) {
        if (Math.sin(c * r + time) > -0.2) {
          ctx.fillRect(c, r, 5, 8);
        }
      }
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + b.w / 2, by);
    ctx.lineTo(bx + b.w / 2, by - b.spire);
    ctx.stroke();
  });

  // Maglev Flying Pod
  const podProg = (time * 0.35) % 1;
  const podX = w * podProg;
  const podY = 65 + Math.sin(time * 1.5) * 10;
  ctx.fillStyle = '#38bdf8';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.ellipse(podX, podY, 15, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Floating GAIA Core
  ctx.save();
  const gaiaGrad = ctx.createRadialGradient(cx, 85, 10, cx, 85, 75);
  gaiaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
  gaiaGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
  gaiaGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gaiaGrad;
  ctx.fillRect(cx - 110, 10, 220, 150);

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = '#fef08a';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(cx, 85, 28 + Math.sin(time * 2.5) * 3.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAIA UTOPIA 2084', cx, 89);
  ctx.restore();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MỤC TIÊU: DÂN GIÀU, NƯỚC MẠNH, DÂN CHỦ, CÔNG BẰNG, VĂN MINH', cx, h - 12);
}
