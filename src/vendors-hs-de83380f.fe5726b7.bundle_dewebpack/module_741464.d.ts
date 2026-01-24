/**
 * File PPT icon component definition for Ant Design Icons
 * Represents a PowerPoint file type icon in outlined theme
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon export interface
 */
interface FilePptOutlinedIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * File PPT outlined icon definition
 * Used to represent PowerPoint document files in the UI
 */
declare const filePptOutlined: FilePptOutlinedIcon;

export default filePptOutlined;