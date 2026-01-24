/**
 * Calendar icon configuration for Ant Design icon system
 * Represents a calendar with outlined theme style
 */

/**
 * SVG attributes interface for icon elements
 */
interface SvgAttributes {
  /** SVG viewBox defining the coordinate system */
  viewBox?: string;
  /** Indicates if the element can receive focus */
  focusable?: string;
  /** SVG path data defining the shape */
  d?: string;
}

/**
 * Icon element node structure
 */
interface IconNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttributes;
  /** Child elements (optional) */
  children?: IconNode[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** Root SVG icon configuration */
  icon: IconNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Calendar icon definition with outlined theme
 * Displays a standard calendar widget icon with month/day grid
 */
declare const calendarIcon: IconDefinition;

export default calendarIcon;