import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Footer() {
  const glowRef = useScrollReveal<HTMLHeadingElement>({ animation: 'blur-in', duration: 1.5 });

  return (
    <footer id="footer" className="relative w-full min-h-[80vh] bg-[#030712] flex flex-col">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img
          src="./images/image47.webp"
          alt=""
          loading="lazy"
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
                  人才培育 (MScATB)
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  产学研国际合作
                </span>
              </li>
              <li>
                <span className="text-sm text-[#CBD5E1] hover:text-white transition-colors cursor-default">
                  文化资产数字化与知识转移
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">联系方式</h4>
            <ul className="space-y-2 text-sm text-[#CBD5E1]">
              <li className="text-white font-medium">
                黄经国艺术科技与商业研究中心
              </li>
              <li>
                地址：香港新界屯门青山公路8号 岭南大学商学院
              </li>
              <li>
                电话：<a href="tel:+85226168373" className="hover:text-white transition-colors">+852 2616 8373</a>
              </li>
              <li>
                邮箱：<a href="mailto:mscatb@ln.edu.hk" className="text-[#60A5FA] hover:underline">mscatb@ln.edu.hk</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">官方渠道</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-xs text-[#94A3B8] block mb-1">官方网站：</span>
                <a
                  href="https://www.ln.edu.hk/fb/hkibs/rwcatb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#60A5FA] hover:text-[#93C5FD] transition-colors break-all inline-flex items-center gap-1"
                >
                  <span>访问研究中心官网</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mscatb@ln.edu.hk?subject=关于AIGC教研探索的咨询"
                  className="relative group inline-flex items-center gap-2 mt-2 px-4 py-2.5 text-xs font-medium text-white rounded-lg bg-[#2563EB]/25 border border-[#2563EB]/50 hover:bg-[#2563EB] hover:border-[#38bdf8] transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-0.5"
                >
                  <svg className="w-3.5 h-3.5 text-[#38bdf8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>发送合作/咨询邮件</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto border-t border-white/[0.08] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
            <span>岭南大学商学院 黄经国艺术科技与商业研究中心</span>
            <span>LINGNAN UNIVERSITY · FACULTY OF BUSINESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
