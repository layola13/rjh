/**
 * Shopping icon component definition for Ant Design Icons
 * 
 * @module ShoppingTwoTone
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
}

/**
 * Icon render result structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * 
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Shopping bag/cart icon in two-tone style
 * 
 * Represents a shopping bag with handles, commonly used for
 * e-commerce, cart, or shopping-related functionality
 */
declare const ShoppingTwoToneIcon: IconConfig;

export default ShoppingTwoToneIcon;