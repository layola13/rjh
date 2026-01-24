/**
 * Dialog/Modal Content Component
 * Provides the main content area for dialog components with animation and focus management
 */

import type { CSSProperties, ReactNode, RefObject, MouseEvent } from 'react';

/**
 * Mouse position for transform origin calculation
 */
export interface MousePosition {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}

/**
 * Content component ref methods
 */
export interface ContentRef {
  /**
   * Programmatically focus the content container
   */
  focus(): void;
  
  /**
   * Change the active focus state
   * @param active - Whether to activate or deactivate focus
   */
  changeActive(active: boolean): void;
}

/**
 * Props for the Content component
 */
export interface ContentProps {
  /** Whether the close button is visible */
  closable?: boolean;
  
  /** CSS class prefix for BEM-style naming */
  prefixCls: string;
  
  /** Width of the content area (number in px or string with units) */
  width?: number | string;
  
  /** Height of the content area (number in px or string with units) */
  height?: number | string;
  
  /** Footer content to display at bottom of dialog */
  footer?: ReactNode;
  
  /** Title content to display in header */
  title?: ReactNode;
  
  /** Custom close icon element */
  closeIcon?: ReactNode;
  
  /** Inline styles for the content wrapper */
  style?: CSSProperties;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Whether the content is visible */
  visible: boolean;
  
  /** Force render content even when not visible */
  forceRender?: boolean;
  
  /** Inline styles for the body section */
  bodyStyle?: CSSProperties;
  
  /** Additional HTML attributes for the body element */
  bodyProps?: React.HTMLAttributes<HTMLDivElement>;
  
  /** Child content to render in body */
  children?: ReactNode;
  
  /** Destroy content DOM when closed */
  destroyOnClose?: boolean;
  
  /**
   * Custom render function for the entire modal content
   * @param content - The default rendered content
   * @returns Custom rendered content
   */
  modalRender?: (content: ReactNode) => ReactNode;
  
  /** CSS animation/transition class name */
  motionName?: string;
  
  /** ARIA id for accessibility */
  ariaId?: string;
  
  /**
   * Callback when close button is clicked
   * @param event - The click event
   */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Callback when visibility changes
   * @param visible - New visibility state
   */
  onVisibleChanged?: (visible: boolean) => void;
  
  /**
   * Callback for mouse down event on content wrapper
   * @param event - The mouse event
   */
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Callback for mouse up event on content wrapper
   * @param event - The mouse event
   */
  onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /** Mouse position for calculating transform origin in animations */
  mousePosition?: MousePosition;
}

/**
 * Dialog Content Component
 * 
 * Renders the main content structure of a modal/dialog including:
 * - Header with title
 * - Body with children
 * - Footer
 * - Close button
 * - Animation wrapper
 * - Focus trap elements
 * 
 * @example
 *