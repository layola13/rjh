/**
 * Icon configuration for a code icon with two-tone theme
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
 * SVG element representation
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (only present on root svg element) */
  children?: SvgElement[];
}

/**
 * Icon function return type
 */
interface IconDefinition {
  /** Root SVG element */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child path elements defining the icon shapes */
  children: SvgElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG element structure defining the icon
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style of the icon */
  theme: string;
}

declare const iconConfig: IconConfig;

export default iconConfig;