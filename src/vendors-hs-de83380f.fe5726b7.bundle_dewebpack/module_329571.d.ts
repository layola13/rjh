/**
 * Like icon component configuration for Ant Design Icons
 * @module LikeOutlined
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
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element interface
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration interface
 */
interface IconConfiguration {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChildElement[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfiguration;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Like (thumbs up) icon in outlined theme
 * Used to represent approval, agreement, or positive feedback
 */
declare const LikeOutlined: IconDefinition;

export default LikeOutlined;