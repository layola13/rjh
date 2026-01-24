/**
 * Ant Design Icon: Insert Row Left (Outlined)
 * 
 * Represents an icon component configuration for inserting a row to the left.
 * This structure is compatible with Ant Design's icon system.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element can receive focus */
  focusable?: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d?: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttributes {
  [key: string]: string | number | boolean | undefined;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: ElementAttributes | SvgAttributes | PathAttributes;
  /** Nested child elements (optional) */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** SVG tag name */
    tag: string;
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements of the SVG */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Insert Row Left icon configuration
 * 
 * Provides the complete SVG structure and metadata for the "insert-row-left" icon
 * in the outlined theme variant.
 */
declare const insertRowLeftIcon: IconDefinition;

export default insertRowLeftIcon;