/**
 * Dislike icon component definition for Ant Design icon library
 * @module DislikeOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface AntdIconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Dislike (thumbs down) icon in outlined theme
 * Standard Ant Design icon configuration
 */
declare const dislikeOutlinedIcon: AntdIconConfig;

export default dislikeOutlinedIcon;