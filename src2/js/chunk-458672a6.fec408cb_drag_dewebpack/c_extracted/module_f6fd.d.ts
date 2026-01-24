/**
 * Polyfill for document.currentScript property
 * 
 * Provides compatibility for browsers that don't natively support document.currentScript.
 * Uses stack trace analysis and readyState checking to determine the currently executing script.
 * 
 * @module DocumentCurrentScriptPolyfill
 */

/**
 * Polyfill getter function that determines the currently executing script element
 * 
 * Strategy:
 * 1. Throws an error to capture stack trace
 * 2. Parses stack trace to extract script URL
 * 3. Matches URL against loaded script elements
 * 4. Falls back to checking readyState for IE compatibility
 * 
 * @returns The currently executing script element, or null if not found
 */
export declare function getCurrentScriptPolyfill(): HTMLScriptElement | null;

/**
 * Type definition for the polyfill module
 * 
 * This module patches document.currentScript if not natively supported
 */
declare global {
  interface Document {
    /**
     * Returns the script element currently being processed by the browser
     * 
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript
     */
    currentScript: HTMLScriptElement | null;
  }
}

/**
 * Stack trace regex pattern
 * 
 * Matches patterns like: "at functionName (http://example.com/script.js:10:5)"
 * Captures the script URL from the stack trace
 */
type StackTracePattern = RegExp;

/**
 * Script matching strategy
 */
interface ScriptMatchStrategy {
  /** Match by comparing script src URL */
  bySource: (scriptUrl: string, script: HTMLScriptElement) => boolean;
  
  /** Match by checking readyState (IE fallback) */
  byReadyState: (script: HTMLScriptElement) => boolean;
}

export {};