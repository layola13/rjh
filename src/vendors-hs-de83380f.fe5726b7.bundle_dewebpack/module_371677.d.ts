/**
 * Left Circle Icon (Outlined)
 * 
 * An outlined circular icon with a left-pointing chevron/arrow inside.
 * Used in Ant Design icon library for navigation or directional purposes.
 * 
 * @module LeftCircleOutlined
 */

/**
 * SVG element attributes interface
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) that make up the icon */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Left Circle Outlined Icon
 * 
 * Contains the complete SVG definition for a left-pointing arrow
 * inside a circle outline, following Ant Design's icon specification.
 */
declare const LeftCircleOutlined: IconDefinition;

export default LeftCircleOutlined;