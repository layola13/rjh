/**
 * Icon definition for a two-tone check-circle icon
 * Represents a circular checkmark commonly used for success states
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure interface
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child path elements */
  children: SvgChildElement[];
}

/**
 * Icon configuration interface
 */
interface IconDefinition {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG structure object
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** Icon identifier name */
  name: 'check-circle';
  
  /** Icon theme style */
  theme: 'twotone';
}

/**
 * Default export: Check-circle icon definition
 */
declare const iconDefinition: IconDefinition;
export default iconDefinition;