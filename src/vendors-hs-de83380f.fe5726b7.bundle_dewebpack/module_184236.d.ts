/**
 * Ant Design Icon: Expand (Outlined)
 * Represents a fullscreen/expand icon with corner brackets
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttributes {
  [key: string]: unknown;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttributes | PathAttributes;
  /** Nested child elements */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root tag type */
    tag: 'svg';
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Expand icon definition (Outlined theme)
 * Displays four corner brackets indicating fullscreen/expand functionality
 */
declare const expandIconDefinition: IconDefinition;

export default expandIconDefinition;