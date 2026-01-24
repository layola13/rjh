/**
 * File Add Icon Definition
 * An outlined icon representing a file with an add/plus symbol
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Root SVG icon structure
 */
interface IconDefinition {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon configuration object
 */
interface FileAddIconConfig {
  /** SVG icon structure definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'file-add';
  /** Visual style theme */
  theme: 'outlined';
}

/**
 * File Add Icon - Outlined theme
 * Represents a document/file with a plus symbol for adding new files
 */
declare const fileAddIcon: FileAddIconConfig;

export default fileAddIcon;