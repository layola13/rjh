/**
 * Ant Design Icon: Control (Outlined)
 * 
 * This module exports an icon configuration object for the "control" icon
 * in the outlined theme. The icon represents a control interface with
 * adjustable sliders or parameters.
 */

/**
 * SVG attributes configuration
 */
interface SvgAttrs {
  /** The viewBox attribute defines the position and dimension of the SVG viewport */
  viewBox: string;
  /** Indicates whether the element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** The SVG path data that defines the shape to be drawn */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** The HTML/SVG tag name */
  tag: 'path';
  /** Attributes for the path element */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** The root SVG tag */
  tag: 'svg';
  /** Attributes for the SVG element */
  attrs: SvgAttrs;
  /** Child elements (paths) that compose the icon */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** The icon SVG structure and properties */
  icon: IconStructure;
  /** The semantic name of the icon */
  name: string;
  /** The visual theme/style of the icon */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Default export: Control icon configuration
 * 
 * Represents a control panel icon with two adjustable sliders within
 * a square frame. Suitable for settings, adjustments, or configuration UIs.
 */
declare const controlIcon: IconConfig;

export default controlIcon;