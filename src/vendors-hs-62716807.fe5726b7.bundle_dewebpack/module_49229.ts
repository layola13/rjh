import * as React from 'react';
import DownOutlined from './DownOutlined';
import LoadingOutlined from './LoadingOutlined';
import CheckOutlined from './CheckOutlined';
import CloseOutlined from './CloseOutlined';
import CloseCircleFilled from './CloseCircleFilled';
import SearchOutlined from './SearchOutlined';

interface IconConfig {
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  loading?: boolean;
  multiple?: boolean;
  prefixCls?: string;
}

interface IconResult {
  clearIcon: React.ReactNode;
  suffixIcon: React.ReactNode | ((props: SuffixIconProps) => React.ReactNode);
  itemIcon: React.ReactNode | null;
  removeIcon: React.ReactNode;
}

interface SuffixIconProps {
  open: boolean;
  showSearch: boolean;
}

export default function getIcons(config: IconConfig): IconResult {
  const {
    suffixIcon,
    clearIcon,
    menuItemSelectedIcon,
    removeIcon,
    loading,
    multiple,
    prefixCls
  } = config;

  let resolvedClearIcon: React.ReactNode;
  if (clearIcon) {
    resolvedClearIcon = clearIcon;
  } else {
    resolvedClearIcon = React.createElement(CloseCircleFilled);
  }

  let resolvedSuffixIcon: React.ReactNode | ((props: SuffixIconProps) => React.ReactNode);
  if (suffixIcon !== undefined) {
    resolvedSuffixIcon = suffixIcon;
  } else if (loading) {
    resolvedSuffixIcon = React.createElement(LoadingOutlined, { spin: true });
  } else {
    const suffixClassName = `${prefixCls}-suffix`;
    resolvedSuffixIcon = (props: SuffixIconProps): React.ReactNode => {
      const { open, showSearch } = props;
      if (open && showSearch) {
        return React.createElement(SearchOutlined, { className: suffixClassName });
      }
      return React.createElement(DownOutlined, { className: suffixClassName });
    };
  }

  let resolvedItemIcon: React.ReactNode | null;
  if (menuItemSelectedIcon !== undefined) {
    resolvedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    resolvedItemIcon = React.createElement(CheckOutlined);
  } else {
    resolvedItemIcon = null;
  }

  let resolvedRemoveIcon: React.ReactNode;
  if (removeIcon !== undefined) {
    resolvedRemoveIcon = removeIcon;
  } else {
    resolvedRemoveIcon = React.createElement(CloseOutlined);
  }

  return {
    clearIcon: resolvedClearIcon,
    suffixIcon: resolvedSuffixIcon,
    itemIcon: resolvedItemIcon,
    removeIcon: resolvedRemoveIcon
  };
}