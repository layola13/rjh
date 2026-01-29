import { isObject } from './isObject';
import { global } from './global';

const document = global.document;
const hasDocument = isObject(document) && isObject(document.createElement);

export function createElement(tagName: string): HTMLElement | Record<string, never> {
  return hasDocument ? document.createElement(tagName) : {};
}