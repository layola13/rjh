/**
 * Pagination component type definitions
 * Provides a customizable pagination UI component with locale support
 */

import type { ConfigConsumerProps } from './ConfigContext';
import type { Locale } from './LocaleProvider';
import type { SizeType } from './SizeContext';

/**
 * Pagination component props
 */
export interface PaginationProps {
  /**
   * Custom CSS class prefix for pagination elements
   * @default 'ant-pagination'
   */
  prefixCls?: string;

  /**
   * Custom CSS class prefix for select dropdown
   * @default 'ant-select'
   */
  selectPrefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Size of pagination component
   * @default 'default'
   */
  size?: SizeType;

  /**
   * Locale configuration for internationalization
   */
  locale?: PaginationLocale;

  /**
   * Total number of items
   */
  total?: number;

  /**
   * Current page number
   */
  current?: number;

  /**
   * Default current page number
   */
  defaultCurrent?: number;

  /**
   * Number of items per page
   */
  pageSize?: number;

  /**
   * Default number of items per page
   */
  defaultPageSize?: number;

  /**
   * Callback when page number or pageSize changes
   */
  onChange?: (page: number, pageSize: number) => void;

  /**
   * Whether to hide pagination when there is only one page
   */
  hideOnSinglePage?: boolean;

  /**
   * Whether to show size changer
   */
  showSizeChanger?: boolean;

  /**
   * Specify page size options
   */
  pageSizeOptions?: string[] | number[];

  /**
   * Callback when pageSize changes
   */
  onShowSizeChange?: (current: number, size: number) => void;

  /**
   * Whether to show quick jumper
   */
  showQuickJumper?: boolean | { goButton?: React.ReactNode };

  /**
   * Whether to show total items count
   */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;

  /**
   * Whether pagination is disabled
   */
  disabled?: boolean;

  /**
   * Whether to enable responsive behavior on mobile
   */
  responsive?: boolean;

  /**
   * Whether to show fewer page items
   */
  simple?: boolean;

  /**
   * Custom item renderer
   */
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement
  ) => React.ReactNode;

  /**
   * Text direction (LTR/RTL)
   */
  direction?: 'ltr' | 'rtl';
}

/**
 * Locale strings for pagination component
 */
export interface PaginationLocale {
  /**
   * Text for items per page selector
   */
  items_per_page?: string;

  /**
   * Text for jump to page input
   */
  jump_to?: string;

  /**
   * Text after jump to page input
   */
  jump_to_confirm?: string;

  /**
   * Text for current page indicator
   */
  page?: string;

  /**
   * Aria label for previous page button
   */
  prev_page?: string;

  /**
   * Aria label for next page button
   */
  next_page?: string;

  /**
   * Aria label for previous 5 pages button
   */
  prev_5?: string;

  /**
   * Aria label for next 5 pages button
   */
  next_5?: string;

  /**
   * Aria label for previous 3 pages button
   */
  prev_3?: string;

  /**
   * Aria label for next 3 pages button
   */
  next_3?: string;
}

/**
 * Internal pagination configuration with icons
 */
interface PaginationConfig extends PaginationProps {
  /**
   * Custom previous page icon
   */
  prevIcon?: React.ReactNode;

  /**
   * Custom next page icon
   */
  nextIcon?: React.ReactNode;

  /**
   * Custom jump to previous pages icon
   */
  jumpPrevIcon?: React.ReactNode;

  /**
   * Custom jump to next pages icon
   */
  jumpNextIcon?: React.ReactNode;

  /**
   * Select component class (desktop or mobile)
   */
  selectComponentClass?: React.ComponentType<any>;
}

/**
 * Pagination component
 * Displays page navigation with configurable options
 */
declare const Pagination: React.FC<PaginationProps>;

export default Pagination;