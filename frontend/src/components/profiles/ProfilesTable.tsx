import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  MarqueeSelection,
  Selection,
  SelectionMode,
} from '@fluentui/react';
import styles from './profilesTable.module.css';
import './table.css';
import * as React from 'react';
import { SelectableItem, SelectableItemType } from '../../model/SelectableItem.ts';
import { TableCheckbox } from '../checkbox/TableCheckbox.tsx';
import { useState } from 'react';

const profiles = [
  {
    id: 234,
    name: 'Profile1',
    startTime: '2025-02-17 20:00:00',
    total: 12,
    failed: 0,
    duration: '1h 33m',
    state: 'Still running...',
  },
  {
    id: 235,
    name: 'Profile2',
    startTime: '2025-02-17 20:00:00',
    total: 15,
    failed: 5,
    duration: '2h 10m',
    state: '',
  },
  {
    id: 236,
    name: 'Profile2',
    startTime: '2025-02-17 20:00:00',
    total: 15,
    failed: 5,
    duration: '2h 10m',
    state: 'Still running...',
  },
  {
    id: 237,
    name: 'Profile2',
    startTime: '2025-02-17 20:00:00',
    total: 15,
    failed: 5,
    duration: '2h 10m',
    state: 'Still running...',
  },
  {
    id: 238,
    name: 'Profile2',
    startTime: '2025-02-17 20:00:00',
    total: 15,
    failed: 5,
    duration: '2h 10m',
    state: '',
  },
  {
    id: 239,
    name: 'Profile2',
    startTime: '2025-02-17 20:00:00',
    total: 15,
    failed: 5,
    duration: '2h 10m',
    state: '',
  },
];

const columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Profile',
    fieldName: 'profile',
    minWidth: 300,
    data: 'string',
    onRender: (item) => <span className="custom-cell">{item.profile}</span>,
    onRenderHeader: () => <span className="custom-header-cell">Profile</span>,
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
    onRender: (item) => <span className="custom-cell">{item.duration}</span>,
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

interface ProfilesTableProps {
  setSelectedProfiles: React.Dispatch<React.SetStateAction<SelectableItem[]>>;
  parentRowKey?: string;
}

export const ProfilesTable: React.FC<ProfilesTableProps> = ({
  setSelectedProfiles,
  parentRowKey = 'default',
}) => {
  const items = [];
  for (let i = 0; i < profiles.length; i++) {
    items.push({
      key: profiles[i].id,
      profile: profiles[i].name,
      startTime: profiles[i].startTime,
      total: profiles[i].total,
      failed: profiles[i].failed,
      duration: profiles[i].duration,
      state: profiles[i].state,
    });
  }

  const [selection] = useState(
    () =>
      new Selection({
        onSelectionChanged: () => {
          setSelectedProfiles(
            selection.getSelection().map(
              (item) =>
                ({
                  index: item.key,
                  itemType: SelectableItemType.PROFILE,
                }) as SelectableItem,
            ),
          );
        },
        // Додаємо префікс до ключів на основі parentRowKey
        getKey: (item) => `profile-${parentRowKey}-${item.key}`,
      }),
  );

  return (
    <div
      className={styles.profilesContainer}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <div className="profiles-wrapper">
        <MarqueeSelection selection={selection}>
          <DetailsList
            items={items}
            columns={columns}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={selection}
            selectionMode={SelectionMode.multiple}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection profile"
            ariaLabelForSelectAllCheckbox="Toggle selection for all profiles"
            checkButtonAriaLabel="select profile"
            setKey={`profiles-${parentRowKey}`}
            onRenderCheckbox={(props: any) => <TableCheckbox {...props} />}
          />
        </MarqueeSelection>
      </div>
    </div>
  );
};
