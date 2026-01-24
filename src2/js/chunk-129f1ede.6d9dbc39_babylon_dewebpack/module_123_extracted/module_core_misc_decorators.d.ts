/**
 * Core decorators module for Babylon.js
 * Provides utility decorators for class and method enhancement
 * 
 * @module core/Misc/decorators
 */

/**
 * Decorator function type that can be applied to class members
 */
export type DecoratorFunction = (
  target: any,
  propertyKey: string | symbol,
  descriptor?: PropertyDescriptor
) => PropertyDescriptor | void;

/**
 * Decorator function type that can be applied to classes
 */
export type ClassDecoratorFunction = <T extends new (...args: any[]) => any>(
  constructor: T
) => T | void;

/**
 * Decorator function type that can be applied to parameters
 */
export type ParameterDecoratorFunction = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;

/**
 * Serializable decorator - marks a property as serializable
 */
export function serialize(target: any, propertyKey: string): void;

/**
 * Serializable decorator with custom name
 */
export function serializeAs(name: string): DecoratorFunction;

/**
 * Expandable decorator - marks a property as expandable in inspector
 */
export function expandToProperty(propertyName: string): DecoratorFunction;

/**
 * Performance monitoring decorator
 */
export function performanceMonitor(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;

declare const decorators: {
  serialize: typeof serialize;
  serializeAs: typeof serializeAs;
  expandToProperty: typeof expandToProperty;
  performanceMonitor: typeof performanceMonitor;
};

export default decorators;