/**
 * Alert icon definition for Ant Design Icons
 * @module AlertFilled
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChild[];
}

/**
 * Icon definition interface for Ant Design icon system
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
 * Alert filled icon definition
 * Represents a bell/alert icon in filled style
 */
declare const AlertFilledIcon: IconDefinition;

export default AlertFilledIcon;