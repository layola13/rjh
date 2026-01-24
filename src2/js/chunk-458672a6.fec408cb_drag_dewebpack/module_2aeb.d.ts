/**
 * Creates a new object with the specified prototype object and properties.
 * This is a polyfill implementation of Object.create for environments that don't support it natively.
 * 
 * @param prototype - The object which should be the prototype of the newly-created object, or null.
 * @param propertiesObject - Optional. If specified and not undefined, an object whose enumerable own properties 
 *                           specify property descriptors to be added to the newly-created object.
 * @returns A new object with the specified prototype object and properties.
 * 
 * @remarks
 * This module provides a polyfill for Object.create with special handling for:
 * - IE_PROTO for Internet Explorer compatibility
 * - iframe-based object creation as fallback
 * - Property descriptor support
 */
declare function objectCreatePolyfill(
  prototype: object | null,
  propertiesObject?: PropertyDescriptorMap
): any;

export = objectCreatePolyfill;