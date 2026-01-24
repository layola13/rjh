/**
 * Module: module_access
 * Original ID: access
 * 
 * Provides unified getter/setter access pattern for object properties.
 * 
 * @template T - Type of the property value
 * @param key - The property key to access
 * @param value - Optional value to set, or options for getter
 * @param options - Optional configuration when value is provided
 * @returns The retrieved or set value
 * 
 * @example
 * // Getter usage
 * const value = access('propertyName');
 * const valueWithOptions = access('propertyName', 'optionString');
 * 
 * // Setter usage
 * access('propertyName', newValue);
 * access('propertyName', newValue, options);
 */
declare function access<T = any>(key: string, value?: string): T | undefined;
declare function access<T = any>(key: string, value: T, options?: any): T;
declare function access<T = any>(key: string, value?: T | string, options?: any): T | string | undefined;

/**
 * Alternative interface definition for the access module
 */
interface AccessFunction {
  /**
   * Get a property value
   * @param key - Property key
   * @returns The property value
   */
  <T = any>(key: string): T | undefined;
  
  /**
   * Get a property value with options
   * @param key - Property key
   * @param options - String options for retrieval
   * @returns The property value
   */
  <T = any>(key: string, options: string): T | undefined;
  
  /**
   * Set a property value
   * @param key - Property key
   * @param value - Value to set
   * @returns The set value
   */
  <T = any>(key: string, value: T): T;
  
  /**
   * Set a property value with options
   * @param key - Property key
   * @param value - Value to set
   * @param options - Additional options
   * @returns The set value
   */
  <T = any>(key: string, value: T, options: any): T;
}

declare const moduleAccess: AccessFunction;

export default moduleAccess;
export { access, AccessFunction };