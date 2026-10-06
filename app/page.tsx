'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EPOCHS, EpochData } from '@/lib/gameData';
import { playSuccessChime, playTick, playFanfare } from '@/lib/sound';
import TopBar from '@/components/TopBar';
import EpochVisualizer from '@/components/canvas/EpochVisualizer';
import Epoch1Gears from '@/components/epochs/Epoch1Gears';
import Epoch2WorkerNodes from '@/components/epochs/Epoch2WorkerNodes';
import Epoch3EconomicBalance from '@/components/epochs/Epoch3EconomicBalance';
import Epoch4DemocracyPillars from '@/components/epochs/Epoch4DemocracyPillars';
import Epoch5UnityHarmony from '@/components/epochs/Epoch5UnityHarmony';
import Epoch6FamilyFlourish from '@/components/epochs/Epoch6FamilyFlourish';
import Epoch7UtopiaActivation from '@/components/epochs/Epoch7UtopiaActivation';
import CertificateModal from '@/components/CertificateModal';
import GlossaryModal from '@/components/GlossaryModal';
import SandboxModal from '@/components/SandboxModal';
import { ArrowLeft, ArrowRight, Award, BookOpen, Building2, CheckCircle2, Flag, ScrollText, ShieldCheck, Sparkles, User, Play } from 'lucide-react';

