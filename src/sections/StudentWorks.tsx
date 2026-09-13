import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ImageWithSkeleton from '../components/ImageWithSkeleton';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    image: './images/image24.webp',
    title: '《归途·四境》',
    desc: 'AIGC跨学科实践作品，入围广州设计马拉松',
    authors: '邓宇聪、史一涵、吴钟志、林烨、刘海鸣、金喜儿',
    award: '入围 DA SHOW 澳门·横琴决赛，获2026国际数字艺术联想大赛人气大奖',
  },
  {
    id: 2,
    image: './images/image26.webp',
    title: '《茧·觉》',
    desc: 'AIGC跨学科实践作品，入围广州设计马拉松 & DA·SHOW广州场路演决赛',
    authors: '史一涵、邓宇聪、金喜儿、李思诚',
    award: '获二等奖',
  },
  {
    id: 3,
    image: './images/image28.webp',
    title: '《菌子互动投影》',
    desc: '数字技术与菌群生长的视觉融合，思辨设计、数据化设计与立体展示',
    authors: '张邀月、徐艺菲、曾诗婕',
    award: '',
  },
  {
    id: 4,
    image: './images/image30.webp',
    title: '《归青》',
    desc: '土地沙漠化与生态复苏互动全息投影艺术装置',
    authors: '陈姗姗、赖颖文、李乐朋、宋雨桐、涂婧琦、王琦森等',
    award: '',
  },
  {
    id: 5,
    image: './images/image32.webp',
    title: '《Life Cycle》',
    desc: '关于生命循环的沉浸式体验互动装置',
    authors: '梁译丹、施永康、曹原、陈廷坤、侯瀛、金泽中等',
    award: '',
  },
];

export default function StudentWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);
  const hasDraggedRef = useRef(false);

  const checkScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate closest card to viewport center for dot indicator
    const cards = track.querySelectorAll<HTMLElement>('.work-card');
    if (cards.length > 0) {
      const trackCenter = scrollLeft + clientWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(trackCenter - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('.work-card');
    if (cards[index]) {
      const card = cards[index];
      const targetLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  }, []);

  const handlePrevWork = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedWork(prev => (prev === null ? null : (prev - 1 + works.length) % works.length));
  }, []);

  const handleNextWork = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedWork(prev => (prev === null ? null : (prev + 1) % works.length));
  }, []);

  // Modal keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (selectedWork !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedWork(null);
        } else if (e.key === 'ArrowLeft') {
          setSelectedWork(prev => (prev === null ? null : (prev - 1 + works.length) % works.length));
        } else if (e.key === 'ArrowRight') {
          setSelectedWork(prev => (prev === null ? null : (prev + 1) % works.length));
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedWork]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    checkScrollButtons();
    track.addEventListener('scroll', checkScrollButtons, { passive: true });
    window.addEventListener('resize', checkScrollButtons);
    return () => {
      track.removeEventListener('scroll', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, [checkScrollButtons]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector<HTMLElement>('.work-card')?.offsetWidth || 320;
    const gap = 24;
    const scrollAmount = (cardWidth + gap) * 1.5;
    track.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  // Desktop mouse drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current?.scrollLeft || 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 6) {
      hasDraggedRef.current = true;
    }
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.work-card');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
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

  const selectedData = selectedWork !== null ? works[selectedWork] : null;

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#030712] overflow-hidden"
    >
      {/* Title */}
      <div className="text-center mb-12 md:mb-16 px-6">
        <span className="inline-block text-sm font-medium tracking-wider text-[#C05621] uppercase mb-4">
          学子风采
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          AIGC 跨学科实践
        </h2>
        <p className="text-[#CBD5E1] mt-4 max-w-xl mx-auto text-sm md:text-base">
          岭南大学MScATB学生AIGC跨学科实践作品
        </p>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative max-w-full">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0F172A]/90 border border-white/10 flex items-center justify-center text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-300 shadow-lg"
            aria-label="向左滚动"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0F172A]/90 border border-white/10 flex items-center justify-center text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-300 shadow-lg"
            aria-label="向右滚动"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Scroll track */}
        <div
          ref={trackRef}
          className={`flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Left spacer for centering first card on large screens */}
          <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1200px)/2)]" />

          {works.map((work, i) => (
            <div
              key={work.id}
              className="work-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] group"
              onClick={() => !hasDraggedRef.current && setSelectedWork(i)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0F172A] transition-all duration-500 hover:border-[#2563EB]/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithSkeleton
                    src={work.image}
                    alt={work.title}
                    aspect="aspect-[4/3]"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-medium text-lg mb-2 group-hover:text-[#60A5FA] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed line-clamp-2 mb-3">
                    {work.desc}
                  </p>
                  {work.award && (
                    <span className="inline-block text-xs text-[#C05621] bg-[#C05621]/10 px-2 py-1 rounded-full mb-2">
                      {work.award}
                    </span>
                  )}
                  <p className="text-xs text-[#94A3B8] truncate">
                    {work.authors}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Right spacer */}
          <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1200px)/2)]" />
        </div>

        {/* Scroll hint dots */}
        <div className="flex justify-center items-center gap-2 mt-6 md:hidden">
          {works.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={`跳转到作品 ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-[#2563EB] w-6' : 'bg-white/20 w-2 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detail overlay */}
      {selectedData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-modal-title"
          aria-describedby="work-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] bg-[#0F172A] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Top controls bar */}
            <div className="absolute top-3.5 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-[#38bdf8] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span>
                  {String((selectedWork ?? 0) + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWork(null)}
                aria-label="关闭详情 (Esc)"
                className="pointer-events-auto w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/90 hover:scale-105 transition-all shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image with Prev/Next float buttons */}
            <div className="relative w-full max-h-[50vh] overflow-hidden group/modalimg">
              <ImageWithSkeleton
                src={selectedData.image}
                alt={selectedData.title}
                aspect="aspect-[16/10]"
                className="w-full h-auto max-h-[50vh] object-cover"
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrevWork}
                aria-label="上一件作品 (快捷键: 左方向键)"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-[#2563EB] text-white border border-white/15 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNextWork}
                aria-label="下一件作品 (快捷键: 右方向键)"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-[#2563EB] text-white border border-white/15 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="p-5 md:p-8">
              <h3 id="work-modal-title" className="font-display text-xl md:text-3xl text-white mb-3">
                {selectedData.title}
              </h3>
              <p id="work-modal-desc" className="text-[#CBD5E1] mb-4 leading-relaxed text-sm md:text-base">
                {selectedData.desc}
              </p>
              {selectedData.award && (
                <p className="text-sm text-[#C05621] mb-4 bg-[#C05621]/10 px-3 py-2 rounded-lg inline-block border border-[#C05621]/20">
                  {selectedData.award}
                </p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-white/[0.08]">
                <p className="text-xs md:text-sm text-[#94A3B8]">
                  <span className="text-[#C05621]">作者：</span>
                  {selectedData.authors}
                </p>
                <span className="text-[11px] text-[#94A3B8]/70 font-mono hidden sm:inline-block">
                  ← / → 键切换 · Esc 退出
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
