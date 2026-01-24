/**
 * QQ icon component configuration for Ant Design Icons
 * @module QQOutlined
 */

/**
 * SVG path attributes interface
 */
interface SVGPathAttrs {
  /** SVG path definition */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SVGAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SVGChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: SVGPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SVGAttrs;
  /** Child elements array */
  children: SVGChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** Icon SVG structure */
  icon: IconDefinition;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
}

/**
 * QQ outlined icon configuration
 * Represents the QQ logo in outlined style
 */
declare const qqOutlinedIcon: IconConfig;

export default qqOutlinedIcon;