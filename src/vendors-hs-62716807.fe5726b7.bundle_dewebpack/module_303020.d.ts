import * as React from 'react';
import { RowProps } from 'antd/lib/grid/row';
import { PaginationProps } from 'antd/lib/pagination';
import { SpinProps } from 'antd/lib/spin';

/**
 * List item layout direction
 */
export type ListItemLayout = 'horizontal' | 'vertical';

/**
 * List component size
 */
export type ListSize = 'default' | 'large' | 'small';

/**
 * Pagination position in list
 */
export type PaginationPosition = 'top' | 'bottom' | 'both';

/**
 * Grid configuration for list items
 */
export interface ListGridType {
  gutter?: number;
  column?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

/**
 * Locale strings for List component
 */
export interface ListLocale {
  emptyText?: React.ReactNode;
}

/**
 * Context value provided to List children
 */
export interface ListContextValue {
  grid?: ListGridType;
  itemLayout?: ListItemLayout;
}

/**
 * List component props
 */
export interface ListProps<T = any> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Whether to show border around the list */
  bordered?: boolean;
  
  /** Custom CSS class name */
  className?: string;
  
  /** List children elements */
  children?: React.ReactNode;
  
  /** Data source for list items */
  dataSource?: T[];
  
  /** Additional footer content */
  footer?: React.ReactNode;
  
  /** Grid layout configuration */
  grid?: ListGridType;
  
  /** Additional header content */
  header?: React.ReactNode;
  
  /** Layout direction of list items */
  itemLayout?: ListItemLayout;
  
  /** Loading state or spin configuration */
  loading?: boolean | SpinProps;
  
  /** Load more content, displayed below the list */
  loadMore?: React.ReactNode;
  
  /** Locale text configuration */
  locale?: ListLocale;
  
  /** Pagination configuration */
  pagination?: false | PaginationProps & {
    position?: PaginationPosition;
  };
  
  /** Prefix for CSS classes */
  prefixCls?: string;
  
  /** Custom render function for each item */
  renderItem?: (item: T, index: number) => React.ReactNode;
  
  /** Unique key extractor for items */
  rowKey?: string | ((item: T) => string);
  
  /** Size of the list */
  size?: ListSize;
  
  /** Whether to show split line between items */
  split?: boolean;
}

/**
 * List component with Item subcomponent
 */
export interface ListComponent extends React.FC<ListProps> {
  Item: typeof ListItem;
}

/**
 * List Item component props
 */
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode[];
  extra?: React.ReactNode;
  prefixCls?: string;
}

/**
 * List Item subcomponent
 */
declare const ListItem: React.FC<ListItemProps>;

/**
 * React Context for List component
 */
export const ListContext: React.Context<ListContextValue>;

/**
 * Consumer component for List context
 */
export const ListConsumer: React.Consumer<ListContextValue>;

/**
 * Ant Design List component
 * 
 * @description Displays a list of data with optional pagination, grid layout, and loading states
 * 
 * @example
 *