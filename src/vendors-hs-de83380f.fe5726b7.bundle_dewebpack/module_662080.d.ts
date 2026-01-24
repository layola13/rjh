/**
 * Dribbble Circle Filled Icon
 * 
 * An Ant Design icon component representing the Dribbble logo in a circular filled style.
 * This icon is typically used to link to Dribbble profiles or indicate Dribbble-related content.
 * 
 * @module DribbbleCircleFilledIcon
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
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon object structure
 */
interface IconObject {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: "dribbble-circle";
  /** Icon theme variant */
  theme: "filled";
}

/**
 * Dribbble Circle Filled Icon
 * 
 * SVG icon definition for the Dribbble logo in a filled circular style.
 * The icon uses a 896x896 viewBox with detailed path data.
 */
declare const DribbbleCircleFilledIcon: IconObject;

export default DribbbleCircleFilledIcon;