/**
 * File Excel outlined icon component definition
 * Ant Design icon: file-excel (outlined theme)
 */

/**
 * SVG attributes interface for viewBox and focus settings
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive keyboard focus */
  focusable: string;
}

/**
 * Path element attributes defining SVG path data
 */
interface PathAttrs {
  /** SVG path data string describing the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure containing SVG definition
 */
interface IconConfig {
  /** Root SVG element tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon style theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * File Excel icon definition (outlined theme)
 * Represents an Excel file document with an 'X' marking
 */
declare const fileExcelOutlined: IconDefinition;

export default fileExcelOutlined;