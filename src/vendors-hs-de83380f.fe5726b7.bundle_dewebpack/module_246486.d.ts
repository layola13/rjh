/**
 * Stop icon component configuration (two-tone theme)
 * Represents a circular stop symbol with a diagonal line
 */

/**
 * SVG path attributes interface
 */
interface SvgPathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element (path) structure
 */
interface SvgPathElement {
  /** Element tag name */
  tag: 'path';
  /** Path attributes */
  attrs: SvgPathAttrs;
}

/**
 * SVG root element structure
 */
interface SvgElement {
  /** Root tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgPathElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the icon (two-tone effect)
   * @returns Complete SVG element structure
   */
  icon(primaryColor: string, secondaryColor: string): SvgElement;
  
  /** Icon identifier name */
  name: 'stop';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Stop icon configuration (two-tone theme)
 * Default export for the stop icon module
 */
declare const stopIcon: IconConfig;

export default stopIcon;