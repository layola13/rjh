/**
 * Euro icon component definition for Ant Design icon system.
 * Provides a two-tone euro currency symbol icon with customizable colors.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
}

/**
 * Icon structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure with specified colors
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon details
   * @returns Complete SVG icon definition
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Default export: Euro currency icon configuration
 */
declare const euroIcon: IconConfig;

export default euroIcon;