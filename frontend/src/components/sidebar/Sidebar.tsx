import BranchesIcon from "../../assets/branches-icon.svg";

export const Sidebar = () => (
    <>
        <div className="sidebar-container">
            <div className="sidebar-button-container">
                <div className="sidebar-button">
                    <img src={BranchesIcon} className="branches-icon" alt="Branches logo" />
                    Branches
                </div>
            </div>
        </div>
    </>
)