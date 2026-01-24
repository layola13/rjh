/**
 * File ZIP icon component definition for Ant Design Icons
 * @module FileZipOutlined
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Icon definition interface for Ant Design icon system
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File ZIP outlined icon definition
 * Represents a ZIP archive file in the outlined style
 */
declare const FileZipOutlinedIcon: IconDefinition;

export default FileZipOutlinedIcon;