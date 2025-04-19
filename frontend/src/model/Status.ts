export enum ItemStatus {
  PASSED = 'Passed',
  FAILED = 'Failures',
  IN_PROGRESS = 'In progress',
  STOPPED = 'Stopped',
  INTERRUPTED = 'Interrupted',
}

export const statusClassMap: Record<ItemStatus, string> = {
  [ItemStatus.PASSED]: 'green',
  [ItemStatus.IN_PROGRESS]: 'yellow',
  [ItemStatus.FAILED]: 'red',
  [ItemStatus.STOPPED]: 'red',
  [ItemStatus.INTERRUPTED]: 'red',
};
