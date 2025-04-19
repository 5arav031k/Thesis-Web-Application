import { Branch, Launch } from '../model/Branch.ts';
import { ItemStatus } from '../model/Status.ts';

export const getAllLaunches = async (timeScope: number): Promise<Branch[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/branches?timeScope=${timeScope}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch branches:', error);
    return [];
  }
};

export const convertToLaunches = (data: Branch[]): Launch[] => {
  return data.map((branch) => ({
    key: branch.id,
    launch: branch.name,
    startTime: branch.startTime,
    total: branch.totalTests,
    failed: branch.failedTests,
    duration: branch.duration,
    status: getBranchStatus(branch),
    isRetry: branch.hasRetries,
  }));
};

const getBranchStatus = (branch: Branch): ItemStatus => {
  let status: ItemStatus = ItemStatus[branch.status as unknown as keyof typeof ItemStatus];

  if (status === ItemStatus.IN_PROGRESS) {
    return ItemStatus.IN_PROGRESS;
  }
  if (branch.failedTests > 0) {
    return ItemStatus.FAILED;
  }

  return status;
};

export const restartItem = async (item: string) => {
  try {
    const response = await fetch(`http://localhost:8080/api/jenkins/job/${item}/build`, {
      method: 'POST',
    });

    if (!response.ok) {
      console.error(`Failed to trigger Jenkins job: ${response.status} - ${response.statusText}`);
      return;
    }
  } catch (error) {
    console.error('Error triggering Jenkins job:', error);
  }
};
