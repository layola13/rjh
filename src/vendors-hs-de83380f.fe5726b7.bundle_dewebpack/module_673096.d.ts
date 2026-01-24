/**
 * Behance Circle filled icon component definition
 * @module BehanceCircleFilledIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Behance Circle filled icon definition
 * Represents the Behance logo in a circular filled style
 */
declare const BehanceCircleFilledIcon: IconDefinition;

export default BehanceCircleFilledIcon;