/**
 * Icon definition for the 'down-circle' outlined icon.
 * Represents a downward-pointing chevron inside a circle outline.
 */

/**
 * SVG path attribute configuration
 */
interface PathAttrs {
  /** SVG path data string defining the shape */
  d: string;
}

/**
 * SVG path element definition
 */
interface PathElement {
  /** HTML/SVG tag name */
  tag: 'path';
  /** Path-specific attributes */
  attrs: PathAttrs;
}

/**
 * Root SVG element attributes
 */
interface SvgAttrs {
  /** SVG viewBox coordinates: minX minY width height */
  viewBox: string;
  /** Whether the SVG element can receive focus */
  focusable: string;
}

/**
 * SVG container element definition
 */
interface SvgIcon {
  /** HTML/SVG tag name */
  tag: 'svg';
  /** SVG-specific attributes */
  attrs: SvgAttrs;
  /** Child elements (paths, shapes, etc.) */
  children: PathElement[];
}

/**
 * Complete icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgIcon;
  /** Icon identifier name */
  name: string;
  /** Visual style theme variant */
  theme: 'outlined' | 'filled' | 'twotone';
}

/**
 * Down-circle outlined icon definition.
 * Contains SVG paths for a circular outline with a downward chevron.
 */
declare const iconDefinition: IconDefinition;

export default iconDefinition;