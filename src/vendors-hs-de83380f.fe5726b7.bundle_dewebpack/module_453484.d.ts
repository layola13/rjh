/**
 * Icon definition for a left-square filled icon
 * Module ID: 453484
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'left-square';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * Left square filled icon configuration
 * Represents a left-pointing arrow inside a filled square
 */
declare const iconConfig: IconConfig;

export default iconConfig;