/**
 * Two-tone CI (Continuous Integration) icon component definition
 * @module CIIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** Path data string */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the icon (theme color)
 * @returns SVG node structure representing the icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon configuration object
 */
interface IconDefinition {
  /**
   * Generates the SVG structure for the CI icon
   * @param primaryColor - Primary fill color
   * @param secondaryColor - Secondary fill color
   * @returns SVG root node with paths
   */
  icon: IconFunction;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * CI (Continuous Integration) icon with two-tone theme
 * Features a circular badge with "CI" text inside
 */
declare const CIIcon: IconDefinition;

export default CIIcon;