'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from '../styles/ProjectsPage.module.css';
import LettersAnimation from '../components/LettersAnimation';
import { title } from 'process';

gsap.registerPlugin(ScrollTrigger);
const projects = [
  {
    id: 1,
    title: "Stylish Accessories",
    description: "Modern high-conversion e-commerce design.",
    image: "/images/projects/featuredprojects-stylish-accessories.webp",
    link: "https://stylish-accessories-3b34d.web.app/"
  },
  {
    id: 2,
    title: "Flower Hub",
    description: "Clean and elegant product showcase.",
    image: "/images/projects/flowers.png",
    link: "https://flower-hub.vercel.app/"
  },
  {
    id: 3,
    title: "Huracan",
    description: "Luxury sports car landing page.",
    image: "/images/projects/landing-design2-car.webp",
    link: "https://lamborghini-huracan-555ef.web.app/"
  },
  {
    id: 4,
    title: "Dose Gym",
    description: "Fitness app with intuitive UI.",
    image: "/images/projects/projects-dose1.png",
    link: "https://dose-gym-9c4c9.web.app/"
  },
  {
    id: 5,
    title: "Hoodie",
    description: "Brand identity & e-commerce concept.",
    image: "/images/projects/hoodie.png",
    link: "https://hoodie-theta.vercel.app/"
  },
  {
    id: 6,
    title: "Delta",
    description: "Premium luxury brand website.",
    image: "/images/projects/delta.png",
    link: "https://delta-two-xi.vercel.app/"
  },
{
  id: 7,
  title: "Dana Socks",
  description: "Full e-commerce store experience.",
  image: "/images/projects/danaSocks.png",
  link: "https://dana-socks.vercel.app/"
},
  {
    id: 8,
    title: "Veyron",
    description: "Futuristic sports car concept.",
    image: "/images/projects/p1.png",
    link: "https://veyron-kjrw.vercel.app/"
  }
];




export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [visibleDescriptions, setVisibleDescriptions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    imageRefs.current.forEach((img) => {
      if (img) {
        gsap.fromTo(img, 
          { x: '-50%' },
          {
            x: isMobile ? '11%' : '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      }
    });

    if (isMobile) {
      descriptionRefs.current.forEach((desc, index) => {
        if (desc) {
          ScrollTrigger.create({
            trigger: desc,
            start: 'top 80%',
            onEnter: () => {
              setVisibleDescriptions(prev => new Set(prev).add(index));
            },
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projectsLetters = [
    { char: 'P', src: '/images/icons/p.svg' },
    { char: 'R', src: '/images/icons/r.svg' },
    { char: 'O', src: '/images/icons/O.svg' },
    { char: 'J', src: '/images/icons/j.svg' },
    { char: 'E', src: '/images/misc/e.png' },
    { char: 'C', src: '/images/icons/cSmall.svg' },
    { char: 'T', src: '/images/icons/T.svg' },
    { char: 'S', src: '/images/icons/sSmall.svg' }
  ];

  return (
    <div className={styles.page}>
      <LettersAnimation letters={projectsLetters} />
      <section ref={sectionRef} className={styles.projectsSection}>
        <Swiper
          modules={[FreeMode, Mousewheel]}
          slidesPerView="auto"
          spaceBetween={20}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1
          }}
          speed={600}
          grabCursor={true}
          className={styles.imageGrid}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <div className={styles.projectCard}>
                <div className={styles.imageBox} onClick={() => window.open(project.link, '_blank')}>
                  <img 
                    ref={(el) => { imageRefs.current[index] = el; }} 
                    src={project.image} 
                    alt={`Project ${project.id}`} 
                  />
                  <div className={styles.hoverContent}>
                    <h3 className={styles.hoverTitle}>{project.title}</h3>
                    <p className={styles.hoverDescription}>{project.description}</p>
                  </div>
                  <div className={styles.mobileContent}>
                    <h3 className={styles.mobileTitle}>{project.title}</h3>
                    <p 
                      ref={(el) => { descriptionRefs.current[index] = el; }}
                      className={`${styles.mobileDescription} ${visibleDescriptions.has(index) ? styles.visible : ''}`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
