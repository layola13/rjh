/**
 * Slider Handle Component Type Definitions
 * A draggable handle component for slider controls with accessibility support
 */

import React from 'react';

/**
 * Props for the slider handle component
 */
export interface SliderHandleProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Whether the slider is oriented vertically */
  vertical?: boolean;
  
  /** Whether the slider direction is reversed */
  reverse?: boolean;
  
  /** Position offset as a percentage (0-100) */
  offset: number;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Inline styles for the handle */
  style?: React.CSSProperties;
  
  /** Whether the handle is disabled */
  disabled?: boolean;
  
  /** Minimum value of the slider */
  min: number;
  
  /** Maximum value of the slider */
  max: number;
  
  /** Current value of the handle */
  value: number;
  
  /** Tab index for keyboard navigation */
  tabIndex?: number | null;
  
  /** ARIA label for accessibility */
  ariaLabel?: string;
  
  /** ID of element that labels this handle */
  ariaLabelledBy?: string;
  
  /** Formatter function to convert value to readable text for screen readers */
  ariaValueTextFormatter?: (value: number) => string;
}

/**
 * Internal state of the slider handle component
 */
export interface SliderHandleState {
  /** Whether the handle was focused via mouse click */
  clickFocused: boolean;
}

/**
 * Slider Handle Component
 * 
 * A React component that renders a draggable handle for slider controls.
 * Supports both horizontal and vertical orientations, RTL/reversed layouts,
 * and full keyboard and screen reader accessibility.
 * 
 * @example
 *