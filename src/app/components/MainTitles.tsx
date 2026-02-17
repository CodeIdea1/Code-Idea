'use client';
import { motion } from 'framer-motion';
import styles from '../styles/mainTitles.module.css';

interface MainTitlesProps {
  text: string;
  fontSize?: string;
}

export default function MainTitles({ text, fontSize }: MainTitlesProps) {
  return (
    <h1 className={styles.mainTitle} style={{ fontSize }}>
      {text.split('').map((char, index) => {
        if (index === 0 && char.toLowerCase() === 's') {
          return (
            <motion.img
              key={index}
              src="/images/icons/Scapital.svg"
              alt="S"
              className={styles.letterImage}
              whileHover={{ y: -35, scaleY: 1.25 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        }
        
        if (index === 5 && char.toLowerCase() === 'j') {
          return (
            <motion.img
              key={index}
              src="/images/misc/g.png"
              alt="J"
              className={styles.letterImage}
              whileHover={{ y: -35, scaleY: 1.25 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        }
        
        if (char !== ' ') {
          return (
            <img
              key={index}
              src={`/images/misc/${char.toLowerCase()}.png`}
              alt={char}
              className={styles.letterImage}
            />
          );
        }
        
        return <span key={index} className={styles.space}>&nbsp;</span>;
      })}
    </h1>
  );
}
