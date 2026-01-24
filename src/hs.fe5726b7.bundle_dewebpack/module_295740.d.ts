/**
 * Module: module_295740
 * Original ID: 295740
 * 
 * ExpandButton Component - A React component for expandable/collapsible UI elements
 */

import React from 'react';

/**
 * Props for the ExpandButton component
 */
export interface ExpandButtonProps {
  /**
   * Icon name or identifier to display in the button
   */
  icon?: string;
  
  /**
   * Additional CSS class names to apply to the button
   * @default ""
   */
  className?: string;
  
  /**
   * Callback function triggered when the button is clicked
   */
  changed?: () => void;
  
  /**
   * Whether the button is in expanded state
   */
  expanded?: boolean;
}

/**
 * Internal state for the ExpandButton component
 */
export interface ExpandButtonState {
  /**
   * Whether the button is currently expanded
   */
  expanded: boolean;
  
  /**
   * Whether the mouse is hovering over the button
   */
  hover: boolean;
}

/**
 * ExpandButton - A React component that renders an expandable/collapsible button
 * with hover and active states
 * 
 * @example
 *