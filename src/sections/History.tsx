import { useScrollReveal } from '../hooks/useScrollReveal';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

export default function History() {
  const tagRef = useScrollReveal<HTMLSpanElement>({ animation: 'floatInBottom', delay: 0 });
  const titleRef = useScrollReveal<HTMLHeadingElement>({ animation: 'slideInLeft', delay: 0.1 });
  const textRef = useScrollReveal<HTMLParagraphElement>({ animation: 'slideInLeft', delay: 0.2 });
  const imageRef = useScrollReveal<HTMLDivElement>({ animation: 'slideInRight', delay: 0.2 });

  return (
    <section id="history" className="relative w-full py-20 md:py-32 lg:py-48 bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left: Text */}
          <div className="md:col-span-5 space-y-6">
            <span
              ref={tagRef}
              className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase"
            >
              历史传承
            </span>

            <h2
              ref={titleRef}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
            >
              百年树人：广州根基
            </h2>

            <div ref={textRef} className="space-y-5 text-[#CBD5E1] leading-relaxed">
              <div className="border-l-2 border-[#C05621]/50 pl-4 py-0.5 space-y-1.5 group">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#C05621]/15 text-[#DD6B20] border border-[#C05621]/30">
                    1888 — 1927
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium">广州开篇 · 华人治校</span>
                </div>
                <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                  1888年，岭南大学前身<strong className="text-white font-medium">“格致书院”</strong>创立于广州，开启现代高等教育先河。1927年正式更名为“岭南大学”，收回教育主权，开创华人治校新纪元。
                </p>
              </div>

              <div className="border-l-2 border-[#2563EB]/50 pl-4 py-0.5 space-y-1.5 group">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                    1937 — 1945
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium">红灰精神 · 逆境坚守</span>
                </div>
                <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                  校训<strong className="text-white font-medium">“作育英才，服务社会”</strong>至今仍深深影响着每一位岭南人。抗战期间三迁校址，弦歌不辍，最能体现岭南“红灰精神”的坚毅风骨。
                </p>
              </div>

              <div className="border-l-2 border-[#00f0ff]/50 pl-4 py-0.5 space-y-1.5 group">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#00f0ff]/15 text-[#38bdf8] border border-[#00f0ff]/30">
                    1967 — 至今
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium">香港复办 · 博雅殿堂</span>
                </div>
                <p className="text-sm md:text-base text-[#CBD5E1] leading-relaxed">
                  1967年岭南校友在香港复办“岭南书院”，赓续红灰薪火；<strong className="text-white font-medium">1999年正名为“岭南大学”</strong>，成为香港八大公立资助院校之一，稳居亚洲博雅教育前沿。
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="md:col-span-7">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden group">
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: 'radial-gradient(54.01% 74.44% at 50% 105.71%, rgba(37, 99, 235, 0.15) 0%, transparent 100%)',
                }}
              />
              <ImageWithSkeleton
                src="./images/image3.webp"
                alt="岭南大学历史老照片"
                aspect="aspect-[16/11]"
                className="w-full h-full object-cover rounded-2xl md:rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
