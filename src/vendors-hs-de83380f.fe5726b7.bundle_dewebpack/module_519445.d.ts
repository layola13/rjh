/**
 * File exclamation icon definition for Ant Design Icons
 * @module FileExclamationOutlined
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data */
  d: string;
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
 * Icon definition structure interface
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * File exclamation icon - outlined theme
 * Represents a file document with an exclamation mark indicator
 */
declare const FileExclamationOutlined: IconDefinition;

export default FileExclamationOutlined;