import * as React from 'react';
import { useState } from 'react';
import styles from './tableCheckbox.module.css';

interface TableCheckboxProps {
  launchId: number;
  selectedLaunches: number[];
  setSelectedLaunches: React.Dispatch<React.SetStateAction<number[]>>;
  hoveredLaunchRow: number | null;
  setHoveredLaunchRow: (id: number | null) => void;
}

export const TableCheckbox: React.FC<TableCheckboxProps> = ({
  launchId,
  selectedLaunches,
  setSelectedLaunches,
  hoveredLaunchRow,
  setHoveredLaunchRow,
}) => {
  const [hoveredSvgId, setHoveredSvgId] = useState<number | React.SetStateAction<null>>(null);

  const toggleCheckbox = (id: number) => {
    setSelectedLaunches((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <div
      className={`${styles.checkbox} ${styles.branchesTableCell}`}
      onMouseEnter={() => setHoveredLaunchRow(launchId)}
      onMouseLeave={() => setHoveredLaunchRow(null)}
    >
      <svg
        width="21"
        height="21"
        onClick={() => toggleCheckbox(launchId)}
        onMouseEnter={() => setHoveredSvgId(launchId)}
        onMouseLeave={() => setHoveredSvgId(null)}
        className={
          hoveredLaunchRow === launchId || selectedLaunches.includes(launchId) ? styles.visible : ''
        }
        style={{ cursor: 'pointer' }}
      >
        <use
          href={`#${
            selectedLaunches.includes(launchId)
              ? 'checkbox-checked'
              : hoveredSvgId === launchId
                ? 'checkbox-hovered'
                : 'checkbox-default'
          }`}
        />
      </svg>
    </div>
  );
};
