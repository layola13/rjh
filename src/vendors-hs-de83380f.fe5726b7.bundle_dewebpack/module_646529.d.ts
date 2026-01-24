/**
 * Step Backward icon definition (filled theme)
 * 
 * SVG-based icon representing a "step backward" control, commonly used in media players
 * to skip to the previous track or restart playback.
 */

/**
 * Attributes for SVG elements
 */
interface SvgAttrs {
  /** SVG viewBox attribute defining the coordinate system */
  viewBox?: string;
  /** Whether the element can receive focus */
  focusable?: string;
  /** SVG path data string */
  d?: string;
}

/**
 * SVG element node structure
 */
interface SvgNode {
  /** HTML/SVG tag name */
  tag: string;
  /** Element attributes */
  attrs: SvgAttrs;
  /** Child elements (optional) */
  children?: SvgNode[];
}

/**
 * Icon definition structure
 */
interface IconDefinition {
  /** SVG icon configuration */
  icon: SvgNode;
  /** Icon identifier name */
  name: string;
  /** Visual theme variant */
  theme: string;
}

/**
 * Step Backward icon configuration
 * 
 * Composed of two main shapes:
 * - A triangular play-like shape pointing left (for the backward motion)
 * - A vertical bar on the left edge (representing the "step" boundary)
 */
declare const stepBackwardFilledIcon: IconDefinition;

export default stepBackwardFilledIcon;