/**
 * Popup component module
 * Provides a unified popup/modal interface for both desktop and mobile platforms
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * Base popup component props
 */
export interface PopupBaseProps {
  /**
   * Controls the visibility state of the popup
   * @default false
   */
  visible?: boolean;

  /**
   * Determines if the popup should render in mobile-optimized mode
   * When true and visible, triggers mobile device detection
   * @default false
   */
  mobile?: boolean;

  /**
   * Additional props passed through to the underlying popup implementation
   */
  [key: string]: any;
}

/**
 * Props for the Popup component with ref support
 */
export interface PopupProps extends PopupBaseProps {
  /**
   * Ref forwarded to the underlying popup implementation component
   */
  ref?: React.Ref<any>;
}

/**
 * Unified popup component that automatically selects the appropriate
 * implementation (mobile or desktop) based on the `mobile` prop and device detection.
 * 
 * @remarks
 * - Wraps both desktop and mobile popup variants
 * - Performs runtime mobile device detection when `mobile` prop is true
 * - Forwards refs to the underlying implementation
 * - Renders an overlay component alongside the popup content
 * 
 * @example
 *