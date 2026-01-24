/**
 * Bug icon component definition for Ant Design icon library
 * Provides a two-tone bug icon in SVG format
 */

/**
 * SVG element attributes interface
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox?: string;
  /** Whether the SVG is focusable */
  focusable?: string;
}

/**
 * SVG path element attributes interface
 */
interface PathAttrs {
  /** SVG path data string */
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
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Generates the SVG icon structure
   * @param primaryColor - Primary fill color for the icon outline
   * @param secondaryColor - Secondary fill color for the icon fill/background
   * @returns Complete SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: 'bug';
  
  /** Icon theme variant */
  theme: 'twotone';
}

/**
 * Bug icon definition for two-tone theme
 * Used in Ant Design icon system
 */
declare const bugIcon: IconDefinition;

export default bugIcon;