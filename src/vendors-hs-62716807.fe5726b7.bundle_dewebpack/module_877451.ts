import React, { useRef, useState, useEffect, useContext, useImperativeHandle, createRef, forwardRef, useCallback } from 'react';
import debounce from 'lodash/debounce';
import MinusSquareOutlined from '@ant-design/icons/MinusSquareOutlined';
import PlusSquareOutlined from '@ant-design/icons/PlusSquareOutlined';
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined';
import FolderOutlined from '@ant-design/icons/FolderOutlined';
import FileOutlined from '@ant-design/icons/FileOutlined';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Tree from './Tree';
import { convertTreeToData, convertDataToEntities } from './utils/convertData';
import { conductExpandParent } from './utils/conductUtil';
import { convertDirectoryKeysToNodes, calcRangeKeys } from './utils/directoryUtil';

interface TreeNodeData {
  key: string | number;
  title?: React.ReactNode;
  children?: TreeNodeData[];
  isLeaf?: boolean;
  [key: string]: unknown;
}

interface IconProps {
  isLeaf?: boolean;
  expanded?: boolean;
}

interface TreeNodeProps {
  key: string | number;
  isLeaf?: boolean;
  [key: string]: unknown;
}

interface SelectEventData {
  node: TreeNodeProps;
  nativeEvent: React.MouseEvent;
  selected?: boolean;
  selectedNodes?: TreeNodeData[];
}

interface ExpandEventData {
  node: TreeNodeProps;
  expanded: boolean;
  nativeEvent: React.MouseEvent;
}

interface DirectoryTreeProps {
  prefixCls?: string;
  className?: string;
  treeData?: TreeNodeData[];
  children?: React.ReactNode;
  defaultExpandAll?: boolean;
  defaultExpandParent?: boolean;
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  multiple?: boolean;
  expandAction?: 'click' | 'doubleClick' | false;
  showIcon?: boolean;
  onSelect?: (keys: string[], info: SelectEventData) => void;
  onClick?: (e: React.MouseEvent, node: TreeNodeProps) => void;
  onDoubleClick?: (e: React.MouseEvent, node: TreeNodeProps) => void;
  onExpand?: (keys: string[], info: ExpandEventData) => void;
  [key: string]: unknown;
}

interface DirectoryTreeRef {
  onNodeExpand: (e: React.MouseEvent, node: TreeNodeProps) => void;
  [key: string]: unknown;
}

function renderSwitcherIcon(props: IconProps): React.ReactElement {
  const { isLeaf, expanded } = props;
  
  if (isLeaf) {
    return <FileOutlined />;
  }
  
  return expanded ? <FolderOpenOutlined /> : <FolderOutlined />;
}

function getTreeData(props: DirectoryTreeProps): TreeNodeData[] {
  const { treeData, children } = props;
  return treeData ?? convertTreeToData(children);
}

function getDefaultExpandedKeys(props: DirectoryTreeProps): string[] {
  const { defaultExpandAll, defaultExpandParent, defaultExpandedKeys, expandedKeys } = props;
  const treeData = getTreeData(props);
  const { keyEntities } = convertDataToEntities(treeData);
  
  if (defaultExpandAll) {
    return Object.keys(keyEntities);
  }
  
  if (defaultExpandParent) {
    return conductExpandParent(expandedKeys ?? defaultExpandedKeys, keyEntities);
  }
  
  return expandedKeys ?? defaultExpandedKeys ?? [];
}

const InternalDirectoryTree = (props: DirectoryTreeProps, ref: React.Ref<DirectoryTreeRef>) => {
  const {
    defaultExpandAll,
    defaultExpandParent,
    defaultExpandedKeys,
    prefixCls: customPrefixCls,
    className,
    multiple,
    expandAction,
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys,
    onSelect,
    onClick,
    onDoubleClick,
    onExpand,
    ...restProps
  } = props;

  const lastSelectedKey = useRef<string>();
  const cachedSelectedKeys = useRef<string[]>();
  const treeRef = createRef<DirectoryTreeRef>();

  useImperativeHandle(ref, () => treeRef.current!);

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    controlledSelectedKeys ?? defaultSelectedKeys ?? []
  );
  
  const [expandedKeys, setExpandedKeys] = useState<string[]>(
    getDefaultExpandedKeys(props)
  );

  useEffect(() => {
    if (controlledSelectedKeys !== undefined) {
      setSelectedKeys(controlledSelectedKeys);
    }
  }, [controlledSelectedKeys]);

  useEffect(() => {
    if (props.expandedKeys !== undefined) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);

  const onDebounceExpand = debounce(
    (e: React.MouseEvent, node: TreeNodeProps) => {
      if (node.isLeaf || e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }
      treeRef.current?.onNodeExpand(e, node);
    },
    200,
    { leading: true }
  );

  const { getPrefixCls, direction } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tree', customPrefixCls);
  
  const classString = classNames(
    `${prefixCls}-directory`,
    {
      [`${prefixCls}-directory-rtl`]: direction === 'rtl',
    },
    className
  );

  const handleSelect = (keys: string[], info: SelectEventData) => {
    const { node, nativeEvent } = info;
    const nodeKey = node.key ?? '';
    const treeData = getTreeData(props);
    
    let newSelectedKeys: string[];
    const eventInfo = {
      ...info,
      selected: true,
    };

    const isCtrlKey = nativeEvent.ctrlKey || nativeEvent.metaKey;
    const isShiftKey = nativeEvent.shiftKey;

    if (multiple && isCtrlKey) {
      newSelectedKeys = keys;
      lastSelectedKey.current = String(nodeKey);
      cachedSelectedKeys.current = newSelectedKeys;
      eventInfo.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else if (multiple && isShiftKey) {
      const rangeKeys = calcRangeKeys({
        treeData,
        expandedKeys,
        startKey: String(nodeKey),
        endKey: lastSelectedKey.current,
      });
      
      newSelectedKeys = Array.from(
        new Set([...(cachedSelectedKeys.current ?? []), ...rangeKeys])
      );
      eventInfo.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    } else {
      newSelectedKeys = [String(nodeKey)];
      lastSelectedKey.current = String(nodeKey);
      cachedSelectedKeys.current = newSelectedKeys;
      eventInfo.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys);
    }

    onSelect?.(newSelectedKeys, eventInfo);

    if (controlledSelectedKeys === undefined) {
      setSelectedKeys(newSelectedKeys);
    }
  };

  const handleClick = (e: React.MouseEvent, node: TreeNodeProps) => {
    if (expandAction === 'click') {
      onDebounceExpand(e, node);
    }
    onClick?.(e, node);
  };

  const handleDoubleClick = (e: React.MouseEvent, node: TreeNodeProps) => {
    if (expandAction === 'doubleClick') {
      onDebounceExpand(e, node);
    }
    onDoubleClick?.(e, node);
  };

  const handleExpand = (keys: string[], info: ExpandEventData) => {
    if (props.expandedKeys === undefined) {
      setExpandedKeys(keys);
    }
    onExpand?.(keys, info);
  };

  return (
    <Tree
      icon={renderSwitcherIcon}
      ref={treeRef}
      blockNode={true}
      {...restProps}
      prefixCls={prefixCls}
      className={classString}
      expandedKeys={expandedKeys}
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onExpand={handleExpand}
    />
  );
};

const DirectoryTree = forwardRef<DirectoryTreeRef, DirectoryTreeProps>(InternalDirectoryTree);

DirectoryTree.displayName = 'DirectoryTree';

DirectoryTree.defaultProps = {
  showIcon: true,
  expandAction: 'click',
};

export default DirectoryTree;