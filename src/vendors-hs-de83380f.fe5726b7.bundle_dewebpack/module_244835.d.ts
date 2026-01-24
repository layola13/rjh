/**
 * Cloud icon component definition (outlined theme)
 * Provides SVG structure for Ant Design cloud icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** SVG root tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * Cloud icon definition (outlined theme)
 * Contains SVG path data for rendering a cloud icon
 */
declare const cloudIcon: IconDefinition;

export default cloudIcon;