import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Props for the grid component
 */
export interface GridComponentProps {
  /** Optional ID attribute for the root element */
  id?: string;
  /** HTML tag name for the root element */
  tag?: string;
}

/**
 * Data object passed to functional components
 */
export interface GridComponentData {
  /** Static CSS class names */
  staticClass?: string;
  /** HTML attributes */
  attrs?: Record<string, any>;
  /** DOM properties */
  domProps?: Record<string, any>;
  /** Other data properties */
  [key: string]: any;
}

/**
 * Creates a functional Vue grid component with the specified name prefix.
 * 
 * This factory function generates a reusable grid component that:
 * - Applies a base CSS class based on the provided name
 * - Filters and processes HTML attributes (data-* attributes and truthy values)
 * - Supports custom tag rendering (defaults to 'div')
 * - Allows setting custom ID via props
 * 
 * @param name - The base name for the component (will be prefixed with 'v-')
 * @returns A Vue functional component definition
 * 
 * @example
 *