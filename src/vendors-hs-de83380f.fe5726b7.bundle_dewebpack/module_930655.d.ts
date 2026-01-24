/**
 * Diff icon component definition for Ant Design Icons
 * Represents a document diff/comparison icon in outlined theme
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface IconObject {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon name identifier */
  name: string;
  /** Icon visual theme */
  theme: string;
}

/**
 * Diff icon - outlined theme
 * Displays a document with plus and minus symbols representing differences
 */
declare const diffIcon: IconObject;

export default diffIcon;