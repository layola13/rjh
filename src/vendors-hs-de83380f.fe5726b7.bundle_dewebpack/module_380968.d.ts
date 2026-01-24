/**
 * Trophy icon component configuration for Ant Design Icons
 * @module TrophyTwoTone
 */

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
 * Path element attributes interface
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
  tag: string;
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Icon SVG structure
 */
interface IconSvg {
  /** HTML tag name for the root element */
  tag: string;
  /** SVG element attributes */
  attrs: SvgAttrs;
  /** Array of child elements (paths) */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Icon generator function
   * @param primaryColor - Primary color for the icon (foreground)
   * @param secondaryColor - Secondary color for the icon (background/accent)
   * @returns SVG icon structure
   */
  icon: (primaryColor: string, secondaryColor: string) => IconSvg;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

/**
 * Trophy two-tone icon configuration
 * Represents an award trophy with dual-color theming support
 */
declare const TrophyTwoToneIcon: IconConfig;

export default TrophyTwoToneIcon;