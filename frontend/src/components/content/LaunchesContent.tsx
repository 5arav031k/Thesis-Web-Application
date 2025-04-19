import { LaunchesActionButtons } from '../actionbuttons/LaunchesActionButtons.tsx';
import { Separator } from '../separator/Separator.tsx';
import LaunchesTable from '../table/LaunchesTable.tsx';
import { SelectableLaunchItem } from '../../model/SelectableItem.ts';
import { Launch } from '../../model/Branch.ts';
import { Component } from 'react';
import { convertToLaunches, getAllLaunches } from '../../utils/LaunchesUtils.ts';
import BreadcrumbNav from '../breadcrumb/BreadCrumbNav.tsx';
import { LaunchesFilterState, useLaunchesFilterStore } from '../../store/launchesFilterStore.ts';

interface LaunchesContentState {
  selectedLaunches: SelectableLaunchItem[];
  launches: Launch[];
  filteredLaunches: Launch[];
  isLaunchesRetrieved: boolean;
}

class LaunchesContent extends Component<{}, LaunchesContentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedLaunches: [],
      launches: [],
      filteredLaunches: [],
      isLaunchesRetrieved: false,
    };
  }

  componentDidMount() {
    this.fetchBranches();
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

      const { filterState } = useLaunchesFilterStore.getState();

      this.setState({
        launches: launches,
        filteredLaunches: this.filterSpecificLaunches(filterState, launches),
        isLaunchesRetrieved: true,
      });
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  setSelectedLaunches = (items: SelectableLaunchItem[]) => {
    this.setState({ selectedLaunches: items });
  };

  unselectAllLaunches = () => {
    this.setSelectedLaunches([]);
  };

  changeTimeScope = () => {
    this.setState({ launches: [], filteredLaunches: [], isLaunchesRetrieved: false });
    this.fetchBranches();
  };

  searchLaunches = (newValue?: string) => {
    if (!newValue) {
      const { filterState } = useLaunchesFilterStore.getState();
      this.filterLaunches(filterState);
      return;
    }

    const lowerCaseValue = newValue.toLowerCase();
    const filtered = this.state.launches.filter((item) =>
      item.launch.toLowerCase().includes(lowerCaseValue),
    );
    this.setState({ filteredLaunches: filtered });
  };

  clearSearch = () => {
    const { filterState } = useLaunchesFilterStore.getState();
    this.filterLaunches(filterState);
  };

  filterLaunches = (filteredItems: LaunchesFilterState) => {
    let filtered = this.state.launches;

    if (filteredItems.statuses.length > 0) {
      filtered = filtered.filter((launch) => filteredItems.statuses.includes(launch.status));
    }

    if (filteredItems.retry) {
      filtered = filtered.filter((launch) => launch.isRetry);
    }

    this.setState({ filteredLaunches: filtered });
  };

  filterSpecificLaunches = (filteredItems: LaunchesFilterState, launches: Launch[]): Launch[] => {
    if (filteredItems.statuses.length > 0) {
      launches = launches.filter((launch) => filteredItems.statuses.includes(launch.status));
    }

    if (filteredItems.retry) {
      launches = launches.filter((launch) => launch.isRetry);
    }

    return launches;
  };

  render() {
    return (
      <div className="content">
        <div className="content-header">
          <BreadcrumbNav />
          <div className="content-header-name">Launches</div>
        </div>
        <LaunchesActionButtons
          selectedLaunches={this.state.selectedLaunches}
          unselectAllLaunches={this.unselectAllLaunches}
          changeTimeScope={this.changeTimeScope}
          searchLaunches={this.searchLaunches}
          clearSearch={this.clearSearch}
          filterLaunches={this.filterLaunches}
        />
        <Separator />
        <LaunchesTable
          launches={this.state.filteredLaunches}
          setSelectedLaunches={this.setSelectedLaunches}
          selectedLaunches={this.state.selectedLaunches}
          launchesRetrieved={this.state.isLaunchesRetrieved}
        />
      </div>
    );
  }
}

export default LaunchesContent;
