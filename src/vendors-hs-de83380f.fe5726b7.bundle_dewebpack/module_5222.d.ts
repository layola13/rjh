/**
 * File Word icon component definition for Ant Design Icons
 * Represents a Word document file icon in outlined theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure interface
 */
interface Icon {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: Icon;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * File Word outlined icon definition
 * Displays a document icon with a "W" letter representing Microsoft Word files
 */
declare const fileWordOutlined: IconDefinition;

export default fileWordOutlined;