/**
 * DOMTokenList Prototype Polyfill Module
 * 
 * This module attempts to retrieve the DOMTokenList prototype by creating
 * a temporary span element and accessing its classList property.
 * Falls back to undefined if the prototype matches Object.prototype.
 * 
 * @module DOMTokenListPrototype
 */

/**
 * The DOMTokenList prototype, or undefined if not available or matches Object.prototype
 * 
 * @remarks
 * This is used to polyfill or extend DOMTokenList functionality across different environments.
 * The module creates a temporary DOM element to access the classList constructor prototype.
 * If the prototype is the same as Object.prototype, it returns undefined to avoid conflicts.
 * 
 * @returns The DOMTokenList prototype or undefined
 */
declare const domTokenListPrototype: DOMTokenList | undefined;

export default domTokenListPrototype;

/**
 * Type definition for the internal implementation
 * @internal
 */
export type DOMTokenListPrototypeResult = DOMTokenList | undefined;

/**
 * Configuration interface for DOM element creation
 * @internal
 */
interface DOMElementFactory {
  /**
   * Creates a DOM element with the specified tag name
   * @param tagName - The HTML tag name to create
   * @returns The created HTMLElement
   */
  (tagName: string): HTMLElement;
}