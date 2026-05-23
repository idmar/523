import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'blur-in' | 'shrink-in' | 'slideInLeft' | 'slideInRight' | 'floatInBottom' | 'scale-down';

interface ScrollRevealOptions {
  animation: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      animation,
      duration = 1.2,
      delay = 0,
      ease = 'power3.out',
      start = 'top 80%',
    } = options;

    let fromVars: gsap.TweenVars = {};
    let toVars: gsap.TweenVars = {
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    switch (animation) {
      case 'blur-in':
        fromVars = { filter: 'blur(12px)', opacity: 0 };
        toVars = { ...toVars, filter: 'blur(0px)', opacity: 1 };
        break;
      case 'shrink-in':
        fromVars = { scale: 1.2, opacity: 0 };
        toVars = { ...toVars, scale: 1, opacity: 1 };
        break;
      case 'slideInLeft':
        fromVars = { x: -60, opacity: 0 };
        toVars = { ...toVars, x: 0, opacity: 1 };
        break;
      case 'slideInRight':
        fromVars = { x: 60, opacity: 0 };
        toVars = { ...toVars, x: 0, opacity: 1 };
        break;
      case 'floatInBottom':
        fromVars = { y: 40, opacity: 0 };
        toVars = { ...toVars, y: 0, opacity: 1 };
        break;
      case 'scale-down':
        fromVars = { scale: 1.1, opacity: 0 };
        toVars = { ...toVars, scale: 1, opacity: 1 };
        break;
    }

    gsap.fromTo(el, fromVars, toVars);

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options.animation, options.duration, options.delay, options.ease, options.start]);

  return ref;
}
