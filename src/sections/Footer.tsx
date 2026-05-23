import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const glowRef = useScrollReveal<HTMLHeadingElement>({ animation: 'blur-in', duration: 1.5 });

  return (
    <footer id="footer" className="relative w-full min-h-[80vh] bg-[#030712] flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/image47.webp"
          alt="毕业典礼"
          className="w-full h-full object-cover opacity-10"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(3, 7, 18, 0.7) 0%, #030712 80%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 md:py-24">
        {/* Glowing CTA */}
        <div className="text-center mb-12 md:mb-20 px-2">
          <h2
            ref={glowRef}
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl glow-text leading-tight mb-4 md:mb-6"
          >
            携手共创数字文化新未来
          </h2>
          <p className="text-sm md:text-base text-[#CBD5E1] max-w-xl mx-auto leading-relaxed">
            以 AIGC 赋能中国文化基因，推动文化资产在全球数字经济中的商业价值提升与跨文化共情叙事
          </p>
        </div>

        {/* Links and info */}
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-8 mb-12 md:mb-16 text-center sm:text-left">
          <div>
            <h4 className="text-white font-medium mb-4">研究中心</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  跨学科研究
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  人才培育
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  产学研合作
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  知识转移
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">联系方式</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-[#CBD5E1]">
                  黄经国艺术科技与商业研究中心
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1]">
                  岭南大学商学院
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1]">
                  香港商学研究所
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">官方网站</h4>
            <a
              href="https://www.ln.edu.hk/fb/hkibs/rwcatb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#2563EB] hover:text-[#60A5FA] transition-colors break-all"
            >
              https://www.ln.edu.hk/fb/hkibs/rwcatb
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto border-t border-white/[0.08] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#CBD5E1]/50">
            <span>岭南大学商学院 黄经国艺术科技与商业研究中心</span>
            <span>LINGNAN UNIVERSITY · FACULTY OF BUSINESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
