/**
 * Icon definition for a right-square icon with two-tone theme
 * @module IconDefinition
 */

/**
 * Represents the attributes for an SVG element or path
 */
interface SvgAttributes {
  /** ViewBox dimensions for the SVG */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents a single SVG element (svg tag or path tag)
 */
interface SvgElement {
  /** HTML tag name */
  tag: 'svg' | 'path';
  /** Attributes applied to the tag */
  attrs: SvgAttributes;
  /** Nested child elements (only for svg tag) */
  children?: SvgElement[];
}

/**
 * Return type for the icon generator function
 */
interface IconStructure {
  /** The root SVG element with all paths */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child path elements that make up the icon */
  children: SvgElement[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Primary fill color for main paths
   * @param secondaryColor - Secondary fill color for accent paths
   * @returns Complete SVG element structure
   */
  icon(primaryColor: string, secondaryColor: string): IconStructure;
  
  /** Icon identifier name */
  name: 'right-square';
  
  /** Visual theme variant */
  theme: 'twotone';
}

/**
 * Default export containing the right-square icon definition
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;