/**
 * Rotate Left icon component definition
 * Represents a rotate-left action icon in outlined theme
 */

/**
 * SVG attributes interface for viewBox and focusable properties
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes containing SVG path data
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic attributes object for SVG child elements
 */
interface ElementAttributes {
  [key: string]: string | number | boolean;
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
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (defs, paths, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Rotate Left icon definition
 * An outlined icon depicting a counter-clockwise rotation arrow
 */
declare const rotateLeftIcon: IconDefinition;

export default rotateLeftIcon;