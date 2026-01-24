/**
 * Options for deterministic JSON stringification
 */
export interface StringifyOptions {
  /**
   * Custom comparison function for sorting object keys
   * Can be a function that compares two key-value pairs, or boolean to enable default sorting
   */
  cmp?: ((a: KeyValuePair, b: KeyValuePair) => number) | boolean;
  
  /**
   * Whether to handle circular references by replacing them with "__cycle__" string
   * If false, throws TypeError when circular reference is detected
   * @default false
   */
  cycles?: boolean;
}

/**
 * Represents a key-value pair used in comparison functions
 */
export interface KeyValuePair {
  /** The property key */
  key: string;
  /** The property value */
  value: unknown;
}

/**
 * Deterministically stringify a JavaScript object to JSON
 * Ensures consistent output by sorting object keys
 * 
 * @param data - The value to stringify
 * @param options - Configuration options
 * @returns JSON string representation
 * @throws {TypeError} When circular reference is detected and cycles option is false
 * 
 * @example
 *