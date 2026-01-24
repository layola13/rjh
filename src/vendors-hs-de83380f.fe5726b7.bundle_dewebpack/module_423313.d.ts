/**
 * Euro Circle Icon - Two-tone theme
 * A circular icon featuring the Euro (€) currency symbol
 */

/**
 * SVG path attributes interface
 */
interface PathAttributes {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG element attributes interface
 */
interface SvgAttributes {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG child element structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttributes;
}

/**
 * Icon structure returned by the icon function
 */
interface IconStructure {
  /** Root SVG tag */
  tag: string;
  /** SVG root element attributes */
  attrs: SvgAttributes;
  /** Array of child path elements */
  children: SvgChild[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary fill color for outer paths
   * @param secondaryColor - Secondary fill color for inner Euro symbol
   * @returns SVG structure object with tag, attributes and children
   */
  icon(primaryColor: string, secondaryColor: string): IconStructure;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: string;
}

declare const euroCircleIcon: IconConfig;

export default euroCircleIcon;