/**
 * Ant Design Icon: FileImageFilled
 * @module FileImageIcon
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
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface FileImageIconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File image filled icon definition
 * Represents a document/file with an image preview
 */
declare const fileImageIcon: FileImageIconDefinition;

export default fileImageIcon;