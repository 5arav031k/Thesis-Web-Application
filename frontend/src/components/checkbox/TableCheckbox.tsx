import { useState } from 'react';
import styles from './tableCheckbox.module.css';

export const TableCheckbox = ({ ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.customCheckbox}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input type="checkbox" {...props} />
      <svg width="19" height="18">
        <use
          href={
            props.checked
              ? '#checkbox-checked'
              : isHovered
                ? '#checkbox-hovered'
                : '#checkbox-default'
          }
        />
      </svg>
    </div>
  );
};
