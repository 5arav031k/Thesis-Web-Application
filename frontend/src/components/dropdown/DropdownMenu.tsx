import styles from './dropdownMenu.module.css';
import { Label } from 'react-aria-components';
import Select from 'react-select';
import * as React from 'react';
import './dropdownElements.css';

interface DropdownMenuProps {
  labelName: string;
  items: { value: number; label: string }[];
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ labelName, items }) => {
  return (
    <div className={styles.dropdownContainer}>
      <Label className={styles.dropdownLabel}>{labelName}</Label>
      <Select
        classNamePrefix="custom-select"
        closeMenuOnSelect={false}
        options={items}
        menuPlacement="bottom"
        isMulti
        theme={(theme) => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary: 'black',
          },
        })}
      />
    </div>
  );
};
