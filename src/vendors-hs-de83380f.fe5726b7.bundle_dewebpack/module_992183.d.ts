/**
 * Book icon component definition (filled theme)
 * Represents a book symbol in the Ant Design icon system
 */

/**
 * SVG attributes interface for the icon element
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the coordinate system */
  viewBox: string;
  /** Indicates if the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure interface
 */
interface IconSvg {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
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
  /** Icon theme variant */
  theme: string;
}

/**
 * Book icon definition with filled theme
 * Contains SVG path data for rendering a book symbol
 */
declare const bookFilledIcon: IconDefinition;

export default bookFilledIcon;