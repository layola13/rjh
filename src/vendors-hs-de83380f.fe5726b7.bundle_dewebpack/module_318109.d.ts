/**
 * Right Square Filled Icon Definition
 * 
 * An Ant Design icon component representing a right-pointing arrow within a filled square.
 * This icon is commonly used for navigation, expansion controls, or directional indicators.
 * 
 * @module RightSquareFilled
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
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
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration object structure
 */
interface IconDefinition {
  /** SVG root element tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface RightSquareFilledIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Human-readable icon name */
  name: 'right-square';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Right Square Filled icon definition
 * 
 * A filled square icon with a right-pointing arrow/chevron inside.
 * Part of the Ant Design icon library.
 */
declare const rightSquareFilledIcon: RightSquareFilledIcon;

export default rightSquareFilledIcon;