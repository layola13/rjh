/**
 * SVG icon definition for a book icon with two-tone theme
 */

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
 * Icon configuration function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for two-tone effect
 * @returns SVG node structure
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgNode;

/**
 * Icon definition object
 */
interface IconDefinition {
  /** Function that generates the SVG structure with specified colors */
  icon: IconFunction;
  /** Icon identifier name */
  name: string;
  /** Visual theme of the icon */
  theme: string;
}

/**
 * Book icon definition with two-tone theme
 * Represents a book with a bookmark, commonly used in reading or documentation interfaces
 */
declare const bookIcon: IconDefinition;

export default bookIcon;