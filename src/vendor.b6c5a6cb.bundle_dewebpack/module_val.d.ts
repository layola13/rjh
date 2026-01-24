/**
 * jQuery .val() method - Gets or sets the value of form elements
 * 
 * @module module_val
 * @description Handles getting and setting values for form elements like input, select, and textarea.
 * Supports both getter and setter modes with optional value transformation via callbacks.
 */

/**
 * Type definition for value hooks that provide custom get/set behavior for specific element types
 */
interface ValueHooks {
  /**
   * Custom getter for retrieving element values
   * @param element - The DOM element
   * @param name - The property name (typically "value")
   * @returns The retrieved value, or undefined if not handled
   */
  get?(element: HTMLElement, name: string): string | number | string[] | undefined;
  
  /**
   * Custom setter for setting element values
   * @param element - The DOM element
   * @param value - The value to set
   * @param name - The property name (typically "value")
   * @returns The result of the set operation, or undefined if not handled
   */
  set?(element: HTMLElement, value: string | number | string[], name: string): unknown;
}

/**
 * jQuery-like library instance interface
 */
interface JQueryLike {
  /**
   * Hooks for customizing value get/set behavior by element type or node name
   */
  valHooks: {
    [key: string]: ValueHooks;
  };
  
  /**
   * Checks if a value is a function
   */
  isFunction(value: unknown): value is Function;
  
  /**
   * Maps an array through a callback function
   */
  map<T, U>(array: T[], callback: (item: T) => U): U[];
}

/**
 * Value type that can be set on form elements
 */
type ElementValue = string | number | string[] | null;

/**
 * Callback function for dynamically computing values
 * @param index - The index of the current element in the collection
 * @param currentValue - The current value of the element
 * @returns The new value to set
 */
type ValueCallback = (index: number, currentValue: string) => ElementValue;

/**
 * Gets the value of the first element or sets values for all elements in the matched set
 * 
 * @param this - Collection of DOM elements
 * @param value - Optional value to set. Can be a static value or a callback function.
 *                If omitted, acts as a getter for the first element.
 * @returns When getting: the value of the first element (string/number/array) or undefined if no elements.
 *          When setting: the collection (for chaining).
 * 
 * @example
 * // Get value
 * const value = $('input').val();
 * 
 * @example
 * // Set static value
 * $('input').val('new value');
 * 
 * @example
 * // Set dynamic value with callback
 * $('input').val((index, currentValue) => currentValue.toUpperCase());
 */
declare function val(
  this: HTMLElement[],
  value?: ElementValue | ValueCallback
): string | number | string[] | undefined | HTMLElement[];

/**
 * Implementation signature with jQuery context
 */
declare function val(
  this: HTMLElement[],
  b: JQueryLike,
  value?: ElementValue | ValueCallback
): string | number | string[] | undefined | HTMLElement[];