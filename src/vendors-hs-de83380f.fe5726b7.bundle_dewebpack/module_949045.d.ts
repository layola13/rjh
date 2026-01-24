/**
 * Cloud icon definition (filled theme)
 * @module CloudFilledIcon
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
 * SVG child element (path) definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG icon structure definition
 */
interface SvgIcon {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Cloud icon (filled theme) definition
 * Represents a cloud shape, commonly used for cloud storage, weather, or upload/download indicators
 */
declare const cloudFilledIcon: IconDefinition;

export default cloudFilledIcon;