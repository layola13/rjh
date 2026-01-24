/**
 * TypeScript helper utilities module
 * Provides runtime support for TypeScript compiled features
 */

/**
 * Establishes inheritance between constructor functions (legacy class extension helper)
 * @param derived - The derived class constructor
 * @param base - The base class constructor
 * @deprecated Use native ES6 class extends syntax instead
 */
export function __extends(derived: Function, base: Function): void;

/**
 * Performs a shallow merge of properties from source objects into target object
 * @param target - The target object to merge into
 * @param sources - Source objects to merge from
 * @returns The merged target object
 * @deprecated Use native Object.assign or spread syntax {...obj} instead
 */
export function __assign<T, U>(target: T, ...sources: U[]): T & U;

/**
 * Creates a new object excluding specified properties (rest operation helper)
 * @param source - The source object
 * @param excludedKeys - Array of property keys to exclude
 * @returns New object without the excluded properties
 * @deprecated Use native destructuring rest syntax instead
 */
export function __rest<T extends object, K extends keyof T>(
  source: T,
  excludedKeys: K[]
): Omit<T, K>;

/**
 * Wraps async functions to return Promises (async/await helper)
 * @param thisArg - The 'this' context
 * @param _arguments - Function arguments
 * @param P - Promise constructor
 * @param generator - Generator function for async state machine
 * @returns Promise resolving to the async function result
 * @deprecated Use native async/await syntax instead
 */
export function __awaiter<T = unknown>(
  thisArg: unknown,
  _arguments: unknown,
  P: PromiseConstructor | undefined,
  generator: () => Generator<unknown, T, unknown>
): Promise<T>;

/**
 * Creates iterator state machine for generator functions
 * @param thisArg - The 'this' context
 * @param body - Generator body function
 * @returns Iterator object with next, throw, and return methods
 * @deprecated Use native generator functions (function*) instead
 */
export function __generator(
  thisArg: unknown,
  body: (state: GeneratorState) => IteratorResult<unknown>
): Generator<unknown, unknown, unknown>;

/**
 * Internal generator state interface
 */
interface GeneratorState {
  /** Current execution label/step */
  label: number;
  /** Returns the sent value, throws if error flag is set */
  sent(): unknown;
  /** Try-catch block stack */
  trys: Array<[number, number?, number?, number?]>;
  /** Operation stack */
  ops: Array<[number, unknown?]>;
}

/**
 * Concatenates multiple arrays into a single array (spread helper)
 * @param arrays - Arrays to concatenate
 * @returns New array containing all elements from input arrays
 * @deprecated Use native spread syntax [...arr1, ...arr2] instead
 */
export function __spreadArrays<T>(...arrays: T[][]): T[];

// Legacy exports (aliases)
export { __extends as d };
export { __assign as a };
export { __rest as e };
export { __awaiter as b };
export { __generator as d };
export { __spreadArrays as f };