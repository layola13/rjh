/**
 * Play Circle Outlined Icon
 * An SVG icon component representing a play button inside a circle outline
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
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
 * SVG root attributes interface
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
interface IconStructure {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /** SVG icon structure and metadata */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Play Circle Outlined icon configuration
 * Contains SVG structure for a circular play button icon with outline style
 */
declare const playCircleOutlined: IconConfig;

export default playCircleOutlined;