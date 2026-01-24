/**
 * JSON Patch operation types
 */
type PatchOperation = 'add' | 'remove' | 'replace';

/**
 * JSON Patch document structure
 */
interface PatchDocument {
  /** Operation type */
  op: PatchOperation;
  /** JSON Pointer path to the target location */
  path: JSONPointer;
  /** Value for add/replace operations */
  value?: unknown;
}

/**
 * JSON Pointer path (array of keys/indices)
 */
type JSONPointer = Array<string | number>;

/**
 * State node types for different data structures
 */
enum StateType {
  Object = 0,
  Array = 1,
  Map = 2,
  ObjectWithPatches = 4,
  ArrayWithPatches = 5,
}

/**
 * State node representing a draft object
 */
interface StateNode {
  /** State type indicator */
  t: StateType;
  /** Base (original) value */
  u: unknown;
  /** Copy (modified) value */
  i: unknown;
  /** Change tracking map */
  N: Map<string | number, boolean>;
}

/**
 * Gets a property value from an object by key
 */
declare function u(obj: unknown, key: string | number): unknown;

/**
 * Checks if a property exists in an object
 */
declare function s(obj: unknown, key: string | number): boolean;

/**
 * Iterates over a map/object keys
 */
declare function g(map: Map<string | number, boolean>, callback: (key: string | number, value: boolean) => void): void;

/**
 * Deep clones a value for patch generation
 */
declare function t(value: unknown): unknown;

/**
 * Default patch operation (typically 'add')
 */
declare const e: 'add';

/**
 * Generates JSON Patch documents (forward and reverse) from a state node
 * 
 * @param state - The state node containing base and modified values
 * @param basePath - Current JSON Pointer path
 * @param patches - Accumulator for forward patches
 * @param inversePatches - Accumulator for reverse patches
 */
function generatePatches(
  state: StateNode,
  basePath: JSONPointer,
  patches: PatchDocument[],
  inversePatches: PatchDocument[]
): void {
  switch (state.t) {
    // Object or Object-like structures
    case StateType.Object:
    case StateType.ObjectWithPatches:
    case StateType.Map:
      generateObjectPatches(state, basePath, patches, inversePatches);
      break;

    // Array structures
    case StateType.ArrayWithPatches:
    case StateType.Array:
      generateArrayPatches(state, basePath, patches, inversePatches);
      break;

    // Set structure
    case 3:
      generateSetPatches(state, basePath, patches, inversePatches);
      break;
  }
}

/**
 * Generates patches for object/map changes
 */
function generateObjectPatches(
  state: StateNode,
  basePath: JSONPointer,
  patches: PatchDocument[],
  inversePatches: PatchDocument[]
): void {
  const baseValue = state.u as Record<string | number, unknown>;
  const copyValue = state.i as Record<string | number, unknown>;

  g(state.N, (key: string | number, wasChanged: boolean): void => {
    const basePropertyValue = u(baseValue, key);
    const copyPropertyValue = u(copyValue, key);
    const propertyExists = wasChanged ? s(baseValue, key) : false;
    const operation: PatchOperation = propertyExists ? 'replace' : e;

    if (basePropertyValue !== copyPropertyValue || operation !== 'replace') {
      const propertyPath = basePath.concat(key);

      // Forward patch
      patches.push(
        operation === 'remove'
          ? { op: operation, path: propertyPath }
          : { op: operation, path: propertyPath, value: copyPropertyValue }
      );

      // Inverse patch
      inversePatches.push(
        operation === e
          ? { op: 'remove', path: propertyPath }
          : operation === 'remove'
          ? { op: e, path: propertyPath, value: t(basePropertyValue) }
          : { op: 'replace', path: propertyPath, value: t(basePropertyValue) }
      );
    }
  });
}

/**
 * Generates patches for array changes
 */
function generateArrayPatches(
  state: StateNode,
  basePath: JSONPointer,
  patches: PatchDocument[],
  inversePatches: PatchDocument[]
): void {
  let baseArray = state.u as unknown[];
  const changeTracking = state.N as Map<number, boolean>;
  let copyArray = state.i as unknown[];

  // Swap if copy is shorter (optimization)
  if (copyArray.length < baseArray.length) {
    [baseArray, copyArray] = [copyArray, baseArray];
    [patches, inversePatches] = [inversePatches, patches];
  }

  // Handle modifications in common range
  for (let index = 0; index < baseArray.length; index++) {
    if (changeTracking[index] && copyArray[index] !== baseArray[index]) {
      const itemPath = basePath.concat([index]);
      patches.push({ op: 'replace', path: itemPath, value: t(copyArray[index]) });
      inversePatches.push({ op: 'replace', path: itemPath, value: t(baseArray[index]) });
    }
  }

  // Handle additions
  for (let index = baseArray.length; index < copyArray.length; index++) {
    const itemPath = basePath.concat([index]);
    patches.push({ op: e, path: itemPath, value: t(copyArray[index]) });
  }

  // Handle length change for inverse
  if (baseArray.length < copyArray.length) {
    inversePatches.push({
      op: 'replace',
      path: basePath.concat(['length']),
      value: baseArray.length,
    });
  }
}

/**
 * Generates patches for Set changes
 */
function generateSetPatches(
  state: StateNode,
  basePath: JSONPointer,
  patches: PatchDocument[],
  inversePatches: PatchDocument[]
): void {
  const baseSet = state.u as Set<unknown>;
  const copySet = state.i as Set<unknown>;
  let currentIndex = 0;

  // Handle deletions
  baseSet.forEach((item: unknown): void => {
    if (!copySet.has(item)) {
      const itemPath = basePath.concat([currentIndex]);
      patches.push({ op: 'remove', path: itemPath, value: item });
      inversePatches.unshift({ op: e, path: itemPath, value: item });
    }
    currentIndex++;
  });

  // Handle additions
  currentIndex = 0;
  copySet.forEach((item: unknown): void => {
    if (!baseSet.has(item)) {
      const itemPath = basePath.concat([currentIndex]);
      patches.push({ op: e, path: itemPath, value: item });
      inversePatches.unshift({ op: 'remove', path: itemPath, value: item });
    }
    currentIndex++;
  });
}