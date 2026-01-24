/**
 * Reddit icon configuration for Ant Design icon system
 * @module RedditOutlined
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) configuration
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths) that compose the icon */
  children: SVGChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Reddit outlined icon definition
 * Represents the Reddit logo as an Ant Design icon component
 */
declare const RedditOutlinedIcon: IconDefinition;

export default RedditOutlinedIcon;