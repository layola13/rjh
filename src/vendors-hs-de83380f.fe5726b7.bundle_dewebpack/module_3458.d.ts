/**
 * Weibo icon component definition for Ant Design Icons
 * @module WeiboOutlined
 */

export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

export interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

export interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

export interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements of the icon */
  children: IconChild[];
}

/**
 * Weibo icon configuration object
 */
export interface WeiboIconConfig {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Weibo outlined icon definition
 * Represents the Weibo social media platform logo
 */
declare const weiboOutlined: WeiboIconConfig;

export default weiboOutlined;