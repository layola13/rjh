/**
 * SVG icon definition for an "radius-upleft" outlined icon.
 * This icon represents a rounded corner in the upper-left direction with a dashed border pattern.
 */

/**
 * Attributes for SVG elements (path, svg, etc.)
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data string for drawing shapes */
  d?: string;
}

/**
 * Represents a child element within an SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Root SVG icon structure
 */
interface SvgIcon {
  /** Root SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme/style variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Radius upper-left icon definition.
 * Displays a dashed border pattern forming an L-shape with a rounded upper-left corner.
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;