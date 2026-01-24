/**
 * Box Plot icon component definition (Ant Design Icons)
 * Represents a box plot chart icon in outlined theme
 */

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path attributes interface
 */
interface PathAttrs {
  /** SVG path data defining the shape geometry */
  d: string;
}

/**
 * SVG child element structure
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
  /** SVG container tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, groups, etc.) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon visual definition including SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Box Plot icon configuration
 * Used for displaying box plot chart visualizations
 */
declare const boxPlotOutlined: IconConfig;

export default boxPlotOutlined;