/**
 * Plus icon component definition for Ant Design icon library
 * @module PlusOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path attributes interface for SVG path elements
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element interface representing path elements
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure interface defining the complete icon configuration
 */
interface IconStructure {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) that compose the icon */
  children: SvgChildElement[];
}

/**
 * Icon definition interface for Ant Design icons
 */
interface IconDefinition {
  /** Icon structure containing SVG configuration */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Plus icon (outlined theme) definition
 * Represents an addition/plus symbol with a vertical and horizontal line
 */
declare const plusOutlinedIcon: IconDefinition;

export default plusOutlinedIcon;