/**
 * Container icon component definition (Ant Design outlined theme)
 * Represents a container/document icon with horizontal lines
 */

/**
 * SVG attributes for the root element
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Attributes for SVG child elements (path, circle, etc.)
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Container icon definition for Ant Design Icons
 * @description Outlined theme container icon with document/file appearance
 */
declare const containerIcon: IconExport;

export default containerIcon;