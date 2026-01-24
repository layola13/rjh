/**
 * SVG icon definition for a "read" icon (book/reading theme)
 * Represents an outlined book icon typically used in UI libraries like Ant Design
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Main icon structure
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** The icon's SVG definition */
  icon: IconDefinition;
  /** Semantic name of the icon */
  name: 'read';
  /** Visual theme variant */
  theme: 'outlined';
}

/**
 * Default export: Read icon configuration
 * An outlined book icon showing an open book with pages
 */
declare const iconConfig: IconConfig;

export default iconConfig;