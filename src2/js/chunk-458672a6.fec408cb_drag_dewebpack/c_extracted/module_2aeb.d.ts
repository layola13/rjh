/**
 * Object.create polyfill for legacy environments
 * Creates a new object with the specified prototype object and properties
 * 
 * Module: module_2aeb
 * Original ID: 2aeb
 * Dependencies: cb7c, 1495, e11e, 613b, 230e, fab2
 */

import { anObject } from './cb7c';
import { defineProperties } from './1495';
import { HTML_ELEMENT_TAGS } from './e11e';
import { sharedKey } from './613b';
import { createElement } from './230e';
import { documentElement } from './fab2';

/**
 * Property descriptor map for Object.defineProperties
 */
interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

/**
 * Empty constructor function used for prototype inheritance
 */
declare function EmptyConstructor(): void;

/**
 * IE-specific prototype key for maintaining prototype chain
 */
const IE_PROTO: string = sharedKey('IE_PROTO');

/**
 * Prototype property name constant
 */
const PROTOTYPE: 'prototype' = 'prototype';

/**
 * Creates an empty object using iframe technique for IE compatibility
 * This workaround ensures proper prototype chain in legacy IE browsers
 * 
 * @returns A clean Object constructor from isolated iframe context
 */
declare function createIframeObject(): ObjectConstructor;

/**
 * Polyfill for Object.create
 * Creates a new object with the specified prototype object and optional property descriptors
 * 
 * @template T - The type of the prototype object
 * @param proto - The object which should be the prototype of the newly-created object, or null
 * @param propertiesObject - Optional object containing property descriptors to be added to the new object
 * @returns A new object with the specified prototype and properties
 * 
 * @example
 * const parent = { x: 1 };
 * const child = objectCreate(parent, {
 *   y: { value: 2, writable: true, enumerable: true, configurable: true }
 * });
 */
export declare function objectCreate<T extends object | null>(
  proto: T,
  propertiesObject?: PropertyDescriptorMap
): T extends null ? any : T & object;

export default objectCreate;