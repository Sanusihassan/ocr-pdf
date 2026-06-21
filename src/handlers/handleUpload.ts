// ============================================================================
// REFACTORED handleUpload.ts (ocr-pdf) - Using Blob Pattern
// ============================================================================

import axios from "axios";
import type { errors as _ } from "../../src/content";
import { resetErrorMessage, setField } from "../../src/store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import { parseErrorResponse } from "../../src/utils";
import { toast } from "react-toastify";

// ============================================================================
// FIX: Properly typed module variables (fixes TS7034)
// ============================================================================

let filesOnSubmit: string[] = [];
let prevState: string | null = null;

// ============================================================================
// HELPERS
// ============================================================================

interface UploadResponse {
  blob: Blob;
  mimeType: string;
}

async function sendRequest(
  url: string,
  formData: FormData
): Promise<UploadResponse> {
  try {
    const response = await axios.post(url, formData, {
      responseType: "blob",
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"] || "application/octet-stream",
    });

    return {
      blob,
      mimeType: response.headers["content-type"] || "application/octet-stream",
    };
  } catch (err: any) {
    // Error response might also be a Blob
    if (err.response?.data instanceof Blob) {
      try {
        const text = await err.response.data.text();
        err.response.data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        err.response.data = { code: "SERVER_ERROR" };
      }
    }
    throw err;
  }
}

// ============================================================================
// MIME TYPE LOOKUP TABLE
// ============================================================================

const mimeTypeLookupTable: {
  [key: string]: { outputFileMimeType: string; outputFileName: string };
} = {
  "application/zip": {
    outputFileMimeType: "application/zip",
    outputFileName: "ocr.zip",
  },
  "application/pdf": {
    outputFileMimeType: "application/pdf",
    outputFileName: "ocr.pdf",
  },
};

// ============================================================================
// MAIN HANDLER (Refactored)
// ============================================================================

