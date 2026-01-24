/**
 * Bell notification icon component definition (filled theme)
 * @module BellFilledIcon
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
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** Root SVG attributes */
  attrs: SvgRootAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Bell notification icon (filled theme)
 * Represents alerts, notifications, and reminders
 */
declare const bellFilledIcon: IconDefinition;

export default bellFilledIcon;