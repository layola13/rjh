/**
 * Icon definition for 'sisternode' with outlined theme
 * Represents a node connection or relationship icon in the Ant Design icon set
 */
interface IconDefinition {
  /** The root SVG icon configuration */
  icon: {
    /** SVG element tag name */
    tag: 'svg';
    /** SVG root element attributes */
    attrs: {
      /** SVG viewBox defining the coordinate system and aspect ratio */
      viewBox: string;
      /** Whether the SVG can receive focus */
      focusable: string;
    };
    /** Child elements of the SVG */
    children: Array<SvgDefsElement | SvgPathElement>;
  };
  /** Unique identifier name for the icon */
  name: string;
  /** Visual style theme of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * SVG defs element containing reusable definitions
 */
interface SvgDefsElement {
  /** Element tag name */
  tag: 'defs';
  /** Element attributes */
  attrs: Record<string, never>;
  /** Child elements, typically style definitions */
  children: SvgStyleElement[];
}

/**
 * SVG style element for embedded CSS
 */
interface SvgStyleElement {
  /** Element tag name */
  tag: 'style';
  /** Element attributes */
  attrs: Record<string, never>;
}

/**
 * SVG path element defining the icon shape
 */
interface SvgPathElement {
  /** Element tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: {
    /** SVG path data defining the shape geometry */
    d: string;
  };
}

/**
 * Sisternode icon definition
 * An outlined icon depicting a node with a plus symbol, commonly used to represent
 * adding or connecting sibling nodes in tree structures or organizational charts
 */
declare const sisternodeIcon: IconDefinition;

export default sisternodeIcon;