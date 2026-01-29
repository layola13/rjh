import React, { useContext, forwardRef, ForwardRefRenderFunction } from 'react';
import classNames from 'classnames';
import RcTreeSelect, { TreeNode as RcTreeNode, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from 'rc-tree-select';
import { ConfigContext } from './ConfigContext';
import { SizeContext } from './SizeContext';
import { getTransitionName } from './motion';
import { omit } from './omit';
import { getIcons } from './getIcons';
import { renderSwitcherIcon } from './renderSwitcherIcon';
import { warning } from './warning';

export { TreeNode } from 'rc-tree-select';

type SizeType = 'small' | 'middle' | 'large';

interface TreeSelectProps {
  prefixCls?: string;
  size?: SizeType;
  bordered?: boolean;
  className?: string;
  treeCheckable?: boolean | React.ReactNode;
  multiple?: boolean;
  listHeight?: number;
  listItemHeight?: number;
  notFoundContent?: React.ReactNode;
  switcherIcon?: React.ReactNode | ((props: any) => React.ReactNode);
  treeLine?: boolean;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  dropdownClassName?: string;
  treeIcon?: boolean;
  transitionName?: string;
  choiceTransitionName?: string;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  itemIcon?: React.ReactNode;
  [key: string]: any;
}

const InternalTreeSelect: ForwardRefRenderFunction<unknown, TreeSelectProps> = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    bordered = true,
    className,
    treeCheckable,
    multiple,
    listHeight = 256,
    listItemHeight = 26,
    notFoundContent,
    switcherIcon,
    treeLine,
    getPopupContainer: customizeGetPopupContainer,
    dropdownClassName,
    treeIcon = false,
    transitionName = 'slide-up',
    choiceTransitionName = '',
    ...restProps
  } = props;

  const {
    getPopupContainer: contextGetPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  } = useContext(ConfigContext);

  const sizeContext = useContext(SizeContext);

  warning(
    multiple !== false || !treeCheckable,
    'TreeSelect',
    '`multiple` will always be `true` when `treeCheckable` is true'
  );

  const selectPrefixCls = getPrefixCls('select', customizePrefixCls);
  const treePrefixCls = getPrefixCls('select-tree', customizePrefixCls);
  const treeSelectPrefixCls = getPrefixCls('tree-select', customizePrefixCls);

  const mergedDropdownClassName = classNames(
    dropdownClassName,
    `${treeSelectPrefixCls}-dropdown`,
    {
      [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === 'rtl',
    }
  );

  const isMultiple = treeCheckable || multiple || false;

  const mergedIcons = getIcons({
    ...restProps,
    multiple: isMultiple,
    prefixCls: selectPrefixCls,
  });

  const { suffixIcon, removeIcon, clearIcon } = mergedIcons;

  const mergedNotFoundContent = notFoundContent !== undefined ? notFoundContent : renderEmpty('Select');

  const omittedProps = omit(restProps, [
    'suffixIcon',
    'itemIcon',
    'removeIcon',
    'clearIcon',
    'switcherIcon',
  ]);

  const mergedSize = customizeSize || sizeContext;

  const mergedClassName = classNames(
    !customizePrefixCls && treeSelectPrefixCls,
    {
      [`${selectPrefixCls}-lg`]: mergedSize === 'large',
      [`${selectPrefixCls}-sm`]: mergedSize === 'small',
      [`${selectPrefixCls}-rtl`]: direction === 'rtl',
      [`${selectPrefixCls}-borderless`]: !bordered,
    },
    className
  );

  const mergedTreeCheckable = treeCheckable
    ? React.createElement('span', {
        className: `${selectPrefixCls}-tree-checkbox-inner`,
      })
    : treeCheckable;

  const renderSwitcherIconNode = (nodeProps: any): React.ReactNode => {
    return renderSwitcherIcon(treePrefixCls, switcherIcon, treeLine, nodeProps);
  };

  const mergedGetPopupContainer = customizeGetPopupContainer || contextGetPopupContainer;

  return (
    <RcTreeSelect
      virtual={virtual}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...omittedProps}
      ref={ref}
      prefixCls={selectPrefixCls}
      className={mergedClassName}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
      treeCheckable={mergedTreeCheckable}
      inputIcon={suffixIcon}
      multiple={multiple}
      removeIcon={removeIcon}
      clearIcon={clearIcon}
      switcherIcon={renderSwitcherIconNode}
      showTreeIcon={treeIcon}
      notFoundContent={mergedNotFoundContent}
      getPopupContainer={mergedGetPopupContainer}
      treeMotion={null}
      dropdownClassName={mergedDropdownClassName}
      choiceTransitionName={choiceTransitionName}
      transitionName={transitionName}
    />
  );
};

const TreeSelect = forwardRef<unknown, TreeSelectProps>(InternalTreeSelect);

TreeSelect.displayName = 'TreeSelect';

export interface TreeSelectComponent extends React.ForwardRefExoticComponent<TreeSelectProps & React.RefAttributes<unknown>> {
  TreeNode: typeof RcTreeNode;
  SHOW_ALL: typeof SHOW_ALL;
  SHOW_PARENT: typeof SHOW_PARENT;
  SHOW_CHILD: typeof SHOW_CHILD;
}

(TreeSelect as TreeSelectComponent).TreeNode = RcTreeNode;
(TreeSelect as TreeSelectComponent).SHOW_ALL = SHOW_ALL;
(TreeSelect as TreeSelectComponent).SHOW_PARENT = SHOW_PARENT;
(TreeSelect as TreeSelectComponent).SHOW_CHILD = SHOW_CHILD;

export default TreeSelect as TreeSelectComponent;