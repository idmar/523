import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  {
    id: 1,
    image: '/images/image24.webp',
    title: '《归途·四境》',
    desc: 'AIGC跨学科实践作品，入围广州设计马拉松',
    authors: '邓宇聪、史一涵、吴钟志、林烨、刘海鸣、金喜儿',
    award: '入围 DA SHOW 澳门·横琴决赛，获2026国际数字艺术联想大赛人气大奖',
  },
  {
    id: 2,
    image: '/images/image26.webp',
    title: '《茧·觉》',
    desc: 'AIGC跨学科实践作品，入围广州设计马拉松 & DA·SHOW广州场路演决赛',
    authors: '史一涵、邓宇聪、金喜儿、李思诚',
    award: '获二等奖',
  },
  {
    id: 3,
    image: '/images/image28.webp',
    title: '《菌子互动投影》',
    desc: '数字技术与菌群生长的视觉融合，思辨设计、数据化设计与立体展示',
    authors: '张邀月、徐艺菲、曾诗婕',
    award: '',
  },
  {
    id: 4,
    image: '/images/image30.webp',
    title: '《归青》',
    desc: '土地沙漠化与生态复苏互动全息投影艺术装置',
    authors: '陈姗姗、赖颖文、李乐朋、宋雨桐、涂婧琦、王琦森等',
    award: '',
  },
  {
    id: 5,
    image: '/images/image32.webp',
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const checkScrollButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

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

  // Mouse drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = trackRef.current?.scrollLeft || 0;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch drag
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    scrollStartX.current = trackRef.current?.scrollLeft || 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = e.touches[0].clientX - dragStartX.current;
    trackRef.current.scrollLeft = scrollStartX.current - dx;
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          {/* Left spacer for centering first card on large screens */}
          <div className="hidden lg:block flex-shrink-0 w-[calc((100vw-1200px)/2)]" />

          {works.map((work, i) => (
            <div
              key={work.id}
              className="work-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[380px] group"
              onClick={() => !isDragging && setSelectedWork(i)}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0F172A] transition-all duration-500 hover:border-[#2563EB]/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60" />
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
                  <p className="text-xs text-[#CBD5E1]/50 truncate">
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
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {works.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === 0 ? 'bg-[#2563EB] w-5' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Detail overlay */}
      {selectedData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#0F172A] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={selectedData.image}
              alt={selectedData.title}
              className="w-full h-auto max-h-[50vh] object-cover"
            />

            <div className="p-5 md:p-8">
              <h3 className="font-display text-xl md:text-3xl text-white mb-3">
                {selectedData.title}
              </h3>
              <p className="text-[#CBD5E1] mb-4 leading-relaxed text-sm md:text-base">
                {selectedData.desc}
              </p>
              {selectedData.award && (
                <p className="text-sm text-[#C05621] mb-4 bg-[#C05621]/10 px-3 py-2 rounded-lg inline-block">
                  {selectedData.award}
                </p>
              )}
              <p className="text-xs md:text-sm text-[#CBD5E1]/60">
                <span className="text-[#C05621]">作者：</span>
                {selectedData.authors}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
