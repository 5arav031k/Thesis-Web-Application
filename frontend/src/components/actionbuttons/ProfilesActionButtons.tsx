import * as React from 'react';
import styles from './actionButtons.module.css';
import { DefaultButton, SearchBox } from '@fluentui/react';
import { SelectableProfileItem } from '../../model/SelectableItem.ts';
import Icon from '../icon/Icon.tsx';
import { ProfilesFilterButton } from './ProfilesFilterButton.tsx';
import { ProfilesFilterState, useProfilesFilterStore } from '../../store/profilesFilterStore.ts';
import { useState } from 'react';
import { GeneratedMessage } from '../message/GeneratedMessage.tsx';
import { restartItem } from '../../utils/LaunchesUtils.ts';
import { Toast } from '../toast/Toast.tsx';

interface ActionButtonsProps {
  selectedProfiles: SelectableProfileItem[];
  unselectAllProfiles: () => void;
  searchProfiles: (newValue?: string) => void;
  clearSearch: () => void;
  filterProfiles: (filteredItems: ProfilesFilterState) => void;
}

enum MessageType {
  RESTART,
}

export const ProfilesActionButtons: React.FC<ActionButtonsProps> = ({
  selectedProfiles,
  unselectAllProfiles,
  searchProfiles,
  clearSearch,
  filterProfiles,
}) => {
  const { filterState } = useProfilesFilterStore();

  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType | null>(null);

  const [toastMessage, setToastMessage] = useState('');

  const filterCount = (): number => {
    return filterState.statuses.length + (filterState.retry ? 1 : 0);
  };

  const generateRestartMessage = () => {
    setMessageType(MessageType.RESTART);
    if (selectedProfiles.length === 1) {
      setMessage(`Are you sure you want to restart '${selectedProfiles[0].profileName}'?`);
    } else {
      setMessage('Are you sure you want to restart these profiles?');
    }
  };

  const restartProfiles = async () => {
    await Promise.all(
      selectedProfiles.map(async (item) => {
        await restartItem(item.launchName.replace('/', '-') + '-' + item.profileName);
      }),
    );

    setToastMessage('Selected profiles were restarted.');
    unselectAllProfiles();
  };

  const closeToastMessage = () => {
    setToastMessage('');
  };

  return (
    <>
      <div className={styles.actionButtonContainer}>
        <div>
          {selectedProfiles.length != 0 ? (
            <>
              <DefaultButton className={styles.actionButton} onClick={generateRestartMessage}>
                <Icon name={'restart'} /> Restart
              </DefaultButton>
            </>
          ) : null}
        </div>
        <div className={styles.settingContainer}>
          <ProfilesFilterButton filterProfiles={filterProfiles} filterCount={filterCount()} />
          <SearchBox
            className="custom-search-box"
            underlined={true}
            placeholder="Search profiles"
            onClear={clearSearch}
            onChange={(_, newValue) => searchProfiles(newValue)}
          />
        </div>
      </div>
      {messageType !== null && (
        <GeneratedMessage
          message={message}
          setOpen={(open) => {
            if (!open) setMessageType(null);
          }}
          onSave={restartProfiles}
        />
      )}
      {toastMessage && <Toast message={toastMessage} onClose={closeToastMessage} />}
    </>
  );
};
