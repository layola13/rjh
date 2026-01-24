/**
 * Ant Design Icon: File Sync (Outlined)
 * Represents a file synchronization icon with refresh arrows
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
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
  /** Root SVG element tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File Sync Icon Definition
 * 
 * A outlined-style icon depicting a document with circular refresh arrows,
 * commonly used to represent file synchronization operations.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896 (standard Ant Design icon dimensions)
 * - Theme: outlined
 * - Use case: File sync, cloud sync, refresh document operations
 */
declare const FileSyncIcon: IconDefinition;

export default FileSyncIcon;