/**
 * Breadcrumb item data structure
 */
export interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  text: string;
  /** Whether the breadcrumb is disabled */
  disabled?: boolean;
  /** Link href for the breadcrumb */
  href?: string;
  /** Router link object */
  to?: string | object;
  /** Whether the link should use exact matching */
  exact?: boolean;
  /** Additional custom properties */
  [key: string]: any;
}

/**
 * Scoped slot scope for item slot
 */
export interface BreadcrumbItemSlotScope {
  /** Current breadcrumb item data */
  item: BreadcrumbItem;
}

/**
 * VBreadcrumbs component props
 */
export interface VBreadcrumbsProps {
  /** Character or component to use as divider between items */
  divider?: string;
  /** Array of breadcrumb items to display */
  items?: BreadcrumbItem[];
  /** Increases the font size of breadcrumbs */
  large?: boolean;
  /** Applies dark theme variant */
  dark?: boolean;
  /** Applies light theme variant */
  light?: boolean;
}

/**
 * VBreadcrumbs component
 * 
 * A navigation component that displays the current page's location within a navigational hierarchy.
 * Breadcrumbs consist of a list of links that help a user visualize a page's location within 
 * the hierarchical structure of a website.
 * 
 * @example
 *