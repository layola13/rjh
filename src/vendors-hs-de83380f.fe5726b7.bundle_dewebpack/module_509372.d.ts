/**
 * SVG icon definition for a link icon
 * Theme: outlined
 * @module LinkOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG icon structure interface
 */
interface SvgIcon {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: string;
}

/**
 * Link icon definition (outlined theme)
 * Represents a chain link symbol commonly used for hyperlinks or connections
 */
declare const linkOutlinedIcon: IconDefinition;

export default linkOutlinedIcon;