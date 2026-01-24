/**
 * Icon definition for a two-tone file with exclamation mark
 * Used in Ant Design icon system
 */

/**
 * Icon component properties
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths (two-tone effect)
   * @returns Complete icon definition with SVG structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * File exclamation icon - two-tone variant
 * Represents a document/file with an exclamation mark indicator
 */
declare const fileExclamationIcon: IconConfig;

export default fileExclamationIcon;