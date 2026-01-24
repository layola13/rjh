/**
 * Icon definition for the "folder" icon in outlined theme.
 * Represents a folder icon commonly used in file management interfaces.
 * @module FolderOutlinedIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure representing an SVG element
 */
interface IconStructure {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Folder outlined icon definition
 * Contains the SVG path data and metadata for rendering a folder icon
 */
declare const folderOutlinedIcon: IconDefinition;

export default folderOutlinedIcon;