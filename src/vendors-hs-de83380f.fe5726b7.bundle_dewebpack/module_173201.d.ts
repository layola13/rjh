/**
 * Small dash icon component definition
 * @module SmallDashIcon
 */

/**
 * SVG element attributes interface
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
interface SVGChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChildElement[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * Small dash outlined icon definition
 * Renders a horizontal dashed line pattern with 5 segments
 */
declare const smallDashIcon: IconDefinition;

export default smallDashIcon;