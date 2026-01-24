/**
 * BoxPlot filled icon definition for Ant Design Icons
 * @module BoxPlotFilled
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon export structure
 */
interface IconExport {
  /** SVG icon definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'box-plot';
  /** Icon theme variant */
  theme: 'filled';
}

/**
 * BoxPlot filled icon - represents box plot chart visualization
 * Used for statistical data representation in charts
 */
declare const BoxPlotFilledIcon: IconExport;

export default BoxPlotFilledIcon;