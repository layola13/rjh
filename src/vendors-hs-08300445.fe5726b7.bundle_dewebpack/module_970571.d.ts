/**
 * Pagination options component
 * Provides page size selection and quick jump functionality
 */

import React, { Component, ChangeEvent, KeyboardEvent, MouseEvent, FocusEvent } from 'react';

/**
 * Locale configuration for internationalization
 */
export interface PaginationLocale {
  /** Text for items per page, e.g., "items per page" */
  items_per_page: string;
  /** Label for jump to page, e.g., "Go to" */
  jump_to: string;
  /** Confirmation text for jump button, e.g., "Go" */
  jump_to_confirm: string;
  /** Label for page input */
  page: string;
  /** Accessible label for page size selector */
  page_size: string;
}

/**
 * Select component props interface
 */
export interface SelectComponentProps {
  disabled?: boolean;
  prefixCls?: string;
  showSearch?: boolean;
  className?: string;
  optionLabelProp?: string;
  dropdownMatchSelectWidth?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  'aria-label'?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

/**
 * Select component with Option subcomponent
 */
export interface SelectComponent extends React.ComponentType<SelectComponentProps> {
  Option: React.ComponentType<{
    key: number;
    value: string;
    children?: React.ReactNode;
  }>;
}

/**
 * Props for the pagination options component
 */
export interface PaginationOptionsProps {
  /** Current page size */
  pageSize: number;
  /** Available page size options */
  pageSizeOptions?: string[];
  /** Locale configuration */
  locale: PaginationLocale;
  /** CSS class prefix */
  rootPrefixCls: string;
  /** Callback when page size changes */
  changeSize?: (size: number) => void;
  /** Callback for quick jump to page */
  quickGo?: (page: number | undefined) => void;
  /** Go button configuration (true for default button, custom element, or false) */
  goButton?: boolean | React.ReactNode;
  /** Select component class */
  selectComponentClass?: SelectComponent;
  /** Custom function to build option text */
  buildOptionText?: (pageSize: number) => string;
  /** CSS class prefix for select component */
  selectPrefixCls?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Component state
 */
export interface PaginationOptionsState {
  /** Input text for quick jump */
  goInputText: string;
}

/**
 * Pagination options component
 * Renders page size selector and quick jump input
 */
export default class PaginationOptions extends Component<
  PaginationOptionsProps,
  PaginationOptionsState
> {
  /**
   * Default page size options
   */
  static defaultProps: Partial<PaginationOptionsProps>;

  /**
   * Component state
   */
  state: PaginationOptionsState;

  /**
   * Build option text for page size selector
   * @param pageSize - The page size value
   * @returns Formatted text for the option
   */
  buildOptionText(pageSize: number): string;

  /**
   * Handle page size change
   * @param value - New page size as string
   */
  changeSize(value: string): void;

  /**
   * Handle input text change
   * @param event - Change event from input element
   */
  handleChange(event: ChangeEvent<HTMLInputElement>): void;

  /**
   * Handle input blur event
   * @param event - Focus event from input element
   */
  handleBlur(event: FocusEvent<HTMLInputElement>): void;

  /**
   * Handle go action (Enter key or button click)
   * @param event - Keyboard or mouse event
   */
  go(event: KeyboardEvent<HTMLInputElement | HTMLButtonElement | HTMLSpanElement> | MouseEvent<HTMLButtonElement | HTMLSpanElement>): void;

  /**
   * Get valid page number from input text
   * @returns Valid page number or undefined
   */
  getValidValue(): number | undefined;

  /**
   * Get normalized page size options including current page size
   * @returns Sorted array of page size options
   */
  getPageSizeOptions(): string[];

  /**
   * Render the component
   */
  render(): React.ReactElement | null;
}