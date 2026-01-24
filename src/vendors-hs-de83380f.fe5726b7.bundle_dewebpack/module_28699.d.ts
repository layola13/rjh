/**
 * Right Square Outlined Icon
 * Ant Design icon component for displaying a right-pointing arrow within a square outline.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element child node structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child SVG elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon definition
 */
interface IconDefinition {
  /** Icon SVG structure */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon design theme/variant */
  theme: string;
}

/**
 * Right Square Outlined icon definition
 * Contains SVG markup for a right-pointing arrow inside a square border
 */
declare const rightSquareOutlined: IconDefinition;

export default rightSquareOutlined;