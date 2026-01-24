/**
 * Ant Design Icon: Funnel Plot (Outlined)
 * 
 * A funnel plot icon component configuration for Ant Design.
 * Represents a filter or funnel visualization commonly used in data analysis.
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
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
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure definition
 */
interface IconStructure {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Child elements (paths, shapes, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration
 */
interface IconConfig {
  /** Icon SVG structure */
  icon: IconStructure;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Funnel Plot icon configuration
 * 
 * @remarks
 * This icon is part of the Ant Design icon library.
 * It depicts a funnel/filter shape used for data filtering and funnel chart representations.
 */
declare const funnelPlotOutlined: IconConfig;

export default funnelPlotOutlined;