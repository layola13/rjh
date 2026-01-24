/**
 * Icon definition for a "meh" (neutral face) icon with two-tone theme
 * @module IconDefinition
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
  /** Fill color for the path */
  fill?: string;
  /** SVG path data string */
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
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Icon function that generates SVG structure
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the icon (used in two-tone theme)
 * @returns SVG node structure representing the icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Function that generates the icon SVG structure */
  icon: IconFunction;
  /** Icon name identifier */
  name: string;
  /** Icon theme style */
  theme: string;
}

/**
 * Default export: Meh (neutral face) icon definition with two-tone theme
 * 
 * This icon represents a neutral or indifferent facial expression, commonly used
 * in user interfaces for feedback, ratings, or emotional states.
 * 
 * The icon features:
 * - A circular face outline
 * - Two eyes represented as circles
 * - A straight horizontal line for the mouth
 * 
 * @example
 *