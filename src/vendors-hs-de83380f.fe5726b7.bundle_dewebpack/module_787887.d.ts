/**
 * Database icon component definition (filled theme)
 * Represents a database server icon with SVG path data
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path definition string */
  d: string;
}

/**
 * SVG path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconStructure {
  /** HTML tag name for root element */
  tag: "svg";
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** SVG icon structure and content */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: "filled" | "outlined" | "twotone";
}

/**
 * Database icon definition (filled theme)
 * Default export containing complete SVG icon configuration
 */
declare const _default: IconDefinition;

export default _default;