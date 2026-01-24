/**
 * Info Circle Icon (Outlined Theme)
 * 
 * A circular information icon with an "i" symbol inside.
 * Used to indicate informational content or help text.
 * 
 * @module InfoCircleOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface SvgIcon {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child path elements that compose the icon */
  children: PathElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Info Circle Outlined Icon
 * 
 * Default export containing the complete icon definition.
 * The icon consists of:
 * - An outer circle stroke
 * - A dot representing the top of the "i"
 * - A vertical bar representing the stem of the "i"
 */
declare const InfoCircleOutlinedIcon: IconDefinition;

export default InfoCircleOutlinedIcon;