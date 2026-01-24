/**
 * Close icon component definition (outlined theme)
 * Module: module_941258
 * Original ID: 941258
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates defining the SVG canvas */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
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
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Close icon definition with outlined theme
 * Represents an "X" mark typically used for closing dialogs, removing items, etc.
 */
declare const closeIcon: IconDefinition;

export default closeIcon;