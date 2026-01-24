/**
 * File Excel Icon Component - Filled Theme
 * 
 * An Excel file icon component definition for Ant Design icon library.
 * This icon represents an Excel file with an "X" symbol in the filled style.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface FileExcelIconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'file-excel';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * File Excel Filled Icon
 * 
 * Represents an Excel document icon in filled style.
 * Used in file management interfaces and document type indicators.
 */
declare const fileExcelIcon: FileExcelIconConfig;

export default fileExcelIcon;