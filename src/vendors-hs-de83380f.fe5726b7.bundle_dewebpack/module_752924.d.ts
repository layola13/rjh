/**
 * Ant Design Icon definition for Flag (filled theme)
 * @module FlagFilledIcon
 */

/**
 * SVG attributes interface for icon elements
 */
interface IconSvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * Icon child element (path, circle, etc.)
 */
interface IconChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs | Record<string, string>;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: IconSvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: IconChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Flag icon (filled theme) definition
 * Used to represent flags, bookmarks, or marking items
 */
declare const FlagFilledIcon: IconDefinition;

export default FlagFilledIcon;