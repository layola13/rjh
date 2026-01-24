/**
 * Gift icon component definition for two-tone theme
 * @module GiftTwoToneIcon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon structure returned by icon function
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon generator function signature
 * @param primaryColor - Primary fill color for the icon
 * @param secondaryColor - Secondary fill color for two-tone effect
 * @returns SVG icon structure
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => IconSvg;

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** Function that generates the SVG icon structure */
  icon: IconFunction;
  /** Icon identifier name */
  name: 'gift';
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Gift icon in two-tone style
 * Represents a gift box with ribbon decoration
 */
declare const GiftTwoToneIcon: IconDefinition;

export default GiftTwoToneIcon;