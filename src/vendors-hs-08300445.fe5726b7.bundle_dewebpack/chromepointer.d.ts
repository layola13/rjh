/**
 * ChromePointer Component
 * 
 * A Chrome-style color picker pointer component that displays a circular indicator
 * used in color selection interfaces.
 * 
 * @module ChromePointer
 */

import React from 'react';

/**
 * Style configuration for the picker element
 */
interface PickerStyle {
  /** Width of the picker indicator */
  width: string;
  /** Height of the picker indicator */
  height: string;
  /** Border radius for circular shape */
  borderRadius: string;
  /** CSS transform for positioning offset */
  transform: string;
  /** Background color of the picker */
  backgroundColor: string;
  /** Shadow effect around the picker */
  boxShadow: string;
}

/**
 * Styles object structure returned by the styling function
 */
interface ChromePointerStyles {
  /** Styles applied to the picker element */
  picker: React.CSSProperties;
}

/**
 * ChromePointer component props (currently empty, reserved for future extensions)
 */
export interface ChromePointerProps {}

/**
 * ChromePointer - A circular pointer indicator for Chrome-style color pickers
 * 
 * Renders a small circular dot with shadow effects, typically used to indicate
 * the current selection point in color picker interfaces.
 * 
 * @returns A React element representing the pointer indicator
 */
export declare const ChromePointer: React.FC<ChromePointerProps>;

/**
 * Default export of the ChromePointer component
 */
export default ChromePointer;