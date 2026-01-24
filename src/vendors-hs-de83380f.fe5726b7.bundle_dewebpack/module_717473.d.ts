/**
 * File Zip Icon (Filled Theme)
 * 
 * Ant Design icon component definition for a filled zip file icon.
 * This icon represents compressed/archive files in the UI.
 * 
 * @module FileZipFilledIcon
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path, circle, etc.)
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure defining the SVG root element
 */
interface IconElement {
  /** SVG tag name */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * File Zip filled icon definition
 * 
 * Standard 64x64 to 896x896 viewBox icon representing a ZIP archive file.
 * Part of the Ant Design icon set.
 */
declare const fileZipFilledIcon: IconDefinition;

export default fileZipFilledIcon;