import * as React from 'react';
import { useState } from 'react';
import { AddNewLaunchFooter } from '../footer/AddNewLaunchFooter.tsx';
import styles from './actionButtons.module.css';
import {
  DefaultButton,
  Dropdown,
  FontIcon,
  IDropdownOption,
  IDropdownStyles,
  SearchBox,
} from '@fluentui/react';
import { ProfileOptionType } from '../../model/ProfileOptionType.ts';
import { SelectableLaunchItem } from '../../model/SelectableItem.ts';
import jsonProfiles from '../../profiles.json';
import CustomIcon from '../icon/Icon.tsx';
import './actions.css';
import { LaunchesFilterButton } from './LaunchesFilterButton.tsx';
import { LaunchesFilterState, useLaunchesFilterStore } from '../../store/launchesFilterStore.ts';
import { GeneratedMessage } from '../message/GeneratedMessage.tsx';
import { restartItem } from '../../utils/LaunchesUtils.ts';

const profiles: ProfileOptionType[] = jsonProfiles.map((profile: string, index: number) => ({
  value: index + 1,
  label: profile,
}));

interface ActionButtonsProps {
  selectedLaunches: SelectableLaunchItem[];
  unselectAllLaunches: () => void;
  changeTimeScope: () => void;
  searchLaunches: (newValue?: string) => void;
  clearSearch: () => void;
  filterLaunches: (filteredItems: LaunchesFilterState) => void;
}

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 215 },
};

const timeRangeOptions: IDropdownOption[] = [
  {
    key: 12,
    text: 'Last 12 hours',
  },
  {
    key: 24,
    text: 'Last 24 hours',
  },
  {
    key: 36,
    text: 'Last 36 hours',
  },
  {
    key: 48,
    text: 'Last 48 hours',
  },
];

enum MessageType {
  RESTART,
}

export const LaunchesActionButtons: React.FC<ActionButtonsProps> = ({
  selectedLaunches,
  unselectAllLaunches,
  changeTimeScope,
  searchLaunches,
  clearSearch,
  filterLaunches,
}) => {
  const [isNewLaunchFooterOpen, setNewLaunchFooterOpen] = useState<boolean>(false);

  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType | null>(null);

  const { filterState, setFilterState } = useLaunchesFilterStore();

  const handleTimeScopeChange = (_: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    if (typeof option?.key === 'number') {
      localStorage.setItem('timeScope', option.key.toString());
      changeTimeScope();

      setFilterState('statuses', []);
      setFilterState('retry', false);
    }
  };

  const timeScope = (): number => {
    let storedTimeScope = localStorage.getItem('timeScope');
    if (!storedTimeScope) {
      storedTimeScope = '24';
      localStorage.setItem('timeScope', '24');
    }
    return Number(storedTimeScope);
  };

  const filterCount = (): number => {
    return filterState.statuses.length + (filterState.retry ? 1 : 0);
  };

  const generateRestartMessage = () => {
    setMessageType(MessageType.RESTART);
    if (selectedLaunches.length === 1) {
      setMessage(`Are you sure you want to restart '${selectedLaunches[0].launchName}'?`);
    } else {
      setMessage('Are you sure you want to restart these launches?');
    }
  };

  const restartLaunches = async () => {
    await Promise.all(
      selectedLaunches.map(async (launch) => {
        await restartItem(launch.launchName.replace('/', '-'));
      }),
    );

    unselectAllLaunches();
  };

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <div>
          <DefaultButton
            className={styles.actionButton}
            onClick={() => setNewLaunchFooterOpen(true)}
          >
            <CustomIcon name="add" /> <span>Add new launch</span>
          </DefaultButton>
          {selectedLaunches.length != 0 ? (
            <>
              <DefaultButton className={styles.actionButton} onClick={generateRestartMessage}>
                <CustomIcon name={'restart'} /> Restart
              </DefaultButton>
            </>
          ) : null}
        </div>
        <div className={styles.settingContainer}>
          <LaunchesFilterButton filterLaunches={filterLaunches} filterCount={filterCount()} />
          <SearchBox
            className="custom-search-box"
            underlined={true}
            placeholder="Search launches"
            onClear={clearSearch}
            onChange={(_, newValue) => searchLaunches(newValue)}
          />
          <Dropdown
            options={timeRangeOptions}
            styles={dropdownStyles}
            placeholder="Time Range"
            onRenderCaretDown={() => <FontIcon iconName="ChevronDown" />}
            onRenderTitle={(props) => (
              <div className={styles.title}>
                <span>Time Range:</span>
                <div style={{ width: '100%', textAlign: 'center' }}>{props?.[0]?.text}</div>
              </div>
            )}
            onChange={handleTimeScopeChange}
            defaultSelectedKey={timeScope()}
          />
        </div>
      </div>
      <AddNewLaunchFooter
        profiles={profiles}
        isOpen={isNewLaunchFooterOpen}
        setOpen={setNewLaunchFooterOpen}
      />
      {messageType !== null && (
        <GeneratedMessage
          message={message}
          setOpen={(open) => {
            if (!open) setMessageType(null);
          }}
          onSave={restartLaunches}
        />
      )}
    </>
  );
};
