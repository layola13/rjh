/**
 * Icon configuration interface for SVG-based icons
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG is focusable for accessibility */
  focusable?: string;
  /** Fill color for the SVG path */
  fill?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * SVG element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child nodes (optional) */
  children?: IconNode[];
}

/**
 * Icon function return type
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child SVG elements */
  children: IconNode[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates an SVG icon definition
   * @param primaryColor - Primary color for the icon paths
   * @param secondaryColor - Secondary color for the icon paths (used for twotone effect)
   * @returns SVG icon structure with paths and attributes
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme of the icon (e.g., 'filled', 'outlined', 'twotone') */
  theme: string;
}

/**
 * Copy icon in twotone theme
 * Represents a document copy/duplicate action
 */
declare const iconConfig: IconConfig;

export default iconConfig;