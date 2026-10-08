'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EPOCHS } from '@/lib/gameData';
import { Play, Pause, FastForward, RotateCcw } from 'lucide-react';

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
  const currentEpochData = EPOCHS.find((e) => e.id === epochId) || EPOCHS[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

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
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      hue: number;
    }> = [];
    const particleCount = 45;
    const epochHueMap: Record<number, number> = { 1: 35, 2: 0, 3: 155, 4: 210, 5: 45, 6: 320, 7: 185 };
    const hue = epochHueMap[epochId] || 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 800,
        y: Math.random() * 450,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.6,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.5,
        hue: hue + (Math.random() - 0.5) * 25,
      });
    }

    const render = () => {
      if (isPlaying) {
        time += 0.025 * speedMultiplier;
      }
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Background Gradient according to Epoch Theme
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (epochId === 1) {
        bgGrad.addColorStop(0, '#1a120a');
        bgGrad.addColorStop(1, '#090807');
      } else if (epochId === 2) {
        bgGrad.addColorStop(0, '#1f0a0a');
        bgGrad.addColorStop(1, '#0b0809');
      } else if (epochId === 3) {
        bgGrad.addColorStop(0, '#091712');
        bgGrad.addColorStop(1, '#060d09');
      } else if (epochId === 4) {
        bgGrad.addColorStop(0, '#0a1424');
        bgGrad.addColorStop(1, '#060a12');
      } else if (epochId === 5) {
        bgGrad.addColorStop(0, '#1c1507');
        bgGrad.addColorStop(1, '#0d0a05');
      } else if (epochId === 6) {
        bgGrad.addColorStop(0, '#180914');
        bgGrad.addColorStop(1, '#0c050a');
      } else {
        bgGrad.addColorStop(0, '#05161f');
        bgGrad.addColorStop(1, '#03090e');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle coordinate grid
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }
      ctx.restore();

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

      // Render floating ambient particles
      ctx.save();
      for (const p of particles) {
        if (isPlaying) {
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
        }

        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.alpha})`;
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
  }, [epochId, simState, isSuccess, isPlaying, speedMultiplier]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  // Telemetry indicators
  const getTelemetry = () => {
    if (epochId === 1) {
      return {
        label: 'Tốc độ bánh răng',
        val: simState.jammed ? 'KẸT CỨNG (0 RPM)' : `${Math.round((simState.gearMeshRatio || 0.5) * 120)} RPM`,
      };
    }
    if (epochId === 2) {
      return {
        label: 'Điểm kết nối',
        val: `${(simState.connectedNodes || []).length} / 4 Nút liên minh`,
      };
    }
    if (epochId === 3) {
      return {
        label: 'Cân bằng vĩ mô',
        val: `${simState.stateRatio || 50}% Nhà nước · ${simState.marketRatio || 30}% Thị trường`,
      };
    }
    if (epochId === 4) {
      return {
        label: 'Trụ cột quyền lực',
        val: `${(simState.activePillars || []).length} / 4 Trụ cột đã dựng`,
      };
    }
    if (epochId === 5) {
      return {
        label: 'Tần số hòa hợp',
        val: `${Math.round(simState.frequencySync || 50)} Hz (Đồng bộ)`,
      };
    }
    if (epochId === 6) {
      return {
        label: 'Tăng trưởng cây đời',
        val: `${Math.round(simState.treeGrowth || 40)}% Sức sống`,
      };
    }
    return {
      label: 'Kích hoạt GAIA 2084',
      val: `${Math.round(simState.activationPercent || (isSuccess ? 100 : 70))}% Toàn diện`,
    };
  };

  const telemetry = getTelemetry();

  return (
    <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden rounded-lg border border-stone-800 bg-[#070b12] group">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Top Header Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-auto">
        <div className="flex items-center gap-2 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded border border-stone-800 text-stone-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
          <span className="font-mono text-[11px] text-amber-200">
            Chương {epochId} · Mô Phỏng Biện Chứng
          </span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-2 py-1 rounded border border-stone-800 text-stone-300">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-amber-300 transition-colors cursor-pointer"
            title={isPlaying ? 'Tạm dừng mô phỏng' : 'Tiếp tục mô phỏng'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setSpeedMultiplier(speedMultiplier === 1 ? 2 : 1)}
            className={`px-1.5 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
              speedMultiplier === 2 ? 'bg-amber-400 text-stone-950 font-bold' : 'hover:text-amber-300'
            }`}
            title="Tốc độ mô phỏng"
          >
            {speedMultiplier}x
          </button>
        </div>
      </div>

      {/* Bottom Telemetry & Inspection Readout */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono pointer-events-none text-stone-400">
        <div className="bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-stone-800 flex items-center gap-2">
          <span className="text-stone-500">{telemetry.label}:</span>
          <span className="text-amber-300 font-semibold">{telemetry.val}</span>
        </div>

        {cursorPos && (
          <div className="hidden sm:block bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-stone-800 text-stone-400 text-[10px]">
            Tọa độ: [{cursorPos.x}, {cursorPos.y}]
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------- EPOCH 1: 1848 DIALECTICAL GEAR MECHANISM -----------------
function renderEpoch1(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const cx = w / 2;
  const cy = h / 2;
  const isJammed = sim.jammed;
  const meshRate = sim.gearMeshRatio || 0.5;
  const rotSpeed = isJammed ? 0 : 0.9 * (0.3 + meshRate * 0.7);

  // Background furnace glow
  const furnaceGrad = ctx.createRadialGradient(cx, cy + 40, 10, cx, cy + 40, 180);
  furnaceGrad.addColorStop(0, isJammed ? 'rgba(220, 38, 38, 0.35)' : 'rgba(217, 119, 6, 0.25)');
  furnaceGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = furnaceGrad;
  ctx.fillRect(0, 0, w, h);

  // Industrial steam puffs
  ctx.save();
  for (let i = 0; i < 6; i++) {
    const steamY = cy - 20 - ((time * 40 + i * 32) % 140);
    const steamX = cx - 130 + Math.sin(time * 1.4 + i) * 20;
    const steamRadius = 14 + ((time * 40 + i * 32) % 140) * 0.25;
    const alpha = Math.max(0, 0.35 - (cy - 20 - steamY) / 140);
    ctx.fillStyle = isJammed ? `rgba(220, 38, 38, ${alpha})` : `rgba(200, 190, 180, ${alpha * 0.7})`;
    ctx.beginPath();
    ctx.arc(steamX, steamY, steamRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Draw 3 Interlocking Metallic Gears
  drawGear(ctx, cx - 85, cy, 62, 14, time * rotSpeed, '#b45309', '#78350f', 'LLSX');
  drawGear(ctx, cx + 35, cy - 30, 48, 12, -time * rotSpeed * 1.28 + 0.3, '#d97706', '#92400e', 'QHSX');
  drawGear(ctx, cx + 70, cy + 50, 42, 10, time * rotSpeed * 1.45, '#92400e', '#451a03', 'LÝ LUẬN');

  // Sparks if jammed or engaged
  if (isJammed) {
    ctx.save();
    for (let s = 0; s < 14; s++) {
      const sparkX = cx - 20 + (Math.random() - 0.5) * 45;
      const sparkY = cy - 10 + (Math.random() - 0.5) * 45;
      ctx.fillStyle = Math.random() > 0.5 ? '#ef4444' : '#f59e0b';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (meshRate > 0.7) {
    ctx.save();
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(cx - 85, cy, 76, 0, Math.PI * 2);
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
    const a1 = (i * (Math.PI * 2)) / teeth;
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
  ctx.arc(0, 0, radius * 0.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();

  // Center text label
  ctx.fillStyle = '#fef3c7';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy);
}

// ----------------- EPOCH 2: 1917 VANGUARD WORKER NETWORK -----------------
function renderEpoch2(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const cx = w / 2;
  const cy = h / 2;
  const connected = sim.connectedNodes || [];

  const nodes = [
    { id: 0, x: cx, y: cy, label: 'ĐẢNG TIÊN PHONG', isCenter: true },
    { id: 1, x: cx - 140, y: cy - 40, label: 'Công Nhân Đại Công Nghiệp' },
    { id: 2, x: cx + 130, y: cy - 50, label: 'Nghiệp Đoàn & Đoàn Thể' },
    { id: 3, x: cx - 115, y: cy + 50, label: 'Lý Luận & Báo Chí' },
    { id: 4, x: cx + 120, y: cy + 45, label: 'Liên Minh Công - Nông - Trí' },
  ];

  // Draw connections to center
  nodes.forEach((node) => {
    if (node.isCenter) return;
    const isConn = connected.includes(node.id);

    ctx.strokeStyle = isConn ? '#ef4444' : 'rgba(100, 116, 139, 0.25)';
    ctx.lineWidth = isConn ? 3 : 1;

    ctx.beginPath();
    ctx.moveTo(node.x, node.y);
    ctx.lineTo(cx, cy);
    ctx.stroke();

    if (isConn) {
      const prog = (time * 1.6 + node.id * 0.35) % 1;
      const px = node.x + (cx - node.x) * prog;
      const py = node.y + (cy - node.y) * prog;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Draw Nodes
  nodes.forEach((node) => {
    const isConn = connected.includes(node.id) || node.isCenter;
    const r = node.isCenter ? 26 : 18;

    ctx.fillStyle = isConn ? (node.isCenter ? '#dc2626' : '#b45309') : '#1e293b';
    ctx.strokeStyle = isConn ? '#fef08a' : '#475569';
    ctx.lineWidth = 2;

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
        const r1 = 11;
        const r2 = 5;
        if (s === 0) ctx.moveTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        else ctx.lineTo(node.x + Math.cos(a1) * r1, node.y + Math.sin(a1) * r1);
        ctx.lineTo(node.x + Math.cos(a2) * r2, node.y + Math.sin(a2) * r2);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = isConn ? '#fef08a' : '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x, node.y + r + 13);
  });
}

// ----------------- EPOCH 3: 1921-1986 MACROECONOMIC BALANCE -----------------
function renderEpoch3(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const stateR = sim.stateRatio ?? 50;
  const marketR = sim.marketRatio ?? 30;
  const welfareR = sim.welfareRatio ?? 20;

  // Wave 1: Market Activity
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (marketR / 100) * 32;
    const y = h * 0.42 + Math.sin(x * 0.02 + time * 1.8) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Wave 2: Welfare Stability Wave
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 0; x < w; x += 4) {
    const waveAmp = (welfareR / 100) * 26;
    const y = h * 0.58 + Math.cos(x * 0.016 - time * 1.5) * waveAmp;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Bottom Progress Bars
  const barY = h - 45;
  const barW = (w - 70) / 3;

  drawEcoBar(ctx, 35, barY, barW, stateR, '#ef4444', 'Kinh Tế Nhà Nước');
  drawEcoBar(ctx, 35 + barW + 12, barY, barW, marketR, '#10b981', 'Kinh Tế Thị Trường');
  drawEcoBar(ctx, 35 + (barW + 12) * 2, barY, barW, welfareR, '#f59e0b', 'Phúc Lợi An Sinh');
}

function drawEcoBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  val: number,
  color: string,
  label: string
) {
  const barH = 10;
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(x, y, width, barH);

  ctx.fillStyle = color;
  const fillW = (val / 100) * width;
  ctx.fillRect(x, y, fillW, barH);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${label}: ${Math.round(val)}%`, x, y - 4);
}

