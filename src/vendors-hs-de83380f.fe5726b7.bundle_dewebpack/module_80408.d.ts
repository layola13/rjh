/**
 * Hourglass outlined icon definition for Ant Design Icons
 * @module HourglassOutlined
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
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
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements array */
  children: SvgChild[];
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
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Hourglass outlined icon definition
 * Represents a time/waiting indicator in outlined style
 */
declare const HourglassOutlinedIcon: IconDefinition;

export default HourglassOutlinedIcon;