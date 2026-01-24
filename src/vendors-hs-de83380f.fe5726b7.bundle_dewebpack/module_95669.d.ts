/**
 * Icon component definition for a two-tone red envelope icon
 */

/**
 * SVG element tag types
 */
type SvgTag = 'svg' | 'path';

/**
 * SVG element attributes
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data */
  d?: string;
  /** Fill color for the path */
  fill?: string;
}

/**
 * Recursive structure representing an SVG element tree
 */
interface SvgElement {
  /** HTML/SVG tag name */
  tag: SvgTag;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (only present on container elements) */
  children?: SvgElement[];
}

/**
 * Icon function signature that generates SVG structure
 * @param primaryColor - Primary color for the icon (typically the main fill color)
 * @param secondaryColor - Secondary color for the icon (used for highlights/details in two-tone theme)
 * @returns SVG element structure representing the icon
 */
type IconFunction = (primaryColor: string, secondaryColor: string) => SvgElement;

/**
 * Icon definition object structure
 */
interface IconDefinition {
  /** Function that generates the SVG icon structure */
  icon: IconFunction;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant of the icon */
  theme: 'filled' | 'outlined' | 'twotone';
}

/**
 * Red envelope icon (two-tone variant)
 * Commonly used in Asian cultures to represent monetary gifts
 */
declare const redEnvelopeIcon: IconDefinition;

export default redEnvelopeIcon;