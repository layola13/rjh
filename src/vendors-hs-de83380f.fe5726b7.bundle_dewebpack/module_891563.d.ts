/**
 * Ant Design Icon Definition
 * Icon: file-exclamation (filled theme)
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon structure containing SVG markup */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * File exclamation icon definition (filled theme)
 * Represents a file document with an exclamation mark indicator
 */
declare const fileExclamationIcon: IconDefinition;

export default fileExclamationIcon;