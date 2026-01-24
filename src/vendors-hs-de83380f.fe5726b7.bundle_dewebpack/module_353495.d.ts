/**
 * Google Plus outlined icon definition
 * @module GooglePlusOutlined
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG icon element definition
 */
interface IconElement {
  /** HTML tag name */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: PathElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Icon SVG element configuration */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Google Plus outlined icon definition
 * Contains SVG path data for rendering the Google Plus logo
 */
declare const GooglePlusOutlined: IconDefinition;

export default GooglePlusOutlined;