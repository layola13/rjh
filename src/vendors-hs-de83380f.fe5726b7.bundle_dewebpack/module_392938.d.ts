/**
 * Icon definition for a question-circle icon in twotone theme
 */
export interface IconAttrs {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents a single SVG element (path, circle, etc.)
 */
export interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
}

/**
 * SVG icon structure returned by the icon function
 */
export interface IconSvg {
  /** Root SVG tag */
  tag: "svg";
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child SVG elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Configuration object for an Ant Design icon
 */
export interface IconDefinition {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for twotone theme
   * @returns SVG element structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: "question-circle";
  
  /** Visual theme of the icon */
  theme: "twotone";
}

/**
 * Question circle icon in twotone theme
 * Displays a question mark inside a circle with two-tone coloring
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;