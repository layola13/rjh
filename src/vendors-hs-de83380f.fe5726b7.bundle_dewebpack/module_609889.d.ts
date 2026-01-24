/**
 * Minus Square Outlined Icon
 * 
 * An outlined square icon with a minus/subtract symbol in the center.
 * Typically used for collapse actions, removing items, or minimizing content.
 */

/**
 * SVG path attributes interface
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
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive keyboard focus */
  focusable: string;
}

/**
 * Icon configuration object structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child SVG elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: string;
}

/**
 * Minus Square Outlined Icon Definition
 * 
 * @description Icon representing a square with a horizontal minus line
 * @theme outlined - Line-based outlined style
 */
declare const minusSquareOutlined: IconDefinition;

export default minusSquareOutlined;