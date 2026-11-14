// Blog guides linked from tool pages (components/ToolGuide.astro).
// The posts are in English; other languages say so in the link text.

type Guide = { href: string; titles: Record<string, string> };

const BLOG = "https://www.pdfequips.com/blog";

const label: Record<string, string> = {
  en: "Read the guide",
  ar: "اقرأ الدليل",
  es: "Lee la guía",
  fr: "Lire le guide",
  hi: "गाइड पढ़ें",
  zh: "阅读指南",
};

const psdGuide: Guide = {
  href: `${BLOG}/psd-to-pdf-and-pdf-to-psd-layers/`,
  titles: {
    en: "PSD to PDF and PDF to PSD: what happens to your layers",
    ar: "تحويل PSD إلى PDF وPDF إلى PSD: ماذا يحدث للطبقات (بالإنجليزية)",
    es: "PSD a PDF y PDF a PSD: qué pasa con tus capas (en inglés)",
    fr: "PSD en PDF et PDF en PSD : que deviennent vos calques (en anglais)",
    hi: "PSD से PDF और PDF से PSD: आपकी लेयर्स का क्या होता है (अंग्रेज़ी में)",
    zh: "PSD 转 PDF 与 PDF 转 PSD：图层会怎样（英文）",
  },
};

const guides: Record<string, Guide> = {
  "/pdf-to-psd": psdGuide,
  "/psd-to-pdf": psdGuide,
  "/jpg-to-pdf": {
    href: `${BLOG}/how-to-convert-jpg-to-pdf-and-get-the-page-right-not-just-the-image/`,
    titles: {
      en: "How to convert JPG to PDF and get the page right, not just the image",
      ar: "كيفية تحويل JPG إلى PDF مع ضبط الصفحة وليس الصورة فقط (بالإنجليزية)",
      es: "Cómo convertir JPG a PDF y acertar con la página, no solo con la imagen (en inglés)",
      fr: "Convertir un JPG en PDF en réussissant la page, pas seulement l'image (en anglais)",
      hi: "JPG को PDF में कैसे बदलें और सिर्फ़ इमेज नहीं, पूरा पेज सही पाएँ (अंग्रेज़ी में)",
      zh: "如何将 JPG 转换为 PDF，让整页而不只是图片都正确（英文）",
    },
  },
  "/ocr-pdf": {
    href: `${BLOG}/how-to-convert-scanned-documents-to-editable-pdfs/`,
    titles: {
      en: "How to convert scanned documents to editable PDFs",
      ar: "كيفية تحويل المستندات الممسوحة ضوئيًا إلى ملفات PDF قابلة للتعديل (بالإنجليزية)",
      es: "Cómo convertir documentos escaneados en PDF editables (en inglés)",
      fr: "Comment convertir des documents scannés en PDF modifiables (en anglais)",
      hi: "स्कैन किए गए दस्तावेज़ों को संपादन योग्य PDF में कैसे बदलें (अंग्रेज़ी में)",
      zh: "如何将扫描文档转换为可编辑的 PDF（英文）",
    },
  },
};

export function getGuide(to: string, lang: string) {
  const g = guides[to];
  if (!g) return null;
  return {
    href: g.href,
    label: label[lang] ?? label.en,
    title: g.titles[lang] ?? g.titles.en,
  };
}
