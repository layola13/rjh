/**
 * Lock icon component definition (filled theme)
 * @module LockFilledIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute */
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
 * SVG child element interface
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure interface
 */
interface IconSvg {
  /** HTML tag name */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Icon definition interface
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Lock icon definition (filled theme)
 * Represents a padlock icon with a keyhole
 */
declare const lockFilledIcon: IconDefinition;

export default lockFilledIcon;