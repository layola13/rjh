/**
 * Sound icon component configuration
 * Ant Design outlined sound icon definition
 */

/**
 * SVG element attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element configuration
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure interface
 */
interface IconSVG {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Icon definition interface
 * Complete structure for defining an Ant Design icon
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSVG;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Sound icon definition
 * Outlined theme sound/volume icon from Ant Design icon set
 */
declare const soundOutlined: IconDefinition;

export default soundOutlined;