/**
 * Plus Circle Icon - Outlined theme
 * 
 * A circular icon with a plus symbol in the center.
 * Commonly used for add/create actions in user interfaces.
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element structure
 */
interface SVGChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * SVG root element attributes
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Icon SVG structure definition
 */
interface IconSVG {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child path elements */
  children: SVGChild[];
}

/**
 * Icon definition object
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSVG;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Plus circle icon configuration
 * 
 * @remarks
 * This icon consists of:
 * - An outer circle (372px radius at standard size)
 * - An inner plus symbol with equal horizontal and vertical bars
 * 
 * @example
 *