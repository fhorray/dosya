import { TDosyaFile, TDosyaFolder } from "./types";

type FilesReponse = {
  cursor: string | undefined;
  files: TDosyaFile[];
};

export const fetchFiles = async ({
  folder,
  limit,
  page,
}: {
  page: string | number;
  limit: number;
  folder: string;
}): Promise<{ data: FilesReponse }> => {
  try {
    // return new Promise<R2ObjectsList>((resolve) => {
    //   setTimeout(() => {
    //     resolve(r2MockData);
    //   }, 3000);
    // });

    const res = await fetch("http://127.0.0.1:8787/files/list", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folder,
        limit: limit.toString(),
        page,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: { files: [], cursor: "" } };
  }
};

export const fetchFolders = async (): Promise<{
  data: TDosyaFolder | null;
}> => {
  try {
    // return new Promise<R2ObjectsList>((resolve) => {
    //   setTimeout(() => {
    //     resolve(r2MockData);
    //   }, 3000);
    // });

    const res = await fetch("http://127.0.0.1:8787/files/list/folders", {
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: null };
  }
};

export const createFolder = async (
  name: string
): Promise<{
  data: TDosyaFolder | null;
}> => {
  try {
    // return new Promise<R2ObjectsList>((resolve) => {
    //   setTimeout(() => {
    //     resolve(r2MockData);
    //   }, 3000);
    // });

    const res = await fetch("http://127.0.0.1:8787/files/create/folder", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: null };
  }
};
