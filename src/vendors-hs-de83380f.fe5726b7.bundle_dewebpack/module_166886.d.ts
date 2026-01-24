/**
 * Icon component definition for an outlined border icon.
 * This module exports metadata describing an SVG icon that can be rendered
 * in icon systems (e.g., Ant Design Icons).
 * 
 * @module BorderOutlinedIcon
 */

/**
 * Attributes for SVG elements (path, svg, etc.)
 */
interface SvgAttributes {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
  [key: string]: string | undefined;
}

/**
 * Represents a single SVG element (path, circle, rect, etc.)
 */
interface SvgElement {
  /** The SVG tag name (e.g., 'path', 'circle') */
  tag: string;
  /** Attributes to apply to the SVG element */
  attrs: SvgAttributes;
  /** Nested child elements (optional) */
  children?: SvgElement[];
}

/**
 * Complete icon definition structure used by icon libraries
 */
interface IconDefinition {
  /** Root SVG element configuration */
  icon: SvgElement;
  /** Semantic name of the icon */
  name: string;
  /** Visual theme variant (outlined, filled, two-tone) */
  theme: 'outlined' | 'filled' | 'two-tone';
}

/**
 * Border icon in outlined theme style.
 * Displays a square border/frame shape.
 */
declare const BorderOutlinedIcon: IconDefinition;

export default BorderOutlinedIcon;