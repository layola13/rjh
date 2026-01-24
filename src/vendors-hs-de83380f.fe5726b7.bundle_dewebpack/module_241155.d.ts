/**
 * File text icon component definition for Ant Design Icons
 * @module FileTextFilledIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: "svg";
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface AntdIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (filled, outlined, etc.) */
  theme: "filled" | "outlined" | "twotone";
}

/**
 * File text filled icon from Ant Design Icons library
 * Represents a document/file with text lines
 */
declare const FileTextFilledIcon: AntdIcon;

export default FileTextFilledIcon;