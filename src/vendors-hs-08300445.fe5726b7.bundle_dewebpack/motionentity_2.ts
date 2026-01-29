import { useRef, useImperativeHandle, useState, useEffect, createElement, Fragment, forwardRef, RefObject, CSSProperties, KeyboardEvent, FocusEvent } from 'react';
import VirtualList from 'rc-virtual-list';
import TreeNode from './TreeNode';
import { findExpandedKeys, getExpandRange } from './utils';
import { getKey, getTreeNodeProps } from './keyUtils';

export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

interface TreeNodeData {
  key: string | number;
  children?: TreeNodeData[];
  [key: string]: unknown;
}

interface FlattenNode {
  parent: FlattenNode | null;
  children: FlattenNode[];
  pos: string;
  data: TreeNodeData;
  isStart: boolean[];
  isEnd: boolean[];
  key?: string | number;
  level?: number;
  index?: number;
  node?: TreeNodeData;
}

interface KeyEntities {
  [key: string]: FlattenNode;
}

interface TreeContext {
  expandedKeys: (string | number)[];
  selectedKeys: (string | number)[];
  loadedKeys: (string | number)[];
  loadingKeys: (string | number)[];
  checkedKeys: (string | number)[];
  halfCheckedKeys: (string | number)[];
  dragOverNodeKey: string | number | null;
  dropPosition: number | null;
  keyEntities: KeyEntities;
}

interface MotionConfig {
  motionName?: string;
  motionAppear?: boolean;
  onAppearStart?: () => void;
  onAppearEnd?: () => void;
  [key: string]: unknown;
}

interface NodeListProps {
  prefixCls: string;
  data: FlattenNode[];
  selectable?: boolean;
  checkable?: boolean;
  expandedKeys: (string | number)[];
  selectedKeys: (string | number)[];
  checkedKeys: (string | number)[];
  loadedKeys: (string | number)[];
  loadingKeys: (string | number)[];
  halfCheckedKeys: (string | number)[];
  keyEntities: KeyEntities;
  disabled?: boolean;
  dragging?: boolean;
  dragOverNodeKey?: string | number | null;
  dropPosition?: number | null;
  motion?: MotionConfig | boolean;
  height?: number;
  itemHeight?: number;
  virtual?: boolean;
  focusable?: boolean;
  activeItem?: FlattenNode | null;
  focused?: boolean;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onActiveChange?: (item: FlattenNode | null) => void;
  onListChangeStart?: () => void;
  onListChangeEnd?: () => void;
  [key: string]: unknown;
}

export interface NodeListRef {
  scrollTo: (config: { key: string | number } | { index: number }) => void;
  getIndentWidth: () => number;
}

const HIDDEN_STYLE: CSSProperties = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0,
};

const NO_OP = (): void => {};

const MOTION_NODE_DATA: TreeNodeData = {
  key: MOTION_KEY,
};

export const MotionEntity: FlattenNode = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MOTION_NODE_DATA,
  parent: null,
  children: [],
  data: MOTION_NODE_DATA,
  isStart: [],
  isEnd: [],
};

export function getMinimumRangeTransitionRange(
  list: FlattenNode[],
  virtual: boolean | undefined,
  height: number | undefined,
  itemHeight: number | undefined
): FlattenNode[] {
  if (virtual === false || !height || !itemHeight) {
    return list;
  }
  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}

function getNodeKey(node: FlattenNode): string {
  const { key } = node.data;
  const { pos } = node;
  return getKey(key, pos);
}

const NodeList = forwardRef<NodeListRef, NodeListProps>((props, ref) => {
  const {
    prefixCls,
    data,
    expandedKeys,
    selectedKeys,
    checkedKeys,
    loadedKeys,
    loadingKeys,
    halfCheckedKeys,
    keyEntities,
    disabled,
    dragging,
    dragOverNodeKey,
    dropPosition,
    motion,
    height,
    itemHeight,
    virtual,
    focusable,
    activeItem,
    focused,
    tabIndex,
    onKeyDown,
    onFocus,
    onBlur,
    onActiveChange,
    onListChangeStart,
    onListChangeEnd,
    ...restProps
  } = props;

  const listRef = useRef<any>(null);
  const indentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollTo: (config) => {
      listRef.current?.scrollTo(config);
    },
    getIndentWidth: () => {
      return indentRef.current?.offsetWidth ?? 0;
    },
  }));

  const [prevExpandedKeys, setPrevExpandedKeys] = useState<(string | number)[]>(expandedKeys);
  const [prevData, setPrevData] = useState<FlattenNode[]>(data);
  const [transitionData, setTransitionData] = useState<FlattenNode[]>(data);
  const [motionNodes, setMotionNodes] = useState<FlattenNode[]>([]);
  const [motionType, setMotionType] = useState<'show' | 'hide' | null>(null);

  function onMotionEnd(): void {
    setPrevData(data);
    setTransitionData(data);
    setMotionNodes([]);
    setMotionType(null);
    onListChangeEnd?.();
  }

  useEffect(() => {
    setPrevExpandedKeys(expandedKeys);

    const diffResult = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffResult.key !== null) {
      if (diffResult.add) {
        const index = prevData.findIndex((item) => item.data.key === diffResult.key);
        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(prevData, data, diffResult.key),
          virtual,
          height,
          itemHeight
        );
        const newTransitionData = prevData.slice();
        newTransitionData.splice(index + 1, 0, MotionEntity);
        setTransitionData(newTransitionData);
        setMotionNodes(rangeNodes);
        setMotionType('show');
      } else {
        const index = data.findIndex((item) => item.data.key === diffResult.key);
        const rangeNodes = getMinimumRangeTransitionRange(
          getExpandRange(data, prevData, diffResult.key),
          virtual,
          height,
          itemHeight
        );
        const newTransitionData = data.slice();
        newTransitionData.splice(index + 1, 0, MotionEntity);
        setTransitionData(newTransitionData);
        setMotionNodes(rangeNodes);
        setMotionType('hide');
      }
    } else if (prevData !== data) {
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]);

  useEffect(() => {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);

  const renderData = motion ? transitionData : data;

  const treeContext: TreeContext = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey: dragOverNodeKey ?? null,
    dropPosition: dropPosition ?? null,
    keyEntities,
  };

  function getActiveItemAccessibilityPath(node: FlattenNode): string {
    let path = String(node.data.key);
    let current: FlattenNode | null = node;
    while (current.parent) {
      current = current.parent;
      path = `${current.data.key} > ${path}`;
    }
    return path;
  }

  return createElement(
    Fragment,
    null,
    focused && activeItem && createElement(
      'span',
      { style: HIDDEN_STYLE, 'aria-live': 'assertive' },
      getActiveItemAccessibilityPath(activeItem)
    ),
    createElement(
      'div',
      { role: 'tree' },
      createElement('input', {
        style: HIDDEN_STYLE,
        disabled: focusable === false || disabled,
        tabIndex: focusable !== false ? tabIndex ?? 0 : undefined,
        onKeyDown,
        onFocus,
        onBlur,
        value: '',
        onChange: NO_OP,
      })
    ),
    createElement(
      'div',
      {
        className: `${prefixCls}-treenode`,
        'aria-hidden': true,
        style: {
          position: 'absolute',
          pointerEvents: 'none',
          visibility: 'hidden',
          height: 0,
          overflow: 'hidden',
        },
      },
      createElement(
        'div',
        { className: `${prefixCls}-indent` },
        createElement('div', {
          ref: indentRef,
          className: `${prefixCls}-indent-unit`,
        })
      )
    ),
    createElement(
      VirtualList,
      {
        ...restProps,
        data: renderData,
        itemKey: getNodeKey,
        height,
        fullHeight: false,
        virtual,
        itemHeight,
        prefixCls: `${prefixCls}-list`,
        ref: listRef,
      },
      (node: FlattenNode) => {
        const { pos, data: nodeData, isStart, isEnd } = node;
        const { key, ...nodeProps } = nodeData;
        const itemKey = getKey(key, pos);
        delete nodeProps.children;

        const treeNodeProps = getTreeNodeProps(itemKey, treeContext);

        return createElement(TreeNode, {
          ...nodeProps,
          ...treeNodeProps,
          active: !!activeItem && key === activeItem.data.key,
          pos,
          data: node.data,
          isStart,
          isEnd,
          motion,
          motionNodes: key === MOTION_KEY ? motionNodes : null,
          motionType,
          onMotionStart: onListChangeStart,
          onMotionEnd,
          treeNodeRequiredProps: treeContext,
          onMouseMove: () => {
            onActiveChange?.(null);
          },
        });
      }
    )
  );
});

NodeList.displayName = 'NodeList';

export default NodeList;