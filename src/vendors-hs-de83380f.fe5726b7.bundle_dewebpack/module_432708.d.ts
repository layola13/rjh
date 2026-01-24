/**
 * Mac Command icon component definition
 * Represents the Command (⌘) key symbol commonly found on Mac keyboards
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
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
 * Generic element attributes (for defs, style tags, etc.)
 */
interface GenericAttributes {
  [key: string]: unknown;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: 'defs' | 'style' | 'path';
  /** Element attributes */
  attrs: GenericAttributes | PathAttributes;
  /** Nested child elements (optional) */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  icon: {
    /** Root tag name */
    tag: 'svg';
    /** SVG attributes */
    attrs: SvgAttributes;
    /** Child elements */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Mac Command icon definition
 * Provides an outlined SVG representation of the Mac Command (⌘) symbol
 */
declare const macCommandIcon: IconDefinition;

export default macCommandIcon;