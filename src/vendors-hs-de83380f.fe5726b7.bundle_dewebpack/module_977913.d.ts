/**
 * Crown icon component definition (outlined theme)
 * Represents a crown SVG icon from an icon library
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
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) that define the icon shape */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Visual style theme */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Crown icon definition with outlined theme
 * Displays a decorative crown symbol commonly used for premium/VIP features
 */
declare const crownIcon: IconDefinition;

export default crownIcon;