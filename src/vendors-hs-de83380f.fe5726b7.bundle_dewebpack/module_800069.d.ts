/**
 * Bell icon component definition for two-tone theme
 * Represents a notification bell with primary and secondary colors
 */

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the main icon shape
   * @param secondaryColor - Secondary fill color for accent/highlight areas
   * @returns SVG element configuration object
   */
  icon: (primaryColor: string, secondaryColor: string) => SVGElement;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Visual theme of the icon
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * SVG element attributes
 */
interface SVGAttributes {
  /**
   * SVG viewBox coordinate system
   */
  viewBox?: string;
  
  /**
   * Whether the element can receive focus
   */
  focusable?: string;
  
  /**
   * SVG path data
   */
  d?: string;
  
  /**
   * Fill color
   */
  fill?: string;
}

/**
 * SVG element structure
 */
interface SVGElement {
  /**
   * HTML/SVG tag name
   */
  tag: string;
  
  /**
   * Element attributes
   */
  attrs: SVGAttributes;
  
  /**
   * Child elements (optional)
   */
  children?: SVGElement[];
}

/**
 * Bell icon configuration for two-tone theme
 * Displays a notification bell with customizable primary and secondary colors
 */
declare const bellIcon: IconConfig;

export default bellIcon;