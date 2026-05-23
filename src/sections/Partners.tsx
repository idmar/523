import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   Reusable scroll-reveal wrapper
   ──────────────────────────────── */
function Reveal({
  children,
  animation = 'floatInBottom',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  animation?: 'floatInBottom' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const map = {
      floatInBottom: { y: 40, x: 0 },
      slideInLeft: { y: 0, x: -60 },
      slideInRight: { y: 0, x: 60 },
    };
    const from = map[animation];

    gsap.fromTo(
      el,
      { opacity: 0, ...from },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1.2,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [animation, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

/* ────────────────────────────────
   Image card with glow overlay
   ──────────────────────────────── */
function ImageCard({
  src,
  alt,
  className = '',
  aspect = 'aspect-video',
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group ${className}`}>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(54.01% 74.44% at 50% 105.71%, rgba(37, 99, 235, 0.12) 0%, transparent 100%)',
        }}
      />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${aspect}`}
        loading="lazy"
      />
    </div>
  );
}

/* ═════════════════════════════════
   MAIN COMPONENT
   ═════════════════════════════════ */
export default function Partners() {
  const titleTagRef = useScrollReveal<HTMLSpanElement>({ animation: 'floatInBottom' });
  const titleRef = useScrollReveal<HTMLHeadingElement>({ animation: 'blur-in', delay: 0.1 });

  return (
    <section id="partners" className="relative w-full py-20 md:py-32 lg:py-48 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">

        {/* ═══════ SECTION HEADER ═══════ */}
        <div className="text-center mb-16 md:mb-24">
          <span
            ref={titleTagRef}
            className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase mb-4"
          >
            艺科融合国际化探索
          </span>
          <h2
            ref={titleRef}
            className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
          >
            国际合作与在地实践
          </h2>
        </div>

        {/* ════════════════════════════════════
            BLOCK 1: 清华大学美术学院
            ════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 md:mb-36">
          <Reveal animation="slideInLeft" className="md:col-span-5 order-2 md:order-1">
            <div className="space-y-5">
              <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                战略伙伴
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                清华大学美术学院
              </h3>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>
                  中心积极推动与清华大学美术学院的深度合作，通过优势互补，
                  共同提升大中华区的艺术科技研究水平。
                </p>
                <ul className="space-y-2.5">
                  {[
                    '联合举办学术研讨会与高端论坛',
                    '共享教学资源与行业网络',
                    '促进京港两地师生的互访与交流，拓宽学术视野',
                    '共同探索具有中国特色的艺术科技发展模式',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-[#2563EB] mt-1 flex-shrink-0">•</span>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal animation="slideInRight" delay={0.15} className="md:col-span-7 order-1 md:order-2">
            <ImageCard src="/images/image40.webp" alt="清华大学美术学院" aspect="aspect-[16/10]" />
          </Reveal>
        </div>

        {/* ════════════════════════════════════
            BLOCK 2: 联合国 2025 国际会议
            ════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 md:mb-36">
          <Reveal animation="slideInLeft" className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <ImageCard src="/images/image34.webp" alt="联合国会议合影" aspect="aspect-[4/3]" />
              <ImageCard src="/images/image35.webp" alt="联合国总部艺术展" aspect="aspect-[4/3]" />
            </div>
          </Reveal>

          <Reveal animation="slideInRight" delay={0.15} className="md:col-span-5">
            <div className="space-y-5">
              <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                国际舞台
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                联合国艺术与可持续发展 2025
              </h3>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>
                  研究中心<strong className="text-white">联合主办</strong> United Nations Art for
                  Sustainable Development 2025 国际会议，以及线上+线下联展的艺术展。
                </p>
                <p>
                  协办联合国成立 80 周年艺术可持续发展高阶会议，并在联合国总部举办展览，
                  同时开发上线 VR 平行展。
                </p>
                <p>
                  分享在艺术科技融合及商业应用领域的洞见，探讨如何利用数码创新
                  推动可持续发展目标 (SDGs)。
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════
            BLOCK 3: 中欧文化遗产论坛（维也纳）
            ════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 md:mb-36">
          <Reveal animation="slideInLeft" className="md:col-span-5 order-2 md:order-1">
            <div className="space-y-5">
              <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                学术交流
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                中欧文化遗产论坛
              </h3>
              <p className="text-sm text-[#CBD5E1]/60">维也纳 · 国际学术会议</p>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>
                  研究中心助理教授<strong className="text-white">马立军</strong>联席主持文化遗产与新技术国际学术会议 Session：
                  <em className="text-white/80 block mt-1">
                    "Digital Context: Unlocking the Value and Commercial Ecosystems of Heritage Digital Assets"
                  </em>
                </p>
                <p>
                  同时联席主持中欧文化遗产产业化主题论坛：
                  <em className="text-white/80 block mt-1">
                    "Bridging Asian and European Cultural Heritage: New Technologies for the Next Generation"
                  </em>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal animation="slideInRight" delay={0.15} className="md:col-span-7 order-1 md:order-2">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <ImageCard src="/images/image36.webp" alt="维也纳论坛会议现场" aspect="aspect-[4/3]" />
              <ImageCard src="/images/image37.webp" alt="维也纳论坛合影" aspect="aspect-[4/3]" />
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════
            BLOCK 4: Still Becoming 香港艺术展
            ════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-24 md:mb-36">
          <Reveal animation="slideInLeft" className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <ImageCard
                src="/images/image38.webp"
                alt="Still Becoming 展览海报"
                aspect="aspect-[3/4]"
              />
              <ImageCard src="/images/image39.webp" alt="展览现场" aspect="aspect-[3/4]" />
            </div>
          </Reveal>

          <Reveal animation="slideInRight" delay={0.15} className="md:col-span-5">
            <div className="space-y-5">
              <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                在地实践
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                Still Becoming
                <span className="block text-lg md:text-xl text-[#CBD5E1] mt-1 font-sans">
                  人类仍在生成
                </span>
              </h3>
              <p className="text-sm text-[#CBD5E1]/60">
                香港屯门大会堂 · 展览厅 · 2026.4.1-4.5
              </p>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>
                  研究中心主办香港《Still Becoming｜人类仍在生成》艺术展，
                  汇聚<strong className="text-white">传统艺术 + 数字艺术 + AIGC</strong>三大板块。
                </p>
                <p>
                  主题：Between Ink, Algorithm and Quantum Reality
                  <br />
                  在水墨、算法与量子现实之间，重建人类的想像力与判断力。
                </p>
                <p className="text-sm">
                  策展人：謝綺紅
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ════════════════════════════════════
            BLOCK 5: 联合国高阶会议 · 4图网格
            ════════════════════════════════════ */}
        <Reveal className="mb-24 md:mb-36">
          <div className="bg-[#0F172A]/50 border border-white/[0.06] rounded-3xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Text */}
              <div className="md:col-span-5 space-y-5">
                <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                  全球影响
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                  联合国高阶会议发声
                </h3>
                <div className="space-y-3 text-[#CBD5E1] leading-relaxed">
                  <p>
                    中心不仅仅在学术界活跃，更积极参与国际政策对话。
                    展现了岭南大学在推动全球艺术科技政策与标准制定方面的领导力。
                  </p>
                </div>
              </div>

              {/* 4-image grid */}
              <div className="md:col-span-7">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {[
                    { src: '/images/image41.webp', alt: '联合国会议场景一' },
                    { src: '/images/image42.webp', alt: '联合国会议场景二' },
                    { src: '/images/image43.webp', alt: '联合国会议场景三' },
                    { src: '/images/image44.webp', alt: '联合国会议场景四' },
                  ].map(img => (
                    <div
                      key={img.src}
                      className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.06] group"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ════════════════════════════════════
            BLOCK 6: AI 创意大赛获奖
            ════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <Reveal animation="slideInLeft" className="md:col-span-5 order-2 md:order-1">
            <div className="space-y-5">
              <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase">
                荣誉奖项
              </span>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                AI 创意大赛获殊荣
              </h3>
              <div className="space-y-4 text-[#CBD5E1] leading-relaxed">
                <p>
                  2025年全国大学生 AI 创意赛中，岭大商学院凭借卓越的组织能力
                  与学生表现，荣获<strong className="text-white">"杰出组织奖"</strong>。
                </p>
                <p>
                  参赛项目聚焦利用生成式 AI 技术解决消费者权益保护难题，
                  体现了科技向善的理念。
                </p>
                <p>
                  学生团队将课堂所学的商业理论与前沿 AI 工具相结合，
                  提出了极具落地潜力的解决方案。
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal animation="slideInRight" delay={0.15} className="md:col-span-7 order-1 md:order-2">
            <ImageCard
              src="/images/image45.webp"
              alt="AI创意大赛获奖证书"
              aspect="aspect-[16/10]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