export default function UtopiaApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [playerName, setPlayerName] = useState('Nguyễn Văn An');
  const [currentEpochIndex, setCurrentEpochIndex] = useState(0);
  const [completedEpochs, setCompletedEpochs] = useState<number[]>([]);

  // Player Stats
  const [stats, setStats] = useState({
    theory: 20,
    protect: 15,
    build: 15
  });

  // Dynamic simulation parameters passed to EpochVisualizer
  const [simState, setSimState] = useState<{
    gearMeshRatio?: number;
    boilerPressure?: number;
    jammed?: boolean;
    connectedNodes?: number[];
    totalNodes?: number;
    stateRatio?: number;
    marketRatio?: number;
    welfareRatio?: number;
    activePillars?: number[];
    frequencySync?: number;
    treeGrowth?: number;
    activationPercent?: number;
  }>({
    gearMeshRatio: 0.5,
    connectedNodes: [0],
    stateRatio: 50,
    marketRatio: 30,
    welfareRatio: 20,
    activePillars: [0],
    frequencySync: 50,
    treeGrowth: 40,
    activationPercent: 60
  });

  // Modals state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const currentEpoch: EpochData = EPOCHS[currentEpochIndex] || EPOCHS[0];

  // Map epoch image path
  const epochImageMap: Record<number, string> = {
    1: '/epoch1.png',
    7: '/hero_2084.png',
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setPlayerName('Kiến Trúc Sư Đồng Chí');
    }
    playTick();
    setHasStarted(true);
  };

  const handleEpochSuccess = () => {
    playSuccessChime();
    
    // Add rewards
    const rewards = currentEpoch.rewardStats;
    setStats(prev => ({
      theory: Math.min(100, prev.theory + rewards.theory),
      protect: Math.min(100, prev.protect + rewards.protect),
      build: Math.min(100, prev.build + rewards.build)
    }));

    if (!completedEpochs.includes(currentEpochIndex)) {
      setCompletedEpochs(prev => [...prev, currentEpochIndex]);
    }

    if (currentEpochIndex === 6) {
      playFanfare();
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 900);
    } else {
      setTimeout(() => {
        if (currentEpochIndex < 6) {
          setCurrentEpochIndex(prev => prev + 1);
        }
      }, 1000);
    }
  };

  const handleSelectEpoch = (index: number) => {
    playTick();
    setCurrentEpochIndex(index);
  };

  const handleRestart = () => {
    setCurrentEpochIndex(0);
    setCompletedEpochs([]);
    setStats({ theory: 20, protect: 15, build: 15 });
    setIsCertificateOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05080e] text-[#f1f5f9] relative selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Bar with 3 zones */}
      <TopBar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenSandbox={() => setIsSandboxOpen(true)}
        currentEpoch={currentEpochIndex}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">

        {!hasStarted ? (
          /* ==================== HERO LANDING SPLIT SHOWCASE ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 my-auto">
            
            {/* Left Col: Hero Information & Architect Registration Form */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-300 bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-500/50 shadow-lg backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Dự Án Mô Phỏng Triết Học Biện Chứng Lịch Sử</span>
              </div>

              <h1 className="font-serif-title text-4xl sm:text-6xl font-black tracking-tight text-amber-200 leading-[1.08] drop-shadow-2xl">
                PROJECT UTOPIA
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-5xl sm:text-7xl mt-1">
                  2084
                </span>
              </h1>

              <p className="text-base text-stone-200 leading-relaxed font-normal">
                Từ tiếng còi xưởng máy khói bụi năm 1848 đến đại đô thị văn minh hài hòa năm 2084.
                Hãy trực tiếp điều phối các cỗ máy lịch sử, vận dụng quy luật duy vật biện chứng
                để kiến tạo xã hội dân giàu, nước mạnh, dân chủ, công bằng và văn minh!
              </p>

              {/* Architect Input Form */}
              <form onSubmit={handleStartGame} className="space-y-4 bg-stone-900/90 p-6 rounded-2xl border-2 border-amber-500/50 shadow-[0_0_50px_rgba(217,119,6,0.2)] backdrop-blur-xl">
                <div>
                  <label className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                    Định Danh Kiến Trúc Sư:
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
                    <input
                      type="text"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Nhập tên Kiến trúc sư..."
                      className="w-full pl-11 pr-4 py-3 bg-stone-950 border border-stone-700 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm tracking-wider uppercase rounded-xl shadow-xl hover:shadow-amber-500/30 active:scale-[0.99] transition-all cursor-pointer border border-amber-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>BẮT ĐẦU KIẾN THIẾT LỊCH SỬ →</span>
                </button>
              </form>

              {/* 3 Pillars Summary */}
              <div className="grid grid-cols-3 gap-3 text-left text-xs pt-2">
                <div className="p-3 bg-stone-900/80 border border-amber-500/30 rounded-xl backdrop-blur-md">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                    <ScrollText className="w-4 h-4 text-amber-400" />
                    <span>Lý Luận</span>
                  </div>
                  <div className="text-stone-300 text-[11px] leading-tight">Quy luật duy vật biện chứng.</div>
                </div>
                <div className="p-3 bg-stone-900/80 border border-red-500/30 rounded-xl backdrop-blur-md">
                  <div className="font-bold text-red-400 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    <span>Bảo Vệ</span>
                  </div>
                  <div className="text-stone-300 text-[11px] leading-tight">Đại đoàn kết toàn dân tộc.</div>
                </div>
                <div className="p-3 bg-stone-900/80 border border-emerald-500/30 rounded-xl backdrop-blur-md">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Kiến Trúc</span>
                  </div>
                  <div className="text-stone-300 text-[11px] leading-tight">Thể chế pháp quyền XHCN.</div>
                </div>
              </div>

            </div>

            {/* Right Col: Prominent High-Resolution Concept Art Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-amber-500/60 shadow-[0_0_60px_rgba(217,119,6,0.3)] group">
                <Image
                  src="/hero_2084.png"
                  alt="Metropolis Utopia 2084"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-left">
                  <span className="px-3 py-1 bg-amber-500/30 backdrop-blur-md border border-amber-400/50 rounded-full text-[10px] font-mono font-bold text-amber-200 tracking-widest uppercase">
                    CONCEPT ART VƯƠNG QUỐC UTOPIA 2084
                  </span>
                  <h3 className="text-xl font-bold font-serif-title text-amber-100 mt-2 drop-shadow-md">
                    Đại Đô Thị Xã Hội Chủ Nghĩa 2084
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 drop-shadow">
                    Hiện thực hóa lý tưởng: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ==================== ACTIVE PLAY AREA ==================== */
          <div className="space-y-6">
            
            {/* HUD Header Banner with Epoch Dynamic Theme */}
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r ${currentEpoch.bgGradient} p-5 rounded-2xl border-2 ${currentEpoch.accentBorder} shadow-2xl backdrop-blur-xl transition-all`}>
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className={`px-3 py-0.5 rounded-full font-mono font-bold text-xs ${currentEpoch.badgeBg}`}>
                    NĂM {currentEpoch.year}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-amber-200 font-semibold">{currentEpoch.era}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold font-serif-title text-amber-100 tracking-wide">
                  Chương {currentEpoch.id}: {currentEpoch.title}
                </h2>
                <p className="text-xs text-stone-300 mt-0.5">{currentEpoch.subtitle}</p>
              </div>

              {/* Progress Meters */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-300 flex items-center gap-1 justify-center sm:justify-end font-semibold">
                    <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lý Luận</span>
                  </div>
                  <div className="text-sm font-mono font-bold text-amber-400">{Math.min(100, Math.round(stats.theory))}%</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-300 flex items-center gap-1 justify-center sm:justify-end font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                    <span>Bảo Vệ</span>
                  </div>
                  <div className="text-sm font-mono font-bold text-red-400">{Math.min(100, Math.round(stats.protect))}%</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-300 flex items-center gap-1 justify-center sm:justify-end font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kiến Trúc</span>
                  </div>
                  <div className="text-sm font-mono font-bold text-emerald-400">{Math.min(100, Math.round(stats.build))}%</div>
                </div>
                
                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 rounded-xl text-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                  title="Xem chứng chỉ"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Chứng Chỉ</span>
                </button>
              </div>
            </div>

            {/* Stepper Dots Timeline */}
            <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-1 px-1">
              {EPOCHS.map((ep, idx) => {
                const isCur = currentEpochIndex === idx;
                const isDone = completedEpochs.includes(idx);
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectEpoch(idx)}
                    className={`flex-1 py-2 px-2.5 text-xs font-bold rounded-xl transition-all text-center whitespace-nowrap cursor-pointer border flex items-center justify-center gap-1.5 ${
                      isCur
                        ? 'border-amber-400 bg-amber-500/30 text-amber-200 ring-2 ring-amber-400/50 shadow-xl scale-[1.02]'
                        : isDone
                        ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300'
                        : 'border-stone-800 bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="font-mono">{idx + 1}.</span>
                    )}
                    <span className="hidden sm:inline">{ep.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Two-Zone Layout: Left Visualizer & Concept Artwork + Right Mini-Game Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Zone 1 (Left 6 Cols): Dynamic Simulation Visualizer & Epoch Artwork Banner */}
              <div id="visualizer" className="lg:col-span-6 flex flex-col space-y-4">
                
                {/* Epoch Concept Artwork Display Banner if available */}
                {epochImageMap[currentEpoch.id] && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-xl group">
                    <Image
                      src={epochImageMap[currentEpoch.id]}
                      alt={currentEpoch.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-200 font-serif-title drop-shadow-md">
                        {currentEpoch.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded">
                        ARTWORK NGHỆ THUẬT KỶ NGUYÊN {currentEpoch.year}
                      </span>
                    </div>
                  </div>
                )}

                {/* HTML5 Canvas Simulation Engine */}
                <EpochVisualizer
                  epochId={currentEpoch.id}
                  simState={simState}
                  isSuccess={completedEpochs.includes(currentEpochIndex)}
                />

                {/* Classical Quote Card */}
                <div className="p-4 rounded-xl border-l-4 border-l-amber-500 border-y border-r border-stone-800 bg-stone-900/90 text-xs backdrop-blur-md shadow-md">
                  <div className="text-stone-200 italic leading-relaxed font-medium">
                    &ldquo;{currentEpoch.quote.text}&rdquo;
                  </div>
                  <div className="text-right text-[11px] font-bold text-amber-400 mt-2">
                    — {currentEpoch.quote.author}
                  </div>
                </div>

                {/* Vietnamese Context Highlight Box */}
                <div className="p-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 to-stone-900/90 text-xs text-amber-100/95 leading-relaxed shadow-md">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5 text-xs">
                    <Flag className="w-4 h-4 text-red-500 fill-red-500" />
                    <span>Vận Dụng Sáng Tạo Tại Việt Nam:</span>
                  </div>
                  {currentEpoch.vietnamContext}
                </div>
              </div>

              {/* Zone 2 (Right 6 Cols): Mini-Game Deck */}
              <div id="control-deck" className="lg:col-span-6 bg-stone-900/90 p-6 rounded-2xl border-2 border-stone-800 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="border-b border-stone-800 pb-3">
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Nhiệm Vụ Kiến Thiết: {currentEpoch.taskTitle}</span>
                    </div>
                    <p className="text-xs text-stone-200 mt-1.5 leading-relaxed font-normal">
                      {currentEpoch.taskInstruction}
                    </p>
                  </div>

                  {/* Dynamic mini-game component per epoch */}
                  {currentEpoch.id === 1 && (
                    <Epoch1Gears
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 2 && (
                    <Epoch2WorkerNodes
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 3 && (
                    <Epoch3EconomicBalance
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 4 && (
                    <Epoch4DemocracyPillars
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 5 && (
                    <Epoch5UnityHarmony
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 6 && (
                    <Epoch6FamilyFlourish
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                    />
                  )}

                  {currentEpoch.id === 7 && (
                    <Epoch7UtopiaActivation
                      onSuccess={handleEpochSuccess}
                      onUpdateSim={(state) => setSimState(prev => ({ ...prev, ...state }))}
                      stats={stats}
                    />
                  )}
                </div>

                {/* Bottom Navigation controls */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-800 text-xs">
                  <button
                    type="button"
                    disabled={currentEpochIndex === 0}
                    onClick={() => handleSelectEpoch(currentEpochIndex - 1)}
                    className="px-4 py-2 rounded-xl border border-stone-700 bg-stone-900 text-stone-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-all font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Chương Trước</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsGlossaryOpen(true)}
                    className="text-amber-400 hover:text-amber-300 font-extrabold flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Tra cứu bài học lý luận</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentEpochIndex === 6}
                    onClick={() => handleSelectEpoch(currentEpochIndex + 1)}
                    className="px-4 py-2 rounded-xl border border-stone-700 bg-stone-900 text-stone-200 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-all font-semibold"
                  >
                    <span>Chương Sau</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-800 bg-[#05080e] py-4 px-6 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Project Utopia 2084 · Giáo Trình Mô Phỏng Chủ Nghĩa Xã Hội Khoa Học (MLN133/SPST)
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSandboxOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trục Thời Gian
            </button>
            <span>·</span>
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Từ Điển Khái Niệm
            </button>
            <span>·</span>
            <button
              onClick={handleRestart}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Thiết Lập Lại
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isCertificateOpen && (
        <CertificateModal
          playerName={playerName}
          stats={stats}
          onRestart={handleRestart}
          onOpenSandbox={() => {
            setIsCertificateOpen(false);
            setIsSandboxOpen(true);
          }}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <SandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        onSelectEpoch={handleSelectEpoch}
        currentEpoch={currentEpochIndex}
        completedEpochs={completedEpochs}
      />

    </div>
  );
}
