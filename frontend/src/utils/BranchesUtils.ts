import { Branch } from '../model/Branch.ts';

export const getAllLaunches = async (system: string): Promise<Branch[]> => {
  try {
    const response = await fetch(`https://sbraris106:8887/api/${system}/branches`, {
      method: 'GET',
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
