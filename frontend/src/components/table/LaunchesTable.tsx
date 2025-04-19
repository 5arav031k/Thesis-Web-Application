import './table.css';
import {
  DetailsListLayoutMode,
  IColumn,
  MarqueeSelection,
  Selection,
  SelectionMode,
  ShimmeredDetailsList,
  TooltipHost,
} from '@fluentui/react';
import React, { Component } from 'react';
import { SelectableLaunchItem } from '../../model/SelectableItem.ts';
import { TableCheckbox } from '../checkbox/TableCheckbox.tsx';
import { Launch } from '../../model/Branch.ts';
import { Link } from 'react-router-dom';
import CustomIcon from '../icon/Icon.tsx';
import { copyAndSort } from '../../utils/SortingUtils.ts';
import { ItemStatus, statusClassMap } from '../../model/Status.ts';

interface BranchesTableProps {
  launches: Launch[];
  setSelectedLaunches: (item: SelectableLaunchItem[]) => void;
  selectedLaunches: SelectableLaunchItem[];
  launchesRetrieved: boolean;
}

interface BranchesTableState {
  selectedLaunches: SelectableLaunchItem[];
  selection: Selection;
  columns: IColumn[];
  launches: Launch[];
}

class LaunchesTable extends Component<BranchesTableProps, BranchesTableState> {
  constructor(props: BranchesTableProps) {
    super(props);

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Launch',
        fieldName: 'launch',
        minWidth: 300,
        isResizable: true,
        isRowHeader: true,
        data: 'string',
        onRender: (item) => (
          <div className="table-name-cell">
            <span className="custom-cell">
              <Link
                className="table-item-link"
                to={`${item.key}/profiles`}
                onClick={() => this.handleProfilesLinkClick(item.launch)}
              >
                {item.launch}
              </Link>
            </span>
            <div className="icon-cell">
              {item.isRetry ? (
                <TooltipHost
                  content="Launch has retries of the test cases"
                  styles={{ root: { height: '18px' } }}
                >
                  <CustomIcon name="retry" width={18} height={18} />
                </TooltipHost>
              ) : null}
            </div>
          </div>
        ),
        onRenderHeader: () => <span className="custom-header-cell">Launch</span>,
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
      selectedLaunches: [],
      selection: new Selection({
        onSelectionChanged: this.onSelectionChanged,
        getKey: (item) => `launch-${item.key}`,
      }),
      columns,
      launches: props.launchesRetrieved ? props.launches : [],
    };
  }

  componentDidUpdate(prevProps: BranchesTableProps, prevState: BranchesTableState) {
    if (prevProps.selectedLaunches.length > 0 && this.props.selectedLaunches.length === 0) {
      this.state.selection.setAllSelected(false);
    }

    if (prevState.selectedLaunches !== this.state.selectedLaunches) {
      this.props.setSelectedLaunches([...this.state.selectedLaunches]);
    }

    if (this.props.launchesRetrieved && prevProps.launches !== this.props.launches) {
      this.setState({ launches: this.props.launches });
    }
  }

  onSelectionChanged = () => {
    this.setState({
      selectedLaunches: this.state.selection.getSelection().map(
        (item) =>
          ({
            index: item.key,
            launchName: this.findLaunchName(Number(item.key)),
          }) as SelectableLaunchItem,
      ),
    });
  };

  findLaunchName = (key: number): string | undefined => {
    return new Map<number, string>(
      this.state.launches.map((launch) => [launch.key, launch.launch]),
    ).get(key);
  };

  onColumnClick = (_: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, launches } = this.state;
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
      launches,
      currColumn.fieldName || currColumn.key,
      currColumn.isSortedDescending,
    );

    this.setState({
      columns: newColumns,
      launches: newItems,
    });
  };

  handleProfilesLinkClick = (launchName: string) => {
    localStorage.setItem('launchName', launchName);
  };

  render() {
    return (
      <div className="table-container">
        <MarqueeSelection selection={this.state.selection}>
          <ShimmeredDetailsList
            items={this.state.launches}
            enableShimmer={!this.props.launchesRetrieved}
            columns={this.state.columns}
            layoutMode={DetailsListLayoutMode.justified}
            selection={this.state.selection}
            selectionMode={SelectionMode.multiple}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            setKey="multiple"
            onRenderCheckbox={(props: any) => <TableCheckbox {...props} />}
          />
        </MarqueeSelection>
      </div>
    );
  }
}

export default LaunchesTable;
