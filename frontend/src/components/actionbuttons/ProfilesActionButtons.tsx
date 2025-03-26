import * as React from 'react';
import styles from './actionButtons.module.css';
import { DefaultButton, SearchBox } from '@fluentui/react';
import { SelectableItem } from '../../model/SelectableItem.ts';
import Icon from '../icon/Icon.tsx';

interface ActionButtonsProps {
  selectedItems: SelectableItem[];
  searchProfiles: (newValue?: string) => void;
  clearSearch: () => void;
}

export const ProfilesActionButtons: React.FC<ActionButtonsProps> = ({
  selectedItems,
  searchProfiles,
  clearSearch,
}) => {
  return (
    <div className={styles.actionButtonContainer}>
      <div>
        {selectedItems.length != 0 ? (
          <>
            <DefaultButton className={styles.actionButton}>
              <Icon name={'restart'} /> Restart
            </DefaultButton>
            <DefaultButton className={styles.actionButton}>
              <Icon name={'delete'} /> Delete
            </DefaultButton>
          </>
        ) : null}
      </div>
      <div className={styles.settingContainer}>
        <SearchBox
          className="custom-search-box"
          underlined={true}
          placeholder="Search profiles"
          onClear={clearSearch}
          onChange={(_, newValue) => searchProfiles(newValue)}
        />
      </div>
    </div>
  );
};
