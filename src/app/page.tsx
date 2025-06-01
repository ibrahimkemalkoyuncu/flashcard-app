'use client'
import { useState, useEffect, useCallback } from 'react';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import FlashCard from '@/components/FlashCard';
import styles from './page.module.css';

interface FlashCard {
  front: string;
  back: string;
}

const flashcards: FlashCard[] = [
  { front: "Hello", back: "Merhaba" },
  { front: "Goodbye", back: "Hoşçakal" },
  { front: "Thank you", back: "Teşekkür ederim" },
  { front: "Please", back: "Lütfen" },
  { front: "Sorry", back: "Özür dilerim" },
  { front: "Yes", back: "Evet" },
  { front: "No", back: "Hayır" },
  { front: "Help", back: "Yardım" },
  { front: "Water", back: "Su" },
  { front: "Food", back: "Yemek" },
];

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [autoMode, setAutoMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentCard: FlashCard = flashcards[currentCardIndex];

  const flipCard = useCallback(() => {
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  const nextCard = useCallback(() => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  }, [currentCardIndex]);

  const previousCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  }, [currentCardIndex]);

  const shuffleCards = (): void => {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    flashcards.splice(0, flashcards.length, ...shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const toggleAuto = (): void => {
    setAutoMode(!autoMode);
  };

  const playAudio = (): void => {
    if ('speechSynthesis' in window) {
      const textToSpeak = isFlipped ? currentCard.back : currentCard.front;
      const language = isFlipped ? 'tr-TR' : 'en-US';
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err: Error) => {
        alert('Tam ekran modu etkinleştirilemedi: ' + err.message);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'ArrowLeft':
          previousCard();
          break;
        case 'ArrowRight':
          nextCard();
          break;
        case ' ':
          event.preventDefault();
          flipCard();
          break;
        case 'r':
        case 'R':
          shuffleCards();
          break;
        case 'a':
        case 'A':
          toggleAuto();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipCard, nextCard, previousCard]);

  // Auto mode control
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoMode) {
      interval = setInterval(() => {
        if (!isFlipped) {
          flipCard();
        } else {
          if (currentCardIndex < flashcards.length - 1) {
            nextCard();
          } else {
            setAutoMode(false);
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoMode, isFlipped, currentCardIndex, flipCard, nextCard]);

  return (
    <div className={styles.appContainer}>
      <KeyboardShortcuts />
      
      <div className={styles.header}>
        <h1>İngilizce Kelimeler</h1>
        <div className={styles.progressInfo}>
          <span className={styles.progressText}>{currentCardIndex + 1} / {flashcards.length}</span>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
            ></div>
          </div>
          <span className={styles.progressText}>
            {Math.round(((currentCardIndex + 1) / flashcards.length) * 100)}%
          </span>
        </div>
      </div>

      <div className={styles.cardContainer}>
        <FlashCard 
          front={currentCard.front} 
          back={currentCard.back} 
          isFlipped={isFlipped} 
          onClick={flipCard} 
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.navButtons}>
          <button 
            className={`${styles.btn} ${styles.btnSecondary}`} 
            onClick={previousCard}
            disabled={currentCardIndex === 0}
          >
            ← Önceki
          </button>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            onClick={nextCard}
            disabled={currentCardIndex === flashcards.length - 1}
          >
            Sonraki →
          </button>
        </div>

        <div className={styles.options}>
          <div className={styles.toggleContainer}>
            <span>Auto Play</span>
            <div 
              className={`${styles.toggle} ${autoMode ? styles.active : ''}`} 
              onClick={toggleAuto}
            >
              <div className={styles.toggleSwitch}></div>
            </div>
          </div>

          <button 
            className={styles.btnIcon} 
            onClick={shuffleCards} 
            title="Karıştır"
          >
            🔀
          </button>

          <button 
            className={styles.btnIcon} 
            onClick={playAudio} 
            title="Sesli Okuma"
          >
            🔊
          </button>

          <button 
            className={styles.btnIcon} 
            onClick={toggleFullscreen} 
            title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran"}
          >
            {isFullscreen ? "⛶" : "⛶"}
          </button>
        </div>
      </div>
    </div>
  );
}