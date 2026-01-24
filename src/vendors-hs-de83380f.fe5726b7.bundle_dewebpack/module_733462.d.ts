/**
 * API icon component definition for Ant Design Icons
 * @module ApiOutlined
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
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
 * Generic attributes type for SVG child elements
 */
type ElementAttributes = SvgAttributes | PathAttributes;

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttributes;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements array */
  children: SvgChild[];
}

/**
 * Complete icon object interface
 */
interface IconObject {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * API outlined icon definition
 * Represents an API or interface connection symbol
 */
declare const apiOutlinedIcon: IconObject;

export default apiOutlinedIcon;