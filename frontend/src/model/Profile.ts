import { ItemStatus } from './Status.ts';

export interface Profile {
  id: number;
  name: string;
  startTime: string;
  totalTests: number;
  failedTests: number;
  duration: string | null;
  status: ItemStatus;
  hasRetries: boolean;
}

export interface ProfileTableItem {
  key: number;
  profile: string;
  startTime: string;
  total: number;
  failed: number;
  duration: string | null;
  status: ItemStatus;
  isRetry: boolean;
}
