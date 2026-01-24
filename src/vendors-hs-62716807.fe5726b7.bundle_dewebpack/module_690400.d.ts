/**
 * Breadcrumb Component Type Definitions
 * Ant Design UI Library - Navigation Component
 */

import * as React from 'react';

/**
 * Route configuration for breadcrumb items
 */
export interface BreadcrumbRoute {
  /** Path for the breadcrumb item, supports dynamic parameters like ':id' */
  path?: string;
  /** Display name for the breadcrumb */
  breadcrumbName?: string;
  /** Nested child routes */
  children?: BreadcrumbRoute[];
}

/**
 * Parameters for dynamic route replacement
 * Maps parameter names to their values (e.g., { id: '123' })
 */
export interface BreadcrumbParams {
  [key: string]: string | number;
}

/**
 * Custom render function for breadcrumb items
 * @param route - Current route configuration
 * @param params - Dynamic route parameters
 * @param routes - All route configurations
 * @param paths - Accumulated path segments
 * @returns React element or null
 */
export type ItemRenderFunction = (
  route: BreadcrumbRoute,
  params: BreadcrumbParams,
  routes: BreadcrumbRoute[],
  paths: string[]
) => React.ReactNode;

/**
 * Breadcrumb component properties
 */
export interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  /** Custom CSS class prefix for component styling */
  prefixCls?: string;
  
  /** Separator between breadcrumb items */
  separator?: React.ReactNode;
  
  /** Inline styles for the breadcrumb container */
  style?: React.CSSProperties;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Route configuration array for auto-generating breadcrumb items */
  routes?: BreadcrumbRoute[];
  
  /** Child breadcrumb items (manual composition) */
  children?: React.ReactNode;
  
  /** Custom rendering function for breadcrumb items */
  itemRender?: ItemRenderFunction;
  
  /** Parameters for dynamic route substitution */
  params?: BreadcrumbParams;
}

/**
 * Breadcrumb.Item component properties
 */
export interface BreadcrumbItemProps {
  /** Custom CSS class prefix */
  prefixCls?: string;
  
  /** Separator to display after this item */
  separator?: React.ReactNode;
  
  /** URL for the breadcrumb link */
  href?: string;
  
  /** Dropdown overlay content */
  overlay?: React.ReactNode;
  
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  
  /** Child content */
  children?: React.ReactNode;
}

/**
 * Breadcrumb.Separator component properties
 */
export interface BreadcrumbSeparatorProps {
  /** Child content (separator character/element) */
  children?: React.ReactNode;
}

/**
 * Breadcrumb navigation component with dropdown support
 * Displays the current page's location within a navigational hierarchy
 */
export interface BreadcrumbComponent extends React.FC<BreadcrumbProps> {
  /** Breadcrumb item sub-component */
  Item: React.FC<BreadcrumbItemProps>;
  
  /** Breadcrumb separator sub-component */
  Separator: React.FC<BreadcrumbSeparatorProps>;
}

/**
 * Breadcrumb component
 * @example
 *