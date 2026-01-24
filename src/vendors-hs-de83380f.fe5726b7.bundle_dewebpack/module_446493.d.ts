/**
 * Icon definition for a minus-square icon with two-tone theme
 * @module MinusSquareIcon
 */

/**
 * SVG attributes configuration
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure returned by the icon function
 */
interface IconStructure {
  /** SVG tag identifier */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /**
   * Function to generate icon SVG structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (two-tone effect)
   * @returns SVG structure object
   */
  icon(primaryColor: string, secondaryColor: string): IconStructure;
  
  /** Icon name identifier */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Default export: Minus square icon with two-tone theme
 * Represents a square with a minus/subtract symbol
 */
declare const minusSquareIcon: IconDefinition;

export default minusSquareIcon;