/**
 * Icon definition for a two-tone file-add icon
 * @module IconDefinition
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element is focusable */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for main icon elements
   * @param secondaryColor - Secondary fill color for accent elements
   * @returns SVG icon object with paths and attributes
   */
  icon(primaryColor: string, secondaryColor: string): SvgIcon;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

declare const iconDefinition: IconDefinition;

export default iconDefinition;