/**
 * Icon component definition for property-safety icon in twotone theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure returned by the icon function
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure with specified colors
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for the icon paths
   * @returns Icon definition object containing SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant (e.g., 'twotone', 'filled', 'outlined') */
  theme: string;
}

/**
 * Property safety icon in twotone theme
 * Represents a shield/hexagon with a Chinese character inside
 */
declare const propertySafetyIcon: IconConfig;

export default propertySafetyIcon;