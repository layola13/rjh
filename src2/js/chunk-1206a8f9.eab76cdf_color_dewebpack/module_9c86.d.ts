/**
 * String.prototype.big() polyfill
 * Wraps the string in a <big> HTML tag.
 * @deprecated This method is deprecated and should not be used in modern code.
 */

import { createHtmlMethod } from './string-html-helper';

/**
 * Extends String.prototype with the 'big' method.
 * This method wraps the string content in a <big> HTML tag.
 * 
 * @example
 * "Hello".big() // Returns: "<big>Hello</big>"
 * 
 * @remarks
 * The <big> HTML tag is obsolete and should not be used in modern web development.
 * This polyfill exists for legacy browser compatibility only.
 */
createHtmlMethod('big', (wrapInTag: (thisValue: unknown, tagName: string, attribute: string, value: string) => string) => {
  return function(this: string): string {
    return wrapInTag(this, 'big', '', '');
  };
});

export {};