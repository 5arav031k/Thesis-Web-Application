import DeleteBranchesIcon from '../../assets/delete-icon.svg';
import RestartBranchesIcon from '../../assets/restart-icon.svg';
import NewBranchIcon from '../../assets/new-branch.svg';
import * as React from 'react';
import { useState } from 'react';
import { AddNewLaunchFooter } from '../footer/AddNewLaunchFooter.tsx';
import styles from './actionButtons.module.css';
import { DefaultButton } from '@fluentui/react';
import { ProfileOptionType } from '../../model/ProfileOptionType.ts';
import { SelectableItem } from '../../model/SelectableItem.ts';

const profiles: ProfileOptionType[] = [
  {
    value: 1,
    label: 'Profile1',
  },
  {
    value: 2,
    label: 'Profile2',
  },
  {
    value: 3,
    label: 'Profile3',
  },
  {
    value: 4,
    label: 'Profile4',
  },
  {
    value: 5,
    label: 'Profile5',
  },
  {
    value: 6,
    label: 'Profile6',
  },
  {
    value: 7,
    label: 'Profile6',
  },
  {
    value: 8,
    label: 'Profile6',
  },
  {
    value: 9,
    label: 'Profile6',
  },
  {
    value: 10,
    label: 'Profile6',
  },
  {
    value: 11,
    label: 'Profile6',
  },
  {
    value: 12,
    label: 'Profile6',
  },
  {
    value: 13,
    label: 'Profile6',
  },
  {
    value: 14,
    label: 'Profile6',
  },
  {
    value: 15,
    label: 'Profile6',
  },
  {
    value: 16,
    label: 'Profile6',
  },
  {
    value: 17,
    label: 'Profile6',
  },
  {
    value: 18,
    label: 'Profile6',
  },
  {
    value: 19,
    label: 'Profile6',
  },
  {
    value: 20,
    label: 'Profile6',
  },
  {
    value: 21,
    label: 'Profile6',
  },
  {
    value: 22,
    label: 'Profile6',
  },
];

interface ActionButtonsProps {
  selectedItems: SelectableItem[];
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedItems }) => {
  const [isNewLaunchFooterOpen, setNewLaunchFooterOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <DefaultButton className={styles.actionButton} onClick={() => setNewLaunchFooterOpen(true)}>
          <img src={NewBranchIcon} alt="New Branch Logo" width={16} height={16} />
          Add new launch
        </DefaultButton>
        {selectedItems.length != 0 ? (
          <>
            <DefaultButton className={styles.actionButton}>
              <img src={RestartBranchesIcon} alt="Restart Logo" width={16} height={16} />
              Restart
            </DefaultButton>
            <DefaultButton className={styles.actionButton}>
              <img src={DeleteBranchesIcon} alt="Delete Logo" width={16} height={16} />
              Delete
            </DefaultButton>
          </>
        ) : null}
      </div>
      <AddNewLaunchFooter
        profiles={profiles}
        isOpen={isNewLaunchFooterOpen}
        setOpen={setNewLaunchFooterOpen}
      />
    </>
  );
};
