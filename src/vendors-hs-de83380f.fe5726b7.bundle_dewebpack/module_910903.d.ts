/**
 * Windows icon component definition for Ant Design Icons
 * @module WindowsOutlined
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
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Windows outlined icon configuration
 * Represents the Windows logo in outlined style
 */
declare const windowsOutlinedIcon: IconConfig;

export default windowsOutlinedIcon;