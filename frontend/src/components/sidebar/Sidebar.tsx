import styles from './sidebar.module.css';
import { useState } from 'react';

export const Sidebar = () => {
  const [selected, setSelected] = useState<string>('launches');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.sidebarContainer}>
      <div
        className={`${styles.sidebarButtonContainer} ${selected === 'launches' ? styles.selected : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.selection}></div>
        <div className={styles.sidebarButton} onClick={() => setSelected('launches')}>
          <svg width="32" height="32">
            <use
              href={
                isHovered || selected === 'launches'
                  ? '#launches-icon-hovered'
                  : '#launches-icon-default'
              }
            />
          </svg>
          <span className={styles.sidebarButtonText}>Launches</span>
        </div>
      </div>
    </div>
  );
};
