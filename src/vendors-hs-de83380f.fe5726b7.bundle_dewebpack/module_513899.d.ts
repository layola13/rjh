/**
 * File Excel Icon - Two-tone theme
 * Ant Design icon component for representing Excel files
 */

/**
 * SVG attributes interface for path elements
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG attributes interface for the root svg element
 */
interface SvgAttrs {
  /** SVG viewBox dimensions */
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
  attrs: PathAttrs;
}

/**
 * Icon render function return structure
 */
interface IconDefinition {
  /** Root SVG tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon render function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon definition object
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: 'file-excel';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Default export: File Excel icon configuration
 */
declare const fileExcelIcon: IconConfig;

export default fileExcelIcon;