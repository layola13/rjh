import { isObject } from './808535';
import { global } from './339192';

const document = global.document;
const isDocumentObject = isObject(document) && isObject(document.createElement);

export function createElement(tagName: string): HTMLElement | Record<string, never> {
  return isDocumentObject ? document.createElement(tagName) : {};
}