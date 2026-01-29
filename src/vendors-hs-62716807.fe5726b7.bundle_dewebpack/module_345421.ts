import React from 'react';
import classNames from 'classnames';
import LoadingIcon from './LoadingIcon';
import LeafLineIcon from './LeafLineIcon';
import ExpandIcon from './ExpandIcon';
import CollapseIcon from './CollapseIcon';
import DefaultSwitcherIcon from './DefaultSwitcherIcon';

interface ShowLeafIcon {
  showLeafIcon?: boolean;
}

interface SwitcherIconOptions {
  isLeaf: boolean;
  expanded: boolean;
  loading?: boolean;
}

type TreeLineConfig = boolean | ShowLeafIcon;

export default function renderSwitcherIcon(
  prefixCls: string,
  switcherIcon: React.ReactNode,
  treeLine: TreeLineConfig,
  options: SwitcherIconOptions
): React.ReactNode {
  const { isLeaf, expanded, loading } = options;

  if (loading) {
    return <LoadingIcon className={`${prefixCls}-switcher-loading-icon`} />;
  }

  let showLeafIcon: boolean | undefined;
  if (treeLine && typeof treeLine === 'object') {
    showLeafIcon = treeLine.showLeafIcon;
  }

  if (isLeaf) {
    if (!treeLine) {
      return null;
    }

    if (typeof treeLine !== 'object' || showLeafIcon) {
      return <LeafLineIcon className={`${prefixCls}-switcher-line-icon`} />;
    }

    return <span className={`${prefixCls}-switcher-leaf-line`} />;
  }

  const switcherIconClassName = `${prefixCls}-switcher-icon`;

  if (React.isValidElement(switcherIcon)) {
    return React.cloneElement(switcherIcon, {
      className: classNames(switcherIcon.props.className ?? '', switcherIconClassName),
    });
  }

  if (switcherIcon) {
    return switcherIcon;
  }

  if (treeLine) {
    return expanded
      ? <ExpandIcon className={`${prefixCls}-switcher-line-icon`} />
      : <CollapseIcon className={`${prefixCls}-switcher-line-icon`} />;
  }

  return <DefaultSwitcherIcon className={switcherIconClassName} />;
}