/**
 * Ant Design Icon: Radar Chart (Outlined)
 * A radar/spider chart icon component definition for Ant Design icon library
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttributes {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes
 */
interface PathAttributes {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * Generic SVG element child node structure
 */
interface SvgChildElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes | Record<string, string>;
  /** Nested children elements (optional) */
  children?: SvgChildElement[];
}

/**
 * Icon definition structure following Ant Design icon specification
 */
interface IconDefinition {
  /** Root icon configuration */
  icon: {
    /** Root SVG tag name */
    tag: string;
    /** SVG element attributes */
    attrs: SvgAttributes;
    /** Child elements (paths, groups, etc.) */
    children: SvgChildElement[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Radar chart icon definition (outlined theme)
 * Displays a radar/spider chart visualization icon
 * @default export
 */
declare const radarChartOutlined: IconDefinition;

export default radarChartOutlined;