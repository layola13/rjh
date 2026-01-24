/**
 * Close Square Filled Icon
 * An Ant Design icon component representing a close (X) symbol within a filled square.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element structure
 */
interface SvgPath {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgRootAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': 'evenodd';
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: 'false' | 'true';
}

/**
 * SVG icon structure
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgRootAttrs;
  /** Child path elements */
  children: SvgPath[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: 'close-square';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Close Square Filled Icon Definition
 * 
 * Exports a filled square icon with a close (X) symbol in the center.
 * Commonly used in UI to represent close, cancel, or delete actions.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896
 * - Theme: filled
 * - Part of Ant Design icon library
 */
declare const closeSquareFilledIcon: IconDefinition;

export default closeSquareFilledIcon;