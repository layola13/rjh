/**
 * Icon definition for a two-tone plus-square icon
 * This module exports an icon configuration object compatible with Ant Design icon system
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure interface
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /**
   * Icon rendering function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (two-tone effect)
   * @returns SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon name identifier */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Plus-square icon definition (two-tone variant)
 * Represents a square with a plus symbol inside, using dual-color rendering
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;