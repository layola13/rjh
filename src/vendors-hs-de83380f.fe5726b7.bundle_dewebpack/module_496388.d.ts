/**
 * Gold icon component definition (TwoTone theme)
 * @module GoldTwoTone
 */

/**
 * SVG element tag type
 */
type SvgTag = 'svg' | 'path';

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox attribute */
  viewBox?: string;
  /** Whether the element is focusable */
  focusable?: string;
  /** Fill color for the path */
  fill?: string;
  /** Path data for SVG path element */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: SvgTag;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child nodes (only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon configuration object
 */
interface IconDefinition {
  /**
   * Generate icon SVG structure
   * @param primaryColor - Primary color for the icon (typically the main shape)
   * @param secondaryColor - Secondary color for the icon (typically the fill/background)
   * @returns SVG node structure representing the icon
   */
  icon(primaryColor: string, secondaryColor: string): SvgNode;
  
  /** Icon name identifier */
  name: string;
  
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Gold icon definition with twotone theme
 * Represents a gold/treasure icon with customizable colors
 */
declare const GoldTwoToneIcon: IconDefinition;

export default GoldTwoToneIcon;