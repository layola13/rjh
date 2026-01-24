/**
 * Icon definition for a two-tone Markdown file icon
 * @module FileMarkdownTwoTone
 */

/**
 * SVG attributes for path and svg elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** Path data for SVG path elements */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGAttributes;
}

/**
 * Complete SVG icon structure
 */
interface IconSVGStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child path elements that compose the icon */
  children: SVGChildElement[];
}

/**
 * Parameters for generating the icon
 * @param primaryColor - Primary fill color for main icon elements
 * @param secondaryColor - Secondary fill color for accent/background elements
 */
type IconGenerator = (primaryColor: string, secondaryColor: string) => IconSVGStructure;

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /**
   * Generates the SVG structure for the icon
   * @param primaryColor - Main color used for primary icon paths
   * @param secondaryColor - Accent color used for secondary icon paths (two-tone effect)
   * @returns Complete SVG structure with paths and attributes
   */
  icon: IconGenerator;
  
  /**
   * Semantic name identifying the icon
   */
  name: string;
  
  /**
   * Visual theme variant of the icon
   * @remarks 'twotone' indicates a two-color design with primary and secondary colors
   */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Two-tone Markdown file icon definition
 * 
 * @remarks
 * This icon represents a Markdown document file with a distinctive "M" letter.
 * The two-tone theme uses two colors to create visual depth.
 * 
 * @example
 *