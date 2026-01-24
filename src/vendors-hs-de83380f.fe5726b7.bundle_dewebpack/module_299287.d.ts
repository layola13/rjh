/**
 * Loading icon configuration for Ant Design icon system
 * @module LoadingOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure configuration
 */
interface IconConfig {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths) that compose the icon */
  children: SVGChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon visual configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Loading icon (outlined theme)
 * Represents a spinning loading indicator
 */
declare const loadingIcon: IconDefinition;

export default loadingIcon;