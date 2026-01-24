/**
 * Dollar Circle Icon Component (Two-tone theme)
 * 
 * A dollar sign icon within a circle, typically used to represent
 * currency, pricing, or financial features in UI applications.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
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
 * Icon rendering structure
 */
interface IconRenderObject {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /**
   * Icon rendering function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG structure object for rendering
   */
  icon(primaryColor: string, secondaryColor: string): IconRenderObject;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Dollar Circle icon definition (two-tone theme)
 * 
 * Exports an icon object containing rendering information for a
 * dollar sign within a circle. The icon supports two-tone coloring
 * with customizable primary and secondary colors.
 */
declare const dollarCircleIcon: IconDefinition;

export default dollarCircleIcon;