/**
 * JSON Patch operation interface following RFC 6902 specification
 */
interface PatchOperation {
  /** The operation type to perform */
  op: 'replace' | 'add' | 'remove' | 'move' | 'copy' | 'test';
  /** JSON Pointer path to the target location */
  path: (string | number)[];
  /** The value to set (for replace, add operations) */
  value?: unknown;
}

/**
 * Module: module_M
 * Original ID: M
 * 
 * Pushes replace operations to two separate patch arrays.
 * Compares the second parameter against a global/constant value W.
 * 
 * @param currentValue - The current value to be set in the second patch
 * @param previousValue - The previous value to be conditionally set in the first patch (undefined if equals W)
 * @param firstPatchArray - Array to receive the first patch operation
 * @param secondPatchArray - Array to receive the second patch operation
 */
declare function moduleM<T = unknown, U = unknown>(
  currentValue: T,
  previousValue: U,
  firstPatchArray: PatchOperation[],
  secondPatchArray: PatchOperation[]
): void;

/**
 * Global constant or reference value used for comparison
 * The exact nature of W depends on the application context
 */
declare const W: unknown;

export { moduleM, PatchOperation, W };