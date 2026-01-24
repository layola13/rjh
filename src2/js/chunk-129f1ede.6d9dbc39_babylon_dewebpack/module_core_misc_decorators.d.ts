/**
 * Core decorators module providing TypeScript decorator utilities
 * @module core/Misc/decorators
 */

/**
 * Property decorator options
 */
export interface DecoratorOptions {
  /** Whether the decorator should be enumerable */
  enumerable?: boolean;
  /** Whether the decorator should be configurable */
  configurable?: boolean;
  /** Whether the decorator should be writable */
  writable?: boolean;
}

/**
 * Class decorator type
 */
export type ClassDecorator<T extends new (...args: any[]) => any> = (target: T) => T | void;

/**
 * Method decorator type
 */
export type MethodDecorator<T = any> = (
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

/**
 * Property decorator type
 */
export type PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => void;

/**
 * Parameter decorator type
 */
export type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol | undefined,
  parameterIndex: number
) => void;