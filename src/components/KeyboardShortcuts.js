'use client'
import styles from './KeyboardShortcuts.module.css';

export default function KeyboardShortcuts() {
  return (
    <div className={styles.shortcutHint}>
      <h3 className={styles.shortcutTitle}>Klavye Kısayolları</h3>
      
      <div className={styles.shortcutGrid}>
        <div className={styles.shortcutKey}>← →</div>
        <div>Kartları geç</div>
        
        <div className={styles.shortcutKey}>Boşluk</div>
        <div>Kartı çevir</div>
        
        <div className={styles.shortcutKey}>R</div>
        <div>Karıştır</div>
        
        <div className={styles.shortcutKey}>A</div>
        <div>Otomatik mod</div>
      </div>
    </div>
  );
}