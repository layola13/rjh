/**
 * Polyfill for document.currentScript
 * Provides compatibility for browsers that don't support the currentScript property
 * by detecting the currently executing script through stack trace analysis or readyState
 */

interface Document {
  /**
   * Returns the script element whose script is currently being processed.
   * @returns The currently executing script element, or null if no script is executing
   */
  currentScript: HTMLScriptElement | null;
}

declare global {
  interface Document {
    currentScript: HTMLScriptElement | null;
  }
}

/**
 * Initializes the document.currentScript polyfill if not natively supported
 */
export function initializeCurrentScriptPolyfill(): void;

/**
 * Internal helper: Extracts the script URL from an error stack trace
 * @param stack - The error stack trace string
 * @returns The extracted script URL or null if not found
 */
declare function extractScriptUrlFromStack(stack: string): string | null;

/**
 * Internal helper: Finds the currently executing script element
 * @param scripts - Collection of all script elements in the document
 * @param targetUrl - The URL to match against script src attributes
 * @returns The matching script element or null
 */
declare function findExecutingScript(
  scripts: HTMLCollectionOf<HTMLScriptElement>,
  targetUrl: string | null
): HTMLScriptElement | null;

export {};