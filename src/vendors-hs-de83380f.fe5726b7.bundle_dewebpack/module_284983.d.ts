/**
 * Icon component configuration for a delete icon with two-tone theme
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
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
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon function return type
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** Root SVG attributes */
  attrs: IconAttrs;
  /** Child SVG elements */
  children: IconNode[];
}

/**
 * Delete icon configuration object
 */
interface DeleteIconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary color for the main icon outline
   * @param secondaryColor - Secondary color for the filled background (two-tone effect)
   * @returns Icon definition object containing SVG structure
   */
  icon(primaryColor: string, secondaryColor: string): IconDefinition;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme style */
  theme: string;
}

/**
 * Default export: Delete icon configuration with two-tone theme
 * Represents a trash bin/delete icon commonly used for delete actions
 */
declare const deleteIconConfig: DeleteIconConfig;

export default deleteIconConfig;