/**
 * Icon component definition for a two-tone tag icon
 * @module TagTwoToneIcon
 */

/**
 * SVG path attributes interface
 */
interface PathAttrs {
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
 * SVG child element structure
 */
interface SvgChild {
  /** HTML tag name */
  tag: string;
  /** Element attributes */
  attrs: PathAttrs;
}

/**
 * Complete SVG icon structure
 */
interface SvgIcon {
  /** Root SVG tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: SvgChild[];
}

/**
 * Icon generation function type
 * @param primaryColor - Primary color for main icon elements
 * @param secondaryColor - Secondary color for background/accent elements
 * @returns Complete SVG icon object structure
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgIcon;

/**
 * Icon component configuration
 */
interface IconComponent {
  /**
   * Function to generate the icon SVG structure
   * @param primaryColor - Primary fill color
   * @param secondaryColor - Secondary fill color for two-tone effect
   * @returns SVG icon object with paths and attributes
   */
  icon: IconFunction;
  
  /** Icon identifier name */
  name: string;
  
  /** Visual theme style */
  theme: string;
}

/**
 * Default export: Two-tone tag icon component
 * Represents a price tag or label icon with a hole for attachment
 */
declare const tagTwoToneIcon: IconComponent;

export default tagTwoToneIcon;