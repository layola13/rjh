/**
 * RegExp.prototype.dotAll polyfill module
 * 
 * Adds the 'dotAll' accessor property to RegExp.prototype for environments
 * that don't natively support the 's' flag (ES2018 feature).
 */

/**
 * Internal RegExp state storage interface
 */
interface RegExpInternalState {
  /** Whether the RegExp was created with the 's' (dotAll) flag */
  dotAll: boolean;
}

/**
 * Gets the internal state of a RegExp instance
 */
declare function getRegExpInternalState(regexp: RegExp): RegExpInternalState;

/**
 * Checks if descriptors are supported in the current environment
 */
declare const DESCRIPTORS_SUPPORTED: boolean;

/**
 * Checks if the environment is native (not shimmed)
 */
declare const IS_NATIVE_ENVIRONMENT: boolean;

/**
 * Gets the internal class name of an object
 */
declare function getObjectClassName(value: unknown): string;

/**
 * Defines or redefines a property on an object
 */
declare function defineProperty<T extends object>(
  target: T,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor
): void;

/**
 * Configuration for the dotAll getter accessor
 */
interface DotAllAccessorDescriptor extends PropertyDescriptor {
  /** Property is configurable */
  configurable: true;
  /** Getter function that returns the dotAll flag state */
  get(this: RegExp): boolean;
}

/**
 * Initializes the RegExp.prototype.dotAll polyfill
 * 
 * This module conditionally adds a 'dotAll' getter to RegExp.prototype
 * that returns whether the RegExp was created with the 's' flag.
 * 
 * @throws {TypeError} When called on an incompatible receiver (non-RegExp)
 */
declare function initializeDotAllPolyfill(): void;

export {};