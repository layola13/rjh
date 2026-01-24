/**
 * SVG icon configuration for a "save" icon with two-tone theme
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Controls whether the element can receive focus */
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
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon generator function return type
 */
interface IconDefinition {
  /** Root SVG tag */
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
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for main icon paths
   * @param secondaryColor - Secondary color for background/decorative paths
   * @returns Complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme variant */
  theme: string;
}

/**
 * Save icon configuration with two-tone color theme.
 * Represents a floppy disk save icon with customizable colors.
 */
declare const iconConfig: IconConfig;

export default iconConfig;