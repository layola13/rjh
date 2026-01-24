/**
 * Ant Design Icon: Folder Open (Filled)
 * 
 * SVG icon definition for a filled folder open icon used in Ant Design icon library.
 * This icon represents an open folder typically used in file management UIs.
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
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Folder Open icon definition (filled theme)
 * 
 * Exports the complete SVG structure for rendering a filled open folder icon.
 * Commonly used in file browsers, navigation trees, and document management interfaces.
 */
declare const folderOpenFilledIcon: IconDefinition;

export default folderOpenFilledIcon;