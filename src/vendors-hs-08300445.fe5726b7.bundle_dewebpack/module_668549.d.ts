/**
 * Overflow component for handling items that exceed container width
 * Supports responsive behavior and custom rendering
 */

import type { CSSProperties, ReactNode, ReactElement, ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Context value provided to overflow items
 */
export interface OverflowContextValue<ItemType = any> {
  /** CSS prefix for overflow items */
  prefixCls: string;
  /** Whether responsive mode is enabled */
  responsive: boolean;
  /** Custom component for rendering items */
  component?: ComponentType<any>;
  /** Whether to invalidate overflow calculations */
  invalidate: boolean;
  /** Display order of the item */
  order: number;
  /** The actual item data */
  item: ItemType;
  /** Unique key for the item */
  itemKey: string | number;
  /** Callback to register item size */
  registerSize: (key: string | number, width: number) => void;
  /** Whether the item should be displayed */
  display: boolean;
}

export const OverflowContext: React.Context<OverflowContextValue>;

/**
 * Key extractor function type
 */
export type ItemKeyExtractor<ItemType = any> = (item: ItemType) => string | number;

/**
 * Item renderer function type
 */
export type ItemRenderer<ItemType = any> = (item: ItemType) => ReactNode;

/**
 * Raw item renderer function type (with index)
 */
export type RawItemRenderer<ItemType = any> = (item: ItemType, index: number) => ReactElement;

/**
 * Rest items renderer function type
 */
export type RestRenderer<ItemType = any> = (items: ItemType[]) => ReactNode;

/**
 * Visibility change callback type
 */
export type VisibilityChangeHandler = (visibleCount: number) => void;

/**
 * Resize callback type
 */
export type ResizeHandler = (element: HTMLElement, size: { clientWidth: number }) => void;

/**
 * Props for the Overflow component
 */
export interface OverflowProps<ItemType = any> {
  /** CSS class prefix, defaults to 'rc-overflow' */
  prefixCls?: string;
  
  /** Array of items to render */
  data?: ItemType[];
  
  /** Function to render each item */
  renderItem?: ItemRenderer<ItemType>;
  
  /** Function to render raw item with full control */
  renderRawItem?: RawItemRenderer<ItemType>;
  
  /** Key property name or extractor function */
  itemKey?: string | ItemKeyExtractor<ItemType>;
  
  /** Estimated width of each item for SSR, defaults to 10 */
  itemWidth?: number;
  
  /** SSR mode: 'full' for full server-side rendering, false otherwise */
  ssr?: 'full' | boolean;
  
  /** Container inline styles */
  style?: CSSProperties;
  
  /** Container CSS class name */
  className?: string;
  
  /** Maximum number of visible items, 'responsive' for auto-calculation, 'invalidate' to disable */
  maxCount?: number | 'responsive' | 'invalidate';
  
  /** Function to render the rest indicator ("+N ...") */
  renderRest?: RestRenderer<ItemType>;
  
  /** Function to render raw rest indicator with full control */
  renderRawRest?: (items: ItemType[]) => ReactElement;
  
  /** Prefix element to display before items */
  prefix?: ReactNode;
  
  /** Suffix element to display after items */
  suffix?: ReactNode;
  
  /** Root container component type, defaults to 'div' */
  component?: keyof JSX.IntrinsicElements | ComponentType<any>;
  
  /** Component type for individual items */
  itemComponent?: ComponentType<any>;
  
  /** Callback when visible item count changes */
  onVisibleChange?: VisibilityChangeHandler;
  
  /** Additional HTML attributes */
  [key: string]: any;
}

/**
 * Props for Overflow.Item component
 */
export interface OverflowItemProps {
  /** CSS class prefix */
  prefixCls?: string;
  /** Whether responsive mode is enabled */
  responsive?: boolean;
  /** Whether responsive is disabled */
  responsiveDisabled?: boolean;
  /** Display order */
  order?: number;
  /** CSS class name */
  className?: string;
  /** Callback to register size */
  registerSize?: (key: string | number, width: number) => void;
  /** Whether to display the item */
  display?: boolean;
  /** Inline styles */
  style?: CSSProperties;
  /** Child content */
  children?: ReactNode;
}

/**
 * Overflow component with ref support
 */
export interface OverflowComponent extends ForwardRefExoticComponent<OverflowProps & RefAttributes<HTMLElement>> {
  /** Item sub-component */
  Item: ComponentType<OverflowItemProps>;
  
  /** Constant for responsive maxCount mode */
  RESPONSIVE: 'responsive';
  
  /** Constant for invalidate maxCount mode */
  INVALIDATE: 'invalidate';
  
  displayName: string;
}

/**
 * Main Overflow component
 * Automatically handles overflow items by hiding or showing a rest indicator
 */
declare const Overflow: OverflowComponent;

export default Overflow;