/**
 * Icon definition for the "more" icon with outlined theme
 * Represents a vertical three-dot menu icon (kebab menu)
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: "path";
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG icon structure interface
 */
interface IconSvg {
  /** HTML tag name */
  tag: "svg";
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: PathElement[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: "outlined" | "filled" | "two-tone";
}

/**
 * Default export: "more" icon definition
 * A vertical three-dot menu icon commonly used for additional options
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;