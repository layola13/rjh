export enum RangeState {
  None = 0,
  Start = 1,
  End = 2
}

export interface TreeNode {
  key: string;
  children?: TreeNode[];
  [key: string]: unknown;
}

export interface CalcRangeKeysOptions {
  treeData: TreeNode[];
  expandedKeys: string[];
  startKey?: string;
  endKey?: string;
}

/**
 * Calculate keys within a range defined by start and end keys in a tree structure
 */
export function calcRangeKeys(options: CalcRangeKeysOptions): string[] {
  const { treeData, expandedKeys, startKey, endKey } = options;
  const resultKeys: string[] = [];
  let state = RangeState.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }

  if (!startKey || !endKey) {
    return [];
  }

  const isRangeBoundary = (key: string): boolean => {
    return key === startKey || key === endKey;
  };

  traverseTree(treeData, (key: string): boolean => {
    if (state === RangeState.End) {
      return false;
    }

    if (isRangeBoundary(key)) {
      resultKeys.push(key);
      if (state === RangeState.None) {
        state = RangeState.Start;
      } else if (state === RangeState.Start) {
        state = RangeState.End;
        return false;
      }
    } else if (state === RangeState.Start) {
      resultKeys.push(key);
    }

    return expandedKeys.indexOf(key) !== -1;
  });

  return resultKeys;
}

/**
 * Convert directory keys to their corresponding tree nodes
 */
export function convertDirectoryKeysToNodes(
  treeData: TreeNode[],
  keys: string[]
): TreeNode[] {
  const remainingKeys = [...keys];
  const matchedNodes: TreeNode[] = [];

  traverseTree(treeData, (key: string, node: TreeNode): boolean => {
    const keyIndex = remainingKeys.indexOf(key);

    if (keyIndex !== -1) {
      matchedNodes.push(node);
      remainingKeys.splice(keyIndex, 1);
    }

    return remainingKeys.length > 0;
  });

  return matchedNodes;
}

/**
 * Traverse tree structure with a callback function
 */
function traverseTree(
  nodes: TreeNode[],
  callback: (key: string, node: TreeNode) => boolean
): void {
  nodes.forEach((node) => {
    const { key, children } = node;
    const shouldContinue = callback(key, node);

    if (shouldContinue !== false) {
      traverseTree(children || [], callback);
    }
  });
}