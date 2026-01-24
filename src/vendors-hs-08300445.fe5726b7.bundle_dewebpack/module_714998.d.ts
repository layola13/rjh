/**
 * Dynamic CSS injection utilities for React components
 * Provides functions to inject, update, and remove CSS styles dynamically
 */

/**
 * Cache container for storing style parent nodes
 */
export function clearContainerCache(): void;

/**
 * CSS injection options
 */
export interface CSSOptions {
  /**
   * Content Security Policy configuration
   */
  csp?: {
    /**
     * Nonce value for CSP compliance
     */
    nonce?: string;
  };

  /**
   * Whether to prepend styles instead of appending
   * - true: prepend to beginning
   * - false: append to end
   * - "queue": prepend with priority queue
   */
  prepend?: boolean | "queue";

  /**
   * Priority level for style injection (used with prepend queue)
   * Higher priority styles are inserted earlier
   * @default 0
   */
  priority?: number;

  /**
   * Custom mark/identifier for the style element
   * Will be prefixed with "data-" if not already
   */
  mark?: string;

  /**
   * Target DOM element to attach styles to
   * @default document.head or document.body
   */
  attachTo?: HTMLElement;

  /**
   * Pre-fetched style elements (for performance optimization)
   */
  styles?: HTMLStyleElement[];
}

/**
 * Injects CSS into the document
 * 
 * @param css - The CSS content to inject
 * @param options - Configuration options for CSS injection
 * @returns The created style element, or null if not in browser environment
 * 
 * @example
 *