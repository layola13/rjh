/**
 * Pause circle icon definition (outlined theme)
 * A circular pause button icon with two vertical bars
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure defining SVG representation
 */
interface IconDefinition {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'pause-circle';
  /** Icon visual theme variant */
  theme: 'outlined';
}

/**
 * Default export: Pause circle outlined icon
 * 
 * Represents a pause button within a circle, typically used in media players
 * or to indicate a paused state in user interfaces.
 */
declare const pauseCircleOutlined: IconExport;

export default pauseCircleOutlined;