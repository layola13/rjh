/**
 * File Unknown Icon Component Definition
 * An outlined icon representing an unknown or unrecognized file type
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * File Unknown Icon Definition
 * Displays a file document with a question mark, indicating an unknown or unsupported file type
 */
declare const fileUnknownIcon: IconDefinition;

export default fileUnknownIcon;