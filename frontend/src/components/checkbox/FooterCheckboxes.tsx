import * as React from 'react';
import styles from './footerCheckboxes.module.css';

interface FooterCheckboxesProps {
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FooterCheckboxes: React.FC<FooterCheckboxesProps> = ({ selected, setSelected }) => {
  return (
    <div className={styles.checkboxChoice}>
      <div className={styles.checkbox}>
        <svg width={22} height={21} style={{ cursor: 'pointer' }} onClick={() => setSelected(true)}>
          <use href={`#${selected ? 'radio-button-selected' : 'radio-button-unselected'}`} />
        </svg>
        True
      </div>
      <div className={styles.checkbox}>
        <svg
          width={22}
          height={21}
          style={{ cursor: 'pointer' }}
          onClick={() => setSelected(false)}
        >
          <use href={`#${selected ? 'radio-button-unselected' : 'radio-button-selected'}`} />
        </svg>
        False
      </div>
    </div>
  );
};
