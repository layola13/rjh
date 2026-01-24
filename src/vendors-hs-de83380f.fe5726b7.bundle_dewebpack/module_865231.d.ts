/**
 * Red envelope filled icon definition for Ant Design Icons
 * @module RedEnvelopeFilled
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
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SVGChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Red envelope (hongbao) icon in filled style
 * Commonly used to represent monetary gifts in Chinese culture
 */
declare const RedEnvelopeFilledIcon: IconDefinition;

export default RedEnvelopeFilledIcon;