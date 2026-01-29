export interface FindExpandedKeysResult {
  add: boolean;
  key: string | null;
}

export interface TreeNode<T = unknown> {
  data: {
    key: string;
  } & T;
}

/**
 * Finds the key that was added or removed between two lists of expanded keys
 * @param prevKeys - Previous list of expanded keys
 * @param currentKeys - Current list of expanded keys
 * @returns Object containing whether a key was added and the key itself
 */
export function findExpandedKeys(
  prevKeys: string[] = [],
  currentKeys: string[] = []
): FindExpandedKeysResult {
  const prevLength = prevKeys.length;
  const currentLength = currentKeys.length;

  if (Math.abs(prevLength - currentLength) !== 1) {
    return {
      add: false,
      key: null
    };
  }

  function findDifferentKey(
    smallerList: string[],
    largerList: string[]
  ): string | null {
    const keySet = new Map<string, boolean>();
    smallerList.forEach((key) => {
      keySet.set(key, true);
    });

    const differences = largerList.filter((key) => !keySet.has(key));
    return differences.length === 1 ? differences[0] : null;
  }

  if (prevLength < currentLength) {
    return {
      add: true,
      key: findDifferentKey(prevKeys, currentKeys)
    };
  }

  return {
    add: false,
    key: findDifferentKey(currentKeys, prevKeys)
  };
}

/**
 * Gets the range of nodes between a target node and its next sibling
 * @param prevNodes - Previous list of tree nodes
 * @param currentNodes - Current list of tree nodes
 * @param targetKey - Key of the target node
 * @returns Array of nodes in the expanded range
 */
export function getExpandRange<T = unknown>(
  prevNodes: TreeNode<T>[],
  currentNodes: TreeNode<T>[],
  targetKey: string
): TreeNode<T>[] {
  const targetIndex = prevNodes.findIndex((node) => node.data.key === targetKey);
  const nextSibling = prevNodes[targetIndex + 1];
  const currentTargetIndex = currentNodes.findIndex(
    (node) => node.data.key === targetKey
  );

  if (nextSibling) {
    const nextSiblingIndex = currentNodes.findIndex(
      (node) => node.data.key === nextSibling.data.key
    );
    return currentNodes.slice(currentTargetIndex + 1, nextSiblingIndex);
  }

  return currentNodes.slice(currentTargetIndex + 1);
}