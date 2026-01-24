/**
 * SVG icon definition for a two-tone close square icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
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
  /** Child nodes (optional, only for container elements) */
  children?: SvgNode[];
}

/**
 * Icon generator function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for the icon (used in two-tone theme)
 * @returns SVG node structure representing the icon
 */
type IconGenerator = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Function that generates the SVG structure for the icon */
  icon: IconGenerator;
  /** Icon identifier name */
  name: string;
  /** Visual theme of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Close square icon with two-tone theme
 * Displays an 'X' (close) symbol within a square border
 */
declare const closeSquareTwoTone: IconDefinition;

export default closeSquareTwoTone;