/**
 * Tooltip Content Component
 * 
 * A simple component that renders the inner content of a tooltip overlay.
 * Supports both static content and dynamic content via render functions.
 */

import type { CSSProperties, ReactNode } from 'react';

/**
 * Props for the tooltip content component
 */
export interface TooltipContentProps {
  /**
   * The content to display in the tooltip overlay.
   * Can be a static ReactNode or a function that returns ReactNode.
   */
  overlay: ReactNode | (() => ReactNode);

  /**
   * CSS class name prefix for styling
   * @example 'rc-tooltip'
   */
  prefixCls: string;

  /**
   * Unique identifier for the tooltip element
   * Used for ARIA accessibility attributes
   */
  id?: string;

  /**
   * Inline styles to apply to the tooltip inner container
   */
  overlayInnerStyle?: CSSProperties;
}

/**
 * Renders the inner content of a tooltip component
 * 
 * @param props - Component properties
 * @returns A div element containing the tooltip content with proper ARIA attributes
 * 
 * @example
 *