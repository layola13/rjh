/**
 * SVG Icon Component - Empty State Illustration
 * 
 * A complex SVG illustration component depicting an empty state or error state,
 * featuring a character illustration with various decorative elements.
 * 
 * @returns A React SVG element with dimensions 254x294
 */

import * as React from 'react';

/**
 * Props interface for the EmptyStateIcon component
 */
export interface EmptyStateIconProps {
  /** Optional width override (default: "254") */
  width?: string | number;
  /** Optional height override (default: "294") */
  height?: string | number;
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/**
 * Empty State SVG Icon Component
 * 
 * Renders a decorative illustration commonly used for empty states,
 * 404 pages, or error messages. The illustration features:
 * - A character with facial features
 * - Decorative UI elements (cards, indicators)
 * - Warning/error symbol in red circle
 * - Full-body character illustration with clothing
 * 
 * @example
 *