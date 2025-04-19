import { Profile, ProfileTableItem } from '../model/Profile.ts';
import { ItemStatus } from '../model/Status.ts';

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

export const convertToProfileTableItems = (data: Profile[]): ProfileTableItem[] => {
  return data.map((profile) => ({
    key: profile.id,
    profile: profile.name,
    startTime: profile.startTime,
    total: profile.totalTests,
    failed: profile.failedTests,
    duration: profile.duration,
    status: getProfileStatus(profile),
    isRetry: profile.hasRetries,
  }));
};

const getProfileStatus = (profile: Profile): ItemStatus => {
  let status: ItemStatus = ItemStatus[profile.status as unknown as keyof typeof ItemStatus];

  if (status === ItemStatus.IN_PROGRESS) {
    return ItemStatus.IN_PROGRESS;
  }
  if (profile.failedTests > 0) {
    return ItemStatus.FAILED;
  }

  return status;
};
