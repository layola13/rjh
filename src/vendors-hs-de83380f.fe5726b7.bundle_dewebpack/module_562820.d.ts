/**
 * Icon definition for a frown/sad face icon in twotone theme
 * @module FrownTwoTone
 */

/**
 * SVG element tag type
 */
type SvgTag = 'svg' | 'path';

/**
 * Attributes for SVG elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Represents an SVG element node
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: SvgTag;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child nodes (only present on svg tag) */
  children?: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon details
   * @returns SVG node structure representing the icon
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgNode;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style of the icon */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * Frown icon in twotone theme
 * Displays a sad face with two colors for depth effect
 */
declare const frownTwoToneIcon: IconDefinition;

export default frownTwoToneIcon;