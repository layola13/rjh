/**
 * SVG icon definition for a two-tone heart icon
 * @module HeartTwoToneIcon
 */

/**
 * Represents SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Represents SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * Represents an SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Represents the complete SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Generates the icon SVG structure with customizable colors
   * @param primaryColor - Primary color for the icon (typically the outline)
   * @param secondaryColor - Secondary color for the icon (typically the fill)
   * @returns Complete SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: 'heart';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Heart icon in two-tone style with customizable colors.
 * 
 * The icon consists of:
 * - An outline path (uses primaryColor)
 * - A fill path (uses secondaryColor)
 * 
 * Standard viewBox: "64 64 896 896"
 * 
 * @example
 *