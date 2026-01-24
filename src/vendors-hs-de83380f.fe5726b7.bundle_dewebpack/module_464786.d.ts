/**
 * Heart icon component definition (outlined theme)
 * Ant Design Icons - Heart Outlined
 */

/**
 * SVG attributes interface for the icon element
 */
interface SVGAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SVGChildElement {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: string;
  /** SVG element attributes */
  attrs: SVGAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SVGChildElement[];
}

/**
 * Complete icon definition object
 */
interface IconDefinition {
  /** Icon SVG configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme variant */
  theme: string;
}

/**
 * Default export: Heart icon in outlined style
 * Represents a heart shape commonly used for favorites, likes, or love indicators
 */
declare const heartOutlined: IconDefinition;

export default heartOutlined;