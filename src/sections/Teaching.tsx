import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: '多元导师制教学',
    desc: '岭南大学商学院 + 清华大学美术学院导师 + 行业企业家导师共同指导理论与实践',
  },
  {
    title: '实地考察与行业对接',
    desc: '知名艺术科技机构和商业组织实地考察、讲座、实习，直面产业前沿',
  },
  {
    title: '硬技能培养',
    desc: 'Python 编程、大数据分析、AI 工具实操、数据驱动营销策略制定',
  },
  {
    title: '真实项目实践',
    desc: '学生参与 AIGC 文化资产活化真实项目，以作品集与项目路演作为考核',
  },
];

export default function Teaching() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Image scale-down animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Feature cards stagger animation
    const featureElements = featureRefs.current.filter(Boolean) as HTMLDivElement[];
    featureElements.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section || st.trigger === imageRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section id="teaching" ref={sectionRef} className="relative w-full py-20 md:py-32 lg:py-48 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase mb-4">
            教研设计
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
            从课堂到产业
          </h2>
          <p className="text-[#CBD5E1] max-w-2xl mx-auto leading-relaxed">
            岭南大学商学院艺术科技与商业理学硕士（MScATB）全港首创，
            结合商业策略与艺术科技的跨学科硕士课程
          </p>
        </div>

        {/* Main Image */}
        <div ref={imageRef} className="relative mb-10 md:mb-16 lg:mb-20 rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'radial-gradient(54.01% 74.44% at 50% 100%, rgba(37, 99, 235, 0.12) 0%, transparent 100%)',
            }}
          />
          <ImageWithSkeleton
            src="./images/image20.webp"
            alt="课程现场照片"
            aspect="aspect-[16/9]"
            className="w-full h-full object-cover rounded-2xl md:rounded-3xl"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={el => { featureRefs.current[i] = el; }}
              className="p-5 md:p-6 lg:p-8 rounded-2xl border border-white/[0.06] bg-[#0F172A]/50 hover:bg-[#0F172A] hover:border-white/[0.12] transition-all duration-500 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2563EB]/20 group-hover:bg-[#2563EB] group-hover:shadow-[0_0_15px_rgba(37,99,235,0.6)] flex items-center justify-center mt-0.5 transition-all duration-300">
                  <span className="text-[#2563EB] group-hover:text-white text-sm font-data font-medium transition-colors duration-300">{i + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#60A5FA] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Teaching goal & CTA */}
        <div className="mt-12 md:mt-16 p-8 rounded-2xl border border-[#2563EB]/20 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-center md:text-left text-[#CBD5E1] leading-relaxed">
            <span className="text-white font-medium">培养目标：</span>
            具有商业化战略思考、支持艺术与科技产业发展、具备创新能力的专业化人才
          </p>
          <a
            href="https://www.ln.edu.hk/fb/hkibs/rwcatb"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#2563EB] hover:brightness-110 transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 overflow-hidden"
          >
            {/* Shimmer light sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            <span>了解 MScATB 课程详情</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
