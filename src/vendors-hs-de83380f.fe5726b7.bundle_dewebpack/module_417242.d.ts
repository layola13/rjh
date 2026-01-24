/**
 * Icon configuration object for a right-circle icon in two-tone theme
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
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
  /** Child nodes (only for container elements) */
  children?: IconNode[];
}

/**
 * Icon function return type defining the complete SVG structure
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** Root SVG attributes */
  attrs: IconAttrs;
  /** Child path elements */
  children: IconNode[];
}

/**
 * Icon configuration object structure
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon paths
   * @param secondaryColor - Secondary fill color for the two-tone effect
   * @returns Complete SVG icon definition
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme of the icon */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Right circle icon in two-tone theme
 * Displays a circular button with a right-pointing arrow/chevron
 */
declare const rightCircleIcon: IconConfig;

export default rightCircleIcon;