/**
 * Filler Component - Virtual scrolling filler component for list optimization
 * @module Filler
 */

import type { CSSProperties, ReactNode, RefObject, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the inner resize observer callback
 */
export interface ResizeCallbackData {
  /** The offset height of the observed element */
  offsetHeight: number;
}

/**
 * Props configuration for the Filler component
 */
export interface FillerProps {
  /** Height of the filler container */
  height?: number;
  
  /** Vertical offset for translateY transformation */
  offsetY?: number;
  
  /** Horizontal offset for margin adjustment */
  offsetX?: number;
  
  /** Child elements to be rendered within the filler */
  children?: ReactNode;
  
  /** CSS class name prefix for styling */
  prefixCls?: string;
  
  /** Callback fired when inner content resizes */
  onInnerResize?: () => void;
  
  /** Additional props passed to the inner container element */
  innerProps?: React.HTMLAttributes<HTMLDivElement>;
  
  /** Right-to-left layout mode */
  rtl?: boolean;
  
  /** Extra content to be rendered after children */
  extra?: ReactNode;
}

/**
 * Filler component reference type
 */
export type FillerRef = HTMLDivElement;

/**
 * Virtual scrolling filler component that handles content positioning and overflow
 * 
 * This component is typically used in virtualized lists to:
 * - Maintain scroll position with dynamic content
 * - Apply vertical/horizontal offsets for smooth scrolling
 * - Support RTL layouts
 * - Monitor content size changes via resize observer
 * 
 * @example
 *