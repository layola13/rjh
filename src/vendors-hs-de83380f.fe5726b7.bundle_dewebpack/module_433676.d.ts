/**
 * FontSize icon component configuration
 * Ant Design icon definition for outlined font-size icon
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element representing a path
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * FontSize outlined icon definition
 * Represents a text formatting icon for adjusting font size
 */
declare const fontSizeOutlined: IconExport;

export default fontSizeOutlined;