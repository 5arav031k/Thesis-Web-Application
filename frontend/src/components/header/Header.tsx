import WaffleIcon from '../../assets/waffle-icon.svg';

export const Header = () => (
  <>
    <div className="header-container">
      <div className="aris-container">
        <div className="waffle-container">
          <img src={WaffleIcon} className="waffle-icon" alt="waffle-icon" />
        </div>
        <div className="aris-name">
          <span className="aris">ARIS</span>
          Ta Service
        </div>
      </div>
    </div>
  </>
);
