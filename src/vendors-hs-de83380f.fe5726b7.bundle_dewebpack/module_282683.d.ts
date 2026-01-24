/**
 * Icon definition for a code icon with filled theme
 * This module exports an Ant Design icon configuration object
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for the root SVG element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Code icon definition with filled theme
 * Represents a code/terminal symbol with a command prompt and dash
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;