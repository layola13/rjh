/**
 * Taobao icon component definition (Ant Design Icons)
 * Outlined theme variant
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition structure for Ant Design icon component
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: string;
}

/**
 * Taobao icon definition
 * Represents the Taobao (淘宝) logo in outlined style
 */
declare const TaobaoOutlined: IconDefinition;

export default TaobaoOutlined;

export { IconDefinition, IconSvg, SvgAttributes, PathAttributes, SvgChild };