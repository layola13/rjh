/**
 * Coffee icon component definition (outlined theme)
 * Represents a coffee cup icon in SVG format
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
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG icon structure
 */
interface SvgIcon {
  /** HTML tag name */
  tag: 'svg';
  /** SVG attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: PathElement[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: SvgIcon;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Coffee icon definition with outlined theme
 * SVG viewBox: 0 0 1024 1024
 */
declare const coffeeIcon: IconDefinition;

export default coffeeIcon;