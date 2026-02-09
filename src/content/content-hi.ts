import type { adBlockerContentType } from "./content";
import type { edit_page as _edit_page, tool as _tool, tools as _tools, downloadFile as _downloadFile, errors as _ } from "../content";


export const tool: _tool = {
    Ocr_PDF: {
        title: "OCR PDF",
        seoTitle: "ऑनलाइन PDF को खोजने योग्य टेक्स्ट में बदलें",
        description: "स्थिर PDF को इंटरएक्टिव, खोजने योग्य दस्तावेज़ों में बदलें जिसमें सटीक टेक्स्ट पहचान और चयन क्षमताएँ हों।",
        keywords: "OCR PDF, PDF को टेक्स्ट में बदलें, खोजने योग्य PDF, PDF टेक्स्ट पहचान, ऑनलाइन OCR टूल, PDF से टेक्स्ट निकालें",
        color: "#006266",
        type: ".pdf",
        to: "/ocr-pdf",
        features: [
            {
                title: "उच्च सटीकता",
                description: "टेक्स्ट पहचान में उच्च सटीकता का आनंद लें, जो आपके दस्तावेज़ों की अखंडता को सुनिश्चित करता है।"
            },
            {
                title: "मल्टी-लैंग्वेज सपोर्ट",
                description: "कई भाषाओं में PDF से टेक्स्ट पहचानें और बदलें।"
            },
            {
                title: "उपयोगकर्ता-अनुकूल इंटरफेस",
                description: "सरल और सहज इंटरफेस के साथ अपने PDF को खोजने योग्य टेक्स्ट में आसानी से बदलें।"
            }
        ]
    }
};

export const edit_page: _edit_page = {
    edit_page_titles: {
        ocr_pdf: "OCR PDF विकल्प"
    },
    loader_text: "कृपया प्रतीक्षा करें...",
    add_more_button: "अधिक फ़ाइलें जोड़ें",
    action_buttons: {
        ocr_pdf: "OCR PDF"
    },
    ocr_options: {
        info: "दस्तावेज़ में सही भाषाएं चुनने से पाठ पहचान की सटीकता को काफी बढ़ाया जा सकता है।",
        document_languages: "दस्तावेज़ की भाषाएँ",
        input_placeholder: "भाषाएँ चुनें"
    },
    pages: "पृष्ठों",
    page: "पृष्ठ",
    filenameOptions: {
        label: "आउटपुट फ़ाइल का नाम (वैकल्पिक)",
        placeholder: "फ़ाइल का नाम दर्ज करें",
        helperText: "डाउनलोड करते समय यह संकुचित PDF का नाम होगा।",
        cta: "योजनाएँ देखें",
        upgradeNotice: {
            msg: "2.0 से 10.0 तक के स्तर प्रीमियम में उपलब्ध हैं।",
            cta: "अभी अपग्रेड करें",
        },
    },
    languageSelectContent: {
        placeholder: "भाषाएं चुनें (अधिकतम 3)",
        warning: "यह दस्तावेज़ स्कैन किया गया है। सटीक परिणामों के लिए कृपया इसकी भाषा चुनें।",
        ocr_warning: "स्कैन किया गया दस्तावेज़ पाया गया। सर्वोत्तम परिणामों के लिए, उन्नत भाषा पहचान और उच्च सटीकता के साथ हमारे OCR PDF टूल का उपयोग करें। आप बुनियादी प्रोसेसिंग के लिए यहां भाषा भी सेट कर सकते हैं।",
    },
    converter: {
        free: "बेसिक",
        premium: "प्रीमियम",
        freeToolTip: "बेसिक OCR - सरल टेक्स्ट निष्कर्षण",
        premiumToolTip: "उच्च-सटीकता OCR फ़ॉर्मेटिंग संरक्षण के साथ"
    },
};

export const downloadFile: _downloadFile = {
    titles: {
        "ocr-pdf": [
            "आपका पीडीएफ अब चयन किया जा सकता है और खोजा जा सकता है!",
            "आपके पीडीएफ फ़ाइल अब चयन किया जा सकता है और खोजा जा सकता है!"
        ]
    },
    btnText: {
        "ocr-pdf": [
            "पीडीएफ डाउनलोड करें",
            "फ़ाइलें डाउनलोड करें"
        ]
    },
    backto: {
        "ocr-pdf": "OCR पीडीएफ पर वापस जाएं"
    }
};

// Hindi (hi) - tools
export const tools: _tools = {
    select: "चुनें",
    or_drop: "या फ़ाइलें यहाँ ड्रॉप करें",
    files: "फ़ाइलें",
    drop_files: "फ़ाइलें यहाँ ड्रैग करें",
};


export const errors: _ = {
    EMPTY_FILE: {
        message: "फ़ाइल खाली है। कृपया वैध फ़ाइल चुनें।",
        code: "ERR_EMPTY_FILE",
    },
    FILE_TOO_LARGE: {
        message:
            "फ़ाइल बहुत बड़ी है। छोटी फ़ाइल चुनें या हमारा compress-pdf टूल इस्तेमाल करके साइज़ कम करें।",
        code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
    },
    NOT_SUPPORTED_TYPE: {
        message: "फ़ाइल का प्रकार समर्थित नहीं है।",
        types: {
            PDF: "कृपया वैध PDF फ़ाइल चुनें।",
            DOC: "कृपया वैध वर्ड डॉक्यूमेंट चुनें।",
            DOCX: "कृपया वैध वर्ड डॉक्यूमेंट चुनें।",
            XLS: "कृपया वैध एक्सेल स्प्रेडशीट चुनें।",
            XLSX: "कृपया वैध एक्सेल स्प्रेडशीट चुनें।",
            PPT: "कृपया वैध पावरपॉइंट प्रेजेंटेशन चुनें।",
            PPTX: "कृपया वैध पावरपॉइंट प्रेजेंटेशन चुनें।",
        },
        code: "ERR_INVALID_FILE_TYPE",
    },
    FILE_CORRUPT: {
        message:
            "फ़ाइल खराब है और प्रोसेस नहीं की जा सकती। कृपया वैध फ़ाइल चुनें।",
        code: "ERR_FILE_CORRUPT",
    },
    MAX_FILES_EXCEEDED: {
        message:
            "आपने अधिकतम अनुमत फ़ाइलों की संख्या पार कर ली है। कुछ फ़ाइलें हटाकर दोबारा कोशिश करें।",
        code: "ERR_MAX_FILES_EXCEEDED",
    },
    NO_FILES_SELECTED: {
        message: "कोई फ़ाइल चुनी नहीं गई। कम से कम एक फ़ाइल चुनें।",
        code: "ERR_NO_FILES_SELECTED",
    },
    UNKNOWN_ERROR: {
        message:
            "एक अज्ञात त्रुटि हुई। बाद में दोबारा कोशिश करें या सपोर्ट से संपर्क करें।",
        code: "ERR_UNKNOWN",
    },
    ERR_NETWORK: {
        message:
            "नेटवर्क त्रुटि हुई। अपना इंटरनेट कनेक्शन जांचें और दोबारा कोशिश करें।",
        code: "ERR_NETWORK",
    },
    ERR_UPLOAD_COUNT: {
        message: "मर्ज करने के लिए कम से कम दो फ़ाइलें अपलोड करें।",
        code: "ERR_UPLOAD_COUNT",
    },
    PASSWORD_REQUIRED: {
        message: "PDF में पासवर्ड की आवश्यकता है।",
        code: "PASSWORD_REQUIRED",
    },
    INCORRECT_PASSWORD: {
        message: "आपने गलत पासवर्ड डाला है।",
        code: "INCORRECT_PASSWORD",
    },
    MAX_DAILY_USAGE: {
        message:
            "आपने अपनी दैनिक उपयोग सीमा पूरी कर ली है। बिना रुकावट के जारी रखने के लिए प्लान अपग्रेड करें।",
        code: "MAX_DAILY_USAGE",
    },
    MAX_PAGES_EXCEEDED: {
        message: "PDF अधिकतम 50 पृष्ठों की सीमा से अधिक है।",
        code: "ERR_MAX_PAGES_EXCEEDED",
    },
    // Hindi (hi)
    alerts: {
        // Frontend validation
        maxFiles: "अधिकतम 15 फाइलें। अधिक के लिए सब्सक्राइब करें!",
        singleFileSize: "फाइल का आकार 100 MB से कम होना चाहिए। बड़ी फाइलें अपलोड करने के लिए अपग्रेड करें!",
        perFilePages: "प्रति फाइल 500 पेज। अभी और अनलॉक करें!",
        fileSize: "प्रति फाइल 50MB। अधिक के लिए अपग्रेड करें!",
        serverError: "सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।",
        tooManyFiles: "बहुत सारी फाइलें अपलोड की गईं",
        // Backend file validation
        fileNotUploaded: "कोई फाइल अपलोड नहीं की गई। कृपया एक फाइल चुनें।",
        fileEmpty: "अपलोड की गई फाइल खाली है। कृपया एक वैध फाइल चुनें।",
        fileTooLarge: "फाइल 200MB सीमा से अधिक है। बड़ी फाइलों के लिए अपग्रेड करें!",
        invalidFileType: "अमान्य फाइल प्रकार। कृपया समर्थित फॉर्मेट अपलोड करें।",
        fileCorrupt: "फाइल दूषित लगती है। कृपया कोई अन्य फाइल आजमाएं।",
        insufficientUnits: "परिवर्तन इकाइयां अपर्याप्त हैं। अपग्रेड करें या रिचार्ज करें!",
        // Auth errors
        authRequired: "प्रीमियम सुविधाओं का उपयोग करने के लिए कृपया लॉग इन करें।",
        sessionExpired: "आपका सत्र समाप्त हो गया है। कृपया फिर से लॉग इन करें।",
        invalidToken: "प्रमाणीकरण विफल। कृपया फिर से लॉग इन करें।",
        userNotFound: "खाता नहीं मिला। कृपया फिर से लॉग इन करें।",
        authError: "प्रमाणीकरण त्रुटि। कृपया पुनः प्रयास करें।",
        notPasswordProtected: "एक या अधिक फाइलें पासवर्ड से सुरक्षित नहीं हैं",

        // PDF-specific errors
        invalidPdf: "अमान्य या दूषित PDF फाइल।",
        pdfNotEncrypted: "यह PDF पासवर्ड से सुरक्षित नहीं है और अनलॉक करने की आवश्यकता नहीं है।",

        // Lock-PDF errors
        noLockPassword: "PDF को लॉक करने के लिए कृपया पासवर्ड प्रदान करें।",
        lockingFailed: "PDF लॉक करने में विफल। कृपया पुनः प्रयास करें।",

        // Unlock-PDF errors
        noPasswordsProvided: "लॉक किए गए PDFs के लिए कृपया पासवर्ड प्रदान करें।",
        unlockingFailed: "PDF अनलॉक करने में विफल। कृपया अपना पासवर्ड जांचें और पुनः प्रयास करें।",
        incorrectPassword: "गलत पासवर्ड। कृपया पुनः प्रयास करें।",
        passwordRequired: "यह PDF पासवर्ड से सुरक्षित है। कृपया पासवर्ड दर्ज करें।",

        // Settings errors
        invalidSettings: "अमान्य सेटिंग्स प्रदान की गईं। कृपया रिफ्रेश करें और पुनः प्रयास करें।",
        conversionFailed: "परिवर्तन विफल। कृपया पुनः प्रयास करें।",
        noLanguagesSelected: "कृपया OCR के लिए कम से कम एक भाषा चुनें",
        invalidLanguagesFormat: "अमान्य भाषा चयन प्रारूप",
        noLanguagesForFile: "कृपया सभी फ़ाइलों के लिए भाषा(एं) चुनें",
        unsupportedLanguage: "एक या अधिक चयनित भाषाएं समर्थित नहीं हैं",
        tooManyLanguages: "प्रति फ़ाइल अधिकतम 3 भाषाओं की अनुमति है",
        ocrFailed: "OCR प्रसंस्करण विफल रहा। कृपया पुनः प्रयास करें।",
        ocrNoTextDetected: "दस्तावेज़ में कोई पाठ नहीं मिला",
        pdfAlreadySearchable: "PDF में पहले से खोजने योग्य टेक्स्ट है",
        freeTierLimitExceeded: "मुफ्त स्तर की सीमा पार हो गई। कृपया प्रीमियम में अपग्रेड करें।",
    },
};

export const adBlockerContent: adBlockerContentType = {
    title: "विज्ञापन अवरोधक पता चला",
    description: "हमने देखा कि आप विज्ञापन अवरोधक इस्तेमाल कर रहे हैं। इसे बंद करें या प्रीमियम में अपग्रेड करें ताकि विज्ञापन-मुक्त अनुभव मिले!",
    reloadPage: "पेज रीलोड करें",
    upgradeToPremium: "प्रीमियम में अपग्रेड करें"
};