/**
 * Icon definition for a down-square outlined icon
 * @module DownSquareOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data */
  d: string;
}

/**
 * SVG element child node
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths) */
    children: SvgChild[];
  };
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Down square outlined icon definition
 * Represents a square with a downward-pointing arrow/chevron
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;