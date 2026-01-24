/**
 * Icon component configuration for a mobile/smartphone icon with two-tone theme
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Accessibility attribute to control focus behavior */
  focusable?: string;
  /** Fill color for the path element */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element structure for icon rendering
 */
interface IconElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Nested child elements (optional) */
  children?: IconElement[];
}

/**
 * Icon function return type
 */
interface IconConfig {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child path elements defining the icon shape */
  children: IconElement[];
}

/**
 * Icon component definition
 */
interface IconComponentDefinition {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon background (two-tone effect)
   * @returns SVG element configuration object
   */
  icon(primaryColor: string, secondaryColor: string): IconConfig;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style */
  theme: string;
}

/**
 * Mobile/smartphone icon component with two-tone theme support
 * Displays a smartphone outline with a circular home button
 */
declare const mobileIcon: IconComponentDefinition;

export default mobileIcon;