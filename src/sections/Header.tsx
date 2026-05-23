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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center justify-between px-4 md:px-12 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'backdrop-blur-xl bg-[#030712]/70 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <a href="#" className="font-data text-base md:text-xl font-medium text-white tracking-wide z-10">
        AIGC@LU
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-[#CBD5E1] hover:text-white transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Desktop CTA */}
      <a
        href="#footer"
        className="hidden md:inline-block px-5 py-2.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5"
      >
        联系我们
      </a>

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="菜单"
      >
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${
            menuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        />
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-[#030712]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleLinkClick}
            className="text-xl text-[#CBD5E1] hover:text-white transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#footer"
          onClick={handleLinkClick}
          className="mt-4 px-8 py-3 text-base font-medium text-white rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]"
        >
          联系我们
        </a>
      </div>
    </header>
  );
}
