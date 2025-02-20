import NewBranchIcon from '../../assets/new-branch.svg';

export const ActionButtons = () => (
  <>
    <div className="action-button-container">
      <div className="action-button">
        <img src={NewBranchIcon} className="new-branch-icon" alt="New Branch Logo" />
        Add new branch
      </div>
    </div>
  </>
);