export const handleUpload = async (
  e: React.SubmitEvent<HTMLFormElement>,
  // NOTE: downloadBtn parameter REMOVED (was optional anyway)
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    fileName: string;
    selectedLanguages: {
      k: string; // filename
      langs: string[]; // language codes for OCR
    }[] | null;
    converter: "free" | "premium"; // Determines endpoint: /api/ vs /premium/
    passwords: {
      k: string; // filename
      p: string; // password for encrypted PDFs
    }[];
  },
  files: File[],
  errors: _,
  setDownloadBlob: (blob: Blob, filename: string) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) {
    dispatch(setField({ isSubmitted: false }));
    return;
  }

  // ════════════════════════════════════════════════════════════════════════
  // VALIDATION: Languages Required
  // ════════════════════════════════════════════════════════════════════════

  if (!state.selectedLanguages || state.selectedLanguages.length === 0) {
    const errorMsg =
      errors.alerts?.noLanguagesSelected ||
      "Please select at least one language for OCR";

    dispatch(setField({ errorMessage: errorMsg }));
    dispatch(setField({ isSubmitted: false }));
    toast.error(errorMsg);
    return;
  }

  // ════════════════════════════════════════════════════════════════════════
  // CHECK CACHE
  // ════════════════════════════════════════════════════════════════════════

  const fileNames = files.map((file) => file.name);
  const allFilesPresent = fileNames.every((fileName) =>
    filesOnSubmit.includes(fileName)
  );
  const strState = JSON.stringify(state);

  if (
    allFilesPresent &&
    files.length === filesOnSubmit.length &&
    prevState === strState
  ) {
    dispatch(setField({ showDownloadBtn: true }));
    dispatch(resetErrorMessage());
    return;
  }

  prevState = strState;

  // ════════════════════════════════════════════════════════════════════════
  // PREPARE FORM DATA
  // ════════════════════════════════════════════════════════════════════════

  const formData = new FormData();

  // Add files
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  // Add selected languages (as JSON string)
  formData.append("selectedLanguages", JSON.stringify(state.selectedLanguages));

  // Add passwords for encrypted PDFs
  formData.append("passwords", JSON.stringify(state.passwords));

  // ════════════════════════════════════════════════════════════════════════
  // DETERMINE ENDPOINT (Dynamic based on converter type)
  // ════════════════════════════════════════════════════════════════════════

  let url: string = "";
  const endpoint = state.converter === "free" ? "/api/" : "/premium/";

  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:8000${endpoint}${state.path}`;
  } else {
    url = `${endpoint}${state.path}`;
  }

  // Early exit if there's already an error
  if (state.errorMessage) {
    dispatch(setField({ isSubmitted: false }));
    return;
  }

  // Get original filename for download
  const originalFileName =
    state.fileName || files[0]?.name?.split(".").slice(0, -1).join(".");

  // ════════════════════════════════════════════════════════════════════════
  // API Call & Blob Handling
  // ════════════════════════════════════════════════════════════════════════

  try {
    // NEW: Use sendRequest helper
    const { blob, mimeType } = await sendRequest(url, formData);

    // Look up expected output format
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };

    const { outputFileMimeType, outputFileName } = mimeTypeData;

    // Ensure blob has correct MIME type
    const typedBlob = new Blob([blob], {
      type: outputFileMimeType || "application/octet-stream",
    });

    // ───────────────────────────────────────────────────────────────────────
    // NEW: Deferred download via setDownloadBlob
    // ───────────────────────────────────────────────────────────────────────
    setDownloadBlob(
      typedBlob,
      outputFileName && originalFileName
        ? `${originalFileName}-ocr${outputFileName.substring(outputFileName.lastIndexOf("."))}`
        : outputFileName || state.fileName
    );

    // Update tracking
    filesOnSubmit = files.map((f) => f.name);

    // Update UI state
    dispatch(setField({ showDownloadBtn: true }));
    dispatch(resetErrorMessage());
    dispatch(setField({ isSubmitted: false }));
  } catch (error) {
    // ───────────────────────────────────────────────────────────────────────
    // Error Handling
    // ───────────────────────────────────────────────────────────────────────

    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      dispatch(setField({ isSubmitted: false }));
      toast.error(errors.ERR_NETWORK.message);
      return;
    }

    // Handle server validation/auth errors
    if (axios.isAxiosError(error) && error.response) {
      try {
        // FIX: Properly type errorCode (fixes TS2538)
        const errorCodeMap: Record<string, string> = {
          // General file validation errors
          NO_FILES_PROVIDED:
            errors.alerts.fileNotUploaded || "No files provided",
          FILE_NOT_UPLOADED:
            errors.alerts.fileNotUploaded || "File not uploaded",
          FILE_EMPTY: errors.alerts.fileEmpty || "File is empty",
          FILE_TOO_LARGE: errors.alerts.fileTooLarge || "File is too large",
          TOO_MANY_FILES:
            errors.alerts.tooManyFiles || "Too many files uploaded",
          INVALID_FILE_TYPE:
            errors.alerts.invalidFileType || "Invalid file type",
          FILE_CORRUPT: errors.alerts.fileCorrupt || "File is corrupted",

          // PDF-specific errors
          INVALID_PDF: errors.alerts.invalidPdf || "Invalid PDF file",

          // OCR-specific errors
          NO_LANGUAGES_PROVIDED:
            errors.alerts.noLanguagesSelected ||
            "Please select language(s) for OCR",
          INVALID_LANGUAGES_FORMAT:
            errors.alerts.invalidLanguagesFormat ||
            "Invalid language selection format",
          NO_LANGUAGES_FOR_FILE:
            errors.alerts.noLanguagesForFile ||
            "Please select language(s) for all files",
          UNSUPPORTED_LANGUAGE:
            errors.alerts.unsupportedLanguage ||
            "One or more selected languages are not supported",
          TOO_MANY_LANGUAGES:
            errors.alerts.tooManyLanguages ||
            "Maximum 3 languages allowed per file",
          OCR_FAILED:
            errors.alerts.ocrFailed ||
            "OCR processing failed. Please try again.",
          OCR_NO_TEXT_DETECTED:
            errors.alerts.ocrNoTextDetected ||
            "No text could be detected in the document",
          PDF_ALREADY_SEARCHABLE:
            errors.alerts.pdfAlreadySearchable ||
            "PDF already contains searchable text",

          // Auth errors
          UNAUTHORIZED:
            errors.alerts.authRequired || "Authentication required",
          INVALID_TOKEN:
            errors.alerts.invalidToken || "Invalid authentication token",
          AUTH_TOKEN_MISSING:
            errors.alerts.authRequired || "Authentication required",
          AUTH_TOKEN_EXPIRED:
            errors.alerts.sessionExpired ||
            "Session expired. Please sign in again.",
          AUTH_INVALID_TOKEN:
            errors.alerts.invalidToken || "Invalid authentication token",
          AUTH_USER_NOT_FOUND:
            errors.alerts.userNotFound || "User not found",
          AUTH_SERVER_ERROR:
            errors.alerts.authError || "Authentication error",

          // Server errors
          SERVER_CONFIG_ERROR:
            errors.alerts.serverError || "Server configuration error",

          // Tier errors
          INSUFFICIENT_CONVERSION_UNITS:
            errors.alerts.insufficientUnits ||
            "Not enough conversion units. Upgrade or recharge!",
          FREE_TIER_LIMIT_EXCEEDED:
            errors.alerts.freeTierLimitExceeded ||
            "Free tier limit exceeded. Please upgrade to premium.",

          // Other errors
          MAX_PAGES_EXCEEDED:
            errors.MAX_PAGES_EXCEEDED?.message || "Maximum pages exceeded",
        };

        const { errorCode } = parseErrorResponse(error);

        // FIX: Check if errorCode exists before indexing (fixes TS2538)
        if (errorCode && errorCode in errorCodeMap) {
          const message = errorCodeMap[errorCode];
          dispatch(setField({ limitationMsg: message }));
          dispatch(setField({ errorCode }));
          dispatch(setField({ isSubmitted: false }));
          toast.error(message);
          return;
        }
      } catch {
        // Failed to parse error response
      }
    }

    dispatch(setField({ isSubmitted: false }));
  }
};