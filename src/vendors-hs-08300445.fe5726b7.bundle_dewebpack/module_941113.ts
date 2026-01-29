export interface TreeNode<T = any> {
  key: string | number;
  children?: TreeNode<T>[];
  [key: string]: any;
}

export interface TreeEntity<T = any> {
  node: TreeNode<T>;
  index: number;
  key: string;
  pos: string;
  level: number;
  parent?: TreeEntity<T>;
  children?: TreeEntity<T>[];
}

export interface KeyEntities<T = any> {
  [key: string]: TreeEntity<T>;
}

export interface PosEntities<T = any> {
  [pos: string]: TreeEntity<T>;
}

export interface DataEntities<T = any> {
  posEntities: PosEntities<T>;
  keyEntities: KeyEntities<T>;
}

export interface ConvertDataOptions<T = any> {
  initWrapper?: (entities: DataEntities<T>) => DataEntities<T> | void;
  processEntity?: (entity: TreeEntity<T>, entities: DataEntities<T>) => void;
  onProcessFinished?: (entities: DataEntities<T>) => void;
  externalGetKey?: (node: TreeNode<T>, pos: string) => string;
  childrenPropName?: string;
}

export interface TraverseOptions<T = any> {
  externalGetKey?: (node: TreeNode<T>, pos: string) => string;
  childrenPropName?: string;
}

export interface TraverseCallbackData<T = any> {
  node: TreeNode<T>;
  index: number;
  pos: string;
  key: string;
  parentPos: string | null;
  level: number;
}

export interface EventData<T = any> {
  data: T;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  loaded: boolean;
  loading: boolean;
  halfChecked: boolean;
  dragOver: boolean;
  dragOverGapTop: boolean;
  dragOverGapBottom: boolean;
  pos: string;
  active: boolean;
  [key: string]: any;
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
  keyEntities: KeyEntities;
}

export interface FlattenedNode<T = any> {
  parent: FlattenedNode<T> | null;
  pos: string;
  children: FlattenedNode<T>[] | null;
  data: TreeNode<T>;
  isStart: boolean[];
  isEnd: boolean[];
  key: string | number;
}

export function getKey(key: string | number | null | undefined, pos: string): string {
  return key != null ? String(key) : pos;
}

export function traverseDataNodes<T = any>(
  data: TreeNode<T>[],
  callback: (data: TraverseCallbackData<T>) => void,
  options?: TraverseOptions<T> | ((node: TreeNode<T>, pos: string) => string) | string
): void {
  let externalGetKey: ((node: TreeNode<T>, pos: string) => string) | undefined;
  let childrenPropName: string;
  let getKeyFunc: (node: TreeNode<T>, pos: string) => string;

  const optionsType = typeof options;

  if (optionsType === 'function' || optionsType === 'string') {
    externalGetKey = options as any;
  } else if (options && optionsType === 'object') {
    childrenPropName = (options as TraverseOptions<T>).childrenPropName ?? 'children';
    externalGetKey = (options as TraverseOptions<T>).externalGetKey;
  }

  childrenPropName = childrenPropName ?? 'children';

  if (externalGetKey) {
    if (typeof externalGetKey === 'string') {
      const keyProp = externalGetKey;
      getKeyFunc = (node: TreeNode<T>) => node[keyProp];
    } else if (typeof externalGetKey === 'function') {
      getKeyFunc = externalGetKey;
    }
  } else {
    getKeyFunc = (node: TreeNode<T>, pos: string) => getKey(node.key, pos);
  }

  function processNode(
    node: TreeNode<T> | null,
    index: number,
    parent: { node: TreeNode<T> | null; pos: string; level: number }
  ): void {
    const children = node ? node[childrenPropName] : data;
    const currentPos = node ? getPosition(parent.pos, index) : '0';

    if (node) {
      const key = getKeyFunc(node, currentPos);
      const callbackData: TraverseCallbackData<T> = {
        node,
        index,
        pos: currentPos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
      };
      callback(callbackData);
    }

    if (children) {
      children.forEach((child: TreeNode<T>, childIndex: number) => {
        processNode(child, childIndex, {
          node,
          pos: currentPos,
          level: parent.level + 1,
        });
      });
    }
  }

  processNode(null, 0, { node: null, pos: '', level: -1 });
}

function getPosition(parentPos: string, index: number): string {
  return `${parentPos}-${index}`;
}

