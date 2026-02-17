'use client';

import HeroSection from "./sections/HeroSectionHome";
import OurShortStory from "./sections/OurShortStory";
import ScrollSlider from "./sections/ScrollSlider";
import StackedCards from './sections/StackedCards';
import StorySection from './sections/StorySection';
import SectionHeader from './components/SectionHeader';
import { useScrollToTop } from './hooks/useScrollToTop';
import LettersAnimation from './components/LettersAnimation';

import { useRef } from 'react';

const aboutLetters = [
  { char: 'A', src: '/images/icons/Ocapital.svg' },
  { char: 'B', src: '/images/icons/u.svg' },
  { char: 'O', src: '/images/icons/r.svg' },
  { char: 'U', src: '/images/icons/Scapital.svg' },
  { char: 'T', src: '/images/icons/T.svg' },
  { char: 'O', src: '/images/icons/oo.svg' },
  { char: 'D', src: '/images/icons/r.svg' },
  { char: 'I', src: '/images/icons/y.svg' }
];

export default function Home() {
  const stackedCardsRef = useRef<HTMLDivElement>(null);
  useScrollToTop();
  
  return (
    <>
      <HeroSection />
      <SectionHeader targetRef={stackedCardsRef} />
      <StackedCards ref={stackedCardsRef} />    
      <ScrollSlider />
      <LettersAnimation letters={aboutLetters} navigateTo="/OurStory" />
    </>
  );
}
