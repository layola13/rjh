/**
 * Info circle icon component definition (filled theme)
 * @module IconInfoCircleFilled
 */

/**
 * SVG attributes interface for viewBox and focusable properties
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the viewport */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes containing the SVG path data
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element representing a path
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure defining the SVG element and its children
 */
interface IconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Info circle filled icon - displays an information symbol in a filled circle
 * Typically used for informational messages and help tooltips
 */
declare const iconInfoCircleFilled: IconDefinition;

export default iconInfoCircleFilled;