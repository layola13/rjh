/**
 * Icon definition for align-center outlined icon
 * This module exports an Ant Design icon configuration object
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface for viewBox container
 */
interface SvgAttributes {
  /** Defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG container attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Align center icon definition (outlined theme)
 * Used for text alignment controls in editors and UI components
 */
declare const alignCenterOutlined: IconDefinition;

export default alignCenterOutlined;