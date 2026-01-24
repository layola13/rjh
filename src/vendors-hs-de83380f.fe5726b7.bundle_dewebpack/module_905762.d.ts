/**
 * Desktop icon component definition
 * Ant Design Icons - Desktop outlined icon
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
  /** Whether the element is focusable */
  focusable: string;
}

/**
 * SVG child element interface
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root element attributes */
    attrs: SvgAttrs;
    /** Array of child SVG elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Desktop icon definition
 * Represents a desktop/monitor outline icon from Ant Design Icons
 * @module DesktopOutlined
 */
declare const desktopIcon: IconDefinition;

export default desktopIcon;