/**
 * GitHub icon component definition for Ant Design Icons
 * @module GithubOutlined
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
interface IconConfig {
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChildElement[];
}

/**
 * Icon definition interface for Ant Design Icons
 */
interface IconDefinition {
  /** Icon configuration object containing SVG structure */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * GitHub logo icon in outlined style
 * Used in Ant Design icon library for displaying GitHub branding
 */
declare const GithubOutlinedIcon: IconDefinition;

export default GithubOutlinedIcon;