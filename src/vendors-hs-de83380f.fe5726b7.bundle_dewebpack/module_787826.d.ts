/**
 * Pie Chart Icon - Ant Design outlined icon component
 * Represents a circular statistical graphic divided into slices
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes for the root container
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the element can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure definition
 */
interface IconSvg {
  /** SVG tag identifier */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child SVG elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Ant Design icon definition structure
 */
interface IconDefinition {
  /** SVG icon structure */
  icon: IconSvg;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: string;
}

/**
 * Pie chart icon definition
 * Contains SVG markup for rendering a pie chart icon in outlined style
 */
declare const pieChartOutlined: IconDefinition;

export default pieChartOutlined;