export function convertDataToEntities<T = any>(
  data: TreeNode<T>[],
  options: ConvertDataOptions<T> = {},
  legacyExternalGetKey?: (node: TreeNode<T>, pos: string) => string
): DataEntities<T> {
  const {
    initWrapper,
    processEntity,
    onProcessFinished,
    externalGetKey,
    childrenPropName,
  } = options;

  const getKeyFunc = externalGetKey ?? legacyExternalGetKey;

  const posEntities: PosEntities<T> = {};
  const keyEntities: KeyEntities<T> = {};

  let entities: DataEntities<T> = {
    posEntities,
    keyEntities,
  };

  if (initWrapper) {
    entities = initWrapper(entities) ?? entities;
  }

  traverseDataNodes(
    data,
    (item) => {
      const { node, index, pos, key, parentPos, level } = item;
      const entity: TreeEntity<T> = {
        node,
        index,
        key,
        pos,
        level,
      };

      const mergedKey = getKey(key, pos);

      posEntities[pos] = entity;
      keyEntities[mergedKey] = entity;

      entity.parent = posEntities[parentPos];
      if (entity.parent) {
        entity.parent.children = entity.parent.children ?? [];
        entity.parent.children.push(entity);
      }

      if (processEntity) {
        processEntity(entity, entities);
      }
    },
    {
      externalGetKey: getKeyFunc,
      childrenPropName,
    }
  );

  if (onProcessFinished) {
    onProcessFinished(entities);
  }

  return entities;
}

export function convertNodePropsToEventData<T = any>(nodeProps: any): EventData<T> {
  const {
    data,
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
  } = nodeProps;

  const eventData: EventData<T> = {
    ...data,
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
        console.warn(
          'Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.'
        );
        return nodeProps;
      },
    });
  }

  return eventData;
}

export function convertTreeToData(tree: any[]): TreeNode[] {
  function convert(nodes: any[]): TreeNode[] {
    return toArray(nodes)
      .map((node) => {
        if (!isTreeNode(node)) {
          console.warn('Tree/TreeNode can only accept TreeNode as children.');
          return null;
        }

        const { key, props } = node;
        const { children, ...restProps } = props;
        const treeNode: TreeNode = {
          key,
          ...restProps,
        };

        const convertedChildren = convert(children);
        if (convertedChildren.length) {
          treeNode.children = convertedChildren;
        }

        return treeNode;
      })
      .filter((node): node is TreeNode => node !== null);
  }

  return convert(tree);
}

export function flattenTreeData<T = any>(
  data: TreeNode<T>[] = [],
  expandedKeys: string[] | true = []
): FlattenedNode<T>[] {
  const expandedKeySet = new Set<string>(expandedKeys === true ? [] : expandedKeys);
  const flattenList: FlattenedNode<T>[] = [];

  function flatten(nodes: TreeNode<T>[], parent: FlattenedNode<T> | null = null): FlattenedNode<T>[] {
    return nodes.map((node, index) => {
      const pos = getPosition(parent ? parent.pos : '0', index);
      const mergedKey = getKey(node.key, pos);

      const flattenNode: FlattenedNode<T> = {
        ...node,
        parent,
        pos,
        children: null,
        data: node,
        isStart: [...(parent ? parent.isStart : []), index === 0],
        isEnd: [...(parent ? parent.isEnd : []), index === nodes.length - 1],
      };

      flattenList.push(flattenNode);

      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = flatten(node.children ?? [], flattenNode);
      } else {
        flattenNode.children = [];
      }

      return flattenNode;
    });
  }

  flatten(data);
  return flattenList;
}

export function getTreeNodeProps(key: string, state: TreeState): TreeNodeProps {
  const {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities,
  } = state;

  const entity = keyEntities[key];

  return {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ''),
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1,
  };
}

export function warningWithoutKey<T = any>(data: TreeNode<T>[] = []): void {
  const keySet = new Map<string, boolean>();

  function validate(nodes: TreeNode<T>[], prefix: string = ''): void {
    (nodes ?? []).forEach((node) => {
      const { key, children } = node;
      
      console.assert(
        key != null,
        `Tree node must have a certain key: [${prefix}${key}]`
      );

      const keyString = String(key);
      console.assert(
        !keySet.has(keyString) || key == null,
        `Same 'key' exist in the Tree: ${keyString}`
      );
      
      keySet.set(keyString, true);
      validate(children, `${prefix}${keyString} > `);
    });
  }

  validate(data);
}

function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return value !== undefined && value !== null ? [value] : [];
}

function isTreeNode(node: any): boolean {
  return node && node.type && node.type.isTreeNode;
}