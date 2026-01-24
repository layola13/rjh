/**
 * Aliwangwang filled icon definition for Ant Design Icons
 * @module AliwangwangFilled
 */

/**
 * SVG attributes interface
 */
interface SVGAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element interface
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure interface
 */
interface IconDefinition {
  /** SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements of the SVG */
  children: SVGChildElement[];
}

/**
 * Complete icon configuration interface
 */
interface AliwangwangFilledIcon {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Aliwangwang filled icon configuration
 * Represents the Aliwangwang (AliTalk) messenger icon in filled style
 */
declare const AliwangwangFilledIcon: AliwangwangFilledIcon;

export default AliwangwangFilledIcon;