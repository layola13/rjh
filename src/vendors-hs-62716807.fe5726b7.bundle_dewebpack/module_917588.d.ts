/**
 * Empty component type definitions
 * Displays an empty state with optional image, description, and footer content
 */

import type { CSSProperties, ReactNode } from 'react';

/**
 * Props for the Empty component
 */
export interface EmptyProps {
  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Prefix for CSS classes (default: 'empty')
   */
  prefixCls?: string;

  /**
   * Empty state image - can be a URL string or React element
   * @default PRESENTED_IMAGE_DEFAULT
   */
  image?: ReactNode;

  /**
   * Description text displayed below the image
   */
  description?: ReactNode;

  /**
   * Footer content (typically action buttons)
   */
  children?: ReactNode;

  /**
   * Inline styles for the image container
   */
  imageStyle?: CSSProperties;

  /**
   * Additional HTML div attributes
   */
  [key: string]: any;
}

/**
 * Empty state component
 * Used to display feedback when there is no data or content to show
 */
export interface EmptyComponent {
  (props: EmptyProps): JSX.Element;

  /**
   * Default empty image (full illustration)
   */
  PRESENTED_IMAGE_DEFAULT: JSX.Element;

  /**
   * Simple empty image (minimal illustration)
   */
  PRESENTED_IMAGE_SIMPLE: JSX.Element;
}

declare const Empty: EmptyComponent;

export default Empty;