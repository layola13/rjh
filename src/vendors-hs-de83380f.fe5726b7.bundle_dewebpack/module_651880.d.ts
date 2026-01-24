/**
 * Icon definition for the 'enter' icon in outlined theme.
 * Represents an enter/return action with an arrow pointing left and down.
 */
export interface IconDefinition {
  /** The icon configuration object */
  icon: IconConfig;
  /** The name identifier of the icon */
  name: string;
  /** The visual theme style of the icon */
  theme: string;
}

/**
 * SVG icon configuration structure
 */
export interface IconConfig {
  /** The root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements within the SVG */
  children: IconChild[];
}

/**
 * SVG root element attributes
 */
export interface SvgAttributes {
  /** The SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Child element within the icon SVG
 */
export interface IconChild {
  /** The SVG child element tag name */
  tag: 'path' | 'circle' | 'rect' | 'line' | 'polyline' | 'polygon';
  /** Attributes for the child element */
  attrs: PathAttributes | Record<string, string>;
}

/**
 * Attributes for SVG path elements
 */
export interface PathAttributes {
  /** The SVG path data string defining the shape */
  d: string;
}

/**
 * Enter icon definition in outlined theme.
 * Displays a left-pointing arrow with a downward curve, commonly used for enter/return actions.
 */
declare const enterIconDefinition: IconDefinition;

export default enterIconDefinition;