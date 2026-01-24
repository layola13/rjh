/**
 * Ant Design Icon Definition - To Top (Outlined)
 * 
 * This module exports the vector path data and configuration for a "to-top" icon,
 * typically used to scroll back to the top of a page or document.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the coordinate system */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface ToTopIconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon style theme variant */
  theme: string;
}

/**
 * To-Top icon configuration
 * 
 * Displays an upward-pointing arrow above a horizontal line,
 * commonly used for "scroll to top" functionality.
 * 
 * @remarks
 * - Theme: outlined
 * - ViewBox: 64 64 896 896
 * - Contains two path elements: arrow and baseline
 */
declare const toTopIcon: ToTopIconConfig;

export default toTopIcon;