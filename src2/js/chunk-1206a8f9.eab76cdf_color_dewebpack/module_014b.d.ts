/**
 * Symbol Polyfill Module
 * Provides ES6 Symbol implementation for environments that don't support it natively
 * Module ID: 014b
 */

/**
 * Property descriptor with additional Symbol-specific flags
 */
interface SymbolPropertyDescriptor extends PropertyDescriptor {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: any;
  get?(): any;
  set?(v: any): void;
}

/**
 * Symbol registry for global symbols
 */
interface SymbolRegistry {
  [key: string]: symbol;
}

/**
 * Internal symbol storage
 */
interface SymbolStore {
  [key: string]: symbol;
}

/**
 * Hidden property tracking object
 */
interface HiddenProperties {
  [key: string]: boolean;
}

/**
 * Creates a new Symbol with internal key
 * @param key - The internal key for the symbol
 * @returns A new Symbol instance
 */
declare function createSymbol(key: string): symbol;

/**
 * Defines multiple properties with Symbol support
 * @param target - The target object
 * @param properties - Properties to define
 * @returns The modified target object
 */
declare function defineProperties(
  target: object,
  properties: PropertyDescriptorMap
): object;

/**
 * Checks if a property is enumerable (Symbol-aware)
 * @param propertyKey - The property key to check
 * @returns True if the property is enumerable
 */
declare function propertyIsEnumerable(propertyKey: PropertyKey): boolean;

/**
 * Gets own property descriptor with Symbol support
 * @param target - The target object
 * @param propertyKey - The property key
 * @returns Property descriptor or undefined
 */
declare function getOwnPropertyDescriptor(
  target: object,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined;

/**
 * Defines a property with Symbol support
 * @param target - The target object
 * @param propertyKey - The property key (can be Symbol)
 * @param attributes - Property descriptor
 * @returns The modified target object
 */
declare function defineProperty(
  target: object,
  propertyKey: PropertyKey,
  attributes: PropertyDescriptor
): object;

/**
 * Gets all own property names excluding Symbols
 * @param target - The target object
 * @returns Array of property names
 */
declare function getOwnPropertyNames(target: object): string[];

/**
 * Gets all own Symbol properties
 * @param target - The target object
 * @returns Array of Symbol properties
 */
declare function getOwnPropertySymbols(target: object): symbol[];

/**
 * Checks if a value is a Symbol
 * @param value - Value to check
 * @returns True if value is a Symbol
 */
declare function isSymbol(value: any): value is symbol;

/**
 * Extended Symbol constructor with polyfill capabilities
 */
interface SymbolConstructor {
  /**
   * Creates a new unique Symbol
   * @param description - Optional description for the symbol
   * @returns A new unique Symbol
   */
  (description?: string | number): symbol;

  /**
   * Returns a Symbol from the global symbol registry
   * @param key - The key to search for in the registry
   * @returns The Symbol associated with the key
   */
  for(key: string): symbol;

  /**
   * Returns the key for a global Symbol
   * @param symbol - The Symbol to look up
   * @returns The key string or undefined
   */
  keyFor(symbol: symbol): string | undefined;

  /**
   * Enables setter-based property hiding
   */
  useSetter(): void;

  /**
   * Disables setter-based property hiding
   */
  useSimple(): void;

  /** Well-known Symbol: instanceof operator */
  readonly hasInstance: symbol;
  
  /** Well-known Symbol: Array.prototype.concat behavior */
  readonly isConcatSpreadable: symbol;
  
  /** Well-known Symbol: iteration protocol */
  readonly iterator: symbol;
  
  /** Well-known Symbol: String.prototype.match */
  readonly match: symbol;
  
  /** Well-known Symbol: String.prototype.replace */
  readonly replace: symbol;
  
  /** Well-known Symbol: String.prototype.search */
  readonly search: symbol;
  
  /** Well-known Symbol: species pattern */
  readonly species: symbol;
  
  /** Well-known Symbol: String.prototype.split */
  readonly split: symbol;
  
  /** Well-known Symbol: type conversion hint */
  readonly toPrimitive: symbol;
  
  /** Well-known Symbol: Object.prototype.toString */
  readonly toStringTag: symbol;
  
  /** Well-known Symbol: with statement binding */
  readonly unscopables: symbol;

  readonly prototype: Symbol;
}

/**
 * Extended Symbol prototype
 */
interface Symbol {
  /** Internal symbol key */
  readonly _k: string;
  
  /**
   * Returns the string representation of the Symbol
   * @returns String representation
   */
  toString(): string;
  
  /**
   * Returns the primitive value of the Symbol
   * @returns The symbol itself
   */
  valueOf(): symbol;
}

/**
 * Extended Object constructor with Symbol-aware methods
 */
interface ObjectConstructor {
  /**
   * Creates an object with Symbol-aware property definitions
   * @param prototype - The prototype object
   * @param properties - Optional property descriptors
   * @returns New object
   */
  create(prototype: object | null, properties?: PropertyDescriptorMap): any;

  /**
   * Gets own property symbols from an object
   * @param obj - The target object
   * @returns Array of symbols
   */
  getOwnPropertySymbols(obj: any): symbol[];
}

/**
 * Extended JSON with Symbol-aware stringify
 */
interface JSON {
  /**
   * Converts value to JSON string with Symbol filtering
   * @param value - Value to stringify
   * @param replacer - Optional replacer function or array
   * @param space - Optional spacing
   * @returns JSON string
   */
  stringify(
    value: any,
    replacer?: ((key: string, value: any) => any) | Array<string | number> | null,
    space?: string | number
  ): string;
}

/**
 * Global Symbol constructor
 */
declare const Symbol: SymbolConstructor;

/**
 * Module exports
 */
declare module "module_014b" {
  export { Symbol, SymbolConstructor, isSymbol };
  export { defineProperty, defineProperties, getOwnPropertyDescriptor };
  export { getOwnPropertyNames, getOwnPropertySymbols };
}