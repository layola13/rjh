/**
 * Stock icon component definition (outlined theme)
 * Represents a stock chart or financial data visualization icon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
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
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element configuration */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface StockIconConfig {
  /** Icon SVG structure and content */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Stock icon configuration - Outlined theme
 * Displays a line chart with a horizontal bar at the bottom
 */
declare const stockIcon: StockIconConfig;

export default stockIcon;