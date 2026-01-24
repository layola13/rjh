/**
 * Smile icon component configuration (filled theme)
 * Represents a smiling face emoji icon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element structure
 */
interface SvgPath {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root attributes interface
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths) */
  children: SvgPath[];
}

/**
 * Icon component configuration
 */
interface IconConfig {
  /** SVG icon definition */
  icon: SvgIcon;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Default export: Smile icon configuration
 */
declare const smileIcon: IconConfig;

export default smileIcon;