/**
 * File icon configuration for Ant Design icon system
 * Represents a filled file icon with SVG path data
 */
interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: IconAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon configuration object
 */
interface FileIconConfig {
  /** Icon SVG structure and metadata */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: string;
}

/**
 * Filled file icon configuration
 * Used in Ant Design icon library for representing file/document concepts
 */
declare const fileFilledIcon: FileIconConfig;

export default fileFilledIcon;