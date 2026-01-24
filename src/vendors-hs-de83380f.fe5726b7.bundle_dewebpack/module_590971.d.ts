/**
 * Copyright Circle Icon - Two-tone theme
 * A circular copyright symbol icon with customizable primary and secondary colors
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
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
 * SVG icon structure returned by the icon function
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for accent elements
   * @returns SVG icon structure with specified colors
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: string;
}

/**
 * Copyright Circle icon definition (two-tone theme)
 * Displays a copyright symbol (©) inside a circle with dual-color support
 */
declare const copyrightCircleIcon: IconDefinition;

export default copyrightCircleIcon;