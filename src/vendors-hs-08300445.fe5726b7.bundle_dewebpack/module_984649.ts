export interface ConvertDataOptions {
  initWrapper?: <T extends Entities>(entities: T) => T | void;
  processEntity?: (entity: DataEntity, entities: Entities) => void;
  onProcessFinished?: (entities: Entities) => void;
  externalGetKey?: KeyGenerator;
  childrenPropName?: string;
}

export interface DataEntity {
  node: TreeNodeData;
  index: number;
  key: string;
  pos: string;
  level: number;
  parent?: DataEntity;
  children?: DataEntity[];
}

export interface Entities {
  posEntities: Record<string, DataEntity>;
  keyEntities: Record<string, DataEntity>;
}

export interface TreeNodeData {
  key?: string;
  children?: TreeNodeData[];
  [key: string]: unknown;
}

export interface EventData extends TreeNodeData {
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  loaded?: boolean;
  loading?: boolean;
  halfChecked?: boolean;
  dragOver?: boolean;
  dragOverGapTop?: boolean;
  dragOverGapBottom?: boolean;
  pos?: string;
  active?: boolean;
  props?: TreeNodeData;
}

export interface TreeNodeProps {
  eventKey: string;
  expanded: boolean;
  selected: boolean;
  loaded: boolean;
  loading: boolean;
  checked: boolean;
  halfChecked: boolean;
  pos: string;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
}

export interface TreeState {
  expandedKeys: string[];
  selectedKeys: string[];
  loadedKeys: string[];
  loadingKeys: string[];
  checkedKeys: string[];
  halfCheckedKeys: string[];
  dragOverNodeKey: string | null;
  dropPosition: number;
  keyEntities: Record<string, DataEntity>;
}

export interface FlattenedNode extends TreeNodeData {
  parent: FlattenedNode | null;
  pos: string;
  data: TreeNodeData;
  isStart: boolean[];
  isEnd: boolean[];
  children: FlattenedNode[] | null;
}

type KeyGenerator = (node: TreeNodeData, pos?: string) => string;

interface TraverseOptions {
  childrenPropName?: string;
  externalGetKey?: KeyGenerator | string;
}

interface TraverseCallback {
  node: TreeNodeData;
  index: number;
  pos: string;
  key: string;
  parentPos: string | null;
  level: number;
}

export function getKey(nodeKey: string | null | undefined, position: string): string {
  return nodeKey != null ? nodeKey : position;
}

export function convertDataToEntities(
  data: TreeNodeData[],
  options: ConvertDataOptions = {},
  legacyExternalGetKey?: KeyGenerator
): Entities {
  const { initWrapper, processEntity, onProcessFinished, externalGetKey, childrenPropName } = options;
  const keyGen = externalGetKey || legacyExternalGetKey;
  
  const posEntities: Record<string, DataEntity> = {};
  const keyEntities: Record<string, DataEntity> = {};
  
  let entities: Entities = { posEntities, keyEntities };
  
  if (initWrapper) {
    entities = initWrapper(entities) || entities;
  }
  
  traverseDataNodes(
    data,
    (callback: TraverseCallback) => {
      const { node, index, pos, key, parentPos, level } = callback;
      
      const entity: DataEntity = {
        node,
        index,
        key,
        pos,
        level,
      };
      
      const entityKey = getKey(key, pos);
      posEntities[pos] = entity;
      keyEntities[entityKey] = entity;
      
      entity.parent = posEntities[parentPos!];
      
      if (entity.parent) {
        entity.parent.children = entity.parent.children || [];
        entity.parent.children.push(entity);
      }
      
      if (processEntity) {
        processEntity(entity, entities);
      }
    },
    {
      externalGetKey: keyGen,
      childrenPropName,
    }
  );
  
  if (onProcessFinished) {
    onProcessFinished(entities);
  }
  
  return entities;
}

export function getTreeNodeProps(nodeKey: string, state: TreeState): TreeNodeProps {
  const { expandedKeys, selectedKeys, loadedKeys, loadingKeys, checkedKeys, halfCheckedKeys, dragOverNodeKey, dropPosition, keyEntities } = state;
  const entity = keyEntities[nodeKey];
  
  return {
    eventKey: nodeKey,
    expanded: expandedKeys.indexOf(nodeKey) !== -1,
    selected: selectedKeys.indexOf(nodeKey) !== -1,
    loaded: loadedKeys.indexOf(nodeKey) !== -1,
    loading: loadingKeys.indexOf(nodeKey) !== -1,
    checked: checkedKeys.indexOf(nodeKey) !== -1,
    halfChecked: halfCheckedKeys.indexOf(nodeKey) !== -1,
    pos: String(entity ? entity.pos : ''),
    dragOver: dragOverNodeKey === nodeKey && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === nodeKey && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === nodeKey && dropPosition === 1,
  };
}

export function convertNodePropsToEventData(nodeData: EventData): EventData {
  const { data, expanded, selected, checked, loaded, loading, halfChecked, dragOver, dragOverGapTop, dragOverGapBottom, pos, active, ...rest } = nodeData;
  
  const eventData: EventData = {
    ...data,
    ...rest,
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
  };
  
  if (!('props' in eventData)) {
    Object.defineProperty(eventData, 'props', {
      get() {
        console.warn('Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.');
        return nodeData;
      },
    });
  }
  
  return eventData;
}

