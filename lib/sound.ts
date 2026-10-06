// Web Audio API procedural sound synthesizer (client-side only, rich cinematic audio)

let audioCtx: AudioContext | null = null;
let soundMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  return soundMuted;
}

export function setAudioMuted(muted: boolean): void {
  soundMuted = muted;
}

export function toggleAudio(): boolean {
  soundMuted = !soundMuted;
  return soundMuted;
}

export function playTick(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}

export function playGearSound(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, ctx.currentTime);

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(260, ctx.currentTime + 0.08);
  osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.09, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

export function playSuccessChime(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const startTime = ctx.currentTime + idx * 0.07;

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, startTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.12, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.45);
  });
}

export function playWarningBeep(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(600, ctx.currentTime);

  osc.type = 'square';
  osc.frequency.setValueAtTime(160, ctx.currentTime);
  osc.frequency.setValueAtTime(120, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.25);
}

export function playConnectTone(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(349.23, ctx.currentTime); // F4
  osc.frequency.exponentialRampToValueAtTime(698.46, ctx.currentTime + 0.12); // F5

  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.12);
}

export function playFanfare(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { freq: 440, dur: 0.16, delay: 0 },
    { freq: 554.37, dur: 0.16, delay: 0.16 },
    { freq: 659.25, dur: 0.22, delay: 0.32 },
    { freq: 880, dur: 0.6, delay: 0.54 },
    { freq: 1108.73, dur: 0.8, delay: 0.8 },
  ];

  melody.forEach(item => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const startTime = ctx.currentTime + item.delay;

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, startTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(item.freq, startTime);

    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + item.dur);
  });
}
