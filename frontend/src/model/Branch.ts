export interface TestsStatistic {
  totalAmount: number;
  passedAmount: number;
  failedAmount: number;
  skippedAmount: number;
}

export interface Branch {
  id: number;
  name: string;
  startTime: string;
  status: string;
  retry: boolean;
  formattedDuration: string | null;
  testsStatistic: TestsStatistic;
}