export function traverseDataNodes(
  data: TreeNodeData[] | null,
  callback: (info: TraverseCallback) => void,
  options?: TraverseOptions | KeyGenerator | string
): void {
  let childrenPropName: string | undefined;
  let externalGetKey: KeyGenerator | undefined;
  
  const optionType = typeof options;
  
  if (optionType === 'function' || optionType === 'string') {
    externalGetKey = options as KeyGenerator;
  } else if (options && typeof options === 'object') {
    childrenPropName = (options as TraverseOptions).childrenPropName;
    externalGetKey = (options as TraverseOptions).externalGetKey;
  }
  
  const childrenProp = childrenPropName || 'children';
  
  let keyGenerator: (node: TreeNodeData, pos: string) => string;
  
  if (externalGetKey) {
    if (typeof externalGetKey === 'string') {
      const keyProp = externalGetKey;
      keyGenerator = (node: TreeNodeData) => node[keyProp] as string;
    } else if (typeof externalGetKey === 'function') {
      keyGenerator = (node: TreeNodeData, pos: string) => externalGetKey(node, pos);
    } else {
      keyGenerator = (node: TreeNodeData, pos: string) => getKey(node.key, pos);
    }
  } else {
    keyGenerator = (node: TreeNodeData, pos: string) => getKey(node.key, pos);
  }
  
  function processNode(
    node: TreeNodeData | null,
    index: number,
    parent: { node: TreeNodeData | null; pos: string; level: number }
  ): void {
    const children = node ? (node[childrenProp] as TreeNodeData[]) : data;
    const currentPos = node ? getPosition(parent.pos, index) : '0';
    
    if (node) {
      const key = keyGenerator(node, currentPos);
      const info: TraverseCallback = {
        node,
        index,
        pos: currentPos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
      };
      callback(info);
    }
    
    if (children) {
      children.forEach((child: TreeNodeData, childIndex: number) => {
        processNode(child, childIndex, {
          node,
          pos: currentPos,
          level: parent ? parent.level + 1 : -1,
        });
      });
    }
  }
  
  processNode(null, 0, { node: null, pos: '', level: -1 });
}

export function getPosition(parentPos: string, index: number): string {
  return `${parentPos}-${index}`;
}

export function isTreeNode(node: unknown): boolean {
  return node != null && typeof node === 'object';
}

export function convertTreeToData(nodes: unknown[]): TreeNodeData[] {
  function convert(children: unknown[]): TreeNodeData[] {
    return children
      .map((child: unknown) => {
        if (!isTreeNode(child)) {
          console.warn('Tree/TreeNode can only accept TreeNode as children.');
          return null;
        }
        
        const node = child as { key: string; props: { children?: unknown[]; [key: string]: unknown } };
        const { key, props } = node;
        const { children: nodeChildren, ...restProps } = props;
        
        const data: TreeNodeData = {
          key,
          ...restProps,
        };
        
        const convertedChildren = convert(nodeChildren || []);
        if (convertedChildren.length) {
          data.children = convertedChildren;
        }
        
        return data;
      })
      .filter((item): item is TreeNodeData => item !== null);
  }
  
  return convert(nodes);
}

export function flattenTreeData(
  data: TreeNodeData[] = [],
  expandedKeys: string[] | true = []
): FlattenedNode[] {
  const expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  const result: FlattenedNode[] = [];
  
  function flattenNode(
    nodes: TreeNodeData[],
    parent: FlattenedNode | null = null
  ): FlattenedNode[] {
    return nodes.map((node: TreeNodeData, index: number) => {
      const pos = getPosition(parent ? parent.pos : '0', index);
      const key = getKey(node.key, pos);
      
      const flattenedNode: FlattenedNode = {
        ...node,
        parent,
        pos,
        children: null,
        data: node,
        isStart: [...(parent ? parent.isStart : []), index === 0],
        isEnd: [...(parent ? parent.isEnd : []), index === nodes.length - 1],
      };
      
      result.push(flattenedNode);
      
      if (expandedKeys === true || expandedKeySet.has(key)) {
        flattenedNode.children = flattenNode(node.children || [], flattenedNode);
      } else {
        flattenedNode.children = [];
      }
      
      return flattenedNode;
    });
  }
  
  flattenNode(data);
  return result;
}

export function warningWithoutKey(data: TreeNodeData[] = []): void {
  const keySet = new Map<string, boolean>();
  
  function checkKeys(nodes: TreeNodeData[], prefix = ''): void {
    (nodes || []).forEach((node: TreeNodeData) => {
      const { key, children } = node;
      
      console.assert(
        key != null,
        `Tree node must have a certain key: [${prefix}${key}]`
      );
      
      const keyStr = String(key);
      console.assert(
        !keySet.has(keyStr) || key == null,
        `Same 'key' exist in the Tree: ${keyStr}`
      );
      
      keySet.set(keyStr, true);
      checkKeys(children || [], `${prefix}${keyStr} > `);
    });
  }
  
  checkKeys(data);
}