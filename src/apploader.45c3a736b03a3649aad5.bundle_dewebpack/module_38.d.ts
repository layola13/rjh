/**
 * Sets a nonce attribute on an HTMLElement for Content Security Policy (CSP) compliance.
 * 
 * This utility is typically used by webpack to add nonce attributes to dynamically
 * created script or style elements, ensuring they comply with CSP directives.
 * 
 * @param element - The HTML element to set the nonce attribute on
 */
export default function setNonce(element: HTMLElement): void;

/**
 * Webpack's global nonce value used for Content Security Policy.
 * This value is typically set at runtime and should match the nonce in CSP headers.
 */
export const __webpack_nonce__: string | undefined;