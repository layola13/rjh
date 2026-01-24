/**
 * Icon definition for a two-tone tags icon component
 * @module IconDefinition
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path element */
  d?: string;
  /** Fill color for the SVG element */
  fill?: string;
}

/**
 * Represents a single SVG element (path, circle, etc.)
 */
interface SvgElement {
  /** The SVG tag name (e.g., 'path', 'circle', 'rect') */
  tag: string;
  /** Attributes to be applied to the SVG element */
  attrs: SvgAttrs;
  /** Optional nested child elements */
  children?: SvgElement[];
}

/**
 * Root SVG icon structure
 */
interface SvgIcon {
  /** The root SVG tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements */
  children: SvgElement[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (used in two-tone themes)
   * @returns The complete SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgIcon;
  
  /** The name identifier for the icon */
  name: string;
  
  /** The visual theme of the icon (e.g., 'filled', 'outlined', 'twotone') */
  theme: string;
}

/**
 * Two-tone tags icon definition
 * Represents a tags icon with primary and secondary colors for depth effect
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;