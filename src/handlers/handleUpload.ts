// now i want to fix the ocr-pdf api, this is the front-end i.e what i'm sending from the client:
import axios from "axios";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../content";
import { type RefObject } from "react";
import { resetErrorMessage, setField } from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import { parseErrorResponse } from "../utils";

let filesOnSubmit = [];
let prevState = null;

export const handleUpload = async (
  e: React.SubmitEvent<HTMLFormElement>,
  downloadBtn: RefObject<HTMLAnchorElement>,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    fileName: string;
    rotations: {
      k: string;
      r: number;
    }[];
    passwords: {
      k: string;
      p: string;
    }[];
  },
  files: File[],
  errors: _
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files) return;

  // Extract file names from the File[] array
  const fileNames = files.map((file) => file.name);

  // Check if every file name in files is present in filesOnSubmit
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

  // Prepare form data
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("rotations", JSON.stringify(state.rotations));
  formData.append("passwords", JSON.stringify(state.passwords));

  let url: string = "";
  let endpoint = "/api/";

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

  const mimeTypeLookupTable: {
    [key: string]: { outputFileMimeType: string; outputFileName: string };
  } = {
    "application/zip": {
      outputFileMimeType: "application/zip",
      outputFileName: `${originalFileName || "PDFEquips"}-compressed.zip`,
    },
    "application/pdf": {
      outputFileMimeType: "application/pdf",
      outputFileName: `${originalFileName}.pdf`,
    },
  };

  try {
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
      withCredentials: true
    });

    const mimeType = response.data.type || response.headers["content-type"];
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };
    const { outputFileMimeType, outputFileName } = mimeTypeData;
    const compressedFileSize = response.data.byteLength;

    // Dispatch the compressed file size to Redux store
    dispatch(
      setField({
        compressedFileSize: compressedFileSize,
      })
    );

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
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      return;
    }

    // Handle server validation/auth errors
    if (axios.isAxiosError(error) && error.response) {
      try {
        const errorCodeMap: Record<string, string> = {
          // General file validation errors
          'NO_FILES_PROVIDED': errors.alerts.fileNotUploaded || 'No files provided',
          'FILE_NOT_UPLOADED': errors.alerts.fileNotUploaded || 'File not uploaded',
          'FILE_EMPTY': errors.alerts.fileEmpty || 'File is empty',
          'FILE_TOO_LARGE': errors.alerts.fileTooLarge || 'File is too large',
          'TOO_MANY_FILES': errors.alerts.tooManyFiles || 'Too many files uploaded',
          'INVALID_FILE_TYPE': errors.alerts.invalidFileType || 'Invalid file type',
          'FILE_CORRUPT': errors.alerts.fileCorrupt || 'File is corrupted',

          // PDF-specific errors
          'INVALID_PDF': errors.alerts.invalidPdf || 'Invalid PDF file',
          'PDF_NOT_ENCRYPTED': errors.alerts.pdfNotEncrypted || 'PDF is not password-protected',

          // Lock-PDF specific errors
          'NO_LOCK_PASSWORD_PROVIDED': errors.alerts.noLockPassword || 'Please provide a password to lock the PDF',
          'LOCKING_FAILED': errors.alerts.lockingFailed || 'Failed to lock PDF. Please try again.',

          // Unlock-PDF specific errors
          'NO_PASSWORDS_PROVIDED': errors.alerts.noPasswordsProvided || 'Please provide passwords for locked PDFs',
          'UNLOCKING_FAILED': errors.alerts.unlockingFailed || 'Failed to unlock PDF. Please check the password and try again.',
          'INCORRECT_PASSWORD': errors.alerts.incorrectPassword || 'Incorrect password provided',
          'PASSWORD_REQUIRED': errors.alerts.passwordRequired || 'Password required to unlock PDF',

          // Settings errors
          'INVALID_SETTINGS_FORMAT': errors.alerts.invalidSettings || 'Invalid settings format',

          // Auth errors
          'UNAUTHORIZED': errors.alerts.authRequired || 'Authentication required',
          'INVALID_TOKEN': errors.alerts.invalidToken || 'Invalid authentication token',
          'AUTH_TOKEN_MISSING': errors.alerts.authRequired || 'Authentication required',
          'AUTH_TOKEN_EXPIRED': errors.alerts.sessionExpired || 'Session expired. Please sign in again.',
          'AUTH_INVALID_TOKEN': errors.alerts.invalidToken || 'Invalid authentication token',
          'AUTH_USER_NOT_FOUND': errors.alerts.userNotFound || 'User not found',
          'AUTH_SERVER_ERROR': errors.alerts.authError || 'Authentication error',

          // Server errors
          'SERVER_CONFIG_ERROR': errors.alerts.serverError || 'Server configuration error',

          // Other errors
          'MAX_PAGES_EXCEEDED': errors.MAX_PAGES_EXCEEDED?.message,
          'NO_ROTATIONS_PROVIDED': errors.alerts.noRotationsProvided,
          'ROTATION_FAILED': errors.alerts.rotationFailed,
          'INVALID_ROTATION_ANGLE': errors.alerts.invalidRotationAngle,
        };

        const { errorCode } = parseErrorResponse(error);

        const message = errorCodeMap[errorCode];

        if (message) {
          dispatch(setField({ limitationMsg: message }));
          dispatch(setField({ errorCode }));
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