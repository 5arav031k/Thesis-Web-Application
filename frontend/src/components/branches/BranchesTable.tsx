import './table.css';
import {
  DetailsList,
  DetailsListLayoutMode,
  DetailsRow,
  IColumn,
  IDetailsRowProps,
  MarqueeSelection,
  Selection,
  SelectionMode,
} from '@fluentui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { SelectableItem, SelectableItemType } from '../../model/SelectableItem.ts';
import { ProfilesTable } from '../profiles/ProfilesTable.tsx';
import { TableCheckbox } from '../checkbox/TableCheckbox.tsx';
import { getAllLaunches } from '../../utils/BranchesUtils.ts';
import { Branch } from '../../model/Branch.ts';

interface BranchesTableProps {
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectableItem[]>>;
}

type Launch = {
  key: number;
  launch: string;
  startTime: string;
  total: number;
  failed: number;
  duration: string | null;
};

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Launch',
    fieldName: 'launch',
    minWidth: 300,
    data: 'string',
    onRender: (item) => <span className="custom-cell">{item.launch}</span>,
    onRenderHeader: () => <span className="custom-header-cell">Launch</span>,
  },
  {
    key: 'column2',
    name: 'Start Time',
    fieldName: 'startTime',
    minWidth: 200,
    data: 'string',
    onRender: (item) => <span className="custom-cell">{item.startTime}</span>,
    onRenderHeader: () => <span className="custom-header-cell">Start Time</span>,
  },
  {
    key: 'column3',
    name: 'Total',
    fieldName: 'total',
    minWidth: 70,
    data: 'number',
    onRender: (item) => <span className="custom-cell">{item.total}</span>,
    onRenderHeader: () => <span className="custom-header-cell">Total</span>,
  },
  {
    key: 'column4',
    name: 'Failed',
    fieldName: 'failed',
    minWidth: 70,
    data: 'number',
    onRender: (item) => <span className="custom-cell">{item.failed}</span>,
    onRenderHeader: () => <span className="custom-header-cell">Failed</span>,
  },
  {
    key: 'column5',
    name: 'Duration',
    fieldName: 'duration',
    minWidth: 65,
    data: 'string',
    onRender: (item) => (
      <span className="custom-cell">{item.duration || 'Still in progress...'}</span>
    ),
    onRenderHeader: () => <span className="custom-header-cell">Duration</span>,
  },
  {
    key: 'column6',
    name: '',
    fieldName: 'state',
    minWidth: 90,
    data: 'string',
    onRender: (item) => <span className="custom-cell">{item.state}</span>,
    onRenderHeader: () => <span className="custom-header-cell"></span>,
  },
];

const getConvertedLaunches = async (): Promise<Launch[]> => {
  const launches: Branch[] = await getAllLaunches('live');
  const convertedLaunches: Launch[] = [];

  for (let i = 0; i < launches.length; i++) {
    convertedLaunches.push({
      key: launches[i].id,
      launch: launches[i].name,
      startTime: launches[i].startTime,
      total: launches[i].testsStatistic.totalAmount,
      failed: launches[i].testsStatistic.failedAmount,
      duration: launches[i].formattedDuration,
    });
  }

  return convertedLaunches;
};

export const BranchesTable: React.FC<BranchesTableProps> = ({ setSelectedItems }) => {
  const [items, setItems] = useState<Launch[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConvertedLaunches();
      setItems(data);
    };

    fetchData();
  }, []);

  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const [selectedLaunches, setSelectedLaunches] = useState<SelectableItem[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<SelectableItem[]>([]);

  useEffect(() => {
    setSelectedItems([...selectedLaunches, ...selectedProfiles]);
  }, [selectedLaunches, selectedProfiles]);

  const [selection] = useState(
    () =>
      new Selection({
        onSelectionChanged: () => {
          setSelectedLaunches(
            selection.getSelection().map(
              (item) =>
                ({
                  index: item.key,
                  itemType: SelectableItemType.LAUNCH,
                }) as SelectableItem,
            ),
          );
        },
        getKey: (item) => `launch-${item.key}`,
      }),
  );

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });

    selection.toggleKeySelected(`launch-${key}`);
  };

  const onRenderRow = (props?: IDetailsRowProps): ReactElement | null => {
    if (!props) return null;
    const isExpanded = expandedRows.has(props.item.key);

    return (
      <>
        <DetailsRow
          {...props}
          styles={{ root: { cursor: 'pointer', border: isExpanded ? 'none' : '' } }}
        />
        <div
          style={{
            maxHeight: isExpanded ? '272px' : '0px',
            opacity: isExpanded ? 1 : 0,
            transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
            overflow: 'hidden',
          }}
        >
          {isExpanded && (
            <ProfilesTable
              setSelectedProfiles={setSelectedProfiles}
              parentRowKey={props.item.key}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <div className="launches-container">
      <MarqueeSelection selection={selection}>
        <DetailsList
          items={items}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          onRenderRow={onRenderRow}
          selection={selection}
          selectionMode={SelectionMode.multiple}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          setKey="multiple"
          onItemInvoked={(item) => toggleRow(item.key)}
          onRenderCheckbox={(props: any) => <TableCheckbox {...props} />}
        />
      </MarqueeSelection>
    </div>
  );
};
