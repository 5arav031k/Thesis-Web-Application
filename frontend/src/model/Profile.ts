export interface Profile {
  id: number;
  name: string;
  startTime: string;
  totalTests: number;
  failedTests: number;
  duration: string | null;
  status: ProfileStatus;
  retry: boolean;
}

export enum ProfileStatus {
  PASSED = 'Passed',
  FAILED = 'Failed',
  IN_PROGRESS = 'In progress',
  STOPPED = 'Stopped',
  INTERRUPTED = 'Interrupted',
}

export interface ProfileTableItem {
  key: number;
  profile: string;
  startTime: string;
  total: number;
  failed: number;
  duration: string | null;
  status: ProfileStatus;
  isRetry: boolean;
}
