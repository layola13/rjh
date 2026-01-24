/**
 * Bug icon component definition for Ant Design icon library.
 * Represents a bug/insect symbol, typically used for bug reporting or debugging features.
 * 
 * @module BugOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** ViewBox coordinates and dimensions for SVG canvas */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Bug icon definition with outlined theme.
 * Contains SVG paths for rendering a bug icon at various sizes.
 */
declare const BugOutlinedIcon: IconDefinition;

export default BugOutlinedIcon;