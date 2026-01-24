/**
 * Plus Square icon component definition (outlined theme)
 * Represents a square with a plus symbol inside
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** ViewBox coordinates for SVG canvas */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SVGAttributes;
  /** Child elements (paths) */
  children: SVGChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSVG;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Plus Square outlined icon definition
 * Contains SVG paths for rendering a square border with a plus sign
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;