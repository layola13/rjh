/**
 * Weibo Square icon definition for Ant Design Icons
 * @module WeiboSquareOutlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
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
 * SVG child element representing a path
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** HTML tag name */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, groups, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Weibo Square outlined icon definition
 * Represents the Weibo social media platform logo in a square frame
 */
declare const WeiboSquareOutlined: IconDefinition;

export default WeiboSquareOutlined;