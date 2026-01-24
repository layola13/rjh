/**
 * Font colors icon definition for Ant Design Icons
 * @module FontColorsOutlined
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
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path, circle, etc.)
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG element configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Font colors outlined icon definition
 * Represents a text color formatting icon with "A" letter and underline
 */
declare const fontColorsOutlined: IconDefinition;

export default fontColorsOutlined;