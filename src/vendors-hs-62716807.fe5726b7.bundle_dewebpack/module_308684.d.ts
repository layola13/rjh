/**
 * Ant Design Select Component Type Definitions
 * A wrapper around rc-select with Ant Design styling and enhancements
 */

import type { ReactNode, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { BaseSelectRef, BaseSelectProps, OptGroupProps, OptionProps } from 'rc-select';

/**
 * Size variants for the Select component
 */
export type SelectSize = 'small' | 'middle' | 'large';

/**
 * Select mode types
 */
export type SelectMode = 'multiple' | 'tags' | undefined;

/**
 * Internal secret combobox mode (deprecated)
 */
declare const SECRET_COMBOBOX_MODE_DO_NOT_USE: 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

/**
 * Props for the Select component
 */
export interface SelectProps<ValueType = any> extends Omit<BaseSelectProps<ValueType>, 'mode' | 'inputIcon' | 'menuItemSelectedIcon' | 'removeIcon' | 'clearIcon'> {
  /**
   * Class name prefix for styling
   * @default 'ant-select'
   */
  prefixCls?: string;

  /**
   * Whether to show border
   * @default true
   */
  bordered?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Parent container for dropdown
   * @returns HTMLElement to mount dropdown
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Additional CSS class for dropdown
   */
  dropdownClassName?: string;

  /**
   * Height of dropdown list
   * @default 256
   */
  listHeight?: number;

  /**
   * Height of each list item
   * @default 24
   */
  listItemHeight?: number;

  /**
   * Size of the select input
   */
  size?: SelectSize;

  /**
   * Content to show when no options match
   */
  notFoundContent?: ReactNode;

  /**
   * CSS transition name for dropdown animation
   * @default 'slide-up'
   */
  transitionName?: string;

  /**
   * Select mode: multiple selection or tags
   */
  mode?: SelectMode | typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;

  /**
   * Custom suffix icon
   */
  suffixIcon?: ReactNode;

  /**
   * Custom icon for selected items
   */
  itemIcon?: ReactNode;

  /**
   * Custom remove icon for tags/multiple mode
   */
  removeIcon?: ReactNode;

  /**
   * Custom clear icon
   */
  clearIcon?: ReactNode;
}

/**
 * Select component with Option and OptGroup static properties
 */
export interface SelectComponent extends ForwardRefExoticComponent<SelectProps & RefAttributes<BaseSelectRef>> {
  /**
   * @deprecated Internal use only - legacy combobox mode
   */
  SECRET_COMBOBOX_MODE_DO_NOT_USE: typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;

  /**
   * Select.Option component for defining options
   */
  Option: React.FC<OptionProps>;

  /**
   * Select.OptGroup component for grouping options
   */
  OptGroup: React.FC<OptGroupProps>;
}

/**
 * Ant Design Select Component
 * 
 * A select component with dropdown for choosing values from a list.
 * Supports single/multiple selection, searching, grouping, and customization.
 * 
 * @example
 *