/**
 * Module reference utilities
 */
export interface ModuleRef<T = unknown> {
  current: T | null;
}

/**
 * Creates a mutable ref object
 * @param initialValue - The initial value for the ref
 * @returns A ref object with a current property
 */
export declare function ref<T>(initialValue: T): ModuleRef<T>;
export declare function ref<T = undefined>(): ModuleRef<T | undefined>;

/**
 * Click event handler type
 */
export type ClickHandler = (event: MouseEvent) => void;

/**
 * Registers a click event handler
 * @param element - The target element
 * @param handler - The click event handler function
 */
export declare function onClick(element: HTMLElement, handler: ClickHandler): void;

/**
 * Utility function n
 * @param value - Input value
 */
export declare function n(value: unknown): unknown;

/**
 * Utility function e
 * @param args - Arguments
 */
export declare function e(...args: unknown[]): unknown;

/**
 * Utility function s
 * @param input - Input parameter
 */
export declare function s(input: unknown): unknown;

/**
 * Utility function f
 * @param callback - Callback function
 */
export declare function f(callback: (...args: unknown[]) => unknown): unknown;

/**
 * Value container interface
 */
export interface ValueContainer<T = unknown> {
  value: T;
}

/**
 * Gets or sets a value
 * @param target - Target object
 * @param key - Property key
 */
export declare function value<T>(target: object, key: string | symbol): T;

/**
 * Gets a property value from an object
 * @param obj - Source object
 * @param path - Property path (supports dot notation)
 * @param defaultValue - Default value if property doesn't exist
 */
export declare function get<T = unknown>(
  obj: Record<string, unknown>,
  path: string | string[],
  defaultValue?: T
): T;