/**
 * Mobile popup component for displaying floating content on mobile devices.
 * Handles z-index stacking, animations, and custom rendering.
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactNode, ReactElement, CSSProperties } from 'react';

/**
 * Animation/transition configuration for popup motion effects
 */
export interface PopupMotion {
  /** Motion name or type identifier */
  motionName?: string;
  /** Callback when motion/animation ends */
  onMotionEnd?: () => void;
  /** Additional motion configuration */
  [key: string]: any;
}

/**
 * Mobile-specific popup configuration
 */
export interface MobileConfig {
  /** Additional CSS class name for the popup container */
  popupClassName?: string;
  /** Inline styles for the popup container */
  popupStyle?: CSSProperties;
  /** Motion/animation configuration for show/hide transitions */
  popupMotion?: PopupMotion;
  /** Custom render function to wrap or transform popup content */
  popupRender?: (node: ReactNode) => ReactNode;
}

/**
 * Props for the MobilePopupInner component
 */
export interface MobilePopupInnerProps {
  /** CSS class prefix for BEM naming convention */
  prefixCls: string;
  /** Controls popup visibility */
  visible: boolean;
  /** Z-index value for stacking context */
  zIndex?: number;
  /** Popup content to be rendered */
  children: ReactNode;
  /** Mobile-specific configuration options */
  mobile?: MobileConfig;
}

/**
 * Ref handle exposed by MobilePopupInner component
 */
export interface MobilePopupInnerRef {
  /** Force trigger alignment (no-op in mobile implementation) */
  forceAlign: () => void;
  /** Get the underlying DOM element */
  getElement: () => HTMLElement | null;
}

/**
 * Mobile popup inner component that handles rendering and animations
 * for mobile-optimized floating content.
 * 
 * @example
 *