'use client'
import { useState } from 'react';
import styles from './FlashCard.module.css';

export default function FlashCard({ front, back, isFlipped, onClick }) {
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) onClick('next');
      else onClick('prev');
    }
  };

  return (
    <div 
      className={styles.flashcard}
      onClick={() => !isDragging && onClick('flip')}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.cardFront}>
          <div className={styles.cardLabel}>İngilizce</div>
          <div className={styles.cardContent}>{front}</div>
          <div className={styles.flipHint}></div>
        </div>
        <div className={styles.cardBack}>
          <div className={styles.cardLabel}>Türkçe</div>
          <div className={styles.cardContent}>{back}</div>
        </div>
      </div>
    </div>
  );
}