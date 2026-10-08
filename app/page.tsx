'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { EPOCHS, EpochData } from '@/lib/gameData';
import { playSuccessChime, playTick, playFanfare } from '@/lib/sound';
import TopBar from '@/components/TopBar';
import EpochVisualizer from '@/components/canvas/EpochVisualizer';
import HistoricalDossier from '@/components/HistoricalDossier';
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
import JournalModal from '@/components/JournalModal';
import ScenariosModal from '@/components/ScenariosModal';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Compass,
  Flag,
  Play,
  RotateCcw,
  ScrollText,
  ShieldCheck,
  Sliders,
  User,
} from 'lucide-react';

export default function UtopiaApp() {
  const [hasStarted, setHasStarted] = useState(false);
  const [playerName, setPlayerName] = useState('Nguyễn Văn An');
  const [currentEpochIndex, setCurrentEpochIndex] = useState(0);
  const [completedEpochs, setCompletedEpochs] = useState<number[]>([]);
  const [deckTab, setDeckTab] = useState<'mission' | 'dossier'>('mission');

  // Player Stats
  const [stats, setStats] = useState({
    theory: 20,
    protect: 15,
    build: 15,
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
    activationPercent: 60,
  });

  // Modals state
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isScenariosOpen, setIsScenariosOpen] = useState(false);
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
    setStats((prev) => ({
      theory: Math.min(100, prev.theory + rewards.theory),
      protect: Math.min(100, prev.protect + rewards.protect),
      build: Math.min(100, prev.build + rewards.build),
    }));

    if (!completedEpochs.includes(currentEpochIndex)) {
      setCompletedEpochs((prev) => [...prev, currentEpochIndex]);
    }

    if (currentEpochIndex === 6) {
      playFanfare();
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 900);
    } else {
      setTimeout(() => {
        if (currentEpochIndex < 6) {
          setCurrentEpochIndex((prev) => prev + 1);
        }
      }, 1000);
    }
  };

  const handleSelectEpoch = (index: number) => {
    playTick();
    setCurrentEpochIndex(index);
    setDeckTab('mission');
  };

  const handleRestart = () => {
    setCurrentEpochIndex(0);
    setCompletedEpochs([]);
    setStats({ theory: 20, protect: 15, build: 15 });
    setIsCertificateOpen(false);
    setDeckTab('mission');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-[#e2e8f0] relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar with 3 zones */}
      <TopBar
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenSandbox={() => setIsSandboxOpen(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenScenarios={() => setIsScenariosOpen(true)}
        currentEpoch={currentEpochIndex}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {!hasStarted ? (
          /* ==================== HERO LANDING SECTION (F/Z-PATTERN) ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 my-auto">
            {/* Left Column: Core Narrative & Registration */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Unboxed metadata kicker */}
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wider">
                <span>Khảo Sát Thực Tế</span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span>Sự Kiện Lịch Sử Có Thật</span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span>1848 - 1917 - 1986 - 2084</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.1] text-balance">
                  Project Utopia{' '}
                  <span className="text-amber-400 font-sans font-light">2084</span>
                </h1>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  Khám phá những bước ngoặt lịch sử có thật: Từ phong trào Hiến chương 1848,
                  Cách mạng Tháng Mười 1917, Chính sách NEP của Lenin, đến đường lối Đổi Mới 1986
                  và tầm nhìn kiến thiết tương lai 2084.
                </p>
              </div>

              {/* Architect Identification Form */}
              <form
                onSubmit={handleStartGame}
                className="space-y-4 bg-stone-900/60 p-5 rounded-lg border border-stone-800 backdrop-blur-md"
              >
                <div>
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-2">
                    Định danh Kiến trúc sư Xã hội:
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Nhập họ tên Kiến trúc sư..."
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-700 rounded text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Bắt Đầu Khảo Cứu Lịch Sử & Kiến Thiết</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScenariosOpen(true)}
                    className="py-3 px-4 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-700 font-semibold text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tình Huống Thực Tế</span>
                  </button>
                </div>
              </form>

              {/* 3 Pillars Summary */}
              <div className="grid grid-cols-3 gap-3 pt-1 text-left text-xs">
                <div className="p-3 bg-stone-900/40 border border-stone-800 rounded">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                    <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lý Luận</span>
                  </div>
                  <div className="text-stone-400 text-[11px] leading-tight">
                    Sự thật lịch sử 1848 & quy luật duy vật biện chứng.
                  </div>
                </div>
                <div className="p-3 bg-stone-900/40 border border-stone-800 rounded">
                  <div className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Đoàn Kết</span>
                  </div>
                  <div className="text-stone-400 text-[11px] leading-tight">
                    Mặt trận Việt Minh 1941 & Sắc lệnh Tôn giáo 1955.
                  </div>
                </div>
                <div className="p-3 bg-stone-900/40 border border-stone-800 rounded">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kiến Trúc</span>
                  </div>
                  <div className="text-stone-400 text-[11px] leading-tight">
                    Hiến pháp 1946 & Đổi Mới 1986 tại Việt Nam.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Concept Showcase */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-stone-800 group shadow-xl">
                <Image
                  src="/hero_2084.png"
                  alt="Metropolis Utopia 2084"
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-85" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <div className="text-[11px] font-mono text-amber-300 tracking-wider uppercase mb-1">
                    Mô Hình Đô Thị Xã Hội Chủ Nghĩa 2084
                  </div>
                  <h3 className="text-lg font-bold font-serif-title text-stone-100">
                    Đại Đô Thị Xã Hội Chủ Nghĩa 2084
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Hiện thực hóa mục tiêu: Dân giàu, nước mạnh, dân chủ, công bằng, văn minh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ==================== ACTIVE SIMULATION WORKSPACE ==================== */
          <div className="space-y-6">
            {/* HUD Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-900/80 p-4 sm:p-5 rounded-lg border border-stone-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                  <span className="font-mono text-amber-300 font-semibold">NĂM {currentEpoch.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-300 font-medium">{currentEpoch.era}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif-title text-stone-100">
                  Chương {currentEpoch.id}: {currentEpoch.title}
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">{currentEpoch.subtitle}</p>
              </div>

              {/* Progress Meters */}
              <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-800">
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <ScrollText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lý Luận</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-100 tabular-nums">
                    {Math.min(100, Math.round(stats.theory))}%
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Đoàn Kết</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-100 tabular-nums">
                    {Math.min(100, Math.round(stats.protect))}%
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-[11px] text-stone-400 flex items-center gap-1 justify-center sm:justify-end">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Kiến Trúc</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-stone-100 tabular-nums">
                    {Math.min(100, Math.round(stats.build))}%
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 rounded text-stone-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden md:inline">Chứng Chỉ</span>
                </button>
              </div>
            </div>

            {/* Stepper Timeline Nav (Clean segmented tabs) */}
            <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1">
              {EPOCHS.map((ep, idx) => {
                const isCur = currentEpochIndex === idx;
                const isDone = completedEpochs.includes(idx);
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleSelectEpoch(idx)}
                    className={`flex-1 py-2 px-2.5 text-xs font-medium rounded transition-colors text-center whitespace-nowrap cursor-pointer border flex items-center justify-center gap-1.5 ${
                      isCur
                        ? 'border-amber-400 bg-amber-950/40 text-amber-200 font-semibold'
                        : isDone
                        ? 'border-emerald-800/60 bg-emerald-950/20 text-emerald-300'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="font-mono text-[11px] text-stone-500">{idx + 1}.</span>
                    )}
                    <span className="hidden sm:inline">{ep.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Two-Zone Architecture: Left Simulator & Context | Right Interactive Deck & Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Zone 1: Interactive Canvas & Historical Evidence */}
              <div id="visualizer" className="lg:col-span-6 flex flex-col space-y-4">
                {/* Historical Artwork if present */}
                {epochImageMap[currentEpoch.id] && (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-stone-800 group">
                    <Image
                      src={epochImageMap[currentEpoch.id]}
                      alt={currentEpoch.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-200 font-serif-title">
                        {currentEpoch.title}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">
                        Kỷ nguyên {currentEpoch.year}
                      </span>
                    </div>
                  </div>
                )}

                {/* Live Canvas Simulation */}
                <EpochVisualizer
                  epochId={currentEpoch.id}
                  simState={simState}
                  isSuccess={completedEpochs.includes(currentEpochIndex)}
                />

                {/* Classic Marxist Thought Quote */}
                <div className="p-4 rounded border-l-2 border-l-amber-400 border-y border-r border-stone-800 bg-stone-900/50 text-xs">
                  <div className="text-stone-300 italic leading-relaxed">
                    &ldquo;{currentEpoch.quote.text}&rdquo;
                  </div>
                  <div className="text-right text-[11px] font-semibold text-stone-400 mt-2">
                    — {currentEpoch.quote.author}
                  </div>
                </div>

                {/* Vietnamese Application Box */}
                <div className="p-4 rounded border border-stone-800 bg-stone-900/40 text-xs text-stone-300 leading-relaxed">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1 text-xs">
                    <Flag className="w-3.5 h-3.5 text-rose-500" />
                    <span>Vận Dụng Sáng Tạo Tại Việt Nam:</span>
                  </div>
                  {currentEpoch.vietnamContext}
                </div>
              </div>

              {/* Zone 2: Interactive Mission & Real Historical Dossier */}
              <div
                id="control-deck"
                className="lg:col-span-6 bg-stone-900/60 p-5 sm:p-6 rounded-lg border border-stone-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Tab Selector: Mission vs Real Historical Dossier */}
                  <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
                    <button
                      type="button"
                      onClick={() => setDeckTab('mission')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                        deckTab === 'mission'
                          ? 'bg-amber-400 text-stone-950'
                          : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Nhiệm Vụ Kiến Thiết</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeckTab('dossier')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                        deckTab === 'dossier'
                          ? 'bg-amber-400 text-stone-950'
                          : 'text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800'
                      }`}
                    >
                      <BookOpenCheck className="w-3.5 h-3.5" />
                      <span>Sự Kiện Lịch Sử Có Thật ({currentEpoch.historicalEvents.length})</span>
                    </button>
                  </div>

                  {/* Render based on tab */}
                  {deckTab === 'dossier' ? (
                    <HistoricalDossier
                      events={currentEpoch.historicalEvents}
                      epochYear={currentEpoch.year}
                    />
                  ) : (
                    <>
                      {/* Real Historical Incident Context Card */}
                      {currentEpoch.historicalEvents[0] && (
                        <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-amber-300 font-bold px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-600/30">
                              Hiện trường {currentEpoch.historicalEvents[0].year}
                            </span>
                            <span className="text-stone-400">
                              {currentEpoch.historicalEvents[0].location}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-stone-200">
                              {currentEpoch.historicalEvents[0].title}
                            </div>
                            <p className="text-[11px] text-stone-300 line-clamp-2 mt-0.5 leading-relaxed">
                              {currentEpoch.historicalEvents[0].historicalFact}
                            </p>
                          </div>
                          <div className="flex items-center justify-between pt-1 border-t border-amber-900/30 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setDeckTab('dossier')}
                              className="text-amber-400 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                            >
                              <BookOpenCheck className="w-3.5 h-3.5" />
                              <span>Khảo cứu {currentEpoch.historicalEvents.length} tư liệu gốc</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsScenariosOpen(true)}
                              className="text-stone-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium bg-stone-850 px-2 py-0.5 rounded border border-stone-700"
                            >
                              <Compass className="w-3.5 h-3.5 text-amber-400" />
                              <span>Vũ đài giải quyết tình huống</span>
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="border-b border-stone-800/80 pb-2.5">
                        <div className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center justify-between">
                          <span>Nhiệm Vụ Kiến Thiết: {currentEpoch.taskTitle}</span>
                        </div>
                        <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                          {currentEpoch.taskInstruction}
                        </p>
                      </div>

                      {/* Epoch Specific Mini-Game Components */}
                      {currentEpoch.id === 1 && (
                        <Epoch1Gears
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 2 && (
                        <Epoch2WorkerNodes
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 3 && (
                        <Epoch3EconomicBalance
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 4 && (
                        <Epoch4DemocracyPillars
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 5 && (
                        <Epoch5UnityHarmony
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 6 && (
                        <Epoch6FamilyFlourish
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                        />
                      )}

                      {currentEpoch.id === 7 && (
                        <Epoch7UtopiaActivation
                          onSuccess={handleEpochSuccess}
                          onUpdateSim={(state) => setSimState((prev) => ({ ...prev, ...state }))}
                          stats={stats}
                        />
                      )}
                    </>
                  )}
                </div>

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-800 text-xs">
                  <button
                    type="button"
                    disabled={currentEpochIndex === 0}
                    onClick={() => handleSelectEpoch(currentEpochIndex - 1)}
                    className="px-3.5 py-1.5 rounded border border-stone-800 bg-stone-900 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Chương Trước</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsScenariosOpen(true)}
                      className="text-stone-300 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Tình Huống Thực Tế</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsJournalOpen(true)}
                      className="text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Nhật Ký</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={currentEpochIndex === 6}
                    onClick={() => handleSelectEpoch(currentEpochIndex + 1)}
                    className="px-3.5 py-1.5 rounded border border-stone-800 bg-stone-900 text-stone-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-colors"
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
      <footer className="w-full border-t border-stone-800/80 bg-[#05080e] py-4 px-6 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Project Utopia 2084 · Khảo Cứu Tư Liệu Lịch Sử & Chủ Nghĩa Xã Hội Khoa Học
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsScenariosOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Vũ Đài Tình Huống
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsSandboxOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trục Thời Gian
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsJournalOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Nhật Ký Kiến Trúc
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Từ Điển Khái Niệm
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleRestart}
              className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Thiết Lập Lại</span>
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

      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        completedEpochs={completedEpochs}
        playerName={playerName}
      />

      {isScenariosOpen && (
        <ScenariosModal
          key={`scenarios-${currentEpochIndex}`}
          isOpen={isScenariosOpen}
          onClose={() => setIsScenariosOpen(false)}
          initialScenarioIdx={currentEpochIndex}
        />
      )}
    </div>
  );
}
