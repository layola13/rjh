/**
 * Object property descriptor utility module
 * Provides a cross-environment implementation of Object.getOwnPropertyDescriptor
 * with fallback support for legacy environments
 */

/**
 * Property descriptor object interface matching ES specification
 */
interface PropertyDescriptor {
  /** Indicates if the property can be changed or deleted */
  configurable?: boolean;
  /** Indicates if the property shows up during enumeration */
  enumerable?: boolean;
  /** The value associated with the property (data descriptor) */
  value?: any;
  /** Indicates if the value can be changed (data descriptor) */
  writable?: boolean;
  /** Getter function for the property (accessor descriptor) */
  get?(): any;
  /** Setter function for the property (accessor descriptor) */
  set?(value: any): void;
}

/**
 * Module dependencies (imported from other modules)
 */
declare const propertyIsEnumerableModule: {
  f: (this: any) => boolean;
};

declare const createPropertyDescriptor: (
  enumerable: boolean,
  value: any
) => PropertyDescriptor;

declare const toIndexedObject: (value: any) => object;

declare const toPrimitive: (input: any, preferredType: boolean) => PropertyKey;

declare const hasOwnProperty: (
  object: object,
  property: PropertyKey
) => boolean;

declare const isIE8PropertyDescriptorBuggy: boolean;

declare const supportsDescriptors: boolean;

/**
 * Native Object.getOwnPropertyDescriptor reference
 */
declare const nativeGetOwnPropertyDescriptor:
  | typeof Object.getOwnPropertyDescriptor
  | undefined;

/**
 * Gets the property descriptor for an own property of an object
 * 
 * @param target - The object that contains the property
 * @param propertyKey - The name or Symbol of the property
 * @returns The property descriptor if it exists, undefined otherwise
 * 
 * @remarks
 * In modern environments, delegates to native Object.getOwnPropertyDescriptor.
 * In legacy environments (IE8), provides a fallback implementation that:
 * - Converts the target to an indexed object
 * - Normalizes the property key to a primitive value
 * - Attempts native descriptor retrieval with IE8 bug workaround
 * - Falls back to manual descriptor creation using propertyIsEnumerable
 */
export const f: (
  target: any,
  propertyKey: PropertyKey
) => PropertyDescriptor | undefined;

/**
 * Implementation:
 * 
 * If descriptors are fully supported:
 *   return nativeGetOwnPropertyDescriptor
 * 
 * Otherwise:
 *   function getOwnPropertyDescriptorFallback(target, propertyKey) {
 *     const indexedObject = toIndexedObject(target);
 *     const normalizedKey = toPrimitive(propertyKey, true);
 *     
 *     // IE8 DOM objects bug workaround
 *     if (isIE8PropertyDescriptorBuggy) {
 *       try {
 *         return nativeGetOwnPropertyDescriptor(indexedObject, normalizedKey);
 *       } catch (error) {
 *         // Fall through to manual implementation
 *       }
 *     }
 *     
 *     // Manual descriptor creation for own properties
 *     if (hasOwnProperty(indexedObject, normalizedKey)) {
 *       return createPropertyDescriptor(
 *         !propertyIsEnumerableModule.f.call(indexedObject, normalizedKey),
 *         indexedObject[normalizedKey]
 *       );
 *     }
 *     
 *     return undefined;
 *   }
 */