import { useCallback } from 'react';

interface NodeData {
  disabled?: boolean;
  disableCheckbox?: boolean;
}

interface TreeNode {
  data: NodeData;
}

type ActionType = 'select' | 'checkbox';

type GetNodeFunction = (
  key: string,
  action?: ActionType,
  force?: boolean
) => TreeNode | null;

export function isDisabled(node: TreeNode | undefined, action: ActionType): boolean {
  if (!node) {
    return true;
  }

  const { disabled, disableCheckbox } = node.data;

  switch (action) {
    case 'select':
      return !!disabled;
    case 'checkbox':
      return !!disabled || !!disableCheckbox;
  }

  return false;
}

export default function useGetNode(
  firstMap: Map<string, TreeNode>,
  secondMap: Map<string, TreeNode>
): [GetNodeFunction, GetNodeFunction] {
  const getFromFirstMap = useCallback(
    (key: string, action: ActionType = 'select', force?: boolean): TreeNode | null => {
      const node = firstMap.get(key);
      return !force && isDisabled(node, action) ? null : node ?? null;
    },
    [firstMap]
  );

  const getFromSecondMap = useCallback(
    (key: string, action: ActionType = 'select', force?: boolean): TreeNode | null => {
      const node = secondMap.get(key);
      return !force && isDisabled(node, action) ? null : node ?? null;
    },
    [secondMap]
  );

  return [getFromFirstMap, getFromSecondMap];
}