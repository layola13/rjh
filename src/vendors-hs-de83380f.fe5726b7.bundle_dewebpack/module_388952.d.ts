/**
 * SVG icon configuration for a flag icon with two-tone theme
 */
export interface IconAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Indicates whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * SVG element node structure
 */
export interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: IconAttrs;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Icon generation function signature
 * @param primaryColor - Primary color for the icon outline
 * @param secondaryColor - Secondary color for the icon fill
 * @returns SVG icon node structure
 */
export type IconFunction = (primaryColor: string, secondaryColor: string) => IconNode;

/**
 * Icon configuration object
 */
export interface IconConfig {
  /** Function that generates the icon SVG structure */
  icon: IconFunction;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Two-tone flag icon configuration
 * 
 * @example
 *