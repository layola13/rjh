/**
 * Caret Right Filled Icon Component Definition
 * 
 * Represents a right-pointing caret icon in filled theme style.
 * This icon is commonly used for navigation, dropdowns, and directional indicators.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML/SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Caret Right Filled Icon Definition
 * 
 * @description A right-pointing caret icon with filled styling
 * @property {IconStructure} icon - The SVG structure of the icon
 * @property {string} name - The icon name identifier: "caret-right"
 * @property {string} theme - The icon theme: "filled"
 */
declare const caretRightFilledIcon: IconDefinition;

export default caretRightFilledIcon;