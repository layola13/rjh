/**
 * Verified icon component definition for Ant Design Icons
 * @module VerifiedOutlined
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
 * Generic element attributes (empty for defs/style tags)
 */
interface EmptyAttributes {}

/**
 * SVG child element union type
 */
type SVGChildElement = 
  | DefsElement
  | PathElement;

/**
 * Defs element structure
 */
interface DefsElement {
  /** HTML tag name */
  tag: 'defs';
  /** Element attributes (empty for defs) */
  attrs: EmptyAttributes;
  /** Child elements (style tags) */
  children: StyleElement[];
}

/**
 * Style element structure
 */
interface StyleElement {
  /** HTML tag name */
  tag: 'style';
  /** Element attributes (empty for style) */
  attrs: EmptyAttributes;
}

/**
 * Path element structure
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes containing SVG path data */
  attrs: PathAttributes;
}

/**
 * SVG icon definition structure
 */
interface IconDefinition {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Array of child elements (defs and paths) */
  children: SVGChildElement[];
}

/**
 * Complete icon configuration interface
 */
interface IconConfig {
  /** SVG icon definition containing structure and paths */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'verified';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Verified icon (outlined theme) for Ant Design
 * Represents a verified badge or certification mark with an information symbol inside
 */
declare const verifiedOutlinedIcon: IconConfig;

export default verifiedOutlinedIcon;