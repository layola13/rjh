/**
 * Heat map icon definition for Ant Design Icons
 * @module HeatMapOutlined
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
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
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Heat map outlined icon definition
 * Represents a heat map visualization icon with outlined style
 */
declare const heatMapOutlinedIcon: IconDefinition;

export default heatMapOutlinedIcon;