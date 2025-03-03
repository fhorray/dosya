import { r2MockData } from './mock-data';
import { R2ObjectsList } from './types';

export const fetchFiles = async (): Promise<R2ObjectsList> => {
  try {
    return new Promise<R2ObjectsList>((resolve) => {
      setTimeout(() => {
        resolve(r2MockData);
      }, 3000);
    });
  } catch (error) {
    console.error(error);
    return { objects: [], truncated: false, cursor: null };
  }
};
