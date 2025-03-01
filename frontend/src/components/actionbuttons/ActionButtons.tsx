import DeleteBranchesIcon from '../../assets/delete-icon.svg';
import RestartBranchesIcon from '../../assets/restart-icon.svg';
import NewBranchIcon from '../../assets/new-branch.svg';
import * as React from 'react';

interface ActionButtonsProps {
  selectedLaunches: number[];
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ selectedLaunches }) => (
  <div className="action-button-container">
    <div className="action-button">
      <img src={NewBranchIcon} alt="New Branch Logo" width={16} height={16} />
      Add new branch
    </div>
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
);
