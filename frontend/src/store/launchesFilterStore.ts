import { ItemStatus } from '../model/Status.ts';
import { create } from 'zustand/react';

export interface LaunchesFilterState {
  statuses: ItemStatus[];
  retry: boolean;
}

interface LaunchesFilterStore {
  filterState: LaunchesFilterState;
  setFilterState: (field: keyof LaunchesFilterState, value: any) => void;
}

export const useLaunchesFilterStore = create<LaunchesFilterStore>((set) => ({
  filterState: {
    statuses: [],
    retry: false,
  },
  setFilterState: (field, value) =>
    set((state) => ({
      filterState: {
        ...state.filterState,
        [field]: typeof value === 'function' ? value(state.filterState[field]) : value,
      },
    })),
}));
