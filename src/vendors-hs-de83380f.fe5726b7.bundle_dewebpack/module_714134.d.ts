/**
 * Ant Design Icons - Pound Circle Filled Icon
 * SVG icon definition for a pound currency symbol inside a circle
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface SvgPath {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG icon structure definition
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: 'svg';
  /** Root SVG attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgPath[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Default export: Pound Circle Filled icon definition
 * Represents a pound sterling (£) currency symbol enclosed in a filled circle
 */
declare const poundCircleFilledIcon: IconDefinition;

export default poundCircleFilledIcon;