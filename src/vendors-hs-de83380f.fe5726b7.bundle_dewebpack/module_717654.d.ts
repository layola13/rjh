/**
 * Icon component definition for Appstore icon in twotone theme
 */

/**
 * SVG attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path) definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SVGAttrs;
  /** Child path elements */
  children: SVGChild[];
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /**
   * Icon generator function
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths
   * @returns SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSVG;
  
  /** Icon identifier name */
  name: 'appstore';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Appstore twotone icon definition
 * Represents a 2x2 grid layout commonly used for app launchers
 */
declare const AppstoreIconDefinition: IconDefinition;

export default AppstoreIconDefinition;