/**
 * Bug icon component definition (filled theme)
 * Represents an Ant Design bug icon in SVG format
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
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
  attrs: PathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: PathElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Bug icon definition (filled variant)
 * A complete icon configuration for rendering a bug symbol
 */
declare const bugFilledIcon: IconDefinition;

export default bugFilledIcon;