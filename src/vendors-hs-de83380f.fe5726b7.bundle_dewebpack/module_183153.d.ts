/**
 * Icon definition for a dot chart icon in outlined theme.
 * Represents a scatter plot or dot chart visualization with multiple circular data points.
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
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
 * SVG child element (path, circle, etc.)
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
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
  /** Icon identifier name */
  name: string;
  /** Icon visual theme style */
  theme: string;
}

/**
 * Dot chart icon definition.
 * Displays a scatter plot with axis and multiple data points of varying sizes.
 * Used to represent statistical data visualization in charts and analytics.
 */
declare const dotChartOutlined: IconDefinition;

export default dotChartOutlined;