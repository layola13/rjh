/**
 * Right Circle Outlined Icon
 * An SVG icon representing a right-pointing arrow inside a circle
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag */
  tag: "svg";
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: "right-circle";
  /** Icon style theme variant */
  theme: "outlined";
}

/**
 * Right Circle Outlined icon definition
 * Contains SVG data for a right-pointing arrow within a circular border
 */
declare const RightCircleOutlined: IconDefinition;

export default RightCircleOutlined;