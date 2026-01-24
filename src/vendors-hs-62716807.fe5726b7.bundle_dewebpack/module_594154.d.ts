/**
 * SVG icon component props interface
 */
interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'fill' | 'width' | 'height'> {
  /**
   * Fill color of the icon
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
   * Custom CSS styles to apply to the SVG element
   * @default {}
   */
  style?: React.CSSProperties;
}

/**
 * Renders a vertical expand/collapse icon (double arrow up-down)
 * 
 * @param props - Icon component properties
 * @returns React SVG element representing a vertical expand icon
 * 
 * @example
 *