/**
 * SVG Icon Component Props
 * @interface IconProps
 */
interface IconProps {
  /**
   * Fill color for the icon
   * @default "currentColor"
   */
  fill?: string;
  
  /**
   * Width of the icon in pixels
   * @default 24
   */
  width?: number;
  
  /**
   * Height of the icon in pixels
   * @default 24
   */
  height?: number;
  
  /**
   * Custom inline styles for the SVG element
   * @default {}
   */
  style?: React.CSSProperties;
  
  /**
   * Additional SVG attributes (className, onClick, etc.)
   */
  [key: string]: any;
}

/**
 * Checkmark Icon Component
 * Renders a checkmark/tick SVG icon with customizable properties
 * 
 * @param props - Icon configuration properties
 * @returns A React SVG element representing a checkmark icon
 * 
 * @example
 *