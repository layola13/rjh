/**
 * Instagram icon component definition (outlined theme)
 * Provides SVG icon configuration for Instagram logo
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
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
 * SVG child element definition
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths) */
  children: SvgChildElement[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: 'instagram';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * Default export: Instagram outlined icon definition
 * Contains complete SVG markup and metadata for rendering Instagram icon
 */
declare const instagramOutlined: IconDefinition;

export default instagramOutlined;