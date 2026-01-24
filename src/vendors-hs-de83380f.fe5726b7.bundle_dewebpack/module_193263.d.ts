/**
 * Crown filled icon component definition
 * @module CrownFilledIcon
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
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** HTML tag name for the root element */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Array of child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface CrownFilledIcon {
  /** SVG icon configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: 'crown';
  /** Visual theme variant */
  theme: 'filled';
}

/**
 * Crown filled icon - represents achievement, premium features, or VIP status
 * 
 * Visual description: A crown symbol centered in the viewBox with a circular
 * badge or gem at the center. The design includes crown peaks and a decorative
 * center element.
 * 
 * @default
 */
declare const crownFilledIcon: CrownFilledIcon;

export default crownFilledIcon;