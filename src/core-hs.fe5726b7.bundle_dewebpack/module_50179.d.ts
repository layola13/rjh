/**
 * Object.create polyfill implementation
 * Provides a cross-browser compatible implementation of Object.create for legacy environments
 * @module ObjectCreatePolyfill
 */

/**
 * Validates that the prototype is an object
 */
declare function anObject(prototype: any): object;

/**
 * Defines properties on an object
 */
declare namespace definePropertiesModule {
  function f(target: object, properties: PropertyDescriptorMap): object;
}

/**
 * List of reserved property names that should be excluded from prototype
 */
declare const enumBugKeys: string[];

/**
 * Internal marker to prevent prototype pollution
 */
declare const hiddenKeys: Record<string, boolean>;

/**
 * Shared key for storing internal prototype reference
 */
declare const IE_PROTO: string;

/**
 * HTML container element for iframe-based object creation
 */
declare const documentElement: HTMLElement;

/**
 * Creates a DOM element
 */
declare function createElement(tagName: string): HTMLElement;

/**
 * Utility to get shared key for internal use
 */
declare function getSharedKey(key: string): string;

/**
 * Empty constructor function used for prototype chain manipulation
 */
declare class EmptyConstructor {}

/**
 * Generates script tag wrapper for code execution in isolated context
 * @param content - JavaScript code to wrap
 * @returns HTML string with script tags
 */
declare function wrapInScriptTag(content: string): string;

/**
 * Creates a clean Object constructor using iframe document context
 * @param iframeDocument - Document object from iframe
 * @returns Clean Object constructor without prototype pollution
 */
declare function createObjectFromIframe(iframeDocument: Document): ObjectConstructor;

/**
 * Creates a clean, empty object without inherited properties
 * Uses different strategies depending on browser capabilities:
 * - ActiveXObject for older IE versions
 * - Iframe-based isolation for modern browsers with document.domain restrictions
 * - Direct iframe access for standard environments
 * @returns Empty object with null prototype
 */
declare function createEmptyObject(): object;

/**
 * Polyfill for Object.create
 * Creates a new object with the specified prototype and optional property descriptors
 * 
 * @param prototype - The object to use as prototype, or null for no prototype
 * @param properties - Optional property descriptors to define on the new object
 * @returns Newly created object with specified prototype and properties
 * 
 * @example
 *