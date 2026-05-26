import DOMPurify from "dompurify";
export function safeCode(html: string) {
  return DOMPurify.sanitize(html);
}
