export interface DropPositionResult {
  dropPosition: number;
  dropLevelOffset: number;
  dropTargetKey: string;
  dropTargetPos: string;
  dragOverNodeKey: string;
  dropContainerKey: string | null;
  dropAllowed: boolean;
}

export interface TreeNodeData {
  key: string;
  pos: string;
  level: number;
  node: any;
  parent?: TreeNodeData;
  children?: TreeNodeData[];
}

export interface KeyEntityMap {
  [key: string]: TreeNodeData;
}

export interface CheckedKeysResult {
  checkedKeys?: string[];
  halfCheckedKeys?: string[];
}

export interface ConvertDataOptions {
  processProps?: (props: any) => any;
}

export interface NodeProps {
  eventKey: string;
  [key: string]: any;
}

export interface TreeNode {
  props: NodeProps;
  [key: string]: any;
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
  treeNode: TreeNode,
  indent: number,
  startMousePosition: { x?: number; y?: number } | null,
  allowDrop: (options: { dropNode: any; dropPosition: number }) => boolean,
  expandedKeys: string[],
  flattenedNodes: Array<{ data: TreeNodeData }>,
  keyEntityMap: KeyEntityMap,
  dragNodesKeys: string[],
  direction: string
): DropPositionResult {
  const clientX = event.clientX;
  const clientY = event.clientY;
  const targetRect = (event.target as HTMLElement).getBoundingClientRect();
  const targetTop = targetRect.top;
  const targetHeight = targetRect.height;

  const directionMultiplier = direction === 'rtl' ? -1 : 1;
  const horizontalOffset = (directionMultiplier * (((startMousePosition?.x) || 0) - clientX) - 12) / indent;

  let targetEntity = keyEntityMap[treeNode.props.eventKey];

  if (clientY < targetTop + targetHeight / 2) {
    const currentIndex = flattenedNodes.findIndex(node => node.data.key === targetEntity.key);
    const previousKey = flattenedNodes[currentIndex <= 0 ? 0 : currentIndex - 1].data.key;
    targetEntity = keyEntityMap[previousKey];
  }

  const dragOverNodeKey = targetEntity.key;
  const originalEntity = targetEntity;
  const entityKey = targetEntity.key;
  let dropPosition = 0;
  let dropLevelOffset = 0;

  if (!dragNodesKeys.includes(entityKey)) {
    for (let i = 0; i < horizontalOffset && isLastChild(targetEntity); i += 1) {
      targetEntity = targetEntity.parent!;
      dropLevelOffset += 1;
    }
  }

  const dropNode = targetEntity.node;
  let dropAllowed = true;

  if (isFirstChild(targetEntity) && targetEntity.level === 0 && clientY < targetTop + targetHeight / 2 && 
      allowDrop({ dropNode, dropPosition: -1 }) && targetEntity.key === treeNode.props.eventKey) {
    dropPosition = -1;
  } else if ((originalEntity.children || []).length && expandedKeys.includes(entityKey)) {
    if (allowDrop({ dropNode, dropPosition: 0 })) {
      dropPosition = 0;
    } else {
      dropAllowed = false;
    }
  } else if (dropLevelOffset === 0) {
    if (horizontalOffset > -1.5) {
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
    dropLevelOffset,
    dropTargetKey: targetEntity.key,
    dropTargetPos: targetEntity.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : (targetEntity.parent?.key || null),
    dropAllowed
  };
}

export function calcSelectedKeys(keys: string[] | undefined, options: { multiple?: boolean }): string[] | undefined {
  if (!keys) return;
  if (options.multiple) return keys.slice();
  if (keys.length) return [keys[0]];
  return keys;
}

export function conductExpandParent(keys: string[] | undefined, keyEntityMap: KeyEntityMap): string[] {
  const expandedKeys = new Set<string>();

  function conduct(key: string): void {
    if (!expandedKeys.has(key)) {
      const entity = keyEntityMap[key];
      if (entity) {
        expandedKeys.add(key);
        const parent = entity.parent;
        if (!entity.node.disabled && parent) {
          conduct(parent.key);
        }
      }
    }
  }

  (keys || []).forEach(key => {
    conduct(key);
  });

  return Array.from(expandedKeys);
}

export function convertDataToTree(data: any, options?: ConvertDataOptions): any[] {
  if (!data) return [];
  
  const processProps = options?.processProps ?? ((props: any) => props);
  const dataArray = Array.isArray(data) ? data : [data];

  return dataArray.map(item => {
    const { children, ...rest } = item;
    const processedChildren = convertDataToTree(children, options);
    return React.createElement(TreeNode, processProps(rest), processedChildren);
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

export function getDragChildrenKeys(nodeKey: string, keyEntityMap: KeyEntityMap): string[] {
  const keys: string[] = [];

  function collect(nodes: TreeNodeData[] = []): void {
    nodes.forEach(node => {
      const { key, children } = node;
      keys.push(key);
      collect(children);
    });
  }

  collect(keyEntityMap[nodeKey].children);
  return keys;
}

export function getPosition(level: number | string, index: number | string): string {
  return `${level}-${index}`;
}

export function isFirstChild(entity: TreeNodeData): boolean {
  const positions = posToArr(entity.pos);
  return Number(positions[positions.length - 1]) === 0;
}

export function isLastChild(entity: TreeNodeData): boolean {
  if (entity.parent) {
    const positions = posToArr(entity.pos);
    return Number(positions[positions.length - 1]) === entity.parent.children!.length - 1;
  }
  return false;
}

export function isTreeNode(element: any): boolean {
  return element && element.type && element.type.isTreeNode;
}

export function parseCheckedKeys(keys: string[] | { checked?: string[]; halfChecked?: string[] } | undefined): CheckedKeysResult | null {
  if (!keys) return null;

  let result: CheckedKeysResult;

  if (Array.isArray(keys)) {
    result = {
      checkedKeys: keys,
      halfCheckedKeys: undefined
    };
  } else if (typeof keys === 'object') {
    result = {
      checkedKeys: keys.checked || undefined,
      halfCheckedKeys: keys.halfChecked || undefined
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