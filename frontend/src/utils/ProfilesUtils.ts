import { Profile, ProfileStatus, ProfileTableItem } from '../model/Profile.ts';

export const getAllProfilesByLaunchId = async (launchId: string): Promise<Profile[]> => {
  try {
    const response = await fetch(`http://localhost:8080/api/profiles/branch?id=${launchId}`, {
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

export const getAllProfileNames = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/profiles/names`, {
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

export const convertToProfileTableItems = (data: Profile[]): ProfileTableItem[] => {
  return data.map((profile) => ({
    key: profile.id,
    profile: profile.name,
    startTime: profile.startTime,
    total: profile.totalTests,
    failed: profile.failedTests,
    duration: profile.duration,
    status: ProfileStatus[profile.status as unknown as keyof typeof ProfileStatus],
    isRetry: profile.retry,
  }));
};
