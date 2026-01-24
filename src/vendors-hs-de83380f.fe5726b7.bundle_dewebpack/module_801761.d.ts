/**
 * Thunderbolt filled icon definition for Ant Design
 * @module ThunderboltFilledIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChildElement[];
}

/**
 * Icon definition interface for Ant Design icons
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Thunderbolt filled icon definition
 * Represents a lightning bolt symbol in filled style
 */
declare const ThunderboltFilledIcon: IconDefinition;

export default ThunderboltFilledIcon;