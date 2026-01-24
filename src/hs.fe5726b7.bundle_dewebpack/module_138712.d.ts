/**
 * Pin button component that toggles between pinned and unpinned states
 * @module PinButton
 */

import React from 'react';

/**
 * Props for the PinButton component
 */
export interface PinButtonProps {
  /**
   * Icon identifier to display in the button
   */
  icon?: string;
  
  /**
   * Additional CSS class names to apply to the button
   * @default ""
   */
  className?: string;
  
  /**
   * Callback function invoked when the pin state changes
   * @param isPinned - The new pinned state (true if pinned, false if unpinned)
   */
  changed?: (isPinned: boolean) => void;
}

/**
 * Internal state for the PinButton component
 */
export interface PinButtonState {
  /**
   * Whether the button is currently in a pinned state
   */
  pined: boolean;
  
  /**
   * Whether the mouse is currently hovering over the button
   */
  hover: boolean;
}

/**
 * A pin button component that supports hover and pinned states
 * 
 * Features:
 * - Toggles between pinned/unpinned on click
 * - Visual feedback on hover
 * - Configurable icon and styling
 * - State change notifications via callback
 */
export default class PinButton extends React.Component<PinButtonProps, PinButtonState> {
  static defaultProps: Partial<PinButtonProps>;
  
  constructor(props: PinButtonProps);
  
  /**
   * Handle mouse entering the button area
   */
  onMouseOver(): void;
  
  /**
   * Handle mouse leaving the button area
   */
  onMouseOut(): void;
  
  /**
   * Handle button click to toggle pin state
   */
  onClick(): void;
  
  /**
   * Check if the button is currently pinned
   * @returns True if pinned, false otherwise
   */
  isPinned(): boolean;
  
  /**
   * Render the pin button component
   */
  render(): React.ReactElement;
}