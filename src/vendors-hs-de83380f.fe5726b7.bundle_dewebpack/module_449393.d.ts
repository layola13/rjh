/**
 * Google Plus Circle filled icon component definition
 * @module GooglePlusCircleFilled
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface GooglePlusCircleFilledIcon {
  /** Icon SVG structure definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Google Plus Circle filled icon configuration
 * Contains the SVG path data and metadata for rendering a filled Google Plus icon in a circle
 */
declare const googlePlusCircleFilled: GooglePlusCircleFilledIcon;

export default googlePlusCircleFilled;