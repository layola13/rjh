/**
 * Frown filled icon component definition
 * @module IconDefinition
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG is focusable */
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
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: IconSvg;
  /** Icon name identifier */
  name: string;
  /** Icon theme variant */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Frown filled icon - represents a sad/frowning face emoji
 * Used in UI to indicate negative feedback, errors, or disappointment
 */
declare const frownFilledIcon: IconDefinition;

export default frownFilledIcon;