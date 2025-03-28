import { Branch, BranchStatus, Launch } from '../model/Branch.ts';

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
    status: BranchStatus[branch.status as unknown as keyof typeof BranchStatus],
    isRetry: branch.retry,
  }));
};
