/**
 * Area Chart Icon Definition
 * 
 * An outlined area chart icon component definition for Ant Design icon library.
 * Represents a line chart with filled area underneath, commonly used for data visualization.
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface for the root SVG element
 */
interface SvgRootAttrs {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG can receive focus */
  focusable: string;
}

/**
 * SVG child element definition
 */
interface SvgChildElement {
  /** The SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: {
    /** The SVG tag name */
    tag: string;
    /** Root SVG element attributes */
    attrs: SvgRootAttrs;
    /** Child elements (paths, shapes, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * Area Chart Icon - Outlined Theme
 * 
 * A complete icon definition for an area chart visualization icon.
 * This icon shows a line chart with a filled area underneath, typically used
 * to represent cumulative data or trends over time.
 * 
 * @remarks
 * - ViewBox: 64 64 896 896 (standard Ant Design icon dimensions)
 * - Theme: outlined
 * - Not focusable by default
 */
declare const areaChartOutlined: IconDefinition;

export default areaChartOutlined;