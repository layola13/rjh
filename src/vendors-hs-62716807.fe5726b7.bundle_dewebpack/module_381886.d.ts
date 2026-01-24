/**
 * Alert Component Type Definitions
 * Module ID: 381886
 * 
 * A React Alert component for displaying warning, success, error, and info messages.
 */

import * as React from 'react';

/**
 * Alert type variants
 */
export type AlertType = 'success' | 'info' | 'error' | 'warning';

/**
 * Alert component properties
 */
export interface AlertProps {
  /**
   * The description content displayed below the main message
   */
  description?: React.ReactNode;

  /**
   * Custom CSS class prefix for styling
   * @default "alert"
   */
  prefixCls?: string;

  /**
   * The main alert message content (required)
   */
  message: React.ReactNode;

  /**
   * Whether to display the alert as a banner
   * When true, sets the default type to 'warning'
   */
  banner?: boolean;

  /**
   * Additional CSS class name for the alert container
   */
  className?: string;

  /**
   * Inline styles for the alert container
   */
  style?: React.CSSProperties;

  /**
   * Mouse enter event handler
   */
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Mouse leave event handler
   */
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Click event handler
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Callback invoked after the alert closing animation completes
   */
  afterClose?: () => void;

  /**
   * Whether to display an icon based on the alert type
   * @default false for banner mode, true otherwise
   */
  showIcon?: boolean;

  /**
   * Whether the alert can be closed by the user
   */
  closable?: boolean;

  /**
   * Custom close button text
   * If provided, displays text instead of the default close icon
   */
  closeText?: React.ReactNode;

  /**
   * Custom action element (e.g., a button) displayed on the right side
   */
  action?: React.ReactNode;

  /**
   * The type of alert to display
   * Determines the icon and color scheme
   * @default "info" (or "warning" when banner is true)
   */
  type?: AlertType;

  /**
   * Callback invoked when the close button is clicked
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Custom icon to override the default type-based icon
   */
  icon?: React.ReactNode;
}

/**
 * Error Boundary component for catching React errors
 */
export interface ErrorBoundaryComponent extends React.ComponentClass<any> {
  // Error boundary implementation details
}

/**
 * Main Alert component
 * 
 * @example
 *