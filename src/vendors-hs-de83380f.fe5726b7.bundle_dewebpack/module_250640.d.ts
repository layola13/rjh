/**
 * Ungroup icon component definition for Ant Design Icons
 * Theme: outlined
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
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
  attrs: PathAttributes | ElementAttributes;
  /** Nested child elements */
  children?: SvgChildElement[];
}

/**
 * Icon configuration structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root element tag name */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Array of child elements (defs, paths, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Ungroup icon definition
 * Represents an icon for ungrouping elements in a UI
 */
declare const ungroupIconDefinition: IconDefinition;

export default ungroupIconDefinition;