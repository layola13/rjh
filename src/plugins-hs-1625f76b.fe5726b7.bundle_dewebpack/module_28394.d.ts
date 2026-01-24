/**
 * Module: module_28394
 * Original ID: 28394
 * 
 * A reusable popup/modal dialog component with customizable header, content, and action buttons.
 */

import { Component, CSSProperties, MouseEvent, ReactNode } from 'react';
import { HSCore } from 'hscore-util'; // Assuming HSCore types from p(635589)
import { IconfontView } from 'iconfont-view'; // From d(678797)

/**
 * Props configuration for the PopupWindow component
 */
export interface PopupWindowProps {
  /**
   * CSS class name for the popup window wrapper
   */
  windowname: string;

  /**
   * Width of the popup window (e.g., "500px", "80%")
   */
  winwidth: string | number;

  /**
   * Header/title text displayed at the top of the popup
   */
  headername: string;

  /**
   * Main content to be rendered inside the popup body
   */
  contents: ReactNode;

  /**
   * Label text for the OK/Submit button
   * If not provided, the OK button will be hidden
   */
  oklabel?: string;

  /**
   * Label text for the Cancel button
   * If not provided, the Cancel button will be hidden
   */
  cancellable?: string;

  /**
   * Callback function invoked when the popup is submitted (OK button clicked)
   */
  submitcall: () => void;
}

/**
 * Internal state for tracking hover interactions
 */
export interface PopupWindowState {
  /**
   * Whether the OK button is currently being hovered
   */
  isHovering: boolean;
}

/**
 * A modal popup dialog component with header, customizable content, and action buttons.
 * 
 * Features:
 * - Customizable header and content
 * - Optional OK and Cancel buttons
 * - Signal-based submission handling using HSCore.Util.Signal
 * - Hover state management for button styling
 * - Click-outside-to-close functionality
 * 
 * @example
 *