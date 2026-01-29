export interface TreeNode {
  key: string;
  pos: string;
  level: number;
  parent: TreeNode | null;
  children: TreeNode[];
  node: any;
  data: {
    key: string;
  };
  props: {
    eventKey: string;
  };
}

export interface CheckedKeysConfig {
  checked?: string[];
  halfChecked?: string[];
}

export interface CheckedKeysResult {
  checkedKeys: string[] | undefined;
  halfCheckedKeys: string[] | undefined;
}

export interface DropPosition {
  dropPosition: number;
  dropLevelOffset: number;
  dropTargetKey: string;
  dropTargetPos: string;
  dragOverNodeKey: string;
  dropContainerKey: string | null;
  dropAllowed: boolean;
}

export interface ConvertOptions {
  processProps?: (props: Record<string, any>) => Record<string, any>;
}

export function arrAdd<T>(array: T[], item: T): T[] {
  const result = array.slice();
  if (result.indexOf(item) === -1) {
    result.push(item);
  }
  return result;
}

export function arrDel<T>(array: T[], item: T): T[] {
  const result = array.slice();
  const index = result.indexOf(item);
  if (index >= 0) {
    result.splice(index, 1);
  }
  return result;
}

export function calcDropPosition(
  event: MouseEvent,
  targetNode: TreeNode,
  node: TreeNode,
  indent: number,
  dragOffset: { x?: number; y?: number } | null,
  allowDrop: (config: { dropNode: any; dropPosition: number }) => boolean,
  flattenedNodes: TreeNode[],
  nodeMap: Record<string, TreeNode>,
  expandedKeys: string[],
  direction: string
): DropPosition {
  const clientX = event.clientX;
  const clientY = event.clientY;
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const rectTop = rect.top;
  const rectHeight = rect.height;
  
  const directionMultiplier = direction === 'rtl' ? -1 : 1;
  const offsetX = dragOffset?.x || 0;
  const levelOffset = (directionMultiplier * (offsetX - clientX) - 12) / indent;
  
  let currentNode = nodeMap[node.props.eventKey];
  
  if (clientY < rectTop + rectHeight / 2) {
    const currentIndex = flattenedNodes.findIndex(item => item.data.key === currentNode.key);
    const previousIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
    const previousKey = flattenedNodes[previousIndex].data.key;
    currentNode = nodeMap[previousKey];
  }
  
  const currentKey = currentNode.key;
  const originalNode = currentNode;
  const dragOverNodeKey = currentNode.key;
  let dropPosition = 0;
  let calculatedLevelOffset = 0;
  
  if (!expandedKeys.includes(currentKey)) {
    for (let i = 0; i < levelOffset && isLastChild(currentNode); i += 1) {
      currentNode = currentNode.parent!;
      calculatedLevelOffset += 1;
    }
  }
  
  const dropNode = currentNode.node;
  let dropAllowed = true;
  
  if (
    isFirstChild(currentNode) &&
    currentNode.level === 0 &&
    clientY < rectTop + rectHeight / 2 &&
    allowDrop({ dropNode, dropPosition: -1 }) &&
    currentNode.key === node.props.eventKey
  ) {
    dropPosition = -1;
  } else if ((originalNode.children || []).length && expandedKeys.includes(dragOverNodeKey)) {
    if (allowDrop({ dropNode, dropPosition: 0 })) {
      dropPosition = 0;
    } else {
      dropAllowed = false;
    }
  } else if (calculatedLevelOffset === 0) {
    if (levelOffset > -1.5) {
      if (allowDrop({ dropNode, dropPosition: 1 })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    } else {
      if (allowDrop({ dropNode, dropPosition: 0 })) {
        dropPosition = 0;
      } else if (allowDrop({ dropNode, dropPosition: 1 })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    }
  } else {
    if (allowDrop({ dropNode, dropPosition: 1 })) {
      dropPosition = 1;
    } else {
      dropAllowed = false;
    }
  }
  
  return {
    dropPosition,
    dropLevelOffset: calculatedLevelOffset,
    dropTargetKey: currentNode.key,
    dropTargetPos: currentNode.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : (currentNode.parent?.key ?? null),
    dropAllowed
  };
}

export function calcSelectedKeys(
  keys: string[] | undefined,
  options: { multiple?: boolean }
): string[] | undefined {
  if (!keys) return;
  if (options.multiple) return keys.slice();
  if (keys.length) return [keys[0]];
  return keys;
}

export function conductExpandParent(
  keys: string[] | undefined,
  nodeMap: Record<string, TreeNode>
): string[] {
  const expandedKeySet = new Set<string>();
  
  function addParentKey(key: string): void {
    if (!expandedKeySet.has(key)) {
      const node = nodeMap[key];
      if (node) {
        expandedKeySet.add(key);
        const parent = node.parent;
        if (!node.node.disabled && parent) {
          addParentKey(parent.key);
        }
      }
    }
  }
  
  (keys || []).forEach(key => {
    addParentKey(key);
  });
  
  return Array.from(expandedKeySet);
}

const defaultProcessProps = (props: Record<string, any>): Record<string, any> => props;

export function convertDataToTree(
  data: any,
  options?: ConvertOptions
): any[] {
  if (!data) return [];
  
  const processProps = options?.processProps ?? defaultProcessProps;
  const dataArray = Array.isArray(data) ? data : [data];
  
  return dataArray.map(item => {
    const { children, ...restProps } = item;
    const processedChildren = convertDataToTree(children, options);
    // Note: React.createElement would be used here in actual implementation
    // This is a placeholder representing: React.createElement(TreeNode, processProps(restProps), processedChildren)
    return { type: 'TreeNode', props: processProps(restProps), children: processedChildren };
  });
}

export function getDataAndAria(props: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(props).forEach(key => {
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      result[key] = props[key];
    }
  });
  return result;
}

export function getDragChildrenKeys(
  nodeKey: string,
  nodeMap: Record<string, TreeNode>
): string[] {
  const keys: string[] = [];
  
  function collectKeys(nodes: TreeNode[] = []): void {
    nodes.forEach(node => {
      const key = node.key;
      const children = node.children;
      keys.push(key);
      collectKeys(children);
    });
  }
  
  collectKeys(nodeMap[nodeKey].children);
  return keys;
}

export function getPosition(prefix: string | number, index: number): string {
  return `${prefix}-${index}`;
}

export function isFirstChild(node: TreeNode): boolean {
  const positions = posToArr(node.pos);
  return Number(positions[positions.length - 1]) === 0;
}

export function isLastChild(node: TreeNode): boolean {
  if (node.parent) {
    const positions = posToArr(node.pos);
    return Number(positions[positions.length - 1]) === node.parent.children.length - 1;
  }
  return false;
}

export function isTreeNode(element: any): boolean {
  return element && element.type && element.type.isTreeNode;
}

export function parseCheckedKeys(
  keys: string[] | CheckedKeysConfig | undefined
): CheckedKeysResult | null {
  if (!keys) return null;
  
  let result: CheckedKeysResult;
  
  if (Array.isArray(keys)) {
    result = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (typeof keys === 'object') {
    result = {
      checkedKeys: keys.checked,
      halfCheckedKeys: keys.halfChecked
    };
  } else {
    console.warn('`checkedKeys` is not an array or an object');
    return null;
  }
  
  return result;
}

export function posToArr(position: string): string[] {
  return position.split('-');
}