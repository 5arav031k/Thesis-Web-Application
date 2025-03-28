export interface Branch {
  id: number;
  name: string;
  startTime: string;
  totalTests: number;
  failedTests: number;
  duration: string | null;
  status: BranchStatus;
  retry: boolean;
}

export enum BranchStatus {
  PASSED = 'Passed',
  FAILED = 'Failed',
  IN_PROGRESS = 'In progress',
  STOPPED = 'Stopped',
  INTERRUPTED = 'Interrupted',
}

export interface Launch {
  key: number;
  launch: string;
  startTime: string;
  total: number;
  failed: number;
  duration: string | null;
  status: BranchStatus;
  isRetry: boolean;
}
