/**
 * Object property descriptor utilities
 * Provides a cross-environment implementation of Object.getOwnPropertyDescriptor
 */

import type { PropertyKey } from './types';

/**
 * Property descriptor object as defined by ECMAScript specification
 */
export interface PropertyDescriptor {
  /** The value associated with the property (data descriptors only) */
  value?: unknown;
  /** true if the value associated with the property may be changed (data descriptors only) */
  writable?: boolean;
  /** The function which serves as a getter for the property (accessor descriptors only) */
  get?: () => unknown;
  /** The function which serves as a setter for the property (accessor descriptors only) */
  set?: (value: unknown) => void;
  /** true if the type of this property descriptor may be changed and if the property may be deleted */
  configurable?: boolean;
  /** true if this property shows up during enumeration of the properties */
  enumerable?: boolean;
}

/**
 * Gets the property descriptor for an own property of an object
 * Falls back to a polyfill implementation in older environments
 * 
 * @param target - The object that contains the property
 * @param propertyKey - The property name or symbol
 * @returns The property descriptor, or undefined if the property doesn't exist
 */
export function getOwnPropertyDescriptor(
  target: object,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Property descriptor getter function
 * Exported as 'f' property for compatibility
 */
export const f: typeof getOwnPropertyDescriptor;