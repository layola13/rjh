/**
 * HTML Document Detection Module
 * 
 * Provides utilities for detecting legacy document.all behavior and HTMLDDA (HTML Document Detection Algorithm).
 * This is used for compatibility detection with legacy browsers and non-standard JavaScript engines.
 * 
 * @module HTMLDocumentDetection
 */

/**
 * Reference to document.all if available in the current environment.
 * document.all is a legacy API that returns all elements in the document.
 * It's deprecated but still supported in some browsers for backward compatibility.
 * 
 * @remarks
 * In modern browsers, document.all is treated specially - it's "falsy" despite being an object,
 * which is a quirk for backwards compatibility with old code that checked `if (!document.all)`.
 */
export declare const all: HTMLAllCollection | undefined;

/**
 * Indicates whether the environment implements HTMLDDA (HTML Document Detection Algorithm).
 * 
 * This flag is true when document.all exists but behaves as undefined in boolean contexts,
 * which is a special ECMAScript feature for web compatibility.
 * 
 * The check `void 0 === documentAll && void 0 !== documentAll` detects this quirk:
 * - document.all == undefined (true due to HTMLDDA)
 * - document.all !== undefined (true because it's actually an object)
 * 
 * @remarks
 * This is primarily used for detecting quirks mode behavior and legacy browser compatibility.
 */
export declare const IS_HTMLDDA: boolean;