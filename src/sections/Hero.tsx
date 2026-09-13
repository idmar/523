import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VictoriaHarbourScene from '../components/VictoriaHarbourScene';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      tagRef.current,
      { filter: 'blur(12px)', opacity: 0 },
      { filter: 'blur(0px)', opacity: 1, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        titleRef.current,
        { filter: 'blur(12px)', opacity: 0, y: 20 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        subtitleRef.current,
        { filter: 'blur(12px)', opacity: 0, y: 20 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* 3D Victoria Harbour Skyline & Cyber Ocean Scene */}
      <VictoriaHarbourScene />

      {/* Cyberpunk HUD Frame & Telemetry */}
      <div className="absolute inset-x-4 md:inset-x-8 top-20 md:top-24 bottom-4 md:bottom-8 z-10 pointer-events-none">
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ffff]/60" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ffff]/60" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ffff]/60" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffff]/60" />

        {/* Top telemetry bar */}
        <div className="hidden sm:flex justify-between items-center text-[10px] md:text-xs font-mono tracking-widest text-[#00ffff]/70 px-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse shadow-[0_0_8px_#00ffff]" />
            <span>VICTORIA HARBOUR · 22°16&apos;55&quot;N 114°10&apos;22&quot;E</span>
          </div>
          <div className="flex items-center gap-3">
            <span>GRID: ACTIVE</span>
            <span className="text-white/20">|</span>
            <span>AIGC DIGITAL TWIN</span>
          </div>
        </div>

        {/* Bottom subtle telemetry */}
        <div className="hidden sm:flex justify-between items-center absolute bottom-2 left-2 right-2 text-[10px] font-mono tracking-wider text-white/40">
          <span>LANDMARKS: BOC TOWER // HKCEC // HARBOUR WAVES</span>
          <span>LINGNAN UNIVERSITY · FACULTY OF BUSINESS</span>
        </div>
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto pointer-events-none">
        <span
          ref={tagRef}
          className="inline-block text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#38bdf8] mb-4 md:mb-6 opacity-0 uppercase font-mono font-medium drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
        >
          岭南大学商学院 · 香港维多利亚港
        </span>

        <h1
          ref={titleRef}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.12] tracking-tight mb-6 md:mb-8 opacity-0 drop-shadow-[0_0_35px_rgba(0,212,255,0.25)]"
        >
          AIGC 创新教研探索
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed opacity-0 px-2"
        >
          岭南大学黄经国艺术科技与商业研究中心
          <br />
          <span className="text-xs sm:text-sm md:text-base mt-1 md:mt-2 inline-block text-[#94A3B8]">
            Hong Kong | 艺术科技 × 商业智能 × 文化数字化
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        type="button"
        aria-label="向下探索至历史传承"
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0 pointer-events-auto cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ffff] rounded-xl p-1.5 transition-transform hover:scale-105"
        onClick={() => {
          document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] font-mono text-[#38bdf8]/80 group-hover:text-[#38bdf8] tracking-widest uppercase transition-colors">
          向下探索
        </span>
        <div className="w-5 h-9 border-2 border-[#00ffff]/40 group-hover:border-[#00ffff] rounded-full flex justify-center pt-1.5 shadow-[0_0_10px_rgba(0,255,255,0.2)] group-hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all">
          <div className="w-1 h-2 bg-[#00ffff] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
