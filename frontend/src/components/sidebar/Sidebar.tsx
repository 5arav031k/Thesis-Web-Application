import BranchesIcon from '../../assets/branches-icon.svg';
import LaunchesIcon from '../../assets/launches-icon.svg';
import styles from './sidebar.module.css';
import { useState } from 'react';

export const Sidebar = () => {
  const [selected, setSelected] = useState<string>('launches');

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarButtonContainer}>
        <div
          className={`${styles.sidebarButton} ${selected === 'launches' ? styles.selected : ''}`}
          onClick={() => setSelected('launches')}
        >
          <img src={LaunchesIcon} className="icon" alt="Launches logo" />
          Launches
        </div>
        <div
          className={`${styles.sidebarButton} ${selected === 'branches' ? styles.selected : ''}`}
          onClick={() => setSelected('branches')}
        >
          <img src={BranchesIcon} className="icon" alt="Branches logo" />
          Branches
        </div>
      </div>
    </div>
  );
};
