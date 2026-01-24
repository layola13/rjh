/**
 * Icon render function parameters
 */
interface IconRenderParams {
  /** Primary color for the icon */
  primaryColor: string;
  /** Secondary color for the icon */
  secondaryColor: string;
}

/**
 * SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox: string;
  /** Whether the SVG element is focusable */
  focusable: string;
}

/**
 * Path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG child element (path)
 */
interface SvgChild {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG root tag */
  tag: 'svg';
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Renders the icon SVG structure
   * @param primaryColor - Primary color for the icon
   * @param secondaryColor - Secondary color for the icon
   * @returns Icon definition object containing SVG structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconDefinition;
  
  /** Icon identifier name */
  name: 'down-square';
  
  /** Icon theme style */
  theme: 'twotone';
}

/**
 * Down square icon with two-tone theme
 * Represents a downward arrow inside a square
 */
declare const iconConfig: IconConfig;

export default iconConfig;