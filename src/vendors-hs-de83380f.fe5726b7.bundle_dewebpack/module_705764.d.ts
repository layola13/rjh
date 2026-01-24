/**
 * Video camera icon component definition for Ant Design icon library.
 * Provides a two-tone themed SVG icon representing a video camera.
 */

/**
 * Color parameters for the two-tone icon theme.
 */
interface IconColors {
  /** Primary color for the main icon elements */
  primaryColor: string;
  /** Secondary color for accent/fill elements */
  secondaryColor: string;
}

/**
 * SVG element attributes.
 */
interface SvgAttributes {
  /** SVG viewBox coordinate system */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG path element attributes.
 */
interface PathAttributes {
  /** SVG path data defining the shape */
  d: string;
  /** Fill color for the path */
  fill: string;
}

/**
 * Generic SVG element representation.
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes | PathAttributes;
  /** Child elements (optional) */
  children?: SvgElement[];
}

/**
 * Icon definition structure.
 */
interface IconDefinition {
  /** Icon identifier name */
  name: string;
  /** Icon theme variant */
  theme: string;
  /**
   * Icon generator function that creates SVG structure.
   * 
   * @param primaryColor - Primary color for main icon elements
   * @param secondaryColor - Secondary color for accent elements
   * @returns SVG element structure with paths and attributes
   */
  icon: (primaryColor: string, secondaryColor: string) => SvgElement;
}

/**
 * Video camera icon definition with two-tone theme.
 * Contains SVG paths for a video camera icon with configurable colors.
 */
declare const videoCameraIcon: IconDefinition;

export default videoCameraIcon;