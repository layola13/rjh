/**
 * PowerOff icon component definition (outlined theme)
 * Ant Design Icon: poweroff-outlined
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG child element (path) definition
 */
interface SvgChildElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: SvgPathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** Root SVG element tag */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) of the SVG */
  children: SvgChildElement[];
}

/**
 * Complete icon configuration object
 */
interface PowerOffIconConfig {
  /** Icon visual definition (SVG structure) */
  icon: IconDefinition;
  /** Icon identifier name */
  name: 'poweroff';
  /** Icon theme variant */
  theme: 'outlined';
}

/**
 * PowerOff icon configuration (outlined theme)
 * Represents a power button symbol commonly used for shutdown/power-off actions
 */
declare const PowerOffOutlined: PowerOffIconConfig;

export default PowerOffOutlined;