/**
 * Dropbox Square Filled Icon Definition
 * 
 * @description Icon component configuration for Ant Design icon system.
 * Represents a Dropbox logo in a filled square style.
 * 
 * @module DropboxSquareFilledIcon
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttributes {
  /** SVG path data string defining the shape geometry */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** ViewBox coordinates defining the SVG coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element configuration
 */
interface SVGChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Element attributes */
  attrs: SVGPathAttributes;
}

/**
 * Icon SVG configuration structure
 */
interface IconSVGConfig {
  /** HTML/SVG tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSVGConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Dropbox Square Filled Icon
 * 
 * @description Complete icon definition for a filled Dropbox logo
 * enclosed in a square. Used with Ant Design icon components.
 * 
 * Icon dimensions: 896x896 viewBox (with 64px offset)
 * Theme: Filled
 */
declare const DropboxSquareFilledIcon: IconDefinition;

export default DropboxSquareFilledIcon;