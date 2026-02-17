

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ScrollSlider.module.css';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// تحسين الأداء
gsap.config({ force3D: true });

const brands = [
  { id: 1, image: '/images/backgrounds/W-1.webp' },
  { id: 2, image: '/images/backgrounds/W-2.webp' },
  { id: 3, image: '/images/backgrounds/W-3.webp' },
  { id: 5, image: '/images/backgrounds/W-5.webp' },
  { id: 6, image: '/images/backgrounds/W-6.webp' },
  { id: 7, image: '/images/backgrounds/W-7.webp' },
  { id: 8, image: '/images/backgrounds/W-8.webp' },
  { id: 9, image: '/images/backgrounds/W-9.webp' },
  { id: 10, image: '/images/backgrounds/W-10.webp' },
  { id: 11, image: '/images/backgrounds/W-11.webp' },
  { id: 12, image: '/images/backgrounds/W-12.webp' }
];

export default function ScrollSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!section || !row1 || !row2) return;

    // تحسين الأداء مع WebGL
    [row1, row2].forEach(row => {
      row.style.willChange = 'transform';
      row.style.backfaceVisibility = 'hidden';
      row.style.perspective = '1000px';
    });
    
    gsap.set([row1, row2], { force3D: true });
    gsap.set(row1, { x: 0 });
    gsap.set(row2, { x: -1500 });
    
    const tl1 = gsap.to(row1, {
      x: -1500,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onRefresh: (self) => scrollTriggersRef.current.push(self)
      }
    });

    const tl2 = gsap.to(row2, {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onRefresh: (self) => scrollTriggersRef.current.push(self)
      }
    });

    // حفظ المراجع
    if (tl1.scrollTrigger) scrollTriggersRef.current.push(tl1.scrollTrigger);
    if (tl2.scrollTrigger) scrollTriggersRef.current.push(tl2.scrollTrigger);

    return () => {
      // إيقاف الأنيميشنز أولاً
      tl1.kill();
      tl2.kill();
      
      // إيقاف ScrollTriggers المحفوظة
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill(true);
        }
      });
      scrollTriggersRef.current = [];
      
      // تنظيف willChange
      [row1, row2].forEach(row => {
        if (row) {
          row.style.willChange = 'auto';
          // إعادة تعيين transform
          gsap.set(row, { clearProps: 'all' });
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <AnimatedTitle text="Our Creative Services" className={styles.mainTitle} />
        
        <div className={styles.sliderContainer}>
          <div ref={row1Ref} className={styles.row}>
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.card}>
                <img src={brand.image} alt={`Brand ${brand.id}`} className={styles.brandImage} />
              </div>
            ))}
          </div>
          
          <div ref={row2Ref} className={styles.row}>
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.card}>
                <img src={brand.image} alt={`Brand ${brand.id}`} className={styles.brandImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}