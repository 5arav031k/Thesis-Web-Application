import {
  DetailsListLayoutMode,
  IColumn,
  MarqueeSelection,
  Selection,
  SelectionMode,
  ShimmeredDetailsList,
  TooltipHost,
} from '@fluentui/react';
import './table.css';
import { SelectableProfileItem } from '../../model/SelectableItem.ts';
import { TableCheckbox } from '../checkbox/TableCheckbox.tsx';
import React, { Component } from 'react';
import { ProfileTableItem } from '../../model/Profile.ts';
import CustomIcon from '../icon/Icon.tsx';
import { copyAndSort } from '../../utils/SortingUtils.ts';
import { ItemStatus, statusClassMap } from '../../model/Status.ts';

interface ProfilesTableProps {
  setSelectedProfiles: (profile: SelectableProfileItem[]) => void;
  selectedProfiles: SelectableProfileItem[];
  launchId: string;
  launchName: string;
  profiles: ProfileTableItem[];
  isLoading: boolean;
}

interface ProfilesTableState {
  selection: Selection;
  selectedProfiles: SelectableProfileItem[];
  columns: IColumn[];
  profiles: ProfileTableItem[];
}

class ProfilesTable extends Component<ProfilesTableProps, ProfilesTableState> {
  constructor(props: ProfilesTableProps) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Profile',
        fieldName: 'profile',
        minWidth: 300,
        isResizable: true,
        isRowHeader: true,
        data: 'string',
        onRender: (item) => (
          <div className="table-name-cell">
            <span className="custom-cell">{item.profile}</span>
            <div className="icon-cell">
              {item.isRetry ? (
                <TooltipHost
                  content="Profile has retries of the test cases"
                  styles={{ root: { height: '18px' } }}
                >
                  <CustomIcon name="retry" width={18} height={18} />
                </TooltipHost>
              ) : null}
            </div>
          </div>
        ),
        onRenderHeader: () => <span className="custom-header-cell">Profile</span>,
        onColumnClick: this.onColumnClick,
      },
      {
        key: 'column2',
        name: 'Start Time',
        fieldName: 'startTime',
        minWidth: 200,
        isResizable: true,
        isSorted: true,
        isSortedDescending: true,
        data: 'string',
        onRender: (item) => <span className="custom-cell">{item.startTime}</span>,
        onRenderHeader: () => <span className="custom-header-cell">Start Time</span>,
        onColumnClick: this.onColumnClick,
      },
      {
        key: 'column3',
        name: 'Status',
        fieldName: 'status',
        minWidth: 100,
        isResizable: true,
        data: 'string',
        onRender: (item) => (
          <span className={`custom-cell ${statusClassMap[item.status as ItemStatus]}`}>
            {item.status}
          </span>
        ),
        onRenderHeader: () => <span className="custom-status-header-cell">Status</span>,
        onColumnClick: this.onColumnClick,
      },
      {
        key: 'column4',
        name: 'Total',
        fieldName: 'total',
        minWidth: 70,
        isResizable: true,
        data: 'number',
        onRender: (item) => <span className="custom-cell">{item.total}</span>,
        onRenderHeader: () => <span className="custom-header-cell">Total</span>,
        onColumnClick: this.onColumnClick,
      },
      {
        key: 'column5',
        name: 'Failed',
        fieldName: 'failed',
        minWidth: 70,
        isResizable: true,
        data: 'number',
        onRender: (item) => <span className="custom-cell">{item.failed}</span>,
        onRenderHeader: () => <span className="custom-header-cell">Failed</span>,
        onColumnClick: this.onColumnClick,
      },
      {
        key: 'column6',
        name: 'Duration',
        fieldName: 'duration',
        minWidth: 80,
        isResizable: true,
        data: 'string',
        onRender: (item) => <span className="custom-cell">{item.duration || '–'}</span>,
        onRenderHeader: () => <span className="custom-header-cell">Duration</span>,
        onColumnClick: this.onColumnClick,
      },
    ];

    this.state = {
      selectedProfiles: [],
      selection: new Selection({
        onSelectionChanged: this.onSelectionChanged,
        getKey: (item) => `profile-${this.props.launchId}-${item.key}`,
      }),
      columns,
      profiles: props.isLoading ? props.profiles : [],
    };
  }

  componentDidUpdate(prevProps: ProfilesTableProps, prevState: ProfilesTableState) {
    if (prevProps.selectedProfiles.length > 0 && this.props.selectedProfiles.length === 0) {
      this.state.selection.setAllSelected(false);
    }

    if (prevState.selectedProfiles !== this.state.selectedProfiles) {
      this.props.setSelectedProfiles([...this.state.selectedProfiles]);
    }

    if (this.props.isLoading && prevProps.profiles !== this.props.profiles) {
      this.setState({ profiles: this.props.profiles });
    }
  }

  onSelectionChanged = () => {
    this.setState({
      selectedProfiles: this.state.selection.getSelection().map(
        (item) =>
          ({
            index: item.key,
            launchName: this.props.launchName,
            profileName: this.findProfileName(Number(item.key)),
          }) as SelectableProfileItem,
      ),
    });
  };

  findProfileName = (key: number): string | undefined => {
    return new Map<number, string>(
      this.state.profiles.map((profile) => [profile.key, profile.profile]),
    ).get(key);
  };

  onColumnClick = (_: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, profiles } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.find((currCol) => column.key === currCol.key)!;

    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });

    const newItems = copyAndSort(
      profiles,
      currColumn.fieldName || currColumn.key,
      currColumn.isSortedDescending,
    );

    this.setState({
      columns: newColumns,
      profiles: newItems,
    });
  };

  render() {
    return (
      <div className="table-container">
        <MarqueeSelection selection={this.state.selection}>
          <ShimmeredDetailsList
            items={this.state.profiles}
            enableShimmer={!this.props.isLoading}
            columns={this.state.columns}
            layoutMode={DetailsListLayoutMode.justified}
            selection={this.state.selection}
            selectionMode={SelectionMode.multiple}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection profile"
            ariaLabelForSelectAllCheckbox="Toggle selection for all profiles"
            checkButtonAriaLabel="select profile"
            setKey={`profiles-${this.props.launchId}`}
            onRenderCheckbox={(props: any) => <TableCheckbox {...props} />}
          />
        </MarqueeSelection>
      </div>
    );
  }
}

export default ProfilesTable;
