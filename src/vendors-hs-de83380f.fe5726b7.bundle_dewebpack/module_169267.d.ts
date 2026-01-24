/**
 * DislikeFilled icon configuration
 * Ant Design icon definition for a filled dislike/thumbs-down icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
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
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child SVG elements */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure containing tag, attributes and children */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme style of the icon */
  theme: string;
}

/**
 * Dislike filled icon definition
 * Represents a thumbs-down gesture in filled style
 */
declare const dislikeFilledIcon: IconDefinition;

export default dislikeFilledIcon;