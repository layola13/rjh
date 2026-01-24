/**
 * Chrome browser icon component definition (outlined theme)
 * Provides SVG icon data for Ant Design icon system
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
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * SVG root element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG icon element structure
 */
interface IconElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: PathElement[];
}

/**
 * Icon definition interface for Ant Design icon system
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon visual style theme */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Chrome browser icon definition (outlined variant)
 * Contains SVG path data representing the Chrome logo
 */
declare const chromeOutlined: IconDefinition;

export default chromeOutlined;