/**
 * Translation icon component definition
 * Ant Design icon for translation/language features
 */

/**
 * SVG attributes interface for viewBox and focus behavior
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the canvas */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes containing SVG path data
 */
interface PathAttributes {
  /** SVG path definition string */
  d: string;
}

/**
 * Generic attributes interface for SVG child elements
 */
interface ElementAttributes {
  [key: string]: string;
}

/**
 * SVG child element structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes | ElementAttributes;
  /** Nested child elements (optional) */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure matching Ant Design icon format
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: "svg";
    /** SVG root attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, defs, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: "outlined" | "filled" | "twotone";
}

/**
 * Translation icon definition
 * Represents a language/translation symbol with outlined style
 */
declare const translationIcon: IconDefinition;

export default translationIcon;