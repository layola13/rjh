/**
 * Icon configuration for a left-square icon with two-tone theme
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (only present on root svg element) */
  children?: IconNode[];
}

/**
 * Icon render function return type
 */
interface IconDefinition {
  /** Root SVG element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child path elements */
  children: IconNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure with customizable colors
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for the icon paths
   * @returns SVG element definition with paths
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: string;
}

/**
 * Left square icon with two-tone theme
 * Displays a left-pointing chevron inside a square border
 */
declare const iconConfig: IconConfig;

export default iconConfig;