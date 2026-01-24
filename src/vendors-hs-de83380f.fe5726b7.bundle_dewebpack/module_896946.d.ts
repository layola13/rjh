/**
 * Export icon component definition
 * Ant Design outlined export icon
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
  /** Fill rule for SVG rendering */
  "fill-rule": string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: "path";
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML tag name */
  tag: "svg";
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Export icon definition
 * Represents an outlined export icon with arrow pointing outward
 */
declare const exportIcon: IconDefinition;

export default exportIcon;