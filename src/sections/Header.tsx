import { useState, useEffect } from 'react';

const navLinks = [
  { label: '历史传承', href: '#history' },
  { label: '核心数据', href: '#data' },
  { label: '教研设计', href: '#teaching' },
  { label: '学子风采', href: '#works' },
  { label: '国际合作', href: '#partners' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);

      // Calculate reading progress (0% ~ 100%)
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (scrollY / totalScroll) * 100)));
      }

      // ScrollSpy: identify which section is currently active
      const sectionIds = ['history', 'data', 'teaching', 'works', 'partners'];
      const scrollOffset = scrollY + 160;

      if (scrollY < 180) {
        setActiveSection('');
        return;
      }

      let current = '';
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollOffset) {
          current = sectionIds[i];
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  // Lock body scroll when mobile menu is open and listen for Esc key
  useEffect(() => {
    if (menuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center justify-between px-4 md:px-12 transition-all duration-500 ${scrolled || menuOpen
          ? 'backdrop-blur-xl bg-[#030712]/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
        }`}
    >
      {/* Top reading progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent overflow-hidden pointer-events-none z-50">
        <div
          className="h-full bg-gradient-to-r from-[#2563EB] via-[#38bdf8] to-[#C05621] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      {/* Brand Logo & Name */}
      <a
        href="#"
        className="flex items-center gap-2.5 md:gap-3 z-10 group"
        aria-label="返回首页"
      >
        <img
          src="./favicon.svg"
          alt="岭南大学徽标"
          className="w-8 h-8 md:w-9 md:h-9 object-contain rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.35)] group-hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] group-hover:scale-105 transition-all duration-300"
        />
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-semibold tracking-wider text-white leading-tight font-display group-hover:text-[#60A5FA] transition-colors">
            嶺南大學商學院
          </span>
          <span className="text-[10px] md:text-[11px] text-[#94A3B8] tracking-widest uppercase font-mono">
            艺术科技与商业研究中心
          </span>
        </div>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-3">
        {navLinks.map(link => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm px-3.5 py-1.5 rounded-full transition-all duration-300 relative font-medium ${isActive
                  ? 'text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'text-[#CBD5E1] hover:text-[#38bdf8] hover:bg-white/[0.05] border border-transparent'
                }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent shadow-[0_0_8px_#38bdf8]" />
              )}
            </a>
          );
        })}
      </nav>

      {/* Desktop CTA */}
      <a
        href="#footer"
        className="relative group hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_28px_rgba(56,189,248,0.5)] overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
        <span>联系我们</span>
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </a>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="菜单"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
      >
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2 bg-[#38bdf8]' : ''
            }`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''
            }`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2 bg-[#38bdf8]' : ''
            }`}
        />
      </button>

      {/* Mobile menu overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 bg-[#030712]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 transition-all duration-500 md:hidden z-40 ${menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }`}
      >
        {navLinks.map(link => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className={`text-xl font-display transition-colors duration-300 flex items-center gap-3 ${isActive
                  ? 'text-[#38bdf8] font-semibold scale-105'
                  : 'text-[#E2E8F0] hover:text-[#38bdf8]'
                }`}
            >
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
              )}
              {link.label}
            </a>
          );
        })}
        <a
          href="#footer"
          onClick={handleLinkClick}
          className="mt-4 px-8 py-3 text-base font-medium text-white rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] shadow-[0_0_25px_rgba(37,99,235,0.4)]"
        >
          联系我们
        </a>
      </div>
    </header>
  );
}
