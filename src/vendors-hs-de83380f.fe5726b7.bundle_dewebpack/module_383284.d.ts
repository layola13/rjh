/**
 * SVG icon definition for an outlined gateway icon
 * @module GatewayOutlined
 */

/**
 * Represents the attributes of an SVG element or path
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Nested child elements (optional) */
  children?: SvgChild[];
}

/**
 * Defines the complete structure of an icon definition
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: string;
    /** SVG root element attributes */
    attrs: SvgAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChild[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Gateway icon definition in outlined style
 * Represents a gateway or portal interface element
 */
declare const gatewayOutlinedIcon: IconDefinition;

export default gatewayOutlinedIcon;