import styles from './dropdownMenu.module.css';
import { Label } from 'react-aria-components';
import Select from 'react-select';
import * as React from 'react';
import './dropdownElements.css';

interface DropdownMenuProps {
  labelName: string;
  items: { value: number; label: string }[];
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
  ref: any;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  labelName,
  items,
  setSelectedItems,
  ref,
}) => {
  const handleChange = (selectedOptions: any) => {
    setSelectedItems(selectedOptions);
  };

  return (
    <div className={styles.dropdownContainer}>
      <Label className={styles.dropdownLabel}>{labelName}</Label>
      <Select
        ref={ref}
        classNamePrefix="custom-select"
        closeMenuOnSelect={false}
        options={items}
        menuPlacement="bottom"
        isMulti
        onChange={handleChange}
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
