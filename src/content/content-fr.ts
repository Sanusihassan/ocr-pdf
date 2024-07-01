import type {
  tool as _tool,
  web2pdftool as _web2pdftool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../../content";

export const tool: _tool = {
  Ocr_PDF: {
    title: "OCR PDF",
    seoTitle: "Convertir PDF en Texte Recherchable en Ligne",
    description: "Transformez des PDF statiques en documents interactifs et recherchables avec des capacités précises de reconnaissance et de sélection de texte.",
    keywords: "OCR PDF, convertir PDF en texte, PDF recherchable, reconnaissance de texte PDF, outil OCR en ligne, extraire le texte du PDF",
    color: "#006266",
    type: ".pdf",
    to: "/ocr-pdf",
    features: [
      {
        title: "Haute Précision",
        description: "Profitez d'une haute précision dans la reconnaissance de texte, garantissant l'intégrité de vos documents."
      },
      {
        title: "Support Multilingue",
        description: "Reconnaît et convertit le texte des PDF en plusieurs langues."
      },
      {
        title: "Interface Conviviale",
        description: "Convertissez facilement vos PDFs en texte recherchable avec une interface intuitive et simple."
      }
    ]
  },
};


export const tools: _tools = {
  select: "Sélectionner",
  or_drop: "ou déposer des fichiers ici",
  files: "fichiers",
  drop_files: "Déposez les fichiers ici",
};

export const downloadFile: _downloadFile = {
  titles: {
    "ocr-pdf": [
      "Votre PDF est maintenant sélectionnable et recherchable !",
      "Le texte est maintenant sélectionnable et recherchable dans votre PDF !",
    ],
  },

  btnText: {
    "ocr-pdf": ["Télécharger PDF", "Télécharger des fichiers"],
  },

  backto: {
    "ocr-pdf": "Retour à OCR PDF",
  },
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    ocr_pdf: "Options de reconnaissance de texte pour les PDF",
  },
  loader_text: "Veuillez patienter...",
  add_more_button: "Ajouter plus de fichiers",
  action_buttons: {
    ocr_pdf: "Reconnaissance PDF",
  },
  ocr_options: {
    info: "Choisir les bonnes langues dans le document améliore considérablement la précision de la reconnaissance de texte.",
    document_languages: "Langues du document",
    input_placeholder: "Sélectionner des langues",
  },
  pages: "pages",
  page: "page",
};


export const footer: _footer = {
  brand: "PDFEquips",
  terms: "conditions",
  conditions: "conditions d'utilisation",
  privacy_policy: "politique de confidentialité",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "Le fichier est vide. Veuillez choisir un fichier valide.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "Le fichier est trop volumineux. Veuillez choisir un fichier plus petit ou utiliser notre outil de compression PDF pour réduire la taille du fichier.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "Le fichier n'est pas d'un type pris en charge.",
    types: {
      PDF: "Veuillez choisir un fichier PDF valide.",
      JPG: "Veuillez choisir un fichier d'image JPEG valide.",
      DOC: "Veuillez choisir un fichier de document Word valide.",
      DOCX: "Veuillez choisir un fichier de document Word valide.",
      XLS: "Veuillez choisir un fichier de feuille de calcul Excel valide.",
      XLSX: "Veuillez choisir un fichier de feuille de calcul Excel valide.",
      PPT: "Veuillez choisir un fichier de présentation PowerPoint valide.",
      PPTX: "Veuillez choisir un fichier de présentation PowerPoint valide.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "Le fichier est corrompu et ne peut pas être traité. Veuillez choisir un fichier valide.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "Le fichier contient des polices manquantes. Veuillez vous assurer que toutes les polices sont intégrées dans le fichier PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "Le fichier contient des données d'image non valides. Veuillez vous assurer que toutes les images sont correctement formatées.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "Le fichier contient un risque de sécurité et ne peut pas être traité. Veuillez choisir un fichier valide.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Vous avez dépassé le nombre maximal de fichiers autorisés. Veuillez supprimer certains fichiers et réessayer.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message:
      "Aucun fichier sélectionné. Veuillez sélectionner au moins un fichier.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Une erreur inconnue s'est produite. Veuillez réessayer plus tard ou contacter le support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Une erreur de réseau s'est produite. Veuillez vérifier votre connexion Internet et réessayer.",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "Veuillez télécharger au moins deux fichiers à fusionner.",
    code: "ERR_UPLOAD_COUNT",
  },
};
