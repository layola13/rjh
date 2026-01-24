/**
 * SVG icon definition for "radius-upright" outlined theme icon
 * Represents a border radius indicator with upright positioning
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the SVG element should be focusable */
  focusable?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * Represents a child element within the SVG structure
 */
interface SvgChild {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Optional nested children elements */
  children?: SvgChild[];
}

/**
 * Core SVG icon structure
 */
interface IconDefinition {
  /** SVG root element tag */
  tag: string;
  /** SVG root attributes */
  attrs: SvgAttributes;
  /** Child elements (typically path elements) */
  children: SvgChild[];
}

/**
 * Complete icon configuration object
 */
interface IconConfig {
  /** The SVG icon definition */
  icon: IconDefinition;
  /** Unique identifier for the icon */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Default export: Radius upright icon configuration
 * An outlined icon showing border radius indicators in the upright corners
 */
declare const radiusUprightIcon: IconConfig;

export default radiusUprightIcon;