// YouTube walkthrough shown below the tool (src/partials/OcrVideo.astro).
// name/description/uploadDate match the video on YouTube; only the page copy is localized.

export const OCR_VIDEO = {
  id: "Np6XyPKvJI4",
  name: "How to OCR a Scanned PDF (Select, Search & Copy the Text)",
  description:
    "A scanned document is an image of text, so you can't search it, select it, or copy from it. OCR (optical character recognition) reads the text in the image and adds it to the PDF, so the page looks the same, but the text becomes searchable and copyable.",
  uploadDate: "2026-10-23",
};

export const ocrVideoCopy: Record<string, { heading: string; caption: string; play: string }> = {
  en: {
    heading: "Watch: how to OCR a scanned PDF",
    caption:
      "A scanned page is an image of text, so you can't search, select or copy it. OCR reads the text and adds it to the PDF: the page looks the same, but the text becomes searchable and copyable.",
    play: "Play video",
  },
  ar: {
    heading: "شاهد: كيفية إجراء OCR لملف PDF ممسوح ضوئيًا",
    caption:
      "الصفحة الممسوحة ضوئيًا صورة للنص، لذا لا يمكنك البحث فيها أو تحديدها أو نسخها. تقرأ تقنية OCR النص وتضيفه إلى ملف PDF: تبقى الصفحة كما هي، لكن يصبح النص قابلًا للبحث والنسخ.",
    play: "تشغيل الفيديو",
  },
  es: {
    heading: "Mira: cómo aplicar OCR a un PDF escaneado",
    caption:
      "Una página escaneada es una imagen del texto, así que no puedes buscarlo, seleccionarlo ni copiarlo. El OCR lee el texto y lo añade al PDF: la página se ve igual, pero el texto se puede buscar y copiar.",
    play: "Reproducir vídeo",
  },
  fr: {
    heading: "Regardez : comment faire l'OCR d'un PDF numérisé",
    caption:
      "Une page numérisée est une image du texte : impossible de le rechercher, de le sélectionner ou de le copier. L'OCR lit le texte et l'ajoute au PDF : la page reste identique, mais le texte devient consultable et copiable.",
    play: "Lire la vidéo",
  },
  hi: {
    heading: "देखें: स्कैन की गई PDF पर OCR कैसे करें",
    caption:
      "स्कैन किया गया पेज टेक्स्ट की एक इमेज होता है, इसलिए आप उसे खोज, चुन या कॉपी नहीं कर सकते। OCR टेक्स्ट को पढ़कर PDF में जोड़ देता है: पेज वैसा ही दिखता है, लेकिन टेक्स्ट खोजने और कॉपी करने योग्य हो जाता है।",
    play: "वीडियो चलाएँ",
  },
  zh: {
    heading: "观看：如何对扫描版 PDF 进行 OCR",
    caption:
      "扫描页面是文字的图片，因此无法搜索、选择或复制其中的文字。OCR 会识别文字并将其添加到 PDF 中：页面外观不变，但文字变得可搜索、可复制。",
    play: "播放视频",
  },
};
