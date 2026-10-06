'use client';

import React, { useState } from 'react';
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
import { ArrowLeft, ArrowRight, Award, BookOpen, Building2, CheckCircle2, ScrollText, ShieldCheck, Sparkles, User } from 'lucide-react';

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

    // If final epoch completed, open certificate
    if (currentEpochIndex === 6) {
      playFanfare();
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 900);
    } else {
      // Auto advance after slight delay or let user advance
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
    <div className="min-h-screen flex flex-col bg-[#0c1017] text-[#e2e8f0] relative selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Bar with strict 3-zone contract */}
      <TopBar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenSandbox={() => setIsSandboxOpen(true)}
        currentEpoch={currentEpochIndex}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">

        {!hasStarted ? (
          /* ==================== WELCOME & HERO SECTION ==================== */
          <div className="max-w-3xl mx-auto my-auto py-8 px-4 text-center">
            
            {/* Top thematic heraldry */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-300 mb-4 bg-amber-950/30 px-3 py-1 border-l-2 border-amber-500 border-y border-r border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dự Án Mô Phỏng Biện Chứng Lịch Sử</span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-amber-200 leading-[1.05] mb-4">
              PROJECT UTOPIA
              <span className="block text-amber-500 text-5xl sm:text-7xl lg:text-8xl mt-1">2084</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Từ tiếng còi xưởng máy khói bụi năm 1848 đến đại đô thị văn minh hài hòa năm 2084.
              Hãy trực tiếp điều phối các cỗ máy lịch sử, vận dụng quy luật duy vật biện chứng
              để kiến tạo xã hội dân giàu, nước mạnh, dân chủ, công bằng và văn minh!
            </p>

            {/* Start Form */}
            <form onSubmit={handleStartGame} className="max-w-md mx-auto space-y-4 bg-stone-900/80 p-6 border border-amber-600/40 shadow-2xl backdrop-blur-sm">
              <div className="text-left">
                <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1.5">
                  Định Danh Kiến Trúc Sư:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Nhập tên Kiến trúc sư..."
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-950 border border-stone-700 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-sm tracking-wider uppercase shadow-lg hover:shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer border border-amber-400/50"
              >
                BẮT ĐẦU KIẾN THIẾT LỊCH SỬ →
              </button>
            </form>

            {/* Overview of 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 text-left text-xs">
              <div className="p-3 bg-stone-900/60 border border-stone-800">
                <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                  <ScrollText className="w-4 h-4 text-amber-400" />
                  <span>Lý Luận Biện Chứng</span>
                </div>
                <div className="text-stone-400">Hiểu đúng quy luật khách quan, vượt qua ảo tưởng duy tâm.</div>
              </div>
              <div className="p-3 bg-stone-900/60 border border-stone-800">
                <div className="font-bold text-red-400 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>Bảo Vệ Nhân Dân</span>
                </div>
                <div className="text-stone-400">Đại đoàn kết toàn dân tộc, giữ vững ngọn cờ tiên phong.</div>
              </div>
              <div className="p-3 bg-stone-900/60 border border-stone-800">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Kiến Trúc Xã Hội</span>
                </div>
                <div className="text-stone-400">Kiến tạo thể chế pháp quyền, kinh tế và tổ ấm văn minh.</div>
              </div>
            </div>

          </div>
        ) : (
          /* ==================== ACTIVE PLAY AREA ==================== */
          <div className="space-y-5">
            
            {/* HUD Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-950/90 p-4 border border-stone-800 border-l-4 border-l-amber-500 shadow-md">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-amber-400">{currentEpoch.year}</span>
                  <span className="text-stone-500">·</span>
                  <span className="text-amber-200/90 font-semibold">{currentEpoch.era}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif-title text-amber-100 mt-0.5">
                  Chương {currentEpoch.id}: {currentEpoch.title}
                </h2>
              </div>

              {/* Progress Meters */}
              <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800">
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <ScrollText className="w-3 h-3 text-amber-400" />
                    <span>Lý Luận</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-400">{Math.min(100, Math.round(stats.theory))}%</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    <span>Bảo Vệ</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-red-400">{Math.min(100, Math.round(stats.protect))}%</div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <Building2 className="w-3 h-3 text-emerald-400" />
                    <span>Kiến Trúc</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400">{Math.min(100, Math.round(stats.build))}%</div>
                </div>
                
                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 text-amber-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Xem chứng chỉ"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Chứng Chỉ</span>
                </button>
              </div>
            </div>

            {/* Stepper Dots */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto py-1 px-1">
              {EPOCHS.map((ep, idx) => {
                const isCur = currentEpochIndex === idx;
                const isDone = completedEpochs.includes(idx);
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectEpoch(idx)}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium transition-all text-center whitespace-nowrap cursor-pointer border flex items-center justify-center gap-1 ${
                      isCur
                        ? 'border-amber-400 bg-amber-950/60 text-amber-200 ring-1 ring-amber-400/50'
                        : isDone
                        ? 'border-emerald-600/40 bg-emerald-950/30 text-emerald-300'
                        : 'border-stone-800 bg-stone-900/40 text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span>{idx + 1}.</span>
                    )}
                    <span className="hidden sm:inline">{ep.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Two-Zone Layout: Left Visualizer Canvas + Right Control & Mission Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Zone 1 (Left 6 Cols): Interactive Animated Historical Simulation Canvas */}
              <div id="visualizer" className="lg:col-span-6 flex flex-col space-y-3">
                <EpochVisualizer
                  epochId={currentEpoch.id}
                  simState={simState}
                  isSuccess={completedEpochs.includes(currentEpochIndex)}
                />

                {/* Classical Historical Quote Card */}
                <div className="p-3.5 border-l-2 border-amber-500 border-y border-r border-stone-800 bg-stone-900/50 text-xs">
                  <div className="text-stone-400 italic leading-relaxed">
                    &ldquo;{currentEpoch.quote.text}&rdquo;
                  </div>
                  <div className="text-right text-[11px] font-semibold text-amber-400 mt-1.5">
                    — {currentEpoch.quote.author}
                  </div>
                </div>

                {/* Epoch Context Overview */}
                <div className="p-3.5 border border-stone-800 bg-stone-900/30 text-xs text-stone-300 leading-relaxed">
                  <strong className="text-amber-300 block mb-1">Bối Cảnh Lịch Sử:</strong>
                  {currentEpoch.context}
                </div>
              </div>

              {/* Zone 2 (Right 6 Cols): Dynamic Interactive Task & Mini-game */}
              <div id="control-deck" className="lg:col-span-6 bg-stone-900/60 p-5 border border-stone-800 shadow-xl flex flex-col justify-between">
                
                <div className="space-y-3">
                  <div className="border-b border-stone-800 pb-2.5">
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      Nhiệm Vụ Kiến Thiết: {currentEpoch.taskTitle}
                    </div>
                    <p className="text-xs text-stone-300 mt-1">
                      {currentEpoch.taskInstruction}
                    </p>
                  </div>

                  {/* Render the specific dynamic mini-game component */}
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
                    className="px-3 py-1.5 border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Chương Trước</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsGlossaryOpen(true)}
                    className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Tra cứu bài học lý luận</span>
                  </button>

                  <button
                    type="button"
                    disabled={currentEpochIndex === 6}
                    onClick={() => handleSelectEpoch(currentEpochIndex + 1)}
                    className="px-3 py-1.5 border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Chương Sau</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-800/80 bg-[#0c1017] py-4 px-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Project Utopia 2084 · Giáo Trình Mô Phỏng Chủ Nghĩa Xã Hội Khoa Học
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSandboxOpen(true)}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Trục Thời Gian
            </button>
            <span>·</span>
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-stone-300 transition-colors cursor-pointer"
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

      {/* Modal 1: Certificate of Citizenship */}
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

      {/* Modal 2: Glossary & Theoretical Lexicon */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Modal 3: Sandbox Timeline Explorer */}
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
