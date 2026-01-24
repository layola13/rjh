/**
 * Pause Circle Icon Definition
 * 
 * A filled pause circle icon from Ant Design icon set.
 * Displays a circular pause button with two vertical bars.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** HTML tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttrs;
    /** Array of child elements (paths) */
    children: SvgChild[];
  };
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Pause Circle Icon - Filled theme
 * 
 * Icon configuration object containing SVG markup for a pause circle icon.
 * The icon features two vertical pause bars inside a circular outline.
 * 
 * @example
 *