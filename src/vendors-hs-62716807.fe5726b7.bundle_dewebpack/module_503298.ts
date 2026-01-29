import React, { forwardRef, useContext, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import RcTree, { TreeNode as RcTreeNode } from 'rc-tree';
import { ConfigContext } from './ConfigContext';
import DirectoryTree from './DirectoryTree';
import { renderSwitcherIcon } from './renderSwitcherIcon';
import { renderDropIndicator } from './renderDropIndicator';
import { defaultMotion } from './defaultMotion';

interface SwitcherIconProps {
  prefixCls: string;
  expanded: boolean;
  isLeaf: boolean;
  loading?: boolean;
}

interface TreeProps {
  prefixCls?: string;
  className?: string;
  showIcon?: boolean;
  showLine?: boolean | { showLeafIcon: boolean };
  switcherIcon?: ReactNode | ((props: SwitcherIconProps) => ReactNode);
  blockNode?: boolean;
  children?: ReactNode;
  checkable?: boolean | ReactNode;
  selectable?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  checkStrictly?: boolean;
  defaultExpandAll?: boolean;
  defaultExpandParent?: boolean;
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  defaultCheckedKeys?: string[];
  checkedKeys?: string[] | { checked: string[]; halfChecked: string[] };
  defaultSelectedKeys?: string[];
  selectedKeys?: string[];
  autoExpandParent?: boolean;
  loadData?: (node: any) => Promise<void>;
  onExpand?: (expandedKeys: string[], info: any) => void;
  onCheck?: (checkedKeys: string[] | { checked: string[]; halfChecked: string[] }, info: any) => void;
  onSelect?: (selectedKeys: string[], info: any) => void;
  onLoad?: (loadedKeys: string[], info: any) => void;
  loadedKeys?: string[];
  treeData?: any[];
  icon?: ReactNode | ((props: any) => ReactNode);
  motion?: any;
  virtual?: boolean;
  height?: number;
  itemHeight?: number;
  style?: CSSProperties;
  draggable?: boolean;
  onDragStart?: (info: any) => void;
  onDragEnter?: (info: any) => void;
  onDragOver?: (info: any) => void;
  onDragLeave?: (info: any) => void;
  onDragEnd?: (info: any) => void;
  onDrop?: (info: any) => void;
  allowDrop?: (options: any) => boolean;
  dropIndicatorRender?: (props: any) => ReactNode;
  direction?: 'ltr' | 'rtl';
}

interface TreeComponent extends React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<any>> {
  TreeNode: typeof RcTreeNode;
  DirectoryTree: typeof DirectoryTree;
  defaultProps?: Partial<TreeProps>;
}

const Tree = forwardRef<any, TreeProps>((props, ref) => {
  const {
    prefixCls: customPrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    virtual,
    motion,
    ...restProps
  } = props;

  const { getPrefixCls, direction, virtual: contextVirtual } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tree', customPrefixCls);

  const treeClassName = classNames(
    {
      [`${prefixCls}-icon-hide`]: !showIcon,
      [`${prefixCls}-block-node`]: blockNode,
      [`${prefixCls}-unselectable`]: !selectable,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className
  );

  const mergedCheckable = checkable ? (
    <span className={`${prefixCls}-checkbox-inner`} />
  ) : (
    checkable
  );

  const mergedMotion = {
    ...defaultMotion,
    motionAppear: false,
    ...motion,
  };

  const handleRenderSwitcherIcon = (nodeProps: SwitcherIconProps): ReactNode => {
    return renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps);
  };

  return (
    <RcTree
      itemHeight={20}
      ref={ref}
      virtual={virtual ?? contextVirtual}
      {...restProps}
      prefixCls={prefixCls}
      className={treeClassName}
      direction={direction}
      checkable={mergedCheckable}
      selectable={selectable}
      switcherIcon={handleRenderSwitcherIcon}
      showLine={Boolean(showLine)}
      dropIndicatorRender={renderDropIndicator}
      motion={mergedMotion}
      blockNode={blockNode}
    >
      {children}
    </RcTree>
  );
}) as TreeComponent;

Tree.TreeNode = RcTreeNode;
Tree.DirectoryTree = DirectoryTree;

export default Tree;