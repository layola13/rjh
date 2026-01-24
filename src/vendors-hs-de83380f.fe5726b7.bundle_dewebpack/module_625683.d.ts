/**
 * SVG icon node attributes interface
 */
interface IconNodeAttrs {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Focusable attribute for accessibility */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color */
  fill?: string;
}

/**
 * SVG icon node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Tag attributes */
  attrs: IconNodeAttrs;
  /** Child nodes (optional, only for container elements) */
  children?: IconNode[];
}

/**
 * Icon definition function parameters and return type
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
   * @returns SVG node structure with paths and attributes
   */
  icon: (primaryColor: string, secondaryColor: string) => IconNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant (filled, outlined, twotone) */
  theme: string;
}

/**
 * Project icon definition (twotone theme)
 * Represents a bar chart or project analytics icon
 */
declare const projectIcon: IconDefinition;

export default projectIcon;