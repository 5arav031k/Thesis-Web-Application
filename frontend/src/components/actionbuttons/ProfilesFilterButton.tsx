import React, { useRef, useState } from 'react';
import {
  Callout,
  Checkbox,
  CommandBarButton,
  DirectionalHint,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import { ItemStatus } from '../../model/Status.ts';
import styles from './actionButtons.module.css';
import { ProfilesFilterState, useProfilesFilterStore } from '../../store/profilesFilterStore.ts';

interface FilterButtonProps {
  filterProfiles: (filteredItems: ProfilesFilterState) => void;
  filterCount: number;
}

export const ProfilesFilterButton: React.FC<FilterButtonProps> = ({
  filterProfiles,
  filterCount,
}) => {
  const [isCalloutVisible, setIsCalloutVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const { filterState, setFilterState } = useProfilesFilterStore();

  const toggleCallout = () => {
    setIsCalloutVisible(!isCalloutVisible);
  };

  const handleStatusesChange = (label: ItemStatus, isChecked: boolean) => {
    setFilterState('statuses', (prevStatuses: ItemStatus[]) => {
      const updatedStatuses = isChecked
        ? [...prevStatuses, label]
        : prevStatuses.filter((item) => item !== label);

      const updatedFilterState = {
        ...filterState,
        statuses: updatedStatuses,
      };

      filterProfiles(updatedFilterState);

      return updatedStatuses;
    });
  };

  const handleRetryChange = (isChecked: boolean) => {
    setFilterState('retry', isChecked);

    const updatedFilterState = {
      ...filterState,
      retry: isChecked,
    };

    filterProfiles(updatedFilterState);
  };

  const getCheckboxCheckedState = (status: ItemStatus) => {
    return filterState.statuses.includes(status);
  };

  return (
    <div ref={buttonRef}>
      <CommandBarButton
        iconProps={{ iconName: 'Filter' }}
        className="custom-icon-button"
        onClick={toggleCallout}
        text="Filter profiles"
      >
        {filterCount !== 0 ? (
          <span className={styles.checkedFilterCount}>{filterCount}</span>
        ) : null}
      </CommandBarButton>
      {isCalloutVisible && buttonRef.current && (
        <Callout
          target={buttonRef.current}
          onDismiss={() => setIsCalloutVisible(false)}
          setInitialFocus
          directionalHint={DirectionalHint.bottomCenter}
        >
          <Stack tokens={{ childrenGap: 10 }} styles={{ root: { padding: 10 } }}>
            <Text styles={{ root: { fontWeight: 600, fontSize: 14 } }}>Status</Text>
            <Checkbox
              label="Passed"
              className="custom-checkbox"
              checked={getCheckboxCheckedState(ItemStatus.PASSED)}
              onChange={(_, isChecked) => handleStatusesChange(ItemStatus.PASSED, !!isChecked)}
            />
            <Checkbox
              label="Failures"
              className="custom-checkbox"
              checked={getCheckboxCheckedState(ItemStatus.FAILED)}
              onChange={(_, isChecked) => handleStatusesChange(ItemStatus.FAILED, !!isChecked)}
            />
            <Checkbox
              label="In progress"
              className="custom-checkbox"
              checked={getCheckboxCheckedState(ItemStatus.IN_PROGRESS)}
              onChange={(_, isChecked) => handleStatusesChange(ItemStatus.IN_PROGRESS, !!isChecked)}
            />
            <Separator styles={{ root: { margin: '0 !important' } }} />
            <Text styles={{ root: { fontWeight: 600, fontSize: 14, margin: '0 !important' } }}>
              Other
            </Text>
            <Checkbox
              label="Profiles with retries"
              className="custom-checkbox"
              checked={filterState.retry}
              onChange={(_, isChecked) => handleRetryChange(!!isChecked)}
            />
          </Stack>
        </Callout>
      )}
    </div>
  );
};
