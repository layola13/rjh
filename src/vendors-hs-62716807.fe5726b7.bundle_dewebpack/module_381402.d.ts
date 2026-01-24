/**
 * Feature detection module for Object.defineProperty support
 * 
 * Tests whether the JavaScript environment supports ES5's Object.defineProperty
 * with full property descriptor capabilities (value, writable, enumerable, configurable).
 * 
 * @module PropertyDescriptorSupport
 */

/**
 * Indicates whether Object.defineProperty is fully supported in the current environment.
 * 
 * This performs a runtime check by attempting to define a property with a descriptor.
 * Falls back to `false` if:
 * - Object.defineProperty is not available
 * - The method throws an exception (e.g., in legacy browsers or restricted environments)
 * 
 * @returns {boolean | PropertyDescriptor} Returns Object.defineProperty function if supported, false otherwise
 */
declare const isPropertyDescriptorSupported: typeof Object.defineProperty | false;

export = isPropertyDescriptorSupported;