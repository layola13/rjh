import { useRef, useImperativeHandle, useState, useEffect, createElement, Fragment, forwardRef, RefObject, CSSProperties, KeyboardEvent, FocusEvent } from 'react';
import VirtualList from 'rc-virtual-list';
import TreeNode from './TreeNode';
import { findExpandedKeys, getExpandRange } from './utils';
import { getKey, getTreeNodeProps } from './keyUtils';

interface NodeData {
  key: string;
  children?: NodeData[];
  [key: string]: any;
}

interface MotionNode {
  parent: MotionNode | null;
  children: MotionNode[];
  pos: string;
  data: NodeData;
  isStart: boolean[];
  isEnd: boolean[];
}

interface TreeContextProps {
  expandedKeys: string[];
  selectedKeys: string[];
  loadedKeys: string[];
  loadingKeys: string[];
  checkedKeys: string[];
  halfCheckedKeys: string[];
  dragOverNodeKey: string | null;
  dropPosition: number | null;
  keyEntities: Record<string, any>;
}

interface NodeListProps {
  prefixCls: string;
  data: MotionNode[];
  selectable?: boolean;
  checkable?: boolean;
  expandedKeys: string[];
  selectedKeys: string[];
  checkedKeys: string[];
  loadedKeys: string[];
  loadingKeys: string[];
  halfCheckedKeys: string[];
  keyEntities: Record<string, any>;
  disabled?: boolean;
  dragging?: boolean;
  dragOverNodeKey?: string | null;
  dropPosition?: number | null;
  motion?: any;
  height?: number;
  itemHeight?: number;
  virtual?: boolean;
  focusable?: boolean;
  activeItem?: MotionNode | null;
  focused?: boolean;
  tabIndex?: number;
  onKeyDown?: (e: KeyboardEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onActiveChange?: (item: MotionNode | null) => void;
  onListChangeStart?: () => void;
  onListChangeEnd?: () => void;
  [key: string]: any;
}

interface NodeListRef {
  scrollTo: (options: ScrollToOptions | number) => void;
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

const NOOP = (): void => {};

export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

const MOTION_DATA: NodeData = {
  key: MOTION_KEY,
};

export const MotionEntity: MotionNode = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MOTION_DATA,
  parent: null,
  children: [],
  pos: '0',
  data: MOTION_DATA,
  isStart: [],
  isEnd: [],
};

const PLACEHOLDER_MOTION_NODE: MotionNode = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MOTION_DATA,
  isStart: [],
  isEnd: [],
};

/**
 * Calculate minimum range for transition based on virtual scrolling
 */
export function getMinimumRangeTransitionRange(
  nodes: MotionNode[],
  virtual: boolean | undefined,
  height: number | undefined,
  itemHeight: number | undefined
): MotionNode[] {
  if (virtual !== false && height && itemHeight) {
    return nodes.slice(0, Math.ceil(height / itemHeight) + 1);
  }
  return nodes;
}

function getNodeKey(node: MotionNode): string {
  const key = node.data.key;
  const pos = node.pos;
  return getKey(key, pos);
}

function getAccessibilityPath(node: MotionNode): string {
  let path = String(node.data.key);
  let current = node;
  while (current.parent) {
    current = current.parent;
    path = `${current.data.key} > ${path}`;
  }
  return path;
}

const NodeList = forwardRef<NodeListRef, NodeListProps>((props, ref) => {
  const {
    prefixCls,
    data,
    selectable,
    checkable,
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
    scrollTo: (options: ScrollToOptions | number) => {
      listRef.current?.scrollTo(options);
    },
    getIndentWidth: () => {
      return indentRef.current?.offsetWidth ?? 0;
    },
  }));

  const [prevExpandedKeys, setPrevExpandedKeys] = useState<string[]>(expandedKeys);
  const [prevData, setPrevData] = useState<MotionNode[]>(data);
  const [transitionData, setTransitionData] = useState<MotionNode[]>(data);
  const [transitionRange, setTransitionRange] = useState<MotionNode[]>([]);
  const [motionType, setMotionType] = useState<'show' | 'hide' | null>(null);

  function onMotionEnd(): void {
    setPrevData(data);
    setTransitionData(data);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd?.();
  }

  useEffect(() => {
    setPrevExpandedKeys(expandedKeys);

    const diffResult = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffResult.key !== null) {
      if (diffResult.add) {
        const targetIndex = prevData.findIndex((node) => node.data.key === diffResult.key);
        const expandRange = getExpandRange(prevData, data, diffResult.key);
        const rangeNodes = getMinimumRangeTransitionRange(expandRange, virtual, height, itemHeight);
        const newTransitionData = prevData.slice();
        newTransitionData.splice(targetIndex + 1, 0, PLACEHOLDER_MOTION_NODE);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType('show');
      } else {
        const targetIndex = data.findIndex((node) => node.data.key === diffResult.key);
        const collapseRange = getExpandRange(data, prevData, diffResult.key);
        const rangeNodes = getMinimumRangeTransitionRange(collapseRange, virtual, height, itemHeight);
        const newTransitionData = data.slice();
        newTransitionData.splice(targetIndex + 1, 0, PLACEHOLDER_MOTION_NODE);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
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

  const displayData = motion ? transitionData : data;

  const treeContext: TreeContextProps = {
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

  return createElement(
    Fragment,
    null,
    focused && activeItem && createElement(
      'span',
      {
        style: HIDDEN_STYLE,
        'aria-live': 'assertive',
      },
      getAccessibilityPath(activeItem)
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
        onChange: NOOP,
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
        data: displayData,
        itemKey: getNodeKey,
        height,
        fullHeight: false,
        virtual,
        itemHeight,
        prefixCls: `${prefixCls}-list`,
        ref: listRef,
      },
      (node: MotionNode) => {
        const { pos, data: nodeData } = node;
        const { key, ...nodeProps } = nodeData;
        const { isStart, isEnd } = node;
        const fullKey = getKey(key, pos);
        delete nodeProps.children;

        const treeNodeProps = getTreeNodeProps(fullKey, treeContext);

        return createElement(TreeNode, {
          ...nodeProps,
          ...treeNodeProps,
          active: Boolean(activeItem && key === activeItem.data.key),
          pos,
          data: node.data,
          isStart,
          isEnd,
          motion,
          motionNodes: key === MOTION_KEY ? transitionRange : null,
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