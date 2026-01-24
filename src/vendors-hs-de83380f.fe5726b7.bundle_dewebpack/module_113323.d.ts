/**
 * SVG icon definition for exclamation-circle with twotone theme
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data attribute */
  d?: string;
  /** Fill color for the SVG path */
  fill?: string;
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
 * Icon generator function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the icon (used in twotone theme)
 * @returns SVG node structure representing the icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Icon generator function that creates SVG structure with specified colors
   * @param primaryColor - Primary fill color
   * @param secondaryColor - Secondary fill color
   * @returns Complete SVG node with viewBox and path children
   */
  icon: IconFunction;
  
  /** Icon name identifier */
  name: string;
  
  /** Icon theme variant (e.g., 'twotone', 'filled', 'outlined') */
  theme: string;
}

/**
 * Exclamation circle icon definition with twotone theme
 * Displays a circle with an exclamation mark (!) inside
 */
declare const exclamationCircleIcon: IconDefinition;

export default exclamationCircleIcon;