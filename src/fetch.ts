import { r2MockData } from './mock-data';
import { R2Object, R2ObjectsList } from './types';

export const fetchFiles = async (): Promise<R2Object[]> => {
  try {
    // return new Promise<R2ObjectsList>((resolve) => {
    //   setTimeout(() => {
    //     resolve(r2MockData);
    //   }, 3000);
    // });

    const res = await fetch('http://127.0.0.1:8787/v1/file/list');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
