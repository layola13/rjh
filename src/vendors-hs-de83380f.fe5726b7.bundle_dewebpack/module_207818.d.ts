/**
 * Ant Design Icon: Vertical Align Top (Outlined)
 * 
 * Icon definition for a vertical align top symbol, typically used in text editors
 * or layout tools to align content to the top of a container.
 */

/**
 * SVG attributes interface for the root element
 */
interface SVGAttributes {
  /** The viewBox attribute defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SVGChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Vertical Align Top icon definition
 * 
 * @remarks
 * This icon represents vertical top alignment functionality.
 * Theme: outlined
 * 
 * @example
 *