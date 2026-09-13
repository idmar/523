import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    label: '教育定位',
    value: '唯一',
    suffix: '',
    isNumeric: false,
    desc: '香港唯一的公立博雅大学，以学生为本，提供与众不同的教育模式',
  },
  {
    label: '学科排名',
    value: '2',
    suffix: 'nd',
    isNumeric: true,
    desc: '社会政策与行政管理位列香港第 2，亚洲第 9（2024 QS）',
  },
  {
    label: '全球视野',
    value: '85',
    suffix: '%',
    isNumeric: true,
    desc: '超过 85% 的本科生在学期间有机会到海外交流',
  },
];

function AnimatedNumber({ value, isNumeric }: { value: string; isNumeric: boolean }) {
  const [current, setCurrent] = useState(isNumeric ? 0 : value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumeric) return;
    const target = parseInt(value, 10);
    const el = ref.current;
    if (!el) return;

    const proxy = { val: 0 };
    const tween = gsap.to(proxy, {
      val: target,
      duration: 1.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        setCurrent(Math.round(proxy.val));
      },
    });

    return () => {
      tween.kill();
    };
  }, [value, isNumeric]);

  return (
    <span
      ref={ref}
      className="font-data text-5xl md:text-6xl font-medium tabular-nums"
      style={{
        background: 'linear-gradient(135deg, #C05621, #DD6B20)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {isNumeric ? current : value}
    </span>
  );
}

export default function DataCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    cardElements.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section id="data" ref={sectionRef} className="relative w-full py-16 md:py-24 lg:py-40 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el; }}
              className="relative p-6 md:p-8 lg:p-10 rounded-2xl border border-white/[0.08] bg-[#0F172A] overflow-hidden group hover:border-white/[0.15] transition-all duration-500"
            >
              {/* Subtle glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
                }}
              />

              <span className="text-xs tracking-wider text-[#94A3B8] font-medium uppercase mb-4 block">
                {card.label}
              </span>

              <div className="flex items-baseline gap-1 mb-4">
                <AnimatedNumber value={card.value} isNumeric={card.isNumeric} />
                {card.suffix && (
                  <span className="font-data text-2xl text-[#C05621]">{card.suffix}</span>
                )}
              </div>

              <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
