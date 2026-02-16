// apps/ocr-pdf/handleUpload.ts - OCR-PDF SPECIFIC
import axios from "axios";
import { downloadConvertedFile } from "../../src/downloadFile";
import type { errors as _ } from "../../src/content";
import { resetErrorMessage, setField } from "../../src/store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import { parseErrorResponse } from "../../src/utils";
import { toast } from "react-toastify";

let filesOnSubmit: string[] = [];
let prevState: string | null = null;

export const handleUpload = async (
  e: React.SubmitEvent<HTMLFormElement>,
  downloadBtn: React.RefObject<HTMLAnchorElement | null> | null,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    fileName: string;
    selectedLanguages: {
      k: string;
      langs: string[];
    }[] | null;
    converter: "free" | "premium";
    passwords: {
      k: string;
      p: string;
    }[]
  },
  files: File[],
  errors: _
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) return;

  // ===== VALIDATE LANGUAGES =====
  if (!state.selectedLanguages || state.selectedLanguages.length === 0) {
    dispatch(
      setField({
        errorMessage:
          errors.alerts?.noLanguagesSelected ||
          "Please select at least one language for OCR",
      })
    );
    dispatch(setField({ isSubmitted: false }));
    toast.error(
      errors.alerts?.noLanguagesSelected ||
      "Please select at least one language for OCR"
    );
    return;
  }

  // Validate that each file has languages selected
  const fileNames = files.map((file) => file.name);
  // for (const fileName of fileNames) {
  //   const fileKey = fileName.split(".")[0].replace(/[^a-zA-Z0-9]/g, "_");
  //   const fileLanguages = state.selectedLanguages.find(
  //     (item) => item.k === fileKey
  //   );

  //   console.log(fileLanguages)

  //   if (!fileLanguages || fileLanguages.langs.length === 0) {
  //     dispatch(
  //       setField({
  //         errorMessage:
  //           errors.alerts?.noLanguagesForFile ||
  //           `Please select language(s) for ${fileName}`,
  //       })
  //     );
  //     dispatch(setField({ isSubmitted: false }));
  //     toast.error(
  //       errors.alerts?.noLanguagesForFile ||
  //       `Please select language(s) for ${fileName}`
  //     );
  //     return;
  //   }
  // }

  // ===== CHECK CACHE =====
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

  // ===== PREPARE FORM DATA =====
  const formData = new FormData();

  // Add files
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  // Add selected languages (as JSON string)
  formData.append("selectedLanguages", JSON.stringify(state.selectedLanguages));
  // passwords if any:
  formData.append("passwords", JSON.stringify(state.passwords));

  // ===== DETERMINE ENDPOINT =====
  let url: string = "";
  const endpoint = state.converter === "free" ? "/api/" : "/premium/";

  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:8000${endpoint}${state.path}`;
  } else {
    url = `${endpoint}${state.path}`;
  }

  if (state.errorMessage) {
    return;
  }

  const originalFileName =
    state.fileName || files[0]?.name?.split(".").slice(0, -1).join(".");

  // ===== MIME TYPE LOOKUP TABLE =====
  const mimeTypeLookupTable: {
    [key: string]: { outputFileMimeType: string; outputFileName: string };
  } = {
    "application/zip": {
      outputFileMimeType: "application/zip",
      outputFileName: `${originalFileName || "PDFEquips"}-ocr.zip`,
    },
    "application/pdf": {
      outputFileMimeType: "application/pdf",
      outputFileName: `${originalFileName || "PDFEquips"}-ocr.pdf`,
    },
  };

  try {
    // ===== MAKE REQUEST =====
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
      withCredentials: true,
    });

    const mimeType = response.data.type || response.headers["content-type"];
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };
    const { outputFileMimeType, outputFileName } = mimeTypeData;

    dispatch(setField({ showDownloadBtn: true }));
    downloadConvertedFile(
      response,
      outputFileMimeType,
      outputFileName || state.fileName,
      downloadBtn
    );
    filesOnSubmit = files.map((f) => f.name);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      dispatch(resetErrorMessage());
      dispatch(setField({ isSubmitted: false }));
    }
  } catch (error) {
    // ===== NETWORK ERROR =====
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      toast.error(errors.ERR_NETWORK.message);
      return;
    }

    // ===== SERVER VALIDATION/AUTH ERRORS =====
    if (axios.isAxiosError(error) && error.response) {
      try {
        // apps/ocr-pdf/handleUpload.ts - UPDATE ERROR CODE MAP

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

          // ✅ OCR-specific errors (UPDATED)
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
          AUTH_USER_NOT_FOUND: errors.alerts.userNotFound || "User not found",
          AUTH_SERVER_ERROR:
            errors.alerts.authError || "Authentication error",

          // Server errors
          SERVER_CONFIG_ERROR:
            errors.alerts.serverError || "Server configuration error",

          // Other errors
          MAX_PAGES_EXCEEDED: errors.MAX_PAGES_EXCEEDED?.message,

          // ✅ Premium/Free tier errors (UPDATED)
          INSUFFICIENT_CONVERSION_UNITS:
            errors.alerts.insufficientUnits ||
            "Not enough conversion units. Upgrade or recharge!",
          FREE_TIER_LIMIT_EXCEEDED:
            errors.alerts.freeTierLimitExceeded ||
            "Free tier limit exceeded. Please upgrade to premium.",
        };

        const { errorCode } = parseErrorResponse(error);
        const message = errorCodeMap[errorCode as keyof typeof errorCodeMap];

        if (message) {
          dispatch(setField({ limitationMsg: message }));
          dispatch(setField({ errorCode }));
          toast.error(message);
          return;
        }
      } catch {
        // Failed to parse error response
      }
    }

    dispatch(setField({ isSubmitted: false }));
  } finally {
    dispatch(setField({ isSubmitted: false }));
  }
};