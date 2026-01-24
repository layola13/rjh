/**
 * Icon configuration for a two-tone switcher icon
 */

/**
 * Attributes for SVG path elements
 */
interface PathAttrs {
  /** SVG path data string */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * Attributes for the root SVG element
 */
interface SvgAttrs {
  /** SVG viewBox coordinates */
  viewBox: string;
  /** Whether the SVG is focusable */
  focusable: string;
}

/**
 * Represents an SVG path element
 */
interface PathElement {
  /** Element tag name */
  tag: 'path';
  /** Path attributes */
  attrs: PathAttrs;
}

/**
 * Represents the root SVG element structure
 */
interface SvgElement {
  /** Element tag name */
  tag: 'svg';
  /** SVG attributes */
  attrs: SvgAttrs;
  /** Child path elements */
  children: PathElement[];
}

/**
 * Icon configuration object
 */
interface IconConfig {
  /**
   * Generates the icon SVG structure
   * @param primaryColor - Primary color for main icon elements
   * @param secondaryColor - Secondary color for accent elements
   * @returns SVG element structure
   */
  icon(primaryColor: string, secondaryColor: string): SvgElement;
  
  /** Icon identifier name */
  name: 'switcher';
  
  /** Icon theme variant */
  theme: 'twotone';
}

declare const switcherIcon: IconConfig;

export default switcherIcon;