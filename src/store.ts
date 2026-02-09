import { createSlice, createSelector, type Draft, type PayloadAction } from "@reduxjs/toolkit";

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;

export interface ToolState {
  showTool: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  errorCode: string | null;
  showDownloadBtn: boolean;
  showOptions: boolean;
  fileName: string;
  limitationMsg: string;
  selectedLanguages: { k: string; langs: string[] }[] | null;
  subscriptionStatus: boolean | null;
  isAdBlocked: boolean;
  ocr_warning: string;
  passwords: { k: string; p: string }[];
  converter: "free" | "premium"
}

const initialState: ToolState = {
  showTool: true,
  errorMessage: "",
  isSubmitted: false,
  errorCode: null,
  showDownloadBtn: false,
  showOptions: false,
  fileName: "",
  limitationMsg: "",
  subscriptionStatus: null,
  selectedLanguages: null,
  isAdBlocked: false,
  ocr_warning: "",
  passwords: [],
  converter: "free"
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setField(state, action: PayloadAction<Partial<ToolState>>) {
      Object.keys(action.payload).forEach((key) => {
        const typedKey = key as k;
        const value = action.payload[typedKey];
        if (value !== undefined) {
          // @ts-ignore
          state[typedKey] = value;
        }
      });
    },
  },
});

export const { resetErrorMessage, setField } = toolSlice.actions;

// ============================================
// MEMOIZED SELECTORS (prevent unnecessary rerenders)
// ============================================

/**
 * Select the entire tool state
 */
export const selectToolState = (state: { tool: ToolState }) => state.tool;

export const selectPasswords = createSelector(
  [selectToolState],
  (state) => state.passwords
);

/**
 * Select all selected languages - returns empty array instead of null for consistency
 */
export const selectSelectedLanguages = createSelector(
  [(state: { tool: ToolState }) => state.tool.selectedLanguages],
  (selectedLanguages) => selectedLanguages || []
);

/**
 * Select languages for a specific file
 * Usage: useSelector(useMemo(() => selectLanguagesForFile(fileKey), [fileKey]))
 */
export const selectLanguagesForFile = (fileKey: string) =>
  createSelector(
    [selectSelectedLanguages],
    (selectedLanguages) =>
      selectedLanguages
        .filter((item) => item.k === fileKey)
        .flatMap((item) => item.langs)
  );


export default toolSlice.reducer;