/**
 * Pagination Component Type Definitions
 * 分页组件类型定义
 */

import type { ReactNode } from 'react';

/**
 * Pagination locale configuration
 * 分页组件国际化配置
 */
interface PaginationLocale {
  /** Text for items per page */
  items_per_page?: string;
  /** Text for jump to page */
  jump_to?: string;
  /** Text for jump to confirm */
  jump_to_confirm?: string;
  /** Text for page */
  page?: string;
  /** Text for previous page */
  prev_page?: string;
  /** Text for next page */
  next_page?: string;
  /** Text for previous 5 pages */
  prev_5?: string;
  /** Text for next 5 pages */
  next_5?: string;
  /** Text for previous 3 pages */
  prev_3?: string;
  /** Text for next 3 pages */
  next_3?: string;
  /** Total text template */
  page_size?: string;
}

/**
 * Pagination size type
 * 分页组件尺寸类型
 */
type PaginationSize = 'default' | 'small';

/**
 * Pagination component props
 * 分页组件属性
 */
interface PaginationProps {
  /** Current page number */
  current?: number;
  /** Default current page number */
  defaultCurrent?: number;
  /** Total number of data items */
  total?: number;
  /** Default number of data items per page */
  defaultPageSize?: number;
  /** Number of data items per page */
  pageSize?: number;
  /** Determine whether pageSize can be changed */
  showSizeChanger?: boolean;
  /** Specify the sizeChanger options */
  pageSizeOptions?: string[] | number[];
  /** Called when the page number or pageSize is changed */
  onChange?: (page: number, pageSize: number) => void;
  /** Called when pageSize is changed */
  onShowSizeChange?: (current: number, size: number) => void;
  /** Whether to hide pagination on single page */
  hideOnSinglePage?: boolean;
  /** Whether to show quick jumper */
  showQuickJumper?: boolean | { goButton?: ReactNode };
  /** Whether to show total */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  /** Specify the size of Pagination */
  size?: PaginationSize;
  /** Whether to use simple mode */
  simple?: boolean;
  /** Additional style */
  style?: React.CSSProperties;
  /** Additional class name */
  className?: string;
  /** Custom locale */
  locale?: PaginationLocale;
  /** Class name prefix */
  prefixCls?: string;
  /** Select component class name prefix */
  selectPrefixCls?: string;
  /** Item render function */
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: ReactNode
  ) => ReactNode;
  /** Custom previous icon */
  prevIcon?: ReactNode;
  /** Custom next icon */
  nextIcon?: ReactNode;
  /** Custom jump previous icon */
  jumpPrevIcon?: ReactNode;
  /** Custom jump next icon */
  jumpNextIcon?: ReactNode;
  /** Show less page items */
  showLessItems?: boolean;
  /** Whether to show title */
  showTitle?: boolean;
  /** Whether to be disabled */
  disabled?: boolean;
  /** Whether to adapt to responsive layout */
  responsive?: boolean;
}

/**
 * Pagination component
 * 分页组件
 * 
 * @example
 *