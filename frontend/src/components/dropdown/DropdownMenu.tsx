import styles from './dropdownMenu.module.css';
import Select, { GroupBase, SelectInstance } from 'react-select';
import * as React from 'react';
import './dropdownElements.css';
import { Label } from '@fluentui/react';
import { ProfileOptionType } from '../../model/ProfileOptionType.ts';

interface DropdownMenuProps {
  labelName: string;
  items: ProfileOptionType[];
  setSelectedItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export const DropdownMenu = React.forwardRef<
  SelectInstance<ProfileOptionType, boolean, GroupBase<ProfileOptionType>>,
  DropdownMenuProps
>(({ labelName, items, setSelectedItems }, ref) => {
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
});
