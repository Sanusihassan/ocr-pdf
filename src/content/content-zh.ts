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
    seoTitle: "在线将PDF转换为可搜索文本",
    description: "将静态PDF转换为互动的、可搜索的文档，具备精确的文本识别和选择能力。",
    keywords: "OCR PDF, 将PDF转换为文本, 可搜索的PDF, PDF文本识别,在线OCR工具, 提取PDF文本",
    color: "#006266",
    type: ".pdf",
    to: "/ocr-pdf",
    features: [
      {
        title: "高精度",
        description: "享受高精度的文本识别，确保您的文档的完整性。"
      },
      {
        title: "多语言支持",
        description: "识别并转换多种语言的PDF文本。"
      },
      {
        title: "用户友好界面",
        description: "使用简单直观的界面轻松将您的PDF转换为可搜索的文本。"
      }
    ]
  },
};


export const downloadFile: _downloadFile = {
  titles: {
    "ocr-pdf": ["您的PDF现在可选择和搜索！", "您的PDF文件现在可选择和搜索！"],
  },

  btnText: {
    "ocr-pdf": ["下载PDF", "下载文件"],
  },

  backto: {
    "ocr-pdf": "返回OCR PDF",
  },
};
export const edit_page: _edit_page = {
  edit_page_titles: {
    ocr_pdf: "OCR PDF 选项",
  },
  loader_text: "请稍等...",
  add_more_button: "添加更多文件",
  action_buttons: {
    ocr_pdf: "OCR PDF",
  },
  ocr_options: {
    info: "选择正确的文档语言可以显著提高文本识别的准确性。",
    document_languages: "文档语言",
    input_placeholder: "选择语言",
  },
  pages: "页",
  page: "页",
};

export const tools: _tools = {
  select: "选择",
  or_drop: "或将文件拖放到此处",
  files: "文件",
  drop_files: "在此处拖放文件",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "条款",
  conditions: "条件",
  privacy_policy: "隐私政策",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "文件为空，请选择一个有效的文件。",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "文件太大。请选择一个更小的文件，或使用我们的压缩PDF工具来减小文件大小。",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "文件不是受支持的类型。",
    types: {
      PDF: "请选择一个有效的PDF文件。",
      JPG: "请选择一个有效的JPEG图片文件。",
      DOC: "请选择一个有效的Word文档文件。",
      DOCX: "请选择一个有效的Word文档文件。",
      XLS: "请选择一个有效的Excel电子表格文件。",
      XLSX: "请选择一个有效的Excel电子表格文件。",
      PPT: "请选择一个有效的PowerPoint演示文稿文件。",
      PPTX: "请选择一个有效的PowerPoint演示文稿文件。",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "文件已损坏，无法处理。请选择一个有效的文件。",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message: "文件缺少字体。请确保所有字体都嵌入在PDF文件中。",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "文件包含无效的图像数据。请确保所有图像格式正确。",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message: "文件存在安全风险，无法处理。请选择一个有效的文件。",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message: "您已超出允许的最大文件数。请删除一些文件并重试。",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "未选择任何文件。请选择至少一个文件。",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "发生未知错误。请稍后重试或联系支持人员。",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "网络错误，请检查您的互联网连接并重试。",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "请至少上传两个文件以合并。",
    code: "ERR_UPLOAD_COUNT",
  },
};