// ----------------- EPOCH 4: RULE OF LAW PILLARS -----------------
function renderEpoch4(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const cx = w / 2;
  const activePillars = sim.activePillars || [];

  // Pediment Temple Top
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 160, 52);
  ctx.lineTo(cx, 20);
  ctx.lineTo(cx + 160, 52);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA VIỆT NAM', cx, 42);

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

    ctx.fillStyle = isActive ? '#1e40af' : '#1e293b';
    ctx.strokeStyle = isActive ? '#60a5fa' : '#475569';
    ctx.lineWidth = 2;

    ctx.fillRect(px - pillarW / 2, py, pillarW, pillarH);
    ctx.strokeRect(px - pillarW / 2, py, pillarW, pillarH);

    ctx.save();
    ctx.translate(px, py + pillarH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = isActive ? '#ffffff' : '#64748b';
    ctx.font = 'bold 9px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pillarTitles[i], 0, 3);
    ctx.restore();
  }

  // Base platform
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.fillRect(cx - 180, h - 52, 360, 22);
  ctx.strokeRect(cx - 180, h - 52, 360, 22);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('TẤT CẢ QUYỀN LỰC NHÀ NƯỚC THUỘC VỀ NHÂN DÂN', cx, h - 38);
}

// ----------------- EPOCH 5: ETHNIC & BELIEF HARMONY MANDALA -----------------
function renderEpoch5(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const cx = w / 2;
  const cy = h / 2;
  const sync = sim.frequencySync ?? 50;

  const rings = [40, 78, 114];
  rings.forEach((r, idx) => {
    ctx.strokeStyle = `rgba(234, 179, 8, ${0.25 + idx * 0.18})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const count = 10 + idx * 5;
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

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('54 DÂN TỘC ANH EM', cx, cy - 3);
  ctx.font = '10px sans-serif';
  ctx.fillText('ĐẠI ĐOÀN KẾT TOÀN DÂN', cx, cy + 10);

  ctx.fillStyle = sync > 75 ? '#4ade80' : '#facc15';
  ctx.font = '10px sans-serif';
  ctx.fillText(`MỨC ĐỘ ĐỒNG THUẬN XÃ HỘI: ${Math.round(sync)}%`, cx, h - 18);
}

// ----------------- EPOCH 6: BIOLUMINESCENT FAMILY LIFE TREE -----------------
function renderEpoch6(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState']
) {
  const cx = w / 2;
  const growth = (sim.treeGrowth ?? 50) / 100;

  ctx.strokeStyle = '#65a30d';
  ctx.lineWidth = 12 * (0.6 + growth * 0.4);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, h - 30);
  ctx.quadraticCurveTo(cx - 12, h - 90, cx, h - 140 * growth);
  ctx.stroke();

  const drawBranch = (startX: number, startY: number, len: number, angle: number, depth: number) => {
    if (depth <= 0) return;
    const endX = startX + Math.cos(angle + Math.sin(time * 1.4 + depth) * 0.05) * len;
    const endY = startY - Math.sin(angle) * len;

    ctx.strokeStyle = depth === 2 ? '#4d7c0f' : '#84cc16';
    ctx.lineWidth = depth * 3.2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    if (depth === 1) {
      ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
      ctx.beginPath();
      ctx.arc(endX, endY, 6 + Math.sin(time * 2 + endX) * 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    drawBranch(endX, endY, len * 0.72, angle - 0.5, depth - 1);
    drawBranch(endX, endY, len * 0.72, angle + 0.5, depth - 1);
  };

  drawBranch(cx, h - 140 * growth, 64 * growth, Math.PI / 2, 3);

  ctx.fillStyle = '#f472b6';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GIA ĐÌNH VĂN HÓA MỚI · TẾ BÀO LÀNH MẠNH CỦA XÃ HỘI', cx, h - 12);
}

// ----------------- EPOCH 7: UTOPIA 2084 METROPOLIS & GAIA CORE -----------------
function renderEpoch7(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  sim: VisualizerProps['simState'],
  isSuccess?: boolean
) {
  const cx = w / 2;
  const act = (sim.activationPercent ?? (isSuccess ? 100 : 70)) / 100;

  // Sky Aurora
  const aurora = ctx.createLinearGradient(0, 0, w, 110);
  aurora.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  aurora.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
  aurora.addColorStop(1, 'rgba(16, 185, 129, 0.25)');
  ctx.fillStyle = aurora;
  ctx.fillRect(0, 0, w, 130);

  // Futuristic Skyscrapers
  const buildings = [
    { x: w * 0.08, w: 56, h: 160, spire: 30 },
    { x: w * 0.22, w: 74, h: 210, spire: 50 },
    { x: w * 0.38, w: 90, h: 250, spire: 60 },
    { x: w * 0.60, w: 80, h: 200, spire: 40 },
    { x: w * 0.78, w: 60, h: 150, spire: 28 },
  ];

  buildings.forEach((b) => {
    const bx = b.x;
    const by = h - b.h;

    const towerGrad = ctx.createLinearGradient(bx, by, bx + b.w, by + b.h);
    towerGrad.addColorStop(0, '#0f172a');
    towerGrad.addColorStop(1, '#020617');
    ctx.fillStyle = towerGrad;
    ctx.fillRect(bx, by, b.w, b.h);

    ctx.fillStyle = act > 0.8 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(251, 191, 36, 0.5)';
    for (let r = by + 20; r < h - 20; r += 14) {
      for (let c = bx + 8; c < bx + b.w - 8; c += 10) {
        if (Math.sin(c * r + time) > -0.2) {
          ctx.fillRect(c, r, 4, 7);
        }
      }
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + b.w / 2, by);
    ctx.lineTo(bx + b.w / 2, by - b.spire);
    ctx.stroke();
  });

  // Maglev Pod
  const podProg = (time * 0.32) % 1;
  const podX = w * podProg;
  const podY = 62 + Math.sin(time * 1.5) * 8;
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(podX, podY, 14, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Floating GAIA Core
  ctx.save();
  const gaiaGrad = ctx.createRadialGradient(cx, 80, 8, cx, 80, 70);
  gaiaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.85)');
  gaiaGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.35)');
  gaiaGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gaiaGrad;
  ctx.fillRect(cx - 100, 10, 200, 140);

  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, 80, 26 + Math.sin(time * 2.2) * 3, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('GAIA UTOPIA 2084', cx, 84);
  ctx.restore();

  ctx.fillStyle = '#38bdf8';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('MỤC TIÊU: DÂN GIÀU, NƯỚC MẠNH, DÂN CHỦ, CÔNG BẰNG, VĂN MINH', cx, h - 12);
}
