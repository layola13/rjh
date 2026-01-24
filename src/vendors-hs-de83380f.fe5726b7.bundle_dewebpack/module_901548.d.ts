/**
 * Line chart icon definition for Ant Design Icons
 * @module LineChartOutlined
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
 * Path element attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
}

/**
 * SVG child element definition
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconDefinition {
  /** Root SVG tag name */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements of the SVG */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** Icon visual definition */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Line chart outlined icon configuration
 * Represents a line chart with axes and trend line
 */
declare const lineChartOutlined: IconConfig;

export default lineChartOutlined;