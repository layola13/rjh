/**
 * Moon icon definition for Ant Design Icons
 * @module MoonFilledIcon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgRootAttrs {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgRootAttrs;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface IconObject {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Moon filled icon definition
 * Represents a crescent moon shape commonly used for dark mode toggles
 */
declare const moonFilledIcon: IconObject;

export default moonFilledIcon;