import { Separator } from '../separator/Separator.tsx';
import { SelectableItem } from '../../model/SelectableItem.ts';
import { Component } from 'react';
import { convertToProfileTableItems, getAllProfilesByLaunchId } from '../../utils/ProfilesUtils.ts';
import { ProfileTableItem } from '../../model/Profile.ts';
import ProfilesTable from '../table/ProfilesTable.tsx';
import { ProfilesActionButtons } from '../actionbuttons/ProfilesActionButtons.tsx';
import BreadcrumbNav from '../breadcrumb/BreadCrumbNav.tsx';

interface ProfilesContentProps {
  launchId: string;
}

interface ProfilesContentState {
  selectedProfiles: SelectableItem[];
  profiles: ProfileTableItem[];
  filteredProfiles: ProfileTableItem[];
  isProfilesRetrieved: boolean;
}

class ProfilesContent extends Component<ProfilesContentProps, ProfilesContentState> {
  constructor(props: ProfilesContentProps) {
    super(props);
    this.state = {
      selectedProfiles: [],
      profiles: [],
      filteredProfiles: [],
      isProfilesRetrieved: false,
    };
  }

  componentDidMount() {
    this.fetchProfiles();
  }

  fetchProfiles = async () => {
    try {
      const profilesResp = await getAllProfilesByLaunchId(this.props.launchId);
      const profiles = convertToProfileTableItems(profilesResp);
      this.setState({ profiles: profiles, filteredProfiles: profiles, isProfilesRetrieved: true });
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  setSelectedProfiles = (profiles: SelectableItem[]) => {
    this.setState({ selectedProfiles: profiles });
  };

  searchProfiles = (newValue?: string) => {
    if (!newValue) {
      this.setState({ filteredProfiles: this.state.profiles });
      return;
    }

    const lowerCaseValue = newValue.toLowerCase();
    const filtered = this.state.profiles.filter((item) =>
      item.profile.toLowerCase().includes(lowerCaseValue),
    );
    this.setState({ filteredProfiles: filtered });
  };

  clearSearch = () => {
    this.setState({ filteredProfiles: this.state.profiles });
  };

  render() {
    return (
      <div className="content">
        <div className="content-header">
          <BreadcrumbNav />
          <div className="content-header-name">Profiles</div>
        </div>
        <ProfilesActionButtons
          selectedItems={this.state.selectedProfiles}
          searchProfiles={this.searchProfiles}
          clearSearch={this.clearSearch}
        />
        <Separator />
        <ProfilesTable
          setSelectedProfiles={this.setSelectedProfiles}
          profiles={this.state.filteredProfiles}
          launchId={this.props.launchId}
          isLoading={this.state.isProfilesRetrieved}
        />
      </div>
    );
  }
}

export default ProfilesContent;
