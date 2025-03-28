import WaffleIcon from '../../assets/waffle-icon.svg';
import styles from './header.module.css';

export const Header = () => (
  <>
    <div className={styles.headerContainer}>
      <div className={styles.arisContainer}>
        <div className={styles.waffleContainer}>
          <img src={WaffleIcon} className={styles.waffleIcon} alt="waffle-icon" />
        </div>
        <div className={styles.arisName}>
          <span className={styles.aris}>ARIS</span>
          TA Service
        </div>
      </div>
    </div>
  </>
);
