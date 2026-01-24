/**
 * Printer icon component definition for two-tone theme
 * @module PrinterIcon
 */

/**
 * SVG attributes interface
 */
interface SvgAttributes {
  viewBox: string;
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttributes {
  d: string;
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChildElement {
  tag: 'path';
  attrs: PathAttributes;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  tag: 'svg';
  attrs: SvgAttributes;
  children: SvgChildElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the two-tone effect
   * @returns SVG element structure with paths
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /**
   * Icon identifier name
   */
  name: 'printer';
  
  /**
   * Icon theme variant
   */
  theme: 'twotone';
}

/**
 * Printer icon configuration for Ant Design icon system
 */
declare const printerIconConfig: IconConfig;

export default printerIconConfig;