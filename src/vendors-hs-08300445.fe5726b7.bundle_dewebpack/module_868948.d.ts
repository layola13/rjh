/**
 * Virtual scrollbar component for React
 * Provides customizable horizontal and vertical scrollbars with drag support
 */

import { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Scrollbar component props
 */
export interface ScrollBarProps {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;

  /**
   * Right-to-left text direction support
   */
  rtl?: boolean;

  /**
   * Current scroll offset in pixels
   */
  scrollOffset: number;

  /**
   * Total scrollable range in pixels
   */
  scrollRange: number;

  /**
   * Callback fired when drag starts
   */
  onStartMove: () => void;

  /**
   * Callback fired when drag ends
   */
  onStopMove: () => void;

  /**
   * Callback fired during scroll with new offset
   * @param offset - New scroll offset in pixels
   * @param horizontal - Whether scrolling horizontally
   */
  onScroll: (offset: number, horizontal: boolean) => void;

  /**
   * Whether the scrollbar is horizontal (true) or vertical (false)
   */
  horizontal: boolean;

  /**
   * Size of the scrollbar thumb in pixels
   */
  spinSize: number;

  /**
   * Size of the scrollable container in pixels
   */
  containerSize: number;

  /**
   * Custom styles for the scrollbar container
   */
  style?: CSSProperties;

  /**
   * Custom styles for the scrollbar thumb
   */
  thumbStyle?: CSSProperties;

  /**
   * Controls scrollbar visibility
   * - true: always visible
   * - false: always hidden
   * - undefined: auto-hide after 3 seconds
   */
  showScrollBar?: boolean;
}

/**
 * Ref methods exposed by the ScrollBar component
 */
export interface ScrollBarRef {
  /**
   * Manually trigger the auto-hide delay timer
   * Shows the scrollbar and hides it after 3 seconds
   */
  delayHidden: () => void;
}

/**
 * Scrollbar component for virtual lists
 * Supports both horizontal and vertical scrolling with RTL support
 * Auto-hides after 3 seconds of inactivity unless explicitly controlled
 */
declare const ScrollBar: ForwardRefExoticComponent<
  ScrollBarProps & RefAttributes<ScrollBarRef>
>;

export default ScrollBar;