/**
 * Breadcrumb Item Component
 * Represents a single item in a breadcrumb navigation trail
 */

import type { ReactNode, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import type { DropdownProps } from 'antd/lib/dropdown';

/**
 * Properties for the BreadcrumbItem component
 */
export interface BreadcrumbItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Custom prefix class name for styling
   */
  prefixCls?: string;

  /**
   * Separator displayed between breadcrumb items
   * @default "/"
   */
  separator?: ReactNode;

  /**
   * Content to be displayed inside the breadcrumb item
   */
  children?: ReactNode;

  /**
   * Dropdown overlay content for breadcrumb item menu
   */
  overlay?: ReactNode;

  /**
   * Additional properties passed to the Dropdown component
   */
  dropdownProps?: DropdownProps;

  /**
   * Link URL - when provided, renders as an anchor element
   */
  href?: string;
}

/**
 * Breadcrumb Item component for Ant Design
 * Renders a single breadcrumb navigation item with optional link and dropdown
 * 
 * @param props - Component properties
 * @returns Breadcrumb item element or null if no children provided
 */
declare const BreadcrumbItem: {
  (props: BreadcrumbItemProps): JSX.Element | null;
  
  /**
   * Internal marker to identify this component as a Breadcrumb Item
   * @internal
   */
  __ANT_BREADCRUMB_ITEM: true;
};

export default BreadcrumbItem;