/**
 * JavaScript icon component definition for Ant Design Icons
 * @module JavaScriptIcon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** Fill rule for SVG rendering */
  'fill-rule': string;
  /** ViewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
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
 * SVG child element (path) definition
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon definition interface
 */
interface IconDefinition {
  /** Icon SVG structure and metadata */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * JavaScript programming language logo icon definition
 * Outlined theme variant from Ant Design Icons library
 */
declare const JavaScriptIconDefinition: IconDefinition;

export default JavaScriptIconDefinition;