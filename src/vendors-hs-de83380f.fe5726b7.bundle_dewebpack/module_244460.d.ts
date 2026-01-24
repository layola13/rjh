/**
 * Sketch icon component configuration for Ant Design Icons
 * Theme: outlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG container tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that make up the icon */
  children: SvgChild[];
}

/**
 * Icon definition interface
 * Represents a complete icon configuration including SVG markup, name and theme
 */
interface IconDefinition {
  /** SVG icon structure containing the visual representation */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Sketch logo icon in outlined style
 * @see https://www.sketch.com/
 */
declare const SketchOutlined: IconDefinition;

export default SketchOutlined;