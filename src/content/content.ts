export const tool = {
  Ocr_PDF: {
    title: "OCR PDF",
    seoTitle: "Convert PDF to Searchable Text Online",
    description: "Transform static PDFs into interactive, searchable documents with precise text recognition and selection capabilities.",
    keywords: "OCR PDF, convert PDF to text, searchable PDF, PDF text recognition, online OCR tool, extract text from PDF",
    color: "#006266",
    type: ".pdf",
    to: "/ocr-pdf",
    features: [
      {
        title: "High Accuracy",
        description: "Enjoy high accuracy in text recognition, ensuring the integrity of your documents."
      },
      {
        title: "Multi-Language Support",
        description: "Recognize and convert text from PDFs in multiple languages."
      },
      {
        title: "User-Friendly Interface",
        description: "Easily convert your PDFs to searchable text with an intuitive and straightforward interface."
      }
    ]
  }
};

export const edit_page = {
  edit_page_titles: {
    ocr_pdf: "Ocr PDF options"
  },
  loader_text: "please wait...",
  add_more_button: "Add more files",
  action_buttons: {
    ocr_pdf: "Ocr PDF"
  },
  pages: "pages",
  page: "page",
  ocr_options: {
    info: "Choosing the correct document languages significantly boosts the accuracy of text recognition.",
    document_languages: "Document Languages",
    input_placeholder: "Select Languages"
  },
  filenameOptions: {
    label: "Output File Name (Optional)",
    placeholder: "Enter file name",
    helperText: "This will be the name of the compressed PDF when downloaded.",
    cta: "View Plans",
    upgradeNotice: {
      msg: "Levels from 2.0 to 10.0 are available with premium.",
      cta: "Upgrade now",
    },
  },
};

export const downloadFile = {
  titles: {
    "ocr-pdf": [
      "Your PDF is now selectable and searchable!",
      "Your PDF files are now selectable and searchable!"
    ]
  },
  btnText: {
    "ocr-pdf": [
      "Download PDF",
      "Download files"
    ]
  },
  backto: {
    "ocr-pdf": "Back To OCR PDF"
  }
};

export type ToolType = {
  title: string;
  seoTitle: string;
  description: string;
  keywords: string;
  color: string;
  type: string;
  to: string;
  features: {
    title: string;
    description: string;
  }[];
}
export type Paths = "ocr-pdf";

export const tools = {
  select: "Select",
  or_drop: "or drop files here",
  files: "files",
  drop_files: "Drag files here",
};

export const errors = {
  EMPTY_FILE: {
    message: "The file is empty. Please choose a valid file.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "The file is too large. Please choose a smaller file, or use our compress-pdf tool to reduce the file size.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "The file is not a supported type.",
    types: {
      PDF: "Please choose a valid PDF file.",
      DOC: "Please choose a valid Word document file.",
      DOCX: "Please choose a valid Word document file.",
      XLS: "Please choose a valid Excel spreadsheet file.",
      XLSX: "Please choose a valid Excel spreadsheet file.",
      PPT: "Please choose a valid PowerPoint presentation file.",
      PPTX: "Please choose a valid PowerPoint presentation file.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "The file is corrupt and cannot be processed. Please choose a valid file.",
    code: "ERR_FILE_CORRUPT",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "You have exceeded the maximum number of files allowed. Please delete some files and try again.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No files selected. Please select at least one file.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "An unknown error occurred. Please try again later or contact support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "A network error occurred. Please check your internet connection and try again.",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "Please upload at least two files to merge.",
    code: "ERR_UPLOAD_COUNT",
  },
  PASSWORD_REQUIRED: {
    message: "PDF requires a password.",
    code: "PASSWORD_REQUIRED",
  },

  INCORRECT_PASSWORD: {
    message: "The password you entered is incorrect.",
    code: "INCORRECT_PASSWORD",
  },
  MAX_DAILY_USAGE: {
    message:
      "You’ve reached your daily usage limit. Please upgrade your plan to continue using this feature without interruption.",
    code: "MAX_DAILY_USAGE",
  },
  MAX_PAGES_EXCEEDED: {
    message: "The PDF exceeds the maximum page limit of 50 pages.",
    code: "ERR_MAX_PAGES_EXCEEDED",
  },
  alerts: {
    // Frontend validation
    maxFiles: "Max 15 files. Subscribe for more!",
    singleFileSize: "File size must be under 100 MB. Upgrade to upload bigger files!",
    perFilePages: "500 pages per file. Unlock more now!",
    fileSize: "50MB per file. Upgrade for more!",
    serverError: "Server error. Please try again later.",
    // Backend file validation
    fileNotUploaded: "No file was uploaded. Please select a file.",
    fileEmpty: "The uploaded file is empty. Please select a valid file.",
    fileTooLarge: "File exceeds 200MB limit. Upgrade for larger files!",
    invalidFileType: "Invalid file type. Please upload a supported format.",
    fileCorrupt: "File appears to be corrupted. Please try another file.",
    insufficientUnits: "Not enough conversion units. Upgrade or recharge!",
    // Auth errors
    authRequired: "Please log in to use premium features.",
    sessionExpired: "Your session has expired. Please log in again.",
    invalidToken: "Authentication failed. Please log in again.",
    userNotFound: "Account not found. Please log in again.",
    authError: "Authentication error. Please try again.",
    notPasswordProtected: "One or more files are not password protected",

    // PDF-specific errors
    invalidPdf: "Invalid or corrupted PDF file.",
    pdfNotEncrypted: "This PDF is not password-protected and doesn't need to be unlocked.",

    // Lock-PDF errors
    noLockPassword: "Please provide a password to lock the PDF.",
    lockingFailed: "Failed to lock PDF. Please try again.",

    // Unlock-PDF errors
    noPasswordsProvided: "Please provide passwords for the locked PDFs.",
    unlockingFailed: "Failed to unlock PDF. Please check your password and try again.",
    incorrectPassword: "Incorrect password. Please try again.",
    passwordRequired: "This PDF is password-protected. Please enter the password.",
    tooManyFiles: "Too many files uploaded",

    // Settings errors
    invalidSettings: "Invalid settings provided. Please refresh and try again.",
    conversionFailed: "Conversion failed. Please try again.",
    // please do the same for these:
    noRotationsProvided: "Please specify rotation for at least one file",
    rotationFailed: "Failed to rotate PDF. Please try again.",
    invalidRotationAngle: "Invalid rotation angle. Use 90, 180, or 270 degrees."
  },
};

export const adBlockerContent = {
  title: "Ad Blocker Detected",
  description: "We noticed you're using an ad blocker. Please consider disabling it or upgrade to premium for an ad-free experience!",
  reloadPage: "Reload Page",
  upgradeToPremium: "Upgrade to Premium"
}
export type adBlockerContentType = typeof adBlockerContent;