/**
 * Toggle Button Component Type Definitions
 * A React component for rendering a toggle button with on/off states
 */

import React from 'react';

/**
 * Props for the ToggleButton component
 */
export interface ToggleButtonProps {
  /**
   * Current value/state of the toggle button
   */
  value: boolean;

  /**
   * Callback function triggered when the toggle value changes
   * @param newValue - The new boolean state after toggle
   */
  onValueChange: (newValue: boolean) => void;

  /**
   * Label text displayed when toggle is in "on" state
   */
  onLabel: string;

  /**
   * Label text displayed when toggle is in "off" state
   */
  offLabel: string;

  /**
   * Optional label displayed before the toggle button
   */
  label?: string;

  /**
   * CSS class for positioning the toggle button
   */
  positionClass?: string;
}

/**
 * Internal state of the ToggleButton component
 */
export interface ToggleButtonState {
  /**
   * Current active state of the toggle
   */
  isOnActive: boolean;

  /**
   * Reference to the value change callback
   */
  onValueChange: (newValue: boolean) => void;

  /**
   * Whether the mouse is currently hovering over the component
   */
  hover: boolean;

  /**
   * Label text for the toggle button
   */
  label?: string;

  /**
   * Whether the component is hidden
   */
  hidden?: boolean;
}

/**
 * ToggleButton Component
 * A stateful toggle button component with hover effects and customizable labels
 * 
 * @example
 *