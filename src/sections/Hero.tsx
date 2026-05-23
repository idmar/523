import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ParticleSea from '../components/ParticleSea';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#030712]">
      <ParticleSea />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <span
          ref={tagRef}
          className="inline-block text-sm md:text-base tracking-widest text-[#CBD5E1] mb-6 opacity-0"
        >
          岭南大学商学院
        </span>

        <h1
          ref={titleRef}
          className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-normal text-white leading-[1.15] tracking-tight mb-6 md:mb-8 opacity-0"
        >
          AIGC 创新教研探索
        </h1>

        <p
          ref={subtitleRef}
          className="text-sm sm:text-base md:text-lg text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed opacity-0 px-2"
        >
          岭南大学黄经国艺术科技与商业研究中心
          <br />
          <span className="text-xs sm:text-sm md:text-base mt-1 md:mt-2 inline-block opacity-70">
            Hong Kong | 香港
          </span>
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs text-[#CBD5E1] tracking-wider">向下探索</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
