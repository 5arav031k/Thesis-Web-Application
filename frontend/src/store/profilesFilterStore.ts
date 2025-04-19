import { ItemStatus } from '../model/Status.ts';
import { create } from 'zustand/react';

export interface ProfilesFilterState {
  statuses: ItemStatus[];
  retry: boolean;
}

interface ProfilesFilterStore {
  filterState: ProfilesFilterState;
  setFilterState: (field: keyof ProfilesFilterState, value: any) => void;
  resetFilterState: () => void;
}

export const initialFilterState: ProfilesFilterState = {
  statuses: [],
  retry: false,
};

export const useProfilesFilterStore = create<ProfilesFilterStore>((set) => ({
  filterState: initialFilterState,
  setFilterState: (field, value) =>
    set((state) => ({
      filterState: {
        ...state.filterState,
        [field]: typeof value === 'function' ? value(state.filterState[field]) : value,
      },
    })),
  resetFilterState: () => set({ filterState: initialFilterState }),
}));
