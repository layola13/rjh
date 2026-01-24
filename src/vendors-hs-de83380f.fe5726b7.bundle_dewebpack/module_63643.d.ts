/**
 * SVG icon definition for a video camera with add symbol
 * Used in Ant Design icon system
 */

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child nodes (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure conforming to Ant Design icon specification
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: {
    /** Root SVG tag */
    tag: 'svg';
    /** SVG root attributes */
    attrs: {
      /** ViewBox coordinates for the SVG canvas */
      viewBox: string;
      /** Focus behavior */
      focusable: string;
    };
    /** Child SVG elements (defs, paths, etc.) */
    children: SvgNode[];
  };
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Video camera add icon definition
 * Represents a video camera icon with an add (+) symbol
 * @type {IconDefinition}
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;