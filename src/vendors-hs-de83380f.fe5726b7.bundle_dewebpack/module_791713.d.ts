/**
 * Column height icon component definition
 * Represents an outlined column height adjustment icon
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
  /** SVG root element tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, groups, etc.) */
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
  /** Icon visual theme style */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Column height icon - outlined theme
 * Displays an icon for adjusting column height with up/down arrows
 */
declare const columnHeightIcon: IconObject;

export default columnHeightIcon;