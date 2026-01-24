/**
 * Fast Backward filled icon definition
 * Ant Design Icons - Fast Backward (Filled theme)
 */

/**
 * SVG attributes interface for viewBox and focusable properties
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
 * Icon definition structure containing SVG metadata
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Fast Backward icon with filled theme
 * Represents a media control for fast backward/rewind functionality
 */
declare const FastBackwardFilled: IconDefinition;

export default FastBackwardFilled;

export { IconDefinition, IconStructure, SvgAttributes, PathAttributes, SvgChild };