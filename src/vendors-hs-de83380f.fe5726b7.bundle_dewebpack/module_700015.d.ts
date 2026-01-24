/**
 * Twitch icon component definition (outlined theme)
 * @module TwitchOutlinedIcon
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChildElement[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon visual structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Twitch outlined icon definition
 * Represents the Twitch logo in outlined style with a viewBox of 64 64 896 896
 */
declare const TwitchOutlinedIcon: IconDefinition;

export default TwitchOutlinedIcon;