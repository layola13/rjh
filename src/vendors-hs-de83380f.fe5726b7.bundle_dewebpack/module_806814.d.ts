/**
 * Aliwangwang icon definition for outlined theme
 * @module AliwangwangOutlined
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, etc.) */
  children: SVGChild[];
}

/**
 * Complete icon metadata
 */
interface IconMetadata {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Aliwangwang (阿里旺旺) outlined icon
 * Represents the Alibaba instant messaging application icon
 */
declare const AliwangwangOutlinedIcon: IconMetadata;

export default AliwangwangOutlinedIcon;