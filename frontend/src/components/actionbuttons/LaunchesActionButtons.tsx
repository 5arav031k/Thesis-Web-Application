import * as React from 'react';
import { useEffect, useState } from 'react';
import { AddNewLaunchFooter } from '../footer/AddNewLaunchFooter.tsx';
import styles from './actionButtons.module.css';
import {
  DefaultButton,
  Dropdown,
  FontIcon,
  IDropdownOption,
  IDropdownStyles,
  SearchBox,
} from '@fluentui/react';
import { ProfileOptionType } from '../../model/ProfileOptionType.ts';
import { SelectableItem } from '../../model/SelectableItem.ts';
import CustomIcon from '../icon/Icon.tsx';
import './actions.css';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 230 },
};

const options: IDropdownOption[] = [
  {
    key: 12,
    text: 'Last 12 hours',
  },
  {
    key: 24,
    text: 'Last 24 hours',
  },
  {
    key: 36,
    text: 'Last 36 hours',
  },
  {
    key: 48,
    text: 'Last 48 hours',
  },
];

interface ActionButtonsProps {
  selectedItems: SelectableItem[];
  changeTimeScope: () => void;
  searchLaunches: (newValue?: string) => void;
  clearSearch: () => void;
  allProfileNames: string[];
}

export const LaunchesActionButtons: React.FC<ActionButtonsProps> = ({
  selectedItems,
  changeTimeScope,
  searchLaunches,
  clearSearch,
  allProfileNames,
}) => {
  const [isNewLaunchFooterOpen, setNewLaunchFooterOpen] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<ProfileOptionType[]>([]);

  useEffect(() => {
    setProfiles(
      allProfileNames.map((profile: string, index: number) => ({
        value: index + 1,
        label: profile,
      })),
    );
  }, []);

  const handleChange = (_: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (typeof option?.key === 'number') {
      localStorage.setItem('timeScope', option.key.toString());
      changeTimeScope();
    }
  };

  const timeScope = (): number => {
    let storedTimeScope = localStorage.getItem('timeScope');
    if (!storedTimeScope) {
      storedTimeScope = '24';
      localStorage.setItem('timeScope', '24');
    }
    return Number(storedTimeScope);
  };

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <div>
          <DefaultButton
            className={styles.actionButton}
            onClick={() => setNewLaunchFooterOpen(true)}
          >
            <CustomIcon name="add" /> <span>Add new configuration</span>
          </DefaultButton>
          {selectedItems.length != 0 ? (
            <>
              <DefaultButton className={styles.actionButton}>
                <CustomIcon name={'restart'} /> Restart
              </DefaultButton>
              <DefaultButton className={styles.actionButton}>
                <CustomIcon name={'delete'} /> Delete
              </DefaultButton>
            </>
          ) : null}
        </div>
        <div className={styles.settingContainer}>
          <SearchBox
            className="custom-search-box"
            underlined={true}
            placeholder="Search launches"
            onClear={clearSearch}
            onChange={(_, newValue) => searchLaunches(newValue)}
          />
          <Dropdown
            options={options}
            styles={dropdownStyles}
            placeholder="Time Range"
            onRenderCaretDown={() => <FontIcon iconName="ChevronDown" />}
            onRenderTitle={(props) => (
              <div className={styles.title}>
                <span>Time Range:</span>
                <div style={{ width: '100%', textAlign: 'center' }}>{props?.[0]?.text}</div>
              </div>
            )}
            onChange={handleChange}
            defaultSelectedKey={timeScope()}
          />
        </div>
      </div>
      <AddNewLaunchFooter
        profiles={profiles}
        isOpen={isNewLaunchFooterOpen}
        setOpen={setNewLaunchFooterOpen}
      />
    </>
  );
};
