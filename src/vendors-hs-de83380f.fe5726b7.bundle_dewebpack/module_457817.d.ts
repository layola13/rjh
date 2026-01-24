/**
 * File Image Icon Component Definition
 * Ant Design outlined file-image icon configuration
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable for accessibility */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
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
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure defining the SVG configuration
 */
interface IconConfig {
  /** Root SVG tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration object */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Ant Design File Image Icon (Outlined)
 * Represents a file with an image preview icon
 */
declare const fileImageIcon: IconDefinition;

export default fileImageIcon;