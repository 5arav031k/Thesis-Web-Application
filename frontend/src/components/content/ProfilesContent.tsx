import { Separator } from '../separator/Separator.tsx';
import { SelectableProfileItem } from '../../model/SelectableItem.ts';
import { Component } from 'react';
import { convertToProfileTableItems, getAllProfilesByLaunchId } from '../../utils/ProfilesUtils.ts';
import { ProfileTableItem } from '../../model/Profile.ts';
import ProfilesTable from '../table/ProfilesTable.tsx';
import { ProfilesActionButtons } from '../actionbuttons/ProfilesActionButtons.tsx';
import BreadcrumbNav from '../breadcrumb/BreadCrumbNav.tsx';
import { ProfilesFilterState, useProfilesFilterStore } from '../../store/profilesFilterStore.ts';

interface ProfilesContentProps {
  launchId: string;
  launchName: string;
}

interface ProfilesContentState {
  selectedProfiles: SelectableProfileItem[];
  profiles: ProfileTableItem[];
  filteredProfiles: ProfileTableItem[];
  isProfilesRetrieved: boolean;
  launchName: string;
}

class ProfilesContent extends Component<ProfilesContentProps, ProfilesContentState> {
  constructor(props: ProfilesContentProps) {
    super(props);
    this.state = {
      selectedProfiles: [],
      profiles: [],
      filteredProfiles: [],
      isProfilesRetrieved: false,
      launchName: '',
    };
  }

  componentDidMount() {
    this.fetchProfiles();
  }

  fetchProfiles = async () => {
    try {
      const store = useProfilesFilterStore.getState();
      store.resetFilterState();
      const { filterState } = useProfilesFilterStore.getState();

      const profilesResp = await getAllProfilesByLaunchId(this.props.launchId);
      const profiles = convertToProfileTableItems(profilesResp);

      this.setState({
        profiles: profiles,
        filteredProfiles: this.filterSpecificProfiles(filterState, profiles),
        isProfilesRetrieved: true,
      });
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  setSelectedProfiles = (profiles: SelectableProfileItem[]) => {
    this.setState({ selectedProfiles: profiles });
  };

  unselectAllProfiles = () => {
    this.setSelectedProfiles([]);
  };

  searchProfiles = (newValue?: string) => {
    if (!newValue) {
      const { filterState } = useProfilesFilterStore.getState();
      this.filterProfiles(filterState);
      return;
    }

    const lowerCaseValue = newValue.toLowerCase();
    const filtered = this.state.profiles.filter((item) =>
      item.profile.toLowerCase().includes(lowerCaseValue),
    );
    this.setState({ filteredProfiles: filtered });
  };

  clearSearch = () => {
    const { filterState } = useProfilesFilterStore.getState();
    this.filterProfiles(filterState);
  };

  filterProfiles = (filteredItems: ProfilesFilterState) => {
    let filtered = this.state.profiles;

    if (filteredItems.statuses.length > 0) {
      filtered = filtered.filter((profile) => filteredItems.statuses.includes(profile.status));
    }

    if (filteredItems.retry) {
      filtered = filtered.filter((profile) => profile.isRetry);
    }

    this.setState({ filteredProfiles: filtered });
  };

  filterSpecificProfiles = (
    filteredItems: ProfilesFilterState,
    profiles: ProfileTableItem[],
  ): ProfileTableItem[] => {
    if (filteredItems.statuses.length > 0) {
      profiles = profiles.filter((profile) => filteredItems.statuses.includes(profile.status));
    }

    if (filteredItems.retry) {
      profiles = profiles.filter((profile) => profile.isRetry);
    }

    return profiles;
  };

  render() {
    return (
      <div className="content">
        <div className="content-header">
          <BreadcrumbNav />
          <div className="content-header-name">Profiles</div>
        </div>
        <ProfilesActionButtons
          selectedProfiles={this.state.selectedProfiles}
          unselectAllProfiles={this.unselectAllProfiles}
          searchProfiles={this.searchProfiles}
          clearSearch={this.clearSearch}
          filterProfiles={this.filterProfiles}
        />
        <Separator />
        <ProfilesTable
          setSelectedProfiles={this.setSelectedProfiles}
          selectedProfiles={this.state.selectedProfiles}
          profiles={this.state.filteredProfiles}
          launchId={this.props.launchId}
          launchName={this.props.launchName}
          isLoading={this.state.isProfilesRetrieved}
        />
      </div>
    );
  }
}

export default ProfilesContent;
