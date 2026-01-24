/**
 * Camera icon component configuration for two-tone theme
 * Provides SVG path data and attributes for rendering a camera icon
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates defining the canvas area */
  viewBox: string;
  /** Whether the SVG element should be focusable */
  focusable: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
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
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration interface
 */
interface IconConfig {
  /**
   * Icon generator function
   * @param primaryColor - Primary fill color for the icon
   * @param secondaryColor - Secondary fill color for the two-tone effect
   * @returns SVG structure object
   */
  icon(primaryColor: string, secondaryColor: string): IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Camera icon configuration with two-tone theme support
 */
declare const cameraIcon: IconConfig;

export default cameraIcon;