'use client';

import OurShortStory from '../sections/OurShortStory';
import StorySection from '../sections/StorySection';
import LettersAnimation from '../components/LettersAnimation';

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

const contactLetters = [
  { char: 'C', src: '/images/icons/C.svg' },
  { char: 'O', src: '/images/icons/O.svg' },
  { char: 'N', src: '/images/icons/N.svg' },
  { char: 'T', src: '/images/icons/T.svg' },
  { char: 'A', src: '/images/icons/A.svg' },
  { char: 'C', src: '/images/icons/cSmall.svg' },
  { char: 'T', src: '/images/icons/T.svg' }
];

export default function OurStory() {
  return (
    <main>
      <LettersAnimation letters={aboutLetters} alignItems="end" />
      <OurShortStory />
      <StorySection />
      <LettersAnimation letters={contactLetters} navigateTo="/contact" />
    </main>
  );
}