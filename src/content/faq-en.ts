import type { FaqContent } from "./faq";

export const faq: FaqContent = {
  title: "Frequently Asked Questions",
  items: {
    "/ocr-pdf": [
      {
        question: "How do I make a PDF searchable?",
        answer: "Drag your scanned PDF into the area above, select the document languages and click «Ocr PDF». You get a PDF whose text you can search, select and copy.",
      },
      {
        question: "What is OCR?",
        answer: "OCR (optical character recognition) reads the text in scanned pages and images and turns it into real text, so a scanned PDF becomes searchable and selectable.",
      },
      {
        question: "Why should I choose the document language?",
        answer: "Choosing the right languages greatly improves recognition accuracy. You can select up to 3 languages per document.",
      },
      {
        question: "Is OCR PDF free?",
        answer: "Yes. Basic OCR is free and needs no sign-up. Premium gives higher accuracy and keeps the formatting.",
      },
      {
        question: "Are my files safe?",
        answer: "Yes. Your files are transferred over an encrypted (TLS) connection and automatically deleted from our servers after processing.",
      },
    ],
  },
};
