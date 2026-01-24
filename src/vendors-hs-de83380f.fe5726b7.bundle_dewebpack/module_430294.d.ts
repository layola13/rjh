/**
 * Ant Design Icon: Codepen Outlined
 * 
 * This module exports the SVG icon definition for the Codepen logo
 * in outlined style, compatible with Ant Design's icon system.
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
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete Ant Design icon configuration
 */
interface AntDesignIcon {
  /** SVG icon definition containing the visual representation */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'codepen';
  /** Icon style theme variant */
  theme: 'outlined';
}

/**
 * Codepen outlined icon definition for Ant Design
 * 
 * @remarks
 * This icon represents the Codepen platform logo in an outlined style.
 * The SVG uses a 896x896 viewBox with the drawing area offset by 64 units.
 * 
 * @public
 */
declare const codepenOutlined: AntDesignIcon;

export default codepenOutlined;