/**
 * Chrome-style circular pointer component for color picker
 * A small circular indicator used to show the selected position in a color picker
 */

/**
 * Style configuration for the Chrome pointer circle
 */
interface PickerStyle {
  /** Width of the circular pointer */
  width: string;
  /** Height of the circular pointer */
  height: string;
  /** Border radius to create circular shape */
  borderRadius: string;
  /** Inner shadow for visual depth effect */
  boxShadow: string;
  /** CSS transform to center the pointer on the selected point */
  transform: string;
}

/**
 * Style sheet structure for the component
 */
interface ChromePointerCircleStyles {
  default: {
    picker: PickerStyle;
  };
}

/**
 * Props for the ChromePointerCircle component
 */
export interface ChromePointerCircleProps {
  /** Optional custom styles to override default appearance */
  styles?: Partial<ChromePointerCircleStyles>;
}

/**
 * Chrome-style circular pointer indicator component
 * 
 * Renders a small white-bordered circle typically used as a position indicator
 * in color picker interfaces. The circle is 12x12px with a centered transform
 * to align properly with the cursor position.
 * 
 * @returns A React element representing the circular pointer
 * 
 * @example
 *