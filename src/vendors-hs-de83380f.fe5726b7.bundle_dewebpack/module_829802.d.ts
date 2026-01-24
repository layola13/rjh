/**
 * Interaction icon component definition (Outlined theme)
 * Represents a bidirectional arrow icon commonly used for interaction indicators
 */

/**
 * SVG attributes for the root element
 */
interface SVGAttributes {
  /** The viewBox coordinate system for the SVG */
  viewBox: string;
  /** Whether the SVG element should be focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon definition with metadata
 */
interface IconDefinition {
  /** The icon's SVG structure */
  icon: IconStructure;
  /** Semantic name of the icon */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Interaction icon definition
 * A bidirectional exchange/interaction icon in outlined style
 */
declare const interactionIcon: IconDefinition;

export default interactionIcon;