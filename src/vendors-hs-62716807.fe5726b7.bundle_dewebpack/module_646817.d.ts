/**
 * Breadcrumb separator component for Ant Design
 * Renders a separator between breadcrumb items
 */

import type { ReactNode, FC } from 'react';

/**
 * Props for the BreadcrumbSeparator component
 */
export interface BreadcrumbSeparatorProps {
  /**
   * Custom separator content
   * @default "/"
   */
  children?: ReactNode;
}

/**
 * Internal marker interface for breadcrumb separator components
 */
interface BreadcrumbSeparatorComponent extends FC<BreadcrumbSeparatorProps> {
  /**
   * Internal flag to identify breadcrumb separator components
   * Used by Ant Design for component type checking
   */
  __ANT_BREADCRUMB_SEPARATOR: true;
}

/**
 * Breadcrumb separator component
 * Displays a visual separator between breadcrumb navigation items
 * 
 * @example
 *