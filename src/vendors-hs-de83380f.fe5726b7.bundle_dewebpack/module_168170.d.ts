/**
 * USB icon component definition for Ant Design Icons
 * Two-tone themed SVG icon representing a USB symbol
 */

/**
 * Icon rendering function parameters
 */
interface IconRenderParams {
  /** Primary color for the icon paths */
  primaryColor: string;
  /** Secondary color for the icon paths (used in two-tone theme) */
  secondaryColor: string;
}

/**
 * SVG path element attributes
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML tag name */
  tag: 'path';
  /** Path element attributes */
  attrs: PathAttrs;
}

/**
 * Root SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates and dimensions */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * SVG element definition structure
 */
interface SvgElement {
  /** HTML tag name */
  tag: 'svg';
  /** SVG root element attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /**
   * Render function that generates the SVG icon structure
   * @param primaryColor - Primary color for main icon paths
   * @param secondaryColor - Secondary color for accent paths (two-tone theme)
   * @returns SVG element structure with paths
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
  
  /** Icon identifier name */
  name: string;
  
  /** Icon theme variant */
  theme: 'twotone' | 'filled' | 'outlined';
}

/**
 * USB icon definition
 * Represents a USB connector symbol in two-tone style
 */
declare const usbTwoTone: IconDefinition;

export default usbTwoTone;