import DeleteBranchesIcon from '../../assets/delete-icon.svg';
import RestartBranchesIcon from '../../assets/restart-icon.svg';
import NewBranchIcon from '../../assets/new-branch.svg';
import * as React from 'react';
import { useState } from 'react';
import { AddNewLaunchFooter } from '../footer/AddNewLaunchFooter.tsx';
import { Button } from 'react-aria-components';
import styles from './actionButtons.module.css';

const profiles = [
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
  selectedLaunches: number[];
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedLaunches }) => {
  const [isNewLaunchFooterOpen, setNewLaunchFooterOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <Button className={styles.actionButton} onPress={() => setNewLaunchFooterOpen(true)}>
          <img src={NewBranchIcon} alt="New Branch Logo" width={16} height={16} />
          Add new branch
        </Button>
        {selectedLaunches.length != 0 ? (
          <>
            <div className="action-button">
              <img src={RestartBranchesIcon} alt="Restart Logo" width={16} height={16} />
              Restart
            </div>
            <div className="action-button">
              <img src={DeleteBranchesIcon} alt="Delete Logo" width={16} height={16} />
              Delete
            </div>
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
