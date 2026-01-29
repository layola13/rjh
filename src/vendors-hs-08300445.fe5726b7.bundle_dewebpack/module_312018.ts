export interface ExpandedKeysResult {
  add: boolean;
  key: string | null;
}

export interface TreeNode<T = unknown> {
  data: {
    key: string;
  } & T;
}

/**
 * Finds the key that was added or removed when comparing two arrays of expanded keys.
 * Returns an object indicating whether a key was added and which key changed.
 * 
 * @param previousKeys - The previous array of expanded keys
 * @param currentKeys - The current array of expanded keys
 * @returns Object containing whether a key was added and the key that changed
 */
export function findExpandedKeys(
  previousKeys: string[] = [],
  currentKeys: string[] = []
): ExpandedKeysResult {
  const previousLength = previousKeys.length;
  const currentLength = currentKeys.length;

  if (Math.abs(previousLength - currentLength) !== 1) {
    return {
      add: false,
      key: null
    };
  }

  function findDifferentKey(sourceKeys: string[], targetKeys: string[]): string | null {
    const sourceMap = new Map<string, boolean>();
    sourceKeys.forEach((key) => {
      sourceMap.set(key, true);
    });

    const differentKeys = targetKeys.filter((key) => {
      return !sourceMap.has(key);
    });

    return differentKeys.length === 1 ? differentKeys[0] : null;
  }

  if (previousLength < currentLength) {
    return {
      add: true,
      key: findDifferentKey(previousKeys, currentKeys)
    };
  }

  return {
    add: false,
    key: findDifferentKey(currentKeys, previousKeys)
  };
}

/**
 * Gets the range of tree nodes that were expanded between two tree states.
 * 
 * @param previousTree - The previous tree node array
 * @param currentTree - The current tree node array
 * @param targetKey - The key of the node that was expanded
 * @returns Array of tree nodes that fall within the expanded range
 */
export function getExpandRange<T = unknown>(
  previousTree: TreeNode<T>[],
  currentTree: TreeNode<T>[],
  targetKey: string
): TreeNode<T>[] {
  const targetIndex = previousTree.findIndex((node) => {
    return node.data.key === targetKey;
  });

  const nextNode = previousTree[targetIndex + 1];

  const currentTargetIndex = currentTree.findIndex((node) => {
    return node.data.key === targetKey;
  });

  if (nextNode) {
    const nextNodeIndex = currentTree.findIndex((node) => {
      return node.data.key === nextNode.data.key;
    });

    return currentTree.slice(currentTargetIndex + 1, nextNodeIndex);
  }

  return currentTree.slice(currentTargetIndex + 1);
}