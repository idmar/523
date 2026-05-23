import { useScrollReveal } from '../hooks/useScrollReveal';

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

            <div ref={textRef} className="space-y-4 text-[#CBD5E1] leading-relaxed">
              <p>
                1888年，岭南大学前身“格致书院”创立于广州，开启了现代高等教育的先河。
                1927年正式更名为“岭南大学”，收回教育主权，华人治校。
              </p>
              <p>
                校训“作育英才，服务社会”至今仍深深影响着每一位岭南人。
                1937-1945年抗日战争期间，三迁校址，最能体现“红灰精神”的韧性。
              </p>
              <p>
                1952年院系调整后，岭南大学的建制被取消。直至1967年，
                岭南校友在香港复办“岭南书院”，延续红灰精神。1999年正名为“岭南大学”，
                成为香港八大资助院校之一。
              </p>
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
              <img
                src="/images/image3.webp"
                alt="岭南大学历史老照片"
                className="w-full h-auto object-cover rounded-2xl md:rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
