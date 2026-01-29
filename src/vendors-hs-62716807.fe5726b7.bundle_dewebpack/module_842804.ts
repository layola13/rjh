import CheckOutlined from './CheckOutlined';
import CloseOutlined from './CloseOutlined';
import CloseCircleFilled from './CloseCircleFilled';
import LoadingOutlined from './LoadingOutlined';
import DownOutlined from './DownOutlined';
import SearchOutlined from './SearchOutlined';
import React from 'react';

interface SelectIconsProps {
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  loading?: boolean;
  multiple?: boolean;
  prefixCls: string;
}

interface SelectIcons {
  clearIcon: React.ReactNode;
  suffixIcon: React.ReactNode | ((props: SuffixIconProps) => React.ReactNode);
  itemIcon: React.ReactNode;
  removeIcon: React.ReactNode;
}

interface SuffixIconProps {
  open: boolean;
  showSearch: boolean;
}

export default function getSelectIcons(props: SelectIconsProps): SelectIcons {
  const {
    suffixIcon,
    clearIcon,
    menuItemSelectedIcon,
    removeIcon,
    loading,
    multiple,
    prefixCls
  } = props;

  let resolvedClearIcon: React.ReactNode = clearIcon;
  if (!clearIcon) {
    resolvedClearIcon = React.createElement(CloseCircleFilled, null);
  }

  let resolvedSuffixIcon: React.ReactNode | ((props: SuffixIconProps) => React.ReactNode) = null;
  if (suffixIcon !== undefined) {
    resolvedSuffixIcon = suffixIcon;
  } else if (loading) {
    resolvedSuffixIcon = React.createElement(LoadingOutlined, { spin: true });
  } else {
    const suffixClassName = `${prefixCls}-suffix`;
    resolvedSuffixIcon = (iconProps: SuffixIconProps): React.ReactNode => {
      const { open, showSearch } = iconProps;
      return open && showSearch
        ? React.createElement(SearchOutlined, { className: suffixClassName })
        : React.createElement(DownOutlined, { className: suffixClassName });
    };
  }

  let resolvedItemIcon: React.ReactNode = null;
  if (menuItemSelectedIcon !== undefined) {
    resolvedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    resolvedItemIcon = React.createElement(CheckOutlined, null);
  }

  let resolvedRemoveIcon: React.ReactNode = null;
  if (removeIcon !== undefined) {
    resolvedRemoveIcon = removeIcon;
  } else {
    resolvedRemoveIcon = React.createElement(CloseOutlined, null);
  }

  return {
    clearIcon: resolvedClearIcon,
    suffixIcon: resolvedSuffixIcon,
    itemIcon: resolvedItemIcon,
    removeIcon: resolvedRemoveIcon
  };
}