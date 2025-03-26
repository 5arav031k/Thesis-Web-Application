import { LaunchesActionButtons } from '../actionbuttons/LaunchesActionButtons.tsx';
import { Separator } from '../separator/Separator.tsx';
import LaunchesTable from '../table/LaunchesTable.tsx';
import { SelectableItem } from '../../model/SelectableItem.ts';
import { Launch } from '../../model/Branch.ts';
import { Component } from 'react';
import { convertToLaunches, getAllLaunches } from '../../utils/LaunchesUtils.ts';
import BreadcrumbNav from '../breadcrumb/BreadCrumbNav.tsx';
import { getAllProfileNames } from '../../utils/ProfilesUtils.ts';

interface LaunchesContentState {
  selectedItems: SelectableItem[];
  launches: Launch[];
  filteredLaunches: Launch[];
  isLaunchesRetrieved: boolean;
  allProfileNames: string[];
}

class LaunchesContent extends Component<{}, LaunchesContentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedItems: [],
      launches: [],
      filteredLaunches: [],
      isLaunchesRetrieved: false,
      allProfileNames: [],
    };
  }

  componentDidMount() {
    this.fetchBranches();
    this.fetchProfileNames();
  }

  fetchBranches = async () => {
    let storedTimeScope = localStorage.getItem('timeScope');
    if (!storedTimeScope) {
      storedTimeScope = '24';
      localStorage.setItem('timeScope', '24');
    }

    try {
      const branches = await getAllLaunches(Number(storedTimeScope));
      const launches = convertToLaunches(branches);
      this.setState({ launches: launches, filteredLaunches: launches, isLaunchesRetrieved: true });
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  fetchProfileNames = async () => {
    try {
      const profiles = await getAllProfileNames();
      console.log(profiles);
      this.setState({ allProfileNames: profiles });
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  setSelectedItems = (items: SelectableItem[]) => {
    this.setState({ selectedItems: items });
  };

  changeTimeScope = () => {
    this.setState({ launches: [], filteredLaunches: [], isLaunchesRetrieved: false });
    this.fetchBranches();
  };

  searchLaunches = (newValue?: string) => {
    if (!newValue) {
      this.setState({ filteredLaunches: this.state.launches });
      return;
    }

    const lowerCaseValue = newValue.toLowerCase();
    const filtered = this.state.launches.filter((item) =>
      item.launch.toLowerCase().includes(lowerCaseValue),
    );
    this.setState({ filteredLaunches: filtered });
  };

  clearSearch = () => {
    this.setState({ filteredLaunches: this.state.launches });
  };

  render() {
    return (
      <div className="content">
        <div className="content-header">
          <BreadcrumbNav />
          <div className="content-header-name">Launches</div>
        </div>
        <LaunchesActionButtons
          selectedItems={this.state.selectedItems}
          changeTimeScope={this.changeTimeScope}
          searchLaunches={this.searchLaunches}
          clearSearch={this.clearSearch}
          allProfileNames={this.state.allProfileNames}
        />
        <Separator />
        <LaunchesTable
          launches={this.state.filteredLaunches}
          setSelectedItems={this.setSelectedItems}
          launchesRetrieved={this.state.isLaunchesRetrieved}
        />
      </div>
    );
  }
}

export default LaunchesContent;
