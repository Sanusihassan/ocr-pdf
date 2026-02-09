// file-store.ts
import type { SetStateAction } from "react";
import { create } from "zustand";

export interface FileStore {
  files: File[];
  fileInput: React.RefObject<HTMLInputElement | null> | null;
  submitBtn: React.RefObject<HTMLButtonElement | null> | null;
  downloadBtn: React.RefObject<HTMLAnchorElement | null> | null;
  imageUrls: {
    file: File;
    imageUrl: string;
  }[];
  setFiles: (files: FileList | File[]) => void;
  setFileInput: (refEl: React.RefObject<HTMLInputElement | null>) => void;
  setSubmitBtn: (refEl: React.RefObject<HTMLButtonElement | null> | null) => void;
  setDownloadBtn: (refEl: React.RefObject<HTMLAnchorElement | null> | null) => void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  fileInput: null,
  downloadBtn: null,
  submitBtn: null,
  imageUrls: [],
  setFiles: (files: FileList | File[]) => {
    const uniqueFiles = new Set<File>();

    if (files instanceof FileList) {
      Array.from(files).forEach((file) => uniqueFiles.add(file));
    } else {
      files.forEach((file) => uniqueFiles.add(file));
    }

    set({ files: Array.from(uniqueFiles) });
  },
  setFileInput(refEl: React.RefObject<HTMLInputElement | null>) {
    set({ fileInput: refEl });
  },
  setSubmitBtn(refEl: React.RefObject<HTMLButtonElement | null> | null) {
    set({ submitBtn: refEl });
  },
  setDownloadBtn(refEl: React.RefObject<HTMLAnchorElement | null> | null) {
    set({ downloadBtn: refEl });
  },
  setImageUrls(value: SetStateAction<{ file: File; imageUrl: string }[]>) {
    set((prevState) => ({
      imageUrls:
        typeof value === "function" ? value(prevState.imageUrls) : value,
    }));
  },
}));