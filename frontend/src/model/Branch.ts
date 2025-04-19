import { ItemStatus } from './Status.ts';

export interface Branch {
  id: number;
  name: string;
  startTime: string;
  totalTests: number;
  failedTests: number;
  duration: string | null;
  status: ItemStatus;
  hasRetries: boolean;
}

export interface Launch {
  key: number;
  launch: string;
  startTime: string;
  total: number;
  failed: number;
  duration: string | null;
  status: ItemStatus;
  isRetry: boolean;
}
