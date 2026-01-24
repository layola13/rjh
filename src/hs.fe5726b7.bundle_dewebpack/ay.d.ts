/**
 * Merged type definitions module
 * Combines multiple type definition modules into a single frozen object
 */

/**
 * Helper type to deeply merge multiple object types
 */
type DeepMerge<T extends readonly unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends object
    ? Rest extends readonly unknown[]
      ? First & DeepMerge<Rest>
      : First
    : DeepMerge<Rest>
  : {};

/**
 * Combined type definitions from all imported modules
 * This type represents the union of all type definitions from:
 * - Module 797560
 * - Module 962391
 * - Module 147323
 * - Module 668540
 * - Module 160282
 * - Module 513046
 * - Module 692382
 * - Module 345615
 * - Module 228130
 * - Module 215144
 * - Module 999536
 * - Module 487459
 * - Module 386875
 * - ExtraordinarySketch2dTypes (Module 348859)
 * - Module 433842
 * - Module 431353
 * - OutdoorRequestTypes (Module 853002)
 */
export type MergedTypeDefinitions = DeepMerge<[
  import('./module-797560').default,
  import('./module-962391').default,
  import('./module-147323').default,
  import('./module-668540').default,
  import('./module-160282').default,
  import('./module-513046').default,
  import('./module-692382').default,
  import('./module-345615').default,
  import('./module-228130').default,
  import('./module-215144').default,
  import('./module-999536').default,
  import('./module-487459').default,
  import('./module-386875').default,
  import('./module-348859').ExtraordinarySketch2dTypes,
  import('./module-433842').default,
  import('./module-431353').default,
  import('./module-853002').OutdoorRequestTypes
]>;

/**
 * Frozen, read-only merged type definitions
 * All properties are deeply readonly to prevent modifications
 */
export type FrozenMergedTypes = Readonly<MergedTypeDefinitions>;

/**
 * Main export: Immutable merged type definitions object
 * This object is frozen at runtime to prevent any modifications
 */
export declare const Ay: FrozenMergedTypes;

export default Ay;