'use client';

import { useEffect, useState } from 'react';
import ContactSection from '../sections/ContactSection';
import LettersAnimation from '../components/LettersAnimation';
import { useScrollToTop } from '../hooks/useScrollToTop';

const contactLetters = [
  { char: 'C', src: '/images/icons/C.svg' },
  { char: 'O', src: '/images/icons/O.svg' },
  { char: 'N', src: '/images/icons/N.svg' },
  { char: 'T', src: '/images/icons/T.svg' },
  { char: 'A', src: '/images/icons/A.svg' },
  { char: 'C', src: '/images/icons/cSmall.svg' },
  { char: 'T', src: '/images/icons/T.svg' }
];

export default function ContactPage() {
  const [showContact, setShowContact] = useState(false);
  useScrollToTop();

  useEffect(() => {
    const timer = setTimeout(() => setShowContact(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LettersAnimation letters={contactLetters} />
      {showContact && <ContactSection />}
    </>
  );
}