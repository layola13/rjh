/**
 * Insurance filled icon component definition
 * @module IconDefinition
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChildElement[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconElement;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Insurance filled icon definition
 * Represents an insurance or protection symbol in filled style
 */
declare const insuranceFilledIcon: IconDefinition;

export default insuranceFilledIcon;