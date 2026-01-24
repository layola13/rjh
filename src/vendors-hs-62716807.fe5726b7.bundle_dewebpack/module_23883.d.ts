/**
 * Ant Design Select Component
 * A comprehensive dropdown/select component with support for single, multiple, tags, and combobox modes.
 */

import type { ReactElement, RefObject, CSSProperties, ReactNode } from 'react';
import type { BaseSelectRef } from 'rc-select';

/**
 * Select component size variants
 */
export type SelectSize = 'small' | 'middle' | 'large';

/**
 * Select component mode
 */
export type SelectMode = 'multiple' | 'tags' | 'combobox' | undefined;

/**
 * Internal secret mode constant - DO NOT USE in production
 * @internal
 */
export const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

/**
 * Select option item configuration
 */
export interface SelectOption<ValueType = any> {
  label: ReactNode;
  value: ValueType;
  disabled?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Select component props
 */
export interface SelectProps<ValueType = any, OptionType extends SelectOption<ValueType> = SelectOption<ValueType>> {
  /**
   * CSS class name prefix for the select component
   * @default 'ant-select'
   */
  prefixCls?: string;

  /**
   * Whether to display border
   * @default true
   */
  bordered?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Parent node which the selector should be rendered to
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Additional CSS class name for dropdown menu
   */
  dropdownClassName?: string;

  /**
   * Height of dropdown list in pixels
   * @default 256
   */
  listHeight?: number;

  /**
   * Height of each item in dropdown list in pixels
   * @default 24
   */
  listItemHeight?: number;

  /**
   * Size of the select component
   */
  size?: SelectSize;

  /**
   * Content to display when no results are found
   */
  notFoundContent?: ReactNode;

  /**
   * CSS transition name for dropdown animation
   * @default 'slide-up'
   */
  transitionName?: string;

  /**
   * Select mode: single, multiple, tags, or combobox
   */
  mode?: SelectMode | typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;

  /**
   * Custom suffix icon
   */
  suffixIcon?: ReactNode;

  /**
   * Custom icon for selected menu items
   */
  itemIcon?: ReactNode;

  /**
   * Custom icon for removing tags in multiple/tags mode
   */
  removeIcon?: ReactNode;

  /**
   * Custom clear icon
   */
  clearIcon?: ReactNode;

  /**
   * Whether to enable virtual scrolling
   */
  virtual?: boolean;

  /**
   * Whether dropdown width should match select width
   */
  dropdownMatchSelectWidth?: boolean | number;

  /**
   * Text direction
   */
  direction?: 'ltr' | 'rtl';

  /**
   * Current selected value
   */
  value?: ValueType | ValueType[];

  /**
   * Default selected value
   */
  defaultValue?: ValueType | ValueType[];

  /**
   * Options data
   */
  options?: OptionType[];

  /**
   * Whether the select is disabled
   */
  disabled?: boolean;

  /**
   * Whether the select is loading
   */
  loading?: boolean;

  /**
   * Whether to allow clear
   */
  allowClear?: boolean;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Callback when value changes
   */
  onChange?: (value: ValueType | ValueType[], option: OptionType | OptionType[]) => void;

  /**
   * Callback when dropdown visibility changes
   */
  onDropdownVisibleChange?: (open: boolean) => void;

  /**
   * Callback when search input changes
   */
  onSearch?: (value: string) => void;

  /**
   * Callback when an option is selected
   */
  onSelect?: (value: ValueType, option: OptionType) => void;

  /**
   * Callback when an option is deselected
   */
  onDeselect?: (value: ValueType, option: OptionType) => void;

  /**
   * Whether to show search input
   */
  showSearch?: boolean;

  /**
   * Filter option by input value
   */
  filterOption?: boolean | ((inputValue: string, option?: OptionType) => boolean);

  /**
   * Maximum tag count to show in multiple/tags mode
   */
  maxTagCount?: number | 'responsive';

  /**
   * Max tag placeholder when tag count exceeds maxTagCount
   */
  maxTagPlaceholder?: ReactNode | ((omittedValues: ValueType[]) => ReactNode);
}

/**
 * Select Option component props
 */
export interface OptionProps {
  value: any;
  label?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Select OptGroup component props
 */
export interface OptGroupProps {
  label?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Internal Select component with forwarded ref
 */
export interface InternalSelectType extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<BaseSelectRef>> {
  /**
   * Secret combobox mode constant - DO NOT USE
   * @internal
   */
  SECRET_COMBOBOX_MODE_DO_NOT_USE: typeof SECRET_COMBOBOX_MODE_DO_NOT_USE;

  /**
   * Select Option component
   */
  Option: React.FC<OptionProps>;

  /**
   * Select OptGroup component
   */
  OptGroup: React.FC<OptGroupProps>;
}

/**
 * Ant Design Select Component
 * 
 * A versatile dropdown selection component supporting:
 * - Single selection
 * - Multiple selection
 * - Tag input mode
 * - Searchable options
 * - Custom rendering
 * - Virtual scrolling for large datasets
 * 
 * @example
 *