/**
 * Slack Square icon component definition
 * An outlined Slack logo within a square border
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** The viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon configuration structure
 */
interface IconConfig {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Complete icon definition including metadata
 */
interface IconDefinition {
  /** Icon visual configuration */
  icon: IconConfig;
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Slack Square icon definition
 * Represents the Slack logo in an outlined square format
 */
declare const SlackSquareOutlined: IconDefinition;

export default SlackSquareOutlined;