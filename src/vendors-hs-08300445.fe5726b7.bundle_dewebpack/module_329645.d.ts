/**
 * Pagination component type definitions
 * Provides a flexible pagination UI with customizable options
 */

import React from 'react';

/**
 * Page type indicator for item rendering
 */
export type PageType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

/**
 * Locale configuration for pagination text labels
 */
export interface PaginationLocale {
  /** Text for previous page button */
  prev_page: string;
  /** Text for next page button */
  next_page: string;
  /** Text for jump to previous 5 pages */
  prev_5: string;
  /** Text for jump to next 5 pages */
  next_5: string;
  /** Text for jump to previous 3 pages */
  prev_3: string;
  /** Text for jump to next 3 pages */
  next_3: string;
  /** Text for quick jump input label */
  jump_to: string;
  /** Text for quick jump confirm button */
  jump_to_confirm: string;
  /** Text for page size selector */
  page_size: string;
}

/**
 * Custom item render function signature
 * @param page - The page number to render
 * @param type - The type of pagination item
 * @param element - The default rendered element
 * @returns Custom rendered React element
 */
export type ItemRenderFunction = (
  page: number,
  type: PageType,
  element: React.ReactNode
) => React.ReactNode;

/**
 * Show total items render function signature
 * @param total - Total number of items
 * @param range - Current page range [start, end]
 * @returns Rendered React node displaying total info
 */
export type ShowTotalFunction = (
  total: number,
  range: [number, number]
) => React.ReactNode;

/**
 * Pagination component props interface
 */
export interface PaginationProps {
  /** CSS class prefix for styling */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Total number of items */
  total?: number;
  /** Default initial page number */
  defaultCurrent?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Current active page (controlled) */
  current?: number;
  /** Default number of items per page */
  defaultPageSize?: number;
  /** Current page size (controlled) */
  pageSize?: number;
  /** Callback fired when page changes */
  onChange?: (page: number, pageSize: number) => void;
  /** Hide pagination when there's only one page */
  hideOnSinglePage?: boolean;
  /** Show prev/next jump buttons */
  showPrevNextJumpers?: boolean;
  /** Show quick jumper input */
  showQuickJumper?: boolean | { goButton?: React.ReactNode | boolean };
  /** Show less page items (3 instead of 5) */
  showLessItems?: boolean;
  /** Show title attributes on items */
  showTitle?: boolean;
  /** Show page size changer */
  showSizeChanger?: boolean;
  /** Callback when page size changes */
  onShowSizeChange?: (current: number, size: number) => void;
  /** Locale configuration object */
  locale?: PaginationLocale;
  /** Custom previous page icon */
  prevIcon?: React.ReactNode | ((props: PaginationProps) => React.ReactNode);
  /** Custom next page icon */
  nextIcon?: React.ReactNode | ((props: PaginationProps) => React.ReactNode);
  /** Custom jump previous icon */
  jumpPrevIcon?: React.ReactNode;
  /** Custom jump next icon */
  jumpNextIcon?: React.ReactNode;
  /** Custom item render function */
  itemRender?: ItemRenderFunction;
  /** Show total items renderer */
  showTotal?: ShowTotalFunction;
  /** CSS class prefix for select component */
  selectPrefixCls?: string;
  /** Custom select component class */
  selectComponentClass?: React.ComponentType<any>;
  /** Available page size options */
  pageSizeOptions?: string[];
  /** Show size changer when total exceeds this boundary */
  totalBoundaryShowSizeChanger?: number;
  /** Enable simple mode */
  simple?: boolean;
  /** Quick jumper go button */
  goButton?: React.ReactNode | boolean;
}

/**
 * Pagination component state interface
 */
export interface PaginationState {
  /** Current active page number */
  current: number;
  /** Current input value in quick jumper */
  currentInputValue: number;
  /** Current page size */
  pageSize: number;
}

/**
 * Main Pagination component class
 * A React component providing comprehensive pagination functionality
 * with support for page size changes, quick jumps, and custom rendering
 */
export default class Pagination extends React.Component<
  PaginationProps,
  PaginationState
> {
  /** Default component props */
  static defaultProps: PaginationProps;
  
  /** Static method to compute derived state from props */
  static getDerivedStateFromProps(
    props: PaginationProps,
    state: PaginationState
  ): Partial<PaginationState> | null;

  /** Reference to pagination DOM node */
  paginationNode: HTMLElement | null;

  /**
   * Get the jump previous page number
   * @returns Page number to jump to (current - 3 or current - 5)
   */
  getJumpPrevPage(): number;

  /**
   * Get the jump next page number
   * @returns Page number to jump to (current + 3 or current + 5)
   */
  getJumpNextPage(): number;

  /**
   * Get custom item icon or default button
   * @param icon - Custom icon element or render function
   * @param label - Aria label for accessibility
   * @returns Rendered icon element
   */
  getItemIcon(
    icon: React.ReactNode | ((props: PaginationProps) => React.ReactNode),
    label: string
  ): React.ReactNode;

  /**
   * Save reference to pagination DOM node
   * @param node - The pagination container element
   */
  savePaginationNode(node: HTMLElement | null): void;

  /**
   * Check if page number is valid
   * @param page - Page number to validate
   * @returns True if page is valid and different from current
   */
  isValid(page: number): boolean;

  /**
   * Determine if quick jumper should be displayed
   * @returns True if quick jumper should show
   */
  shouldDisplayQuickJumper(): boolean;

  /**
   * Handle keydown events in quick jumper input
   * @param event - Keyboard event
   */
  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * Handle keyup events in quick jumper input
   * @param event - Keyboard event
   */
  handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * Handle blur event on quick jumper input
   * @param event - Focus event
   */
  handleBlur(event: React.FocusEvent<HTMLInputElement>): void;

  /**
   * Change current page size
   * @param size - New page size
   */
  changePageSize(size: number): void;

  /**
   * Handle page change
   * @param page - Target page number
   * @returns The actual page number changed to
   */
  handleChange(page: number): number;

  /**
   * Navigate to previous page
   */
  prev(): void;

  /**
   * Navigate to next page
   */
  next(): void;

  /**
   * Jump to previous section (5 or 3 pages)
   */
  jumpPrev(): void;

  /**
   * Jump to next section (5 or 3 pages)
   */
  jumpNext(): void;

  /**
   * Check if previous page is available
   * @returns True if can go to previous page
   */
  hasPrev(): boolean;

  /**
   * Check if next page is available
   * @returns True if can go to next page
   */
  hasNext(): boolean;

  /**
   * Execute callback if Enter key is pressed
   * @param event - Keyboard event
   * @param callback - Function to execute
   * @param args - Additional arguments for callback
   */
  runIfEnter(
    event: React.KeyboardEvent,
    callback: (...args: any[]) => void,
    ...args: any[]
  ): void;

  /**
   * Run prev() if Enter is pressed
   * @param event - Keyboard event
   */
  runIfEnterPrev(event: React.KeyboardEvent): void;

  /**
   * Run next() if Enter is pressed
   * @param event - Keyboard event
   */
  runIfEnterNext(event: React.KeyboardEvent): void;

  /**
   * Run jumpPrev() if Enter is pressed
   * @param event - Keyboard event
   */
  runIfEnterJumpPrev(event: React.KeyboardEvent): void;

  /**
   * Run jumpNext() if Enter is pressed
   * @param event - Keyboard event
   */
  runIfEnterJumpNext(event: React.KeyboardEvent): void;

  /**
   * Handle quick jumper go button action
   * @param event - Mouse or keyboard event
   */
  handleGoTO(event: React.MouseEvent | React.KeyboardEvent): void;

  /**
   * Get valid page number from input
   * @param event - Input change event
   * @returns Valid page number
   */
  getValidValue(event: React.ChangeEvent<HTMLInputElement>): number | string;

  /**
   * Determine if size changer should be shown
   * @returns True if size changer should display
   */
  getShowSizeChanger(): boolean;

  /**
   * Render previous page button
   * @param prevPage - Previous page number
   * @returns Rendered previous button element
   */
  renderPrev(prevPage: number): React.ReactNode;

  /**
   * Render next page button
   * @param nextPage - Next page number
   * @returns Rendered next button element
   */
  renderNext(nextPage: number): React.ReactNode;
}