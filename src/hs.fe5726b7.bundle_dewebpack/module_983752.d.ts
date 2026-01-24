import React from 'react';

/**
 * Button component props interface
 */
export interface ButtonProps {
  /** Whether the button is in active state */
  isActive?: boolean;
  
  /** Button type for styling variants */
  type?: string;
  
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Additional CSS class name for custom styling */
  styleName?: string;
  
  /** Button size variant (e.g., 'small', 'medium', 'large') */
  size?: string;
  
  /** Tooltip text to display on hover */
  tooltip?: string;
  
  /** Mouse over event handler */
  onMouseOver?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Mouse out event handler */
  onMouseOut?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  
  /** Inline styles for the button element */
  style?: React.CSSProperties;
  
  /** Data attribute for indexing */
  dataIndex?: string | number;
  
  /** Child elements to render inside the button */
  children?: React.ReactNode;
}

/**
 * Custom button component with tooltip support
 * 
 * @remarks
 * This component wraps a standard HTML button with additional functionality
 * including active states, size variants, and optional tooltip display.
 * 
 * @example
 *