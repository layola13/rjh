/**
 * Icon definition for trademark-circle (twotone theme)
 * @module IconDefinition
 */

/**
 * SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** Path data for SVG path elements */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Optional child elements */
  children?: SvgNode[];
}

/**
 * Icon function signature
 * @param primaryColor - Primary color for the icon (typically outline color)
 * @param secondaryColor - Secondary color for the icon (typically fill color in twotone theme)
 * @returns SVG element structure representing the icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /**
   * Function that generates the SVG structure for the icon
   * @param primaryColor - Primary color for the icon
   * @param secondaryColor - Secondary color for the icon (used in twotone theme)
   * @returns Root SVG node with nested path elements
   */
  icon: IconFunction;
  
  /**
   * Icon identifier name
   */
  name: string;
  
  /**
   * Icon theme type
   * @remarks Common values include "filled", "outlined", "twotone"
   */
  theme: string;
}

/**
 * Default export: Trademark Circle icon definition (twotone theme)
 * 
 * @description
 * A circular trademark (®) symbol icon with two-tone coloring.
 * The icon consists of:
 * - Outer circle outline
 * - Inner circle background
 * - "R" letter symbol
 * 
 * @example
 *