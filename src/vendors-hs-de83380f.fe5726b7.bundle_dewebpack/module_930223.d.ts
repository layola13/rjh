/**
 * QQ Square filled icon definition
 * Module ID: 930223
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG root element attributes interface
 */
interface SvgRootAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG icon structure definition
 */
interface SvgIconStructure {
  /** Root SVG tag name */
  tag: string;
  /** Root SVG element attributes */
  attrs: SvgRootAttrs;
  /** Child elements array */
  children: SvgChildElement[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * QQ Square filled icon - represents QQ social platform logo in a square filled style
 * @type {IconDefinition}
 */
declare const qqSquareFilledIcon: IconDefinition;

export default qqSquareFilledIcon;