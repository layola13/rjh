/**
 * Taobao Circle Icon Definition
 * An outlined theme icon representing the Taobao logo in a circular form
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the element can receive focus */
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
 * Icon structure definition
 */
interface IconStructure {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Taobao Circle icon definition
 * Represents the Taobao e-commerce platform logo in a circular outlined style
 */
declare const TaobaoCircleIcon: IconDefinition;

export default TaobaoCircleIcon